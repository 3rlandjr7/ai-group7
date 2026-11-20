# 0006 — Prices are fetched into their own files, by a zero-dependency Python job

- **Date:** 2026-11-20
- **Status:** Accepted
- **Decided by:** Rene (lead)
- **Supersedes:** part of [0004](0004-teammate-owns-a-component.md) — the co-integrator no longer
  owns the robots.txt gate

## Context

Decision 0005 settled that a card holds what a human decided and the fetcher holds what changes.
This is the fetcher. Until it existed every price in the app was hypothetical.

## Decisions

**Prices live in `data/prices/<slug>.json`, never inside the card.** Cards belong to teammates;
prices are rewritten by a machine daily. Mixing them would have the fetcher editing files people
are actively working on, and would blur 0005's line between judgement and data. Humans own cards,
the machine owns prices, joined by slug. This also makes the Action's `pull --rebase` safe: humans
never touch price files, so a rebase has nothing to conflict with.

**Python, standard library only.** `urllib.robotparser` gives the robots gate for free, so there is
no `pip install`, nothing to pin, nothing to break in CI. The fetcher never runs in the browser, so
the site stays plain HTML/CSS/JS.

**The gate and the fetcher are one program, owned by the lead.** The gate is the first twenty lines
of the fetcher; splitting one file across two owners contradicts the one-file-one-owner rule the
project rests on. 0004 gave the gate to the co-integrator; that part is superseded. The
co-integrator instead reviews and signs off the gate's behaviour.

**`main` stays unprotected for now.** A protected branch rejects CI pushes, so the daily refresh
would fail. With six people and the lead reviewing everything, a daily rubber-stamped pull request
would be review theatre. Rejected: the Action opening a daily PR, and protecting `main` with a CI
bypass (an undocumented bypass is a trap). **`SETUP-CHECKLIST.md` is corrected to match.** If the
team grows or someone pushes something they shouldn't, protection goes on and the Action moves to
opening PRs.

## The rule that came out of testing: parse, filter, label

Five correctness bugs were found by running against real storefronts. Four rounds of design review
found none of them. Three produced the same symptom — a confidently displayed wrong price — and
each was a place where raw store data was trusted as it arrived.

| What was wrong | Evidence | Fix |
|---|---|---|
| `variants[0]` is arbitrary | `Leaf Two Razor`: 9 variants listed **139.00 first**, but it starts at 79.00 — a 76% error | cheapest **available** variant; render `from $79` when several exist |
| Prices are strings | sorting `['139.00','79.00','99.00']` as text gives 139, 79, 99 | use the `.js` endpoint, which reports integer cents |
| `/products/<handle>.json` omits `available` | an in-stock razor read as out-of-stock during testing | use `/products/<handle>.js`, which carries it |
| `compare_at_price` is not always a sale | of 130 variants: 17 null, **1 equal to the price**, 112 a real markdown | only a **strictly higher** value is a sale |
| Out-of-stock items are in the feed | 9 of 130 variants unavailable, including a $39 razor quoted earlier as if buyable | exclude unavailable from "cheapest" |

**So: every number reaching the page is parsed, filtered and labelled before it is compared.**
Parsed (cents to amount), filtered (available only, USD only), labelled (which variant, when
checked, which currency). A value from a third party is an input, not a fact.

## Behaviour worth knowing

- **The gate fails closed.** Unreadable `robots.txt` skips the host, exactly like an explicit
  disallow. An early test of this project got that backwards and fetched anyway.
- **404 and network failure mean opposite things.** A 404 may mean the product is gone and must
  surface; a timeout is noise. Both keep the previous price **with its original timestamp** —
  claiming we checked today would be a lie.
- **A 404 only means "discontinued" after 3 consecutive runs.** Stores rename slugs. Measured:
  `products.json` can list handles whose product page 404s — `hensonshaving.com` lists both
  `the-henson-shave-system-in-aircraft-aluminum` (404) and `henson-shave-system-in-aircraft-aluminum`
  (200). A single 404 proves nothing.
- **Currency is not in the product data**, only `/meta.json`. `hensonshaving.com` has
  `country: CA` but `currency: USD`. An earlier note in `docs/PLAN.md` claimed its prices were CAD
  after reading the country field instead of the currency field; that was wrong and is corrected.
  Non-USD stores are refused with a visible reason rather than converted — conversion needs a rate
  and a rate date, which is a feature of its own.
- **A sanity gate guards the automated commit.** Nobody reviews it, so it checks its own work: if
  *every* product at one host 404s on the same run, that is a store-level change, not a dozen
  discontinued products — keep the old prices and flag the host.
- **Politeness:** 1.5s between requests, and a User-Agent naming the project and linking the repo,
  never a personal email address.

## Consequences

**Makes easy.** Real prices, refreshed daily, with no key, no spend and no cache restriction —
which is precisely where the Best Buy route failed in 0003.

**Makes hard.** Store URLs in cards must be live product pages. A handle copied from a catalogue
listing may 404, as Henson showed.

**Known limit, recorded not fixed:** prices are keyed per card, but a price belongs to a product.
The same razor in two cards is fetched and stored twice and the copies can disagree. Correct at
nine cards, wrong as a data model; normalising by store and handle is more machinery than nine
cards justify.

**Not done:** WooCommerce. It could not be tested — the two candidate hosts were unreachable from
the development container, and that is a limitation of that environment, not evidence Woo is
unusable. Actions runners have open network, so it should be probed there before being written.
