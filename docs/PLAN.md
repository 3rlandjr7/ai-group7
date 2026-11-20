# Project Plan

> Group 7. Rewritten 2026-11-19 after decisions 0001–0004, which replaced the original
> four-section marketing page with a real app front end. See `docs/decisions/`.

## 1. The problem

People making considered purchases — appliances, tools, electronics, home goods — get SEO
listicles and affiliate blogs instead of trustworthy research, and once they buy, the return
deadline and warranty details scatter across email and receipts.

This builds the front end of a purchase research and tracking app. Each thing you are shopping for
is one **purchase card** that moves through stages: idea → researching → shortlisted → decided →
bought → return window → owned.

Six people are building it, four of whom do not write code, so the work has to split into pieces
one person can own and explain.

## 2. Users

| User | What they need to do | How often |
|---|---|---|
| Shopper | Open a card, read the research, compare 2–3 finalists, see where it is cheapest, copy a summary to send someone | Several times per purchase |
| Grader / instructor | Read the repo, see the process records, hear each of us explain our own piece | Once |
| Teammate | Build one component, research two cards, open a PR | Weekly |

## 3. Features (smallest useful version first)

Shared checks on every feature: page loads with **no console errors**; correct at **375px** with no
horizontal scroll and nothing clipped; uses only `styles.css` variables, no hard-coded colours or
fonts; no `<script>` tags inside component files.

| # | Feature | Owner | Must / Nice | Definition of Done |
|---|---|---|---|---|
| F1 | **Page shell** — header, nav, footer, section includes, `styles.css` tokens | Lead | Must | ✅ **Done 2026-11-19.** 0 console errors; all 4 placeholders load; no horizontal scroll at 375/768/1280. Nav-link check partial until sections carry real content — see DEVBOOK |
| F2 | **Data layer** — `FakeStore` reads committed card files, `schema.js` validates every one on load | Lead | Must | ✅ **Done 2026-11-19.** Valid card loads (0 console errors); a deliberately malformed card produced **10 readable on-screen errors** naming the field and why, while the valid card still loaded and the page stayed intact. Screenshot in DEVBOOK |
| F3 | **Purchase card tile** — one card showing its stage | Teammate 1 | Must | Renders a card at each of the 9 stages from sample data; readable at 375px; stage is visually distinguishable |
| F4 | **Comparison table** — ranked factors, max 3 products, total-cost-of-ownership row | Teammate 2 | Must | 3 product columns with no sideways scroll at 375px; TCO row present; "Not published" shown where a spec is missing |
| F5 | **Price table + "Is the sale real?"** | Teammate 3 | Must | Rows sorted by total, cheapest first — verified by hand against the data; each row shows the store and when the price was checked; list-vs-current drives the verdict. A finalist with no fetchable price shows **"price not shown — see at <store> →"** in its own row, never a blank cell (see 0005: an invisible gap reads as "worse option"). If a fetch fails, the previous number shows with its date rather than an empty cell |
| F6 | **Share-message box** — plain text, §6 format | Teammate 4 | Must | One complete plain-text message, no markdown; pasted into a notes app it reads complete and scannable on a phone |
| F7 | **Dashboard** — cards grouped by stage | Lead | Must | Every card file appears under the correct stage heading; counts match the files on disk |
| F8 | **Research content** — 2 purchase cards each | All 4 teammates | Must | Each card has ≥3 sources with credibility tier **and date**, 2–3 finalists, and the research date. **Finalists come from the sources, not from browsing stores** — §A's "source table first, then shortlist" order, which is what keeps availability bias out (0005). Every `choose X if…` branch keys on a **reader fact** ("if you shave more than twice a week"), never product expertise ("if you want milder blade exposure"); where no reader-fact discriminator exists, the card states a default — "if you don't know which, get X". No stored verdict, no weights, no scores. No placeholder text left |
| F8b | **One shared research prompt template**, committed | Lead | Must | A single template in the repo that enforces sources-first ordering and the discriminator rule; each card records its inputs. Not one prompt per card — eight prompts means eight inconsistent research qualities (0005) |
| F9 | **Live price fetcher** — open storefront APIs, run on a schedule | Lead | Must | ✅ **Done 2026-11-20.** Verified live: `leafshave.com 79.00 USD (was 109.00)`, `hensonshaving.com 105.00 USD (was 150.96)` — cheapest *available* variant, not `variants[0]` which would have reported 139.00. Robots gate **failed closed** on an unreadable `robots.txt` and skipped the host. A broken URL kept the previous price with its **original** timestamp; `delisted` fired only on the 3rd consecutive 404 |
| F10 | **robots.txt gate + compliance log** | Lead *(review: co-integrator)* | Must | ✅ **Done 2026-11-20** — shipped inside F9; they are one program (decision 0006 supersedes 0004 on ownership). Verified: an unreadable `robots.txt` produced `skipped-by-robots` with the reason *"failing closed"*, and no fetch was attempted. `data/compliance-log.json` records the decision per host plus a per-run summary |
| F11 | **Published** on GitHub Pages | Lead | Must | Public URL opens on a phone on cellular and matches local preview |
| F12 | "Research with your own Claude" — copy the full prompt, paste the result back | Lead / co | Nice | Button copies a complete prompt; a valid pasted response renders a card; an invalid one is rejected with a readable error |
| F13 | Bookmarklet that reads the product page you already have open | Lead | Nice | Clicking it on a product page fills a price row, in the reader's own browser session |
| F14 | Stage filter, dark mode | Lead | Nice | — |

## 4. Data

No database, no backend, no accounts. Every card is one file in the repo, validated on load.

Prices come from **independent Shopify and WooCommerce merchants**, whose storefronts publish
product JSON openly with no key and no sign-up. Amazon, Best Buy and Walmart are **linked without
prices**, because republishing their prices breaks their terms. See decision 0003.

## 5. Out of scope

Accounts, login, Supabase, row-level security, any paid API call, receipt or image upload stored in
the repo, notifications, a custom domain, and any scraping of a site that disallows it. These
belong to the separate MS-project build, not this one.

## 6. Assumptions

| # | Assumption | How we'll check it | Status |
|---|---|---|---|
| A1 | The assignment is open-ended; the professor constrains process, not stack | Confirmed by Rene, 2026-11-19 | **confirmed** |
| A2 | Plain HTML/CSS/JS with no build step is acceptable | Follows from A1 — acceptable, not required | **confirmed** |
| A3 | Four teammates can produce a working component in free Claude from a written brief | One teammate does a dry run before the others start | unchecked |
| A4 | Enough independent merchants sell our seed products and expose open product JSON | Tested 2026-11-19 against 6 real stores | **confirmed** — 4 of 6 served open product JSON over HTTPS with no key. Found 37 razor matches on hensonshaving.com, 4 on leafshave.com, 19 mouse matches on gloriousgaming.com, each with current price, `compare_at_price` and stock status (e.g. Leaf Two Razor $79.00, was $109.00, in stock). The 2 failures were not Shopify stores, so the rule is "merchants on Shopify or WooCommerce", not "independent merchants" — picking stores is part of the research job. **Added 2026-11-20:** store currency is **not** in the
product data; it is at `/meta.json`, so the fetcher reads it per store and refuses non-USD stores
(the brief sets the launch region to the USA). `hensonshaving.com` has `country: CA` but
`currency: USD` — it is a Canadian company selling in US dollars, so its prices are usable. An
earlier note here claimed otherwise after reading the country field instead of the currency
field; that was wrong and is corrected |
| A5 | GitHub Pages is the host | Lead decides; repo default branch must be fixed first | unchecked |
| A6 | Images and content we use are ours or free to use | Each owner states the source in their PR | unchecked |
| A7 | Teammates can write genuine reader-fact discriminators rather than filler | First card through review is checked against the table in 0005 | **unchecked — the rule is only as good as its enforcement** |

## 7. Open questions

| # | Question | Who decides | Answer |
|---|---|---|---|
| Q1 | What is the app called? | Team | **Shortlist** — provisional, 2026-11-19. Change in `index.html` and `README.md` if the team prefers another |
| Q2 | Who is teammate 1–4, and which component is theirs? | Team | **open — the team splits this among themselves.** Four components: card tile, comparison table, price table, share box |
| Q3 | What is the deadline? | Instructor | dropped 2026-11-19 — not tracked here |
| Q4 | Colours and fonts for `styles.css` | Lead | **answered** 2026-11-19 — palette applied, all pairs pass WCAG AA; system font, no web font |
| Q5 | Does the repo default branch move to `main`? | Lead | **done** 2026-11-19 — default is `main`; the stray branch is deleted |
| Q6 | Which two of the nine products does each person research? | Team | **open — the team splits this**, with one done together as a worked example |

### TODO — placeholders still to fill

These are real blanks in committed files. Grep for them: `[name]`.

| File | What's blank | Who fills it |
|---|---|---|
| `CLAUDE.md` | the four component owners (lead and co-integrator filled 2026-11-20) | Lead, once Q2 is settled |
| `README.md` | the four component rows (lead and co-integrator filled 2026-11-20) | Lead, once Q2 is settled |
| `sections/*.html` | `Owner: [name]` on each placeholder | replaced when the real components land |
| `DEVBOOK.md` | one `[name]` in the setup entry | Lead |

None of these block the team from starting — the guide tells them to agree Q2 and Q6 themselves.

## 8. Risks

| # | Risk | What we'll do |
|---|---|---|
| R1 | ~~A4 fails~~ — **retired 2026-11-19.** A4 tested and confirmed; the hand-recorded fallback is no longer the expected path, though it remains available per decision 0003 |
| R7 | ~~The robots.txt gate fails open~~ — **closed 2026-11-20.** Verified failing closed with an unreachable host; see F10 | *(original text)* **The robots.txt gate fails open.** If a site's `robots.txt` cannot be read, a naive gate proceeds anyway — which is what the first test run did on gloriousgaming.com. That is more permissive than decision 0003 promises | F10's Definition of Done requires **fail closed**: unreadable `robots.txt` means skip the host and log it, exactly as an explicit disallow does. Tested with a host whose robots.txt is unreachable |
| R2 | Four components look like four different websites | Settle Q4 before anyone starts; every component uses only `styles.css` variables; the lead checks this at review |
| R3 | A teammate goes quiet and their component never arrives | Placeholders stay in place so the page always works. Agree a cut-off date at the start, not at the end |
| R4 | A teammate pastes AI-generated code carrying its own `<script>` or external library | No `<script>` in component files; the lead strips them at review and says what was removed |
| R5 | The page works locally but breaks on GitHub Pages | F11 is checked on a real phone on cellular, not just locally |
| R6 | Nobody can explain the code at grading | One entry per feature in `DEVBOOK.md`; each owner explains their own component and cards |
