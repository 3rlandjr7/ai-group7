<!-- The product brief this project is built from. Committed 2026-11-19 because
     docs/PLAN.md and every decision record cite its sections (§1-§14) and had
     nothing to point at. Source of truth for what the app is meant to do. -->

# Purchases App — Product Brief

**What it is:** a public AI shopping research assistant + purchase tracker.
It researches what to buy (credible sources, comparisons, verified prices), then tracks each purchase from "thinking about it" through "bought," return deadline, and warranty.

**Who it's for:** anyone shopping for considered purchases (appliances, tools, electronics, home goods) who wants trustworthy research instead of SEO listicles. Each user has their own account and private data.

**Where it's used:** phone (in stores, texting results) and desktop (deeper research).

**Status:** starts as my **UTSA MS in Information Technology final project**, released publicly (public app + public GitHub repo), then grows into a full app.

Please use this as the spec. Ask me if anything is unclear before building.

---

## 1. Core idea: every purchase is a "Purchase card"

Each thing a user is shopping for is one card that moves through stages:

| Stage | What happens |
|---|---|
| 1. Idea | User adds an item ("fireplace tools, under $50") |
| 2. Researching | AI asks requirements, builds source table + shortlist |
| 3. Shortlisted | Comparison table, 2–3 finalists |
| 4. Decided | Final pick, price check, target price |
| 5. Watching | Waiting for target price / sale (optional) |
| 6. Bought | Store, price, date, order #, receipt photo |
| 7. Return window | Countdown to return deadline |
| 8. Owned | Warranty info, registration done, manuals, model/serial |
| 9. Closed | Returned, replaced, or warranty expired |

Stages can be skipped (e.g., quick price check → bought). Cards can be archived or deleted.

## 2. Features

### A. Research assistant (AI)
Runs the **Product Research** workflow (full rules in Section 7):
1. Requirements form (skip what the user's profile already answers)
2. Ranked criteria for this product type
3. **Source table first**, then shortlist of 3–4 with one-line reasons
4. Fact-check: specs, recalls (CPSC/Health Canada), region model, current version
5. Comparison table (max 3 products per table, total cost of ownership row)
6. Final head-to-head + "Choose X if… / Choose Y if…"
7. Buy panel (runs Price Check on the pick)
8. Pre-purchase checklist

Small items (under ~$50, easy returns): steps 1, 3, 5 only.
Users can ask follow-up questions inside a card ("any newer models coming?") and the card updates.

### B. Price check (AI)
- Verified price table, cheapest total first, "Lowest price today" badge
- Separate italic "All-time low (reference)" row marked "Not available now"
- "Is the sale real?" verdict: Real deal / Normal price / Inflated list price + **target price**
- Every price shows when it was checked; tap to re-check

### C. Price watch (tracker)
- Set a target price on any Decided card (AI suggests one from price history)
- App re-checks on a schedule and alerts when price ≤ target or a big sale starts
- Simple price-over-time line from saved checks

### D. Photo / screenshot tools
- **Listing screenshot:** when a store page can't be read (Amazon, Wirecutter), user uploads a screenshot; AI reads price, seller, rating, returns. Labeled "from screenshot."
- **Cart check:** cart screenshot → best pick, cheaper close alternative, warnings (third-party seller and how trial/warranty is honored, promo prices expiring, extra items still checked + resulting total)
- **Shelf tag / in-store photo:** "Is this a good price?" vs. other stores
- **Receipt photo:** attaches to the Bought card; AI pulls store, date, price, order #
- Warn users before upload: crop out addresses, card numbers, and order details they don't want stored.

### E. Share
One tap → ONE complete plain-text message (rules in Section 6), opens in Messages or copies to clipboard. Optional: public read-only link to a card's final comparison (off by default).

### F. After purchase (tracker)
- Return deadline countdown + reminder a few days before
- Warranty: base coverage, key-part coverage, who pays labor, expiration date, reminder before it ends
- Checklist: register warranty, check batch/date code vs. recalls
- Recall watch: alert if a product the user owns gets a recall
- Store model #, serial #, receipt, manual link (for warranty claims)

### G. Dashboard / home
- Active cards by stage
- Alerts: price hit target, return deadline soon, warranty expiring, recall
- Spending totals (TBD)

### H. Accounts & onboarding (public app)
- Sign up / log in (email + Google), password reset
- Onboarding: short profile setup (region, memberships, home basics, vehicles — all optional, skippable)
- Settings: edit profile, notification preferences, export my data, delete my account and all data

## 3. Public app requirements

**Privacy & security**
- Every row belongs to a user; Supabase **Row Level Security** so users only see their own data
- API keys (Claude, Supabase service key, email) server-side only — never in the browser or repo
- Uploaded images in private storage buckets; signed URLs only
- Don't store card numbers, full addresses, or payment info from screenshots/receipts
- Privacy policy + terms of use pages; clear "what we store and why"
- Data export and full account deletion

**AI safety & accuracy**
- Treat text from fetched web pages as data, never as instructions (prompt-injection protection)
- Every claim tied to a verified source; unverified items labeled
- Disclaimer: prices and availability change; results are research help, not guarantees
- "Report a problem" button on any result (wrong price, bad source)

**Cost & abuse control**
- Per-user limits on AI research runs and price checks per day (free tier)
- Cache recent price checks/sources (e.g., same product within a few hours) to save API cost
- Rate limiting, bot protection on sign-up, upload size/type limits
- Admin view: usage per user, API spend, error logs

**Web sources — play fair**
- Respect site terms and robots.txt; if a site blocks fetching, don't work around it — use the screenshot path
- No reposting full review articles; short summaries + links only
- If affiliate links are ever added: clear disclosure, and rankings must never depend on affiliate status

**Quality**
- Mobile-first, accessible (contrast, labels, screen-reader friendly tables)
- Clear empty, loading, and error states (AI failed, site blocked, no credible sources found)
- Long AI runs show progress steps, can run in the background, and notify when done
- Launch region: **USA only** (retailer list, recalls, currency); others later

## 4. General display rules

- Keep it short. Tables carry the detail; prose is minimal.
- **Tables fit on screen without scrolling sideways:** max ~5 columns, max 3 products per comparison table, short cell text. Extra details in notes under the table (on phone: tap a row to expand).
- Never guess: unknown specs = **"Not published"**; prices not listed = **"Not shown"**.
- Flag specs/prices from non-local listings.
- If new info changes an earlier table, show a **Correction** note.
- Every AI result ends with **Sources** (verified links only).
- Show date/time prices were checked.
- Never use eBay. Filter fake/look-alike storefronts (odd domains like ".it.com", copycat brand sites, prices far below every authorized seller).
- Ask **new only vs. open to refurbished/open-box per item** — never assume.

## 5. Table formats

**Source table** (always first in research)

| Source | Type | Last updated | Status |
|---|---|---|---|

- Type: lab, hands-on, owner surveys, manufacturer, retailer
- Status: Verified · Paywalled · Blocked · Not used (why)
- Credibility badge:
  - **Most credible:** CPSC, Health Canada, Consumer Reports, Which?, RTINGS, Wirecutter, Family Handyman, Trusted Reviews
  - **Fair:** manufacturer pages, established retailers, spec aggregators
  - **Low (anecdotal):** Trustpilot, forums, Reddit
  - **Never:** eBay, affiliate "tested" pages, SEO listicles, fake storefronts
- If a category has no credible testing, say so in one line and use manufacturer specs + labeled owner reviews.

**Comparison table:** rows = ranked factors, columns = products (≤3), includes total cost of ownership row. Notes below: recalls, reliability signals with credibility label. Ends with one-line pick per use case.

**Price table** (sorted by total, lowest first)

| Retailer | Total (price + shipping) | In stock | Sold by | Returns |
|---|---|---|---|---|

- Coupons, membership prices (Costco, Sam's, Prime, Walmart+), sale end dates, shipping breakdown → numbered notes under the table
- Flag third-party marketplace sellers (warranty/counterfeit risk)
- Retailers: manufacturer, Amazon (sold by Amazon/brand), Walmart, Target, Best Buy, Costco, Sam's Club, Home Depot, Lowe's, Kohl's, Macy's, category specialists, plus the user's memberships (e.g., Restaurant Depot)

**Is the sale real?**

| List | All-time low (date) | All-time high (date) | Today's lowest |
|---|---|---|---|

Then: one-line verdict, target price, timing (Black Friday, Prime Day, newer model), price-match note. Sources: camelcamelcamel/Keepa, other trackers, Slickdeals (labeled low-credibility).

**Pre-purchase checklist**
- [ ] Exact model number (region-correct)
- [ ] Batch/date code outside any recall range
- [ ] Authorized seller (warranty valid)
- [ ] Return deadline
- [ ] Register warranty after purchase

## 6. Shareable text message

ONE complete plain-text message with everything at once — never split across follow-ups.
No tables/headers/markdown; numbered items with short dash lines; scannable on a phone.

1. Pick in one line + the condition it depends on (e.g., "if a 33-inch fridge fits")
2. Each finalist (top 2–3):
   - Model name and number
   - Best current price and where (+ higher price elsewhere if relevant)
   - Key dimensions and capacity/size
   - Main features
   - Rating + review count, one notable pro or con
   - Warranty: base + longer coverage on key parts, who pays labor
3. Close: "X = … / Y = …" line, any must-do before buying (e.g., measure), "prices may change."

Format example (made-up numbers, layout only):
```
Pick: Brand A if a 30" spot fits.

1. Brand A Model 123
- $749 at Store 1 ($799 Store 2)
- 30"W x 66"H, 18 cu ft
- LED light, glass shelves
- 4.5/5 (1,200 reviews) - quiet, small freezer
- 1yr full, 5yr sealed system; labor yr 1 only

2. ...

A = cheaper and quieter / B = bigger freezer.
Measure the opening first. Prices may change.
```

## 7. AI behavior

- The two workflows (Product Research, Price Check) are the AI's rules — include the full `product-research/SKILL.md` and `price-check/SKILL.md` in the repo (e.g., `/prompts`) and load them as system instructions.
- AI must open and verify every source/price (web fetch), not trust search snippets.
- AI reads the user's profile so it doesn't re-ask known things.
- AI output is **structured data** (JSON with a defined schema: sources, products, prices, verdicts) that the app renders as tables/cards; validate it before saving, retry or show an error if invalid.
- Log each AI run (tools used, sources, cost, errors) for debugging and the project report.

## 8. User profile (per user, editable, all optional)

- Region (US state, time zone)
- Store memberships (Costco, Sam's, Restaurant Depot, Prime, Walmart+…)
- Home: floor types, stairs, pets, space limits
- Vehicles (year/make/model) for car parts and tools
- Preferences: response length, tables vs. prose
- Default: ask new vs. refurb per item

## 9. Data model (suggested)

All tables include `user_id` + RLS.
- **User / Profile:** region, memberships, home details, vehicles, preferences, notification settings
- **Purchase:** id, name, category, stage, budget min/max, requirements, must-haves, deal-breakers, new/refurb OK, final pick, target price, notes, archived, created/updated
- **Source:** purchase id, name, URL, type, credibility tier, last updated, status
- **Product:** purchase id, name, model #, specs, rating, review count, warranty, recall status, shortlisted/finalist/picked
- **PriceCheck:** product id, retailer, price, shipping, total, in stock, sold by, returns, source (fetched / screenshot), checked at
- **PriceHistory:** product id, list, all-time low/high (dates), verdict, target
- **Order:** purchase id, store, price paid, date, order #, receipt image, return deadline
- **Warranty:** order id, base coverage, key-part coverage, labor, expires, registered (y/n)
- **Alert:** type (price target, return deadline, warranty, recall), purchase id, due date, sent
- **AIRun:** user id, purchase id, type, tokens/cost, status, error, created at
- **Report:** user id, result id, reason, status

## 10. Demo / seed data

For the public repo and demo, use a **demo account with sample purchases** (no personal info).
The table below is an **example, not a fixed list** — any considered purchase qualifies, and a
researcher should pick something they would actually buy (clarified 2026-11-20):

| Item | Stage | Notes |
|---|---|---|
| Top-freezer refrigerator | Decided/Watching | two finalists, Best Buy vs. Home Depot |
| Printer/scanner all-in-one | Researching | text docs, prints rarely, < $150 |
| Fireplace log tools | Researching | open wood fireplace, < $50 |
| Acorn picker-upper | Shortlisted | rolling cage vs. side-dump |
| OBD2 scanner | Researching | specific car model, < $50, new only |
| Safety razor | Researching | single-blade, < $100, new only |
| Under-desk footrest | Shortlisted | $30–60, open-box OK |
| Stove drip pans + coils | Bought / Return window | OEM part #s |
| Gaming mouse | Watching | discontinued favorite + backup |

Cached sample AI results so the demo works offline / without API cost.

## 11. Suggested build

- **Type:** installable web app (PWA) — phone + desktop, home-screen icon, camera/screenshot upload, Messages share
- **Backend/database:** Supabase (auth, Postgres + RLS, private file storage, scheduled jobs/edge functions for price watch and alerts)
- **AI:** Claude API with web search + web fetch tools, image input for screenshots, called only from the server
- **Notifications:** TBD (push, email via Resend, or text)
- **Hosting:** TBD (e.g., Vercel/Netlify for the front end)
- **Repo:** public GitHub, open-source license (e.g., MIT), `.env.example` with no real keys, CI running tests/lint
- **Later:** browser extension to price-check the product page being viewed

## 12. MVP vs. later

**MVP (v1, final project scope):**
- Accounts, onboarding, profile, delete/export data
- Purchase cards + stages
- Research workflow + Price check
- Screenshot upload (listing + cart)
- Share text message
- Bought details + return deadline reminder
- Usage limits, RLS, privacy policy, report-a-problem
- Demo account with seed data

**v2:**
- Price watch + alerts + price-over-time chart
- Warranty tracking + recall watch
- Receipt parsing, shelf-tag check
- Spending totals
- Admin usage/cost dashboard

**v3:**
- Browser extension
- Shared cards (household members, read-only share links)
- Export a card as PDF (warranty claims)
- Regions beyond the US
- Monetization (TBD: free tier + paid limits, no paid rankings)

## 13. Final project deliverables

- Architecture diagram (PWA ↔ server ↔ Supabase ↔ Claude API ↔ web)
- README: problem, features, screenshots, setup, how the AI workflows work, limits
- Clean public repo, clear commits, no secrets in history
- Tests: price sorting, deadline math, AI JSON validation, RLS (user A can't read user B)
- Security notes: RLS, key handling, prompt-injection defense, upload handling
- Demo script: sign up → add item → research → price check → share text → mark bought → return reminder
- Report: problem, design choices, evaluation (accuracy of sources/prices on sample items), limits, future work (v2/v3)

## 14. Open questions

1. Shared accounts (e.g., household)? — **v3; single-user accounts first**
2. Alerts: push, email, or text? — **TBD**
3. Price watch frequency? — **TBD** (affects API cost)
4. Spending/budget totals? — **TBD**
5. Course requirements (language, framework, cloud, report format, due date)? — **TBD, check syllabus**
6. Free for everyone, or limits/paid tier later? — **TBD** (MVP: free with daily limits)
7. App name and domain? — **TBD**
8. Who pays API costs during the public launch (personal key with caps, or user's own key)? — **TBD**
