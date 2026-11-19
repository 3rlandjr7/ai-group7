# 0003 — Take live prices from independent merchants, not the big retailers

- **Date:** 2026-11-19
- **Status:** Accepted
- **Decided by:** Rene (lead)

## Context

The app's core promise is current prices and an honest "is this sale real?" verdict. Stale prices
undercut the entire product. So the demo needs live price data at **zero cost**, without breaking
the brief's own rule in §3:

> *"Respect site terms and robots.txt; if a site blocks fetching, don't work around it — use the
> screenshot path."*

The site is hosted on GitHub Pages, which is static — no server. A browser cannot scrape a retailer
(CORS blocks it) and cannot hold an API key without publishing it. So live fetching *from the page*
is impossible regardless of cost, and any stored data must live in the repo.

## Options considered

| Option | Verdict | Why |
|---|---|---|
| Best Buy developer API, refreshed by a scheduled job | **Rejected** | Their terms permit caching *"except on a temporary basis not to exceed seventy-two (72) hours."* Committing prices to a public repo is a **permanent** cache — git history never expires — so it breaks the limit on the first commit. Their terms also bar use *"for the benefit of any third party (such as other retailers) for the purposes of analyzing … Best Buy pricing,"* which is arguably what a comparison tool is |
| Amazon Product Advertising API | Rejected | Requires Associates enrolment plus roughly ten qualifying sales per rolling 30 days, revoked after 30 days without sales. 24-hour cache cap. Reports indicate PA-API 5.0 was retired or superseded during 2026 |
| Walmart / Target / Costco | Rejected | No open public price API |
| eBay Browse API | Rejected | Free and permissive, but brief §4 says *"Never use eBay"* |
| Scraping retailers | Rejected | Breaks §3 and the retailers' own terms. The first thing a reviewer notices in a public repo |
| Google Shopping | Rejected | No official free API for public Shopping prices. The Content API reads only a merchant's *own* listings and was sunset 18 Aug 2026. Third-party "Google Shopping APIs" are scrapers of Google, which moves the terms problem to a vendor rather than removing it |
| Commercial aggregators | Rejected | Free tiers of roughly 100–1,000 calls total, and their terms push retailer IP compliance back onto us |
| Public datasets | Rejected | Historical snapshots. Cannot answer what a price is *today*, which is the whole question |
| Team collects prices by hand in stores | Rejected | Zero terms exposure and a good grading story, but Rene ruled it out as unsustainable |
| **Open storefront APIs — independent Shopify and WooCommerce merchants** | **Accepted** | Public, keyless, published-by-design, with no cache restriction |

**The pattern behind all those rejections** is worth recording: free retailer APIs restrict caching
*because* stored price data is the valuable asset. A static site must store its data in the repo.
So "free, live, and publicly stored retailer prices" is not merely difficult — it is structurally
impossible, and any design that appears to achieve it is violating someone's terms.

## Decision

Take live prices from independent merchants running Shopify and WooCommerce:

- **WooCommerce Store API** — `GET /wp-json/wc/store/v1/products`. Officially documented and
  explicitly unauthenticated: *"needs no API keys or tokens for access."*
- **Shopify `/products.json`** — public read-only JSON of published products. Each variant carries
  `price` and `compare_at_price`, which is exactly the list-versus-sale pair the "is the sale real?"
  panel needs. *Not confirmed as officially documented by Shopify*, and a minority of stores disable
  it, so each store is checked individually and a disable is honoured.

These are published API surfaces the storefront itself consumes — categorically different from
parsing HTML a site never meant to expose. §3 is satisfied on its own terms, not stretched.

Supporting rules adopted with it:

- **Big-box retailers are linked, not priced.** Nobody restricts linking; what is restricted is
  republishing a price. Amazon, Best Buy and Walmart appear as "See it at Amazon →" with no price,
  under the note *"We show prices only from stores that publish them openly. Others are linked
  instead."*
- **The fetcher reads `robots.txt` first** and refuses any host that disallows the path, writing
  host, matched rule and outcome to a compliance log committed in the repo. §3 becomes testable
  behaviour with evidence rather than a promise in a document.
- **Screenshots are input only.** A screenshot of a retailer's page is their content, so it is read
  for its numbers and never committed. The extracted price shows as "user-reported, not verified,"
  separate from verified rows. Not used as training data: user uploads carry other people's content
  and personal data.

## Consequences

**Makes easy.** Real live prices, refreshed on a schedule, with no key, no spend and no cache
restriction — so committing the data is legitimate, which is precisely where Best Buy failed. The
seed product list suits it: safety razors, OBD2 scanners, fireplace tools, acorn pickers, footrests,
gaming mice and drip pans are heavily sold by small direct-to-consumer merchants.

It also improves the product's story. *"We surface live prices from independent sellers the
comparison sites skip"* is a stronger and fully licensed pitch.

**Makes hard.** Each product needs a short list of merchants identified up front, and the fetcher
must handle stores that disable the endpoint.

**Gave up.** No live Amazon or Best Buy price. Smaller stores also mean some products may have only
two sellers to compare instead of five.

## Note for the required reflection

`GUIDE.md` asks for *"one place where the AI was wrong, and how your process caught it."* This
decision contains one. Claude initially recommended a scheduled job calling the Best Buy API and
committing the results, and asserted it was free and compliant. Checking the actual terms showed the
72-hour cache limit, which made the design illegal on its first commit. The recommendation was
withdrawn before any code was written. The process that caught it was simply refusing to accept an
unverified claim about a third party's terms.
