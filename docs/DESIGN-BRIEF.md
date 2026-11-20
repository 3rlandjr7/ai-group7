<!-- Written 2026-11-20 so a teammate doing visual design has one page to read instead of
     BRIEF.md + PLAN.md + six decision records. Describes only what Group 7 is building
     (the front end on committed data), not the later full app. -->

# Design brief — "Shortlist"

Read this if you are designing how the site looks. You do not need to read the code.
App name is provisional (see `docs/PLAN.md` Q1).

## 1. What the site is, in one paragraph

**Shortlist** is a purchase research and tracking tool for people buying *considered* things —
appliances, tools, electronics, home goods. Instead of SEO listicles and affiliate blogs, each
thing you are shopping for becomes one **purchase card** that carries its own research: where the
information came from, 2–3 finalists, what makes them different, today's price at each store, and a
plain-text summary you can text to someone.

What we are building now is the **front end only**, running on data committed to the repo: no
accounts, no login, no database, no server. It is a real working app, not a page *about* an app.

## 2. Who looks at it

| Reader | What they are trying to do |
|---|---|
| **Shopper** (the main one) | Open a card, skim the research, compare the finalists, see where it is cheapest, copy a summary to send a spouse or friend |
| **Instructor / grader** | Read the repo, see the process records, hear each of us explain our own piece |
| **Teammate** | Own one component or two cards and be able to defend it |

Used on **phone** (in a store, texting results) and **desktop** (deeper reading). Phone comes
first: 375px wide is the size that has to be right.

## 3. The shape of the site

One page, scrolling, no routing:

1. **Header** — app name, a few links
2. **Dashboard** — every purchase card grouped under its stage heading
3. **A card, opened** — the four components below, stacked
4. **Footer**

A purchase card moves through stages, and the design has to make the current stage obvious at a
glance: *idea → researching → shortlisted → decided → watching → bought → return window → owned →
closed*. Stages can be skipped. Today most of our sample cards sit in *researching*, *shortlisted*
or *decided*.

## 4. The four things to design

These are the four components, one owner each. They are separate files but must look like one
website.

### A. Purchase card tile
The thing you see on the dashboard. One product you are shopping for.
Carries: item name, its stage, budget or price ceiling ("under $50"), the date the research was
done. Has to be readable and tappable at phone width, and the stage has to be visually
distinguishable across all nine stages — nine states, not three.

### B. Comparison table
Rows are the ranked factors that matter for this product type; columns are the products.
Hard limits from the spec: **max 3 products**, roughly **max 5 columns**, and it must **not scroll
sideways at 375px**. One row is always *total cost of ownership*. Where a spec is missing the cell
says **"Not published"** — never blank. Extra detail goes in numbered notes *under* the table, not
in the cells; on a phone, tapping a row to expand is the intended pattern.

### C. Price table + "Is the sale real?"
Rows are stores, **sorted by total cost, cheapest first**. Each row: store, total (price +
shipping), in stock, sold by, returns, and **when the price was checked** (timestamps are
everywhere in this app and need a quiet, consistent treatment).
Then a verdict line: *Real deal / Normal price / Inflated list price*, plus a target price.
Two cases that need real design attention, not an afterthought:
- A finalist we cannot read a price for shows **"price not shown — see at <store> →"** in its own
  row. An empty cell reads as "worse product", which is a lie.
- An "all-time low (reference)" row that is marked *not available now* — it must be visibly
  secondary to the live rows (the spec says italic) so nobody mistakes it for a price they can pay.

Some big retailers (Amazon, Best Buy, Walmart) appear as a **link with no price** on purpose —
republishing their prices breaks their terms. So the table has a legitimate mix of priced and
unpriced rows.

### D. Share box
A block of **plain text** — no tables, no bold, no markdown — that the reader copies and pastes
into Messages. Numbered items, short dash lines, scannable on a phone. The design job is the
container and the copy button, not the text's formatting: the text is deliberately plain so it
survives being pasted anywhere. Format is specified in `docs/BRIEF.md` §6.

Also present on a card, and worth a look: the **source table** (source · type · last updated ·
status) with a credibility badge per source — *most credible / fair / low (anecdotal)*. Trust is
the whole product, so these badges are more important than they look.

## 5. Rules you have to design inside

- **Phone first.** Correct at 375px: no horizontal scroll, nothing clipped. Then 768 and 1280.
- **Use the existing design tokens** in `styles.css` — never a hard-coded colour or font. If you
  need a new token, ask the lead and it gets added there.
- **Accessible.** The palette already passes WCAG AA on every pair; keep it that way. Tables need
  real headers and labels — people use screen readers on these.
- **Tables carry the detail, prose is minimal.** If you find yourself designing paragraphs, the
  content is probably in the wrong place.
- **Honest empty states.** "Not published", "Not shown", "price not shown — see at store" and
  *checked on <date>* are content, not errors. They need styling, not hiding.
- **No images we don't own.** Whoever adds one states its source.

### Current tokens (in `styles.css`)

| Token | Value | Used for |
|---|---|---|
| `--color-bg` | `#fbfaf8` | page, warm off-white |
| `--color-surface` | `#f2efe9` | cards, table rows |
| `--color-text` | `#1b1d1f` | body text |
| `--color-muted` | `#656b72` | timestamps, "checked on" |
| `--color-primary` | `#1f6f5c` | deep green, links and logo |
| `--color-accent` | `#a85a2b` | clay, badges |
| `--color-good` / `--color-warn` / `--color-bad` | `#1f6f5c` / `#8a5a12` / `#a33b32` | the three sale verdicts |
| `--font-body` | system font stack | everything; no web font yet |

`--font-heading` currently inherits the body font and is marked *[pick a heading font]* — that is
an open design question. Spacing, radius and max-width tokens also exist.

## 6. Not in scope — please don't design these

Login or sign-up screens, account settings, notifications, photo and receipt upload, a spending
dashboard, price-history charts, dark mode (nice-to-have, later). They belong to the separate
full-app build. Designing them now is work we throw away.

## 7. What to hand back

Whatever is fastest for you — a Figma frame, a sketch, or an annotated screenshot of the current
page — as long as it shows **375px and desktop** for the component you are designing, and says
which token each colour is. Send it to the lead; it does not go in the repo as a design file.

## 8. Where the detail lives

| Question | File |
|---|---|
| What the app is meant to do, table formats, share-message format | `docs/BRIEF.md` (§1, §4, §5, §6) |
| Which features exist, who owns what, how "done" is judged | `docs/PLAN.md` |
| Why it is built this way | `docs/decisions/` — read 0001 and 0005 |
| What exists in the code today | `DEVBOOK.md` |
