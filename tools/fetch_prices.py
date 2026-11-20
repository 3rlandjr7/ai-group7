#!/usr/bin/env python3
"""Fetch current prices for the products named in each purchase card.

Runs in GitHub Actions on a schedule, never in the browser: the site is static and a browser can
neither hold credentials nor fetch across origins.

Standard library only, on purpose. No pip install, nothing to pin, nothing to break in CI - and
urllib.robotparser gives us the robots.txt gate for free.

Design notes that are easy to get wrong, each one found by testing real stores:

  * Use /products/<handle>.js, NOT .json. The .json endpoint omits 'available' entirely, so stock
    cannot be checked from it - an in-stock razor read as out-of-stock during testing. The .js
    endpoint carries 'available' and gives prices as integer CENTS (7900), which also removes the
    string-to-float parsing that put 139.00 above 79.00 when sorted as text.
  * variants[0] is arbitrary. One real product listed 139.00 first when it starts at 79.00.
    Use the cheapest AVAILABLE variant.
  * compare_at_price is sometimes equal to price. Showing that as "was" invents a discount, which
    is the exact deception this app exists to expose. Only a strictly higher value is a sale.
  * Out-of-stock variants are in the feed. Recommending one means recommending something nobody
    can buy.
  * Currency is NOT in the product data, only in /meta.json. One of our test stores is Canadian.

See docs/decisions/0003 and 0006.
"""

import json, sys, time, urllib.error, urllib.request
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse
from urllib.robotparser import RobotFileParser

ROOT = Path(__file__).resolve().parent.parent
CARDS, PRICES = ROOT / "data" / "cards", ROOT / "data" / "prices"
COMPLIANCE = ROOT / "data" / "compliance-log.json"

# Identifies us and links the repo, so a merchant who wants us to stop can see who we are and
# find us. Never a personal email address.
UA = "ai-group7-shortlist/1.0 (student project; +https://github.com/3rlandjr7/ai-group7)"
ACCEPTED_CURRENCIES = {"USD"}      # brief: launch region is the USA
REQUEST_GAP_SECONDS = 1.5          # never burst a small merchant
HISTORY_CAP = 90
DELIST_AFTER_CONSECUTIVE_404S = 3  # a single 404 is usually a renamed slug, not a dead product


def now_iso():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def get(url, timeout=20):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.read()


def get_json(url):
    status, body = get(url)
    return status, json.loads(body)


class Gate:
    """robots.txt, checked before every host, failing CLOSED.

    Unreadable robots.txt means skip - not proceed. An early test of this project got that
    backwards and fetched anyway, which is more permissive than decision 0003 promises.
    """

    def __init__(self):
        self.decisions = {}

    def allows(self, host, path):
        if host in self.decisions:
            return self.decisions[host]["allowed"]
        rp = RobotFileParser()
        try:
            status, body = get(f"https://{host}/robots.txt", timeout=15)
            rp.parse(body.decode("utf-8", "replace").splitlines())
            allowed = rp.can_fetch(UA, f"https://{host}{path}")
            reason = f"robots.txt HTTP {status}; can_fetch({path}) = {allowed}"
        except Exception as e:
            allowed, reason = False, f"robots.txt unreadable ({type(e).__name__}) - failing closed"
        self.decisions[host] = {"allowed": allowed, "reason": reason, "checked_at": now_iso()}
        return allowed


def handle_from_url(url):
    """Pull the product handle out of a storefront URL.

    Tested shapes that all work: /products/<handle>, /collections/<c>/products/<handle>,
    and either with a ?variant= query string.
    """
    parts = [p for p in urlparse(url).path.split("/") if p]
    if "products" in parts:
        i = parts.index("products")
        if i + 1 < len(parts):
            return parts[i + 1]
    return None


def store_currency(host, cache):
    """Currency lives in /meta.json, never in the product. One test store is Canadian."""
    if host not in cache:
        try:
            _, meta = get_json(f"https://{host}/meta.json")
            cache[host] = (meta.get("currency") or "").upper() or None
        except Exception:
            cache[host] = None
    return cache[host]


def cents_to_amount(cents):
    """The .js endpoint reports money as integer cents. Keep it integral until the last moment -
    this is where a string sort once put $139 above $79."""
    return round(int(cents) / 100, 2)


def pick_variant(variants):
    """Cheapest AVAILABLE variant, and whether cheaper sold-out ones exist.

    Never variants[0] - the order is the store's, not price order.
    """
    available = [v for v in variants if v.get("available")]
    if not available:
        return None, bool(variants)
    chosen = min(available, key=lambda v: int(v["price"]))   # cents, so integer compare
    return chosen, len(available) < len(variants)


def fetch_one(host, handle, currency_cache):
    """One product. Returns (row, outcome) where outcome is ok | gone | skipped | failed.

    'gone' (404) and 'failed' (network) mean opposite things and must not be conflated: a 404 may
    invalidate the human's shortlist and has to surface, while a timeout is noise.
    """
    currency = store_currency(host, currency_cache)
    if currency not in ACCEPTED_CURRENCIES:
        return ({"store": host, "status": "unsupported-currency",
                 "note": f"store currency {currency or 'unknown'}; this app shows "
                         f"{'/'.join(sorted(ACCEPTED_CURRENCIES))} only",
                 "checked_at": now_iso()}, "skipped")

    # .js, not .json: only .js reports 'available'. Prices come back as integer cents.
    url = f"https://{host}/products/{handle}.js"
    try:
        _, payload = get_json(url)
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return ({"store": host, "status": "not-found", "checked_at": now_iso()}, "gone")
        return ({"store": host, "status": "fetch-failed",
                 "note": f"HTTP {e.code}", "checked_at": now_iso()}, "failed")
    except Exception as e:
        return ({"store": host, "status": "fetch-failed",
                 "note": type(e).__name__, "checked_at": now_iso()}, "failed")

    product = payload.get("product") or payload   # .js returns the product unwrapped
    variant, cheaper_sold_out = pick_variant(product.get("variants") or [])
    if variant is None:
        return ({"store": host, "status": "out-of-stock", "title": product.get("title"),
                 "checked_at": now_iso()}, "ok")

    price = cents_to_amount(variant["price"])
    was = variant.get("compare_at_price")
    was = cents_to_amount(was) if was is not None else None
    # Only a strictly higher compare_at is a real sale. Equal or null is not, and showing it as
    # "was" would manufacture the fake discount this app exists to call out.
    was = was if (was is not None and was > price) else None

    row = {
        "store": host,
        "status": "ok",
        "title": product.get("title"),
        "variant": variant.get("title"),
        "price": price,
        "currency": currency,
        "on_sale": was is not None,
        "checked_at": now_iso(),
        "url": f"https://{host}/products/{handle}",
    }
    if was is not None:
        row["was"] = was
    # Signals the UI needs so "from $79" is honest rather than implying one price.
    if len(product.get("variants") or []) > 1:
        row["from_price"] = True
    if cheaper_sold_out:
        row["cheaper_variant_sold_out"] = True
    return row, "ok"


def sane(rows, previous):
    """Refuse to publish obvious nonsense.

    The fetcher commits without anyone reviewing it, so it checks its own work. The dangerous case
    is a store-wide change - a renamed URL scheme 404s EVERY product at once. That is our view
    breaking, not twelve products being discontinued, so we keep what we had and flag the host.
    """
    problems = []
    by_host = {}
    for r in rows:
        by_host.setdefault(r["store"], []).append(r)
    for host, hrows in by_host.items():
        if len(hrows) >= 2 and all(r["status"] == "not-found" for r in hrows):
            problems.append(f"every product at {host} returned 404 - treating as a store-level "
                            f"change, keeping previous prices")
    for r in rows:
        if r.get("price") is not None and not (0 < float(r["price"]) < 1_000_000):
            problems.append(f"{r['store']}: implausible price {r['price']!r}")
    return problems


def load_json(path, default):
    try:
        return json.loads(path.read_text())
    except Exception:
        return default


def process_card(card, gate, currency_cache, dry_run=False):
    slug = card["slug"]
    out_path = PRICES / f"{slug}.json"
    previous = load_json(out_path, {"slug": slug, "finalists": {}, "history": []})
    rows, outcomes = [], []

    for finalist in card.get("finalists", []):
        name = finalist.get("name", "?")
        for store in finalist.get("stores", []):
            host = store.get("host") or urlparse(store.get("url", "")).hostname
            handle = handle_from_url(store.get("url", ""))
            if not host or not handle:
                rows.append({"store": host or "?", "finalist": name, "status": "bad-url",
                             "note": "could not read a product handle from the URL",
                             "checked_at": now_iso()})
                continue
            if not gate.allows(host, f"/products/{handle}.json"):
                rows.append({"store": host, "finalist": name, "status": "skipped-by-robots",
                             "note": gate.decisions[host]["reason"], "checked_at": now_iso()})
                outcomes.append("skipped")
                continue
            row, outcome = fetch_one(host, handle, currency_cache)
            row["finalist"] = name
            rows.append(row)
            outcomes.append(outcome)
            time.sleep(REQUEST_GAP_SECONDS)   # politeness, not performance

    problems = sane(rows, previous)
    if problems:
        print(f"  !! {slug}: sanity gate refused to overwrite:")
        for p in problems:
            print(f"     - {p}")
        return previous, rows, problems

    # A 404 only means "discontinued" after it repeats. A single one is usually a renamed slug.
    prev_by_key = {(r.get("store"), r.get("finalist")): r
                   for r in previous.get("finalists", {}).get("rows", [])}
    for r in rows:
        key = (r.get("store"), r.get("finalist"))
        prev = prev_by_key.get(key, {})
        if r["status"] == "not-found":
            strikes = prev.get("not_found_strikes", 0) + 1
            r["not_found_strikes"] = strikes
            if strikes >= DELIST_AFTER_CONSECUTIVE_404S:
                r["delisted"] = True
            # Keep showing the last good price while we are unsure, with its original date.
            for field in ("price", "was", "currency", "title", "variant", "url"):
                if field in prev:
                    r.setdefault(field, prev[field])
            if "checked_at" in prev:
                r["price_checked_at"] = prev.get("price_checked_at", prev["checked_at"])
        elif r["status"] == "fetch-failed":
            # Transient. Keep the previous price AND its original timestamp - claiming we checked
            # today would be a lie.
            for field in ("price", "was", "currency", "title", "variant", "url"):
                if field in prev:
                    r.setdefault(field, prev[field])
            if "checked_at" in prev:
                r["price_checked_at"] = prev.get("price_checked_at", prev["checked_at"])
        elif r.get("price") is not None:
            r["price_checked_at"] = r["checked_at"]
        # Rows with no price (skipped by robots, out of stock) get no price_checked_at: claiming
        # a price was checked when none was fetched is a small lie, and this app's whole pitch is
        # not telling those.

    history = previous.get("history", [])
    snapshot = {"at": now_iso(),
                "prices": {f"{r.get('store')}|{r.get('finalist')}": r.get("price")
                           for r in rows if r.get("price") is not None}}
    if not history or history[-1]["prices"] != snapshot["prices"]:
        history.append(snapshot)        # only record actual changes
    history = history[-HISTORY_CAP:]

    result = {"slug": slug, "updated_at": now_iso(),
              "finalists": {"rows": rows}, "history": history}
    if not dry_run:
        PRICES.mkdir(parents=True, exist_ok=True)
        out_path.write_text(json.dumps(result, indent=2) + "\n")
    return result, rows, []


def main(argv):
    dry_run = "--dry-run" in argv
    only = next((a.split("=", 1)[1] for a in argv if a.startswith("--card=")), None)

    manifest = load_json(CARDS / "index.json", {"cards": []})
    slugs = [s for s in manifest.get("cards", []) if not only or s == only]
    if not slugs:
        print("no cards to process"); return 0

    gate, currency_cache, failures = Gate(), {}, 0
    for slug in slugs:
        card = load_json(CARDS / f"{slug}.json", None)
        if not card:
            print(f"  !! {slug}: unreadable card"); failures += 1; continue
        print(f"\n{slug}:")
        _, rows, problems = process_card(card, gate, currency_cache, dry_run)
        for r in rows:
            price = f"{r['price']:.2f} {r.get('currency','')}" if r.get("price") is not None else "-"
            sale = f" (was {r['was']:.2f})" if r.get("was") else ""
            print(f"  {r['status']:22} {r.get('store','?'):24} {price}{sale}")
        failures += len(problems)

    # Compliance log: current decision per host, plus a dated history of CHANGES only. A
    # changes-only log could not prove we check every run, so each run appends a summary.
    log = load_json(COMPLIANCE, {"hosts": {}, "runs": []})
    for host, d in gate.decisions.items():
        if log["hosts"].get(host, {}).get("allowed") != d["allowed"]:
            log.setdefault("changes", []).append({"host": host, **d})
        log["hosts"][host] = d
    log["runs"] = (log.get("runs", []) + [{
        "at": now_iso(), "hosts_checked": len(gate.decisions),
        "allowed": sum(1 for d in gate.decisions.values() if d["allowed"]),
        "skipped": sum(1 for d in gate.decisions.values() if not d["allowed"]),
    }])[-HISTORY_CAP:]
    if not dry_run:
        COMPLIANCE.write_text(json.dumps(log, indent=2) + "\n")

    print(f"\nrobots.txt: {len(gate.decisions)} host(s) checked, "
          f"{sum(1 for d in gate.decisions.values() if d['allowed'])} allowed, "
          f"{sum(1 for d in gate.decisions.values() if not d['allowed'])} skipped")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
