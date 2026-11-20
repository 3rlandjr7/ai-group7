# The shared research template

**Template version 1 — 2026-11-20.** Everyone uses this one. Don't write your own.

Eight purchase cards are being written by four people. If each person invents their own prompt,
the cards come back in eight shapes with eight different standards of evidence, and nothing can
be compared with anything. That is the whole reason this file exists
(`docs/decisions/0005`).

## How to use it

1. Open **a new chat** at claude.ai. New, not a chat you've used for something else.
2. Copy **everything inside the grey box below** — all of it, including the rules at the end —
   and paste it in one message.
3. Replace the two `<<…>>` bits at the top with your product and who it's for.
4. Answer Claude's questions. It will ask a few before it starts; that's deliberate.
5. When it's finished, **copy the whole output** and send it to Camila. Not a summary — the whole
   thing, including the "What I could not check" section.

If Claude gives you something you don't understand, ask it *"explain this like I'll have to
defend it"* until you do. You will be asked about your own cards at grading.

---

```
You are helping me research one purchase for a buying-guide site. Follow these steps in this
exact order. Do not skip ahead, and do not reorder them.

PRODUCT: <<what I'm shopping for, e.g. "a safety razor for a beginner">>
BUYER:   <<who it's for and anything that narrows it, e.g. "shaves 3x a week, US, under $120">>

Before you start, ask me up to 3 questions where a wrong guess would cost the most, and list
anything you are assuming. Wait for my answers.

======================================================================
STEP 1 — SOURCES FIRST. Do this before you look at a single shop.
======================================================================

Find at least 3 sources about this product category. Give me a table:

| Source | What kind | Tier | Dated | Link |

- "Tier" must be exactly one of these three words:
    most-credible   CPSC, Health Canada, Consumer Reports, Which?, RTINGS, Wirecutter,
                    Family Handyman, Trusted Reviews
    fair            manufacturer pages, established retailers, spec aggregators
    low             Trustpilot, forums, Reddit — usable, but say which
- NEVER use: eBay, affiliate "tested" pages, SEO listicles, fake storefronts. If a source is one
  of those, leave it out and say you did.
- "Dated" is the date the source itself shows. If it shows none, write exactly: not stated.
  Do not guess a date and do not infer one.
- If no credible outlet has tested this category at all, say so in one line and use manufacturer
  specs plus clearly-labelled owner reviews. Do not promote a retailer page to "most-credible"
  to fill the gap.

======================================================================
STEP 2 — FINALISTS, DRAWN FROM THOSE SOURCES
======================================================================

Pick 2 or 3 finalists. Not 1, not 4.

They must come from the sources in Step 1 — NOT from browsing shops, and NOT from what happens
to be on sale. If a product did not appear in a source above, it is not a finalist.

For each one give me:
- the exact model name
- ONE line on what put it on the shortlist, pointing at which source

======================================================================
STEP 3 — WHERE TO BUY, NO PRICES
======================================================================

For each finalist, list the stores that sell it, with links.

DO NOT RECORD ANY PRICES. Not a number, not a range, not "around $80". The site fetches prices
itself and keeps them current; anything you write here is stale within a day and wrong on the
page. If you catch yourself typing a price, delete it.

Prefer small independent shops running Shopify or WooCommerce where they exist, and include them
alongside the big retailers.

======================================================================
STEP 4 — "CHOOSE X IF…" LINES
======================================================================

Write one line per finalist. Each must be answerable by someone who does NOT already know the
subject — not knowing is exactly why they are reading.

| Works — answerable instantly        | Fails review                        |
|-------------------------------------|-------------------------------------|
| "if you shave more than twice a week" | "if you want milder blade exposure" |
| "if a 30-inch space fits"             | "if you value build quality"        |
| "if you're buying for a teenager"     | "if you prefer premium materials"   |

The left column asks about the READER. The right column asks them to already know the answer.

If the finalists genuinely do not differ in any way a normal person can answer about themselves,
do not invent a distinction. Say so, and give a default instead:
    "if you don't know which, get X."
A forced "if you…" is worse than no discriminator at all.

======================================================================
STEP 5 — WHAT YOU COULD NOT CHECK
======================================================================

List, plainly, every gap:
- listings or sources you did not actually open
- specs that are not published anywhere (write: Not published)
- anything behind a paywall or blocked
- anything you are unsure about

This section is not an admission of failure, it is part of the deliverable. A gap stated is
useful; a gap papered over is a lie the reader can't see.

======================================================================
RULES THAT OVERRIDE ANYTHING ABOVE
======================================================================

1. DO NOT pick an overall winner. No "best", no "top pick", no ranking, no scores, no
   star ratings of your own, no weighted tables. The reader's answer is a "choose X if…" line,
   not a verdict. A verdict goes out of date the moment prices move; the branches don't.
2. NEVER invent anything. No made-up specs, dates, review counts, prices or sources. If a spec
   isn't published, write "Not published". If something isn't listed, write "Not shown".
   A gap is fine. A fabrication is not.
3. No prices anywhere in your answer.
4. Tier and date are read together — a 2019 Consumer Reports piece is not automatically better
   than a careful hands-on from this year. Say when that matters.
5. Plain language. Someone buying their first one of these has to follow it.

======================================================================
OUTPUT FORMAT — give me exactly these headings, in this order
======================================================================

## Title            (one line: what this card is about)
## Researched on    (today's date, YYYY-MM-DD)
## Inputs           (the PRODUCT and BUYER lines above, plus: template version 1)
## Sources          (the Step 1 table)
## Finalists        (name + the one-line why, each with its stores and links)
## Choose X if      (the Step 4 lines, or the default)
## What I could not check   (the Step 5 list)
```

---

## For whoever converts this to JSON

The headings above map one-to-one onto `app/schema.js`, so conversion is mechanical:

| Template heading | Card field | Notes |
|---|---|---|
| Title | `title` | |
| Researched on | `researched_on` | |
| Inputs | `inputs` | Not validated, and not in the FORBIDDEN list, so it stores as-is with no schema change |
| Sources | `sources[]` | `name`, `tier`, `dated`, `url`. Tier slugs match already — the template asks for the exact three the validator accepts |
| Finalists | `finalists[]` | `name`, `why`, `stores[]` (`host`, `url`, and `price_policy: "link-only"` for Amazon, Best Buy, Walmart and Target — decision 0003) |
| Choose X if | `choose_if[]` | `condition` + `pick`; **`pick` must string-match a finalist's `name` exactly** or the card fails |
| What I could not check | `caveats[]` | one string per gap |
| — | `stage` | set by the owner; `researching` or `shortlisted` |
| — | `owner` | the teammate's first name |
| — | `prices` | always `[]`. The fetcher writes this, never a human |

If no source came back `most-credible`, the card also needs `no_credible_testing` — one sentence
saying no credible outlet has tested the category. The validator refuses the card otherwise, on
purpose.

Never write `winner`, `best`, `score`, `weights` or `rank` into a card. `app/schema.js` rejects
the whole file if any of them appear (decision 0005).

`data/cards/dinner-plates.json` is the worked example to copy the shape from. Be aware that it
was built *before* this template existed, store-first rather than sources-first — which is the
exact habit the template is here to prevent.
