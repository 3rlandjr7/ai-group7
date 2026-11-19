# 0005 — Research stores judgment, not verdicts

- **Date:** 2026-11-19
- **Status:** Accepted
- **Decided by:** Rene (lead)

## Context

Decision 0003 automated prices. That left an open question: **does the research itself go stale?**

It does, but unevenly. Prices and stock rot in hours — already handled. Recalls can appear at any
moment. But which products are credible finalists, and what distinguishes them, barely moves:
Henson versus Leaf is not a different question next Tuesday.

The problem turned out narrower than it looked. A card stores a **verdict** — "Leaf Two wins." The
verdict is built from prices; prices change; so the verdict silently becomes wrong while still
looking authoritative. Everything else in the card stays true.

Four mechanisms for *detecting* that were designed and discarded in turn, each because a simpler
framing removed the need for the last:

1. A 90-day staleness badge — arbitrary. Elapsed time is not evidence. A card can be wrong the day
   after it is written, and right two years later.
2. Triggers on price movement — noisy. A 15% move on a $29 item is a normal sale cycle.
3. Rank-inversion detection — assumes price decided the pick. If the pick won on mildness, a rival
   dropping $5 does not make it wrong.
4. Per-card `holds_while` conditions — would have made teammates author JSON, which decision 0004
   exists to prevent.

## Options considered

| Option | Verdict | Why |
|---|---|---|
| Store the verdict, detect staleness | Rejected | Every detection mechanism was arbitrary, noisy, or pushed authoring onto the four people least able to do it |
| **B — question tree per category** rather than a card per product | Rejected | Genuinely attractive: a category's decision structure outlives any product, and writing discriminating questions is good non-technical work. But it breaks the purchase-card-and-stages concept the brief is built on, and costs materially more UI |
| **C — evidence ledger**: only verified facts, no conclusions | Rejected | Maximally honest and useless. "Here are 40 facts" is what the reader was avoiding by not reading SEO listicles. Honesty alone is not the product |
| **D — reproducible method**: version the prompt, regenerate on demand | Rejected as the primary model | Strongest grading story, but LLM output varies between runs, so "reproducible" is approximate and the claim undermines itself. It also puts conclusions on the AI, which `GUIDE.md` warns against: *"the AI is a fast, junior developer who is confidently wrong sometimes"* |
| **A — store judgment, compute nothing** | **Accepted** | Removes the stale part instead of detecting it |

## Decision

**The card stores what a human decided. The fetcher stores what changes. Neither does the other's job.**

| The human supplies | The machine supplies |
|---|---|
| Which 2–3 products are credible finalists | today's price at each watched store |
| Sources, with credibility tier **and** date | in stock or not |
| The `choose X if…` branches | is the sale real |
| Fit caveats (*"if a 30-inch spot fits"*) | advisory recall matches |
| The date the research was done | *"price not shown"* for unreadable finalists |

There is no stored verdict, so there is nothing to go stale. "Leaf Two wins" was never the
research. The research was *"these three are credible, and here is what distinguishes them."*
That stays true.

### Rules that follow

1. **No weights, no scores.** Assigning "price 0.5, mildness 0.3" invents numbers nobody thinks in
   and manufactures one figure from things that are not comparable. The brief's §6 format —
   *"Choose X if… / Choose Y if…"* — is a decision rule keyed to the reader's situation, and is
   used instead.
2. **The machine never writes a recommendation.** It fills numbers into the human's sentences. A
   computed pick could assert something no person endorsed and nobody can defend at grading.
3. **Degrade to last known good.** If a fetch fails, show the previous number with its timestamp.
   *"$79, checked 3 days ago"* beats an empty cell.

### Discriminators must key on reader facts

Every `choose X if…` branch must be answerable from something the reader knows about **themselves**,
not from product expertise they lack. Not knowing "mild versus adjustable" is *why* someone is
researching, so a branch phrased that way is unanswerable by exactly the reader who needs it.

| Works — answerable instantly | Fails review |
|---|---|
| "if you shave more than twice a week" | "if you want milder blade exposure" |
| "if a 30-inch space fits" | "if you value build quality" |
| "if you're buying for a teenager" | "if you prefer premium materials" |

Where a category genuinely has no reader-fact discriminator — two OBD2 scanners differing only on
protocol support — the card states a **default**: *"if you don't know which, get X."* Forcing a
contorted "if you…" would produce a fake discriminator, which is worse than none.

### Avoiding availability bias — the structural fix

The fetcher reads only Shopify and WooCommerce merchants; big-box is link-only (0003). So a
comparison showing two prices and one blank makes the unreadable product lose **on data
availability, not merit** — the same failure §3 warns about for affiliate links:
*"rankings must never depend on affiliate status."*

A promise to "pick finalists before looking at prices" is unenforceable; recording that someone did
it proves nothing. The brief already solves it structurally: §A specifies *"Source table **first**,
then shortlist of 3–4."* Finalists come from Consumer Reports, RTINGS and Wirecutter — **not from
browsing stores** — so the candidate set is fixed before any price is known, and the bias cannot
enter. The research template enforces that order.

A finalist with no fetchable price renders as *"price not shown — see at Amazon →"* in its own row,
never a blank cell. An invisible gap reads as "worse option."

### Borrowed from the rejected options

- **From D:** **one shared research prompt template** is committed, with each card recording its
  inputs. Not one prompt per card — eight prompts would mean eight inconsistent research qualities
  and nothing comparable between them. This gets most of the reproducibility story honestly,
  without claiming determinism the model cannot provide.
- **From B:** the discriminator rule above. B's real value was asking things people can actually
  answer; that is absorbed without B's UI cost or its conflict with the card-and-stages concept.

### Dates kept

Removing the staleness badges over-pruned two fields. They stay for honesty, with nothing acting on
them: **when the research was done**, shown to the reader; and **each source's date**, which §5's
source table already specifies as "Last updated". Tier and recency must be read together, or a 2019
Consumer Reports piece outranks a careful 2026 hands-on. Sites re-date pages for SEO, so it is
recorded as *"date as stated by the source"*, and *"not stated"* is allowed.

## Consequences

**Makes easy.** Staleness largely stops existing rather than being monitored, and all the detection
machinery is deleted before being built. Teammates author no JSON and no conditions. The card data
shape is now settled, which is what F2 needs.

**Makes hard.** The reader must choose a branch rather than being handed one answer. That is
honest, and it is what happens anyway — no machine knows whether someone wants a mild razor.
Researchers must also write genuinely discriminating conditions, which is harder than writing
filler and will need enforcing at review.

**Gave up.** Any claim to a single objective "best" pick. The page will never say "this is the one"
without a condition attached.

**Residual limits, named rather than solved:**

- Nothing verifies the research was any good. A lazy card and a careful one look identical in the
  data. That is what the Reviewer role and the credibility tiers are for — a process answer, not a
  design one.
- The candidate set can still go stale: a finalist is discontinued, or a better model launches.
  Delisting catches half of it; the rest needs a human once or twice a year.
- Recall matching is fuzzy, because CPSC records rarely carry a usable product code. Matches are
  shown as *"possible recall — check this"* with a link, never asserted. A false positive that
  scares someone off a safe product is as bad as a miss.
