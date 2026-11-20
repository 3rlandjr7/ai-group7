# 0004 — Each teammate owns a UI component, not just research content

- **Date:** 2026-11-19
- **Status:** **Superseded by [0007](0007-avery-plans-camila-builds.md)** (the component split; the two-cards-each research split survives). The robots-gate ownership below was already **superseded by [0006](0006-fetcher-design.md)**
- **Decided by:** Rene (lead)

## Context

Decision 0001 moved the project from a four-section marketing page to a real app front end. That
quietly changed who does the work.

Counted under 0001 as written, the lead owned `index.html`, `styles.css`, the data layer, the
schema validator, the router, six render modules, the price fetcher, the GitHub Action and the
robots gate. The four non-technical teammates wrote research content and nothing else. **All the
engineering sat on one person**, and the superseded marketing-page plan had actually distributed
better — each teammate built a whole visible section themselves.

That matters beyond fairness. `GUIDE.md` states: *"your grade depends on whether you can explain
and defend the work"* — for all six people. A teammate who only supplied text has little to
demonstrate.

## Options considered

| Option | Verdict | Why |
|---|---|---|
| Research content only, as 0001 had it | Rejected | Simplest to coordinate, but the lead carries all engineering and four people have little to defend |
| Delegate the data layer too — schema and fetcher to teammates | Rejected | Needs real JavaScript. Four of the six do not code, and a broken fetcher breaks every card at once |
| **One UI component each, plus research** | **Accepted** | Four visible deliverables, built with the workflow the kit already teaches, with no shared files |

## Decision

Each non-technical teammate owns one component **and** two purchase cards of research:

| Person | Component |
|---|---|
| Teammate 1 | Purchase card tile, covering the 9 stages |
| Teammate 2 | Comparison table — max 3 products, total-cost-of-ownership row |
| Teammate 3 | Price table + "Is the sale real?" panel |
| Teammate 4 | Share-message box, plain text |

They deliver **static markup with dummy values and no JavaScript**, built in free Claude — exactly
what `TEAMMATE-GUIDE.md` already instructs. The lead converts each into a template that takes real
data. `/add-section` already performs that transformation: strip `<script>`, scope the CSS, swap
hard-coded colours for the `styles.css` variables.

The lead keeps `index.html`, `styles.css`, the data layer and the fetcher. The co-integrator takes
card conversions, the robots gate and PR review.

## Consequences

**Makes easy.** Four people produce something visible they can demo and explain. One file per
owner, so the no-merge-conflict property from `sections/` carries over unchanged. And
`TEAMMATE-GUIDE.md` needs only a modest edit rather than a rewrite, because the hand-off shape is
identical — a self-contained block of HTML and CSS.

**Makes hard.** Four components must share one visual language, so `styles.css` variables have to
be settled and communicated before anyone starts. The lead reviews four hand-offs instead of
zero.

**Gave up.** The lead no longer writes the whole interface, so it will be less uniform than if one
person built it. That is the intended trade.
