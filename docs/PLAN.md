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
| F2 | **Data layer** — `FakeStore` reads committed card files, `schema.js` validates every one on load | Lead | Must | All card files load and validate; a deliberately malformed file is rejected with a readable on-screen error, not a blank page |
| F3 | **Purchase card tile** — one card showing its stage | Teammate 1 | Must | Renders a card at each of the 9 stages from sample data; readable at 375px; stage is visually distinguishable |
| F4 | **Comparison table** — ranked factors, max 3 products, total-cost-of-ownership row | Teammate 2 | Must | 3 product columns with no sideways scroll at 375px; TCO row present; "Not published" shown where a spec is missing |
| F5 | **Price table + "Is the sale real?"** | Teammate 3 | Must | Rows sorted by total, cheapest first — verified by hand against the data; each row shows the store and when the price was checked; list-vs-current comparison drives the verdict |
| F6 | **Share-message box** — plain text, §6 format | Teammate 4 | Must | One complete plain-text message, no markdown; pasted into a notes app it reads complete and scannable on a phone |
| F7 | **Dashboard** — cards grouped by stage | Lead | Must | Every card file appears under the correct stage heading; counts match the files on disk |
| F8 | **Research content** — 2 purchase cards each | All 4 teammates | Must | Each card has ≥3 sources with credibility tiers, 2–3 finalists, a price table and a one-line pick. No placeholder text left |
| F9 | **Live price fetcher** — open storefront APIs, run on a schedule | Lead | Must | Each card carries ≥2 prices pulled from published keyless endpoints, each stamped with when it was fetched |
| F10 | **robots.txt gate + compliance log** | Co-integrator | Must | The fetcher reads `robots.txt` before each host; a deliberately disallowed host is skipped and logged with the rule that matched; the log is committed and readable |
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
| A4 | Enough independent merchants sell our seed products and expose open product JSON | Lead tests 3 products against real stores before F9 is committed to | **unchecked — highest risk** |
| A5 | GitHub Pages is the host | Lead decides; repo default branch must be fixed first | unchecked |
| A6 | Images and content we use are ours or free to use | Each owner states the source in their PR | unchecked |

## 7. Open questions

| # | Question | Who decides | Answer |
|---|---|---|---|
| Q1 | What is the app called? | Team | _unanswered — needed for the header_ |
| Q2 | Who is teammate 1–4, by name, and which component is theirs? | Team | _unanswered_ |
| Q3 | What is the deadline, and is there an earlier checkpoint? | Instructor | _unanswered_ |
| Q4 | Colours and fonts for `styles.css` — must be settled before components start | Lead | _unanswered_ |
| Q5 | Does the repo default branch move to `main`? | Lead | _unanswered — currently a stray session branch_ |

## 8. Risks

| # | Risk | What we'll do |
|---|---|---|
| R1 | **A4 fails** — too few independent merchants expose usable product JSON for our products | Test 3 products first. If it fails, fall back to prices recorded by hand with their checked-at date, which still satisfies every feature except F9 |
| R2 | Four components look like four different websites | Settle Q4 before anyone starts; every component uses only `styles.css` variables; the lead checks this at review |
| R3 | A teammate goes quiet and their component never arrives | Placeholders stay in place so the page always works. Agree a cut-off date at the start, not at the end |
| R4 | A teammate pastes AI-generated code carrying its own `<script>` or external library | No `<script>` in component files; the lead strips them at review and says what was removed |
| R5 | The page works locally but breaks on GitHub Pages | F11 is checked on a real phone on cellular, not just locally |
| R6 | Nobody can explain the code at grading | One entry per feature in `DEVBOOK.md`; each owner explains their own component and cards |
