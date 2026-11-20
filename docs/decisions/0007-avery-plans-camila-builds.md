# 0007 — Avery plans the build, Camila implements it; teammates contribute research only

- **Date:** 2026-11-20
- **Status:** Accepted
- **Supersedes:** [0004](0004-teammate-owns-a-component.md)
- **Decided by:** Rene (lead), at the kickoff

## Context

Decision 0004 gave each of the four non-technical teammates one UI component — card tile,
comparison table, price table, share box — prototyped in free Claude and converted by the
co-integrator. It was written before anyone had tried it.

At the kickoff the team went a different way. **Avery is planning the webpage build, and Camila
implements it in Claude Code.** That is one person designing a whole interface and one person
building it, rather than four people each producing a block that somebody then has to make fit.

Nothing about the research half changed, and the four-component split is the only thing 0004 got
overtaken on.

## Options considered

| Option | Verdict | Why |
|---|---|---|
| Keep 0004 — four people prototype components in free Claude | Rejected | Four artifacts in four house styles, four conversions, and four review passes. R2 in `docs/PLAN.md` — *"four components look like four different websites"* — was always this option's weak point, and it is paid in full before anyone sees whether the page hangs together |
| Keep the four component files, but have Camila build all four from Avery's plan | Rejected | Keeps the file split without the ownership that justified it. The split existed so four people could each own a file; with one builder it is overhead and nothing else |
| **Avery plans the build; Camila implements it in Claude Code** | **Accepted** | One coherent design, built by the one teammate with Claude Code. Avery has something real to defend — the plan — and Camila has the implementation |

## Decision

- **Avery** plans the webpage build. **Camila** implements it in Claude Code, through PRs as before.
- The four named components are **no longer separate owned deliverables**. Whether the page still
  splits into files along those lines is Avery's plan's business, not a constraint from here.
- **Bryce, Avery, Robert and Raul each still write two purchase cards** — eight in total, which is
  unchanged from 0004 and is now the whole of F8.
- Rene keeps `index.html`, `styles.css`, the data layer and the price fetcher. Camila keeps card
  conversions and PR review, and the robots gate per [0006](0006-fetcher-design.md).

## Consequences

**Makes easy.** One visual language by construction rather than by review — R2 stops being a risk
and becomes a non-event. Three fewer hand-offs to convert. Teammates who do not code are asked
only for work that does not need code, which is a more honest division than asking them to
produce markup through a chat window and calling it their component.

**Makes hard.** The build is now two people deep. If Avery's plan is late, nothing downstream
starts, where four independent components could at least proceed in parallel. Camila is a single
point of failure for the whole interface, which four owners were not.

**Gave up — and this is the real cost.** 0004's strongest argument was not fairness, it was
`GUIDE.md`'s *"your grade depends on whether you can explain and defend the work"*, for all six
people. A component each meant four people with visible code of their own to demo. That is gone.
What Bryce, Robert and Raul now have to defend is **their research cards** — the sources they
chose, the finalists those sources produced, and the `choose X if…` branches they wrote. That is
defensible work, but it is defensible only if the cards are genuinely theirs and genuinely good.
It raises the stakes on F8b, the shared research template, which is what keeps eight cards from
being eight different qualities.

**Unaffected.** Decisions [0001](0001-demo-scope.md), [0002](0002-fake-data-seam.md),
[0003](0003-independent-merchant-price-data.md),
[0005](0005-research-stores-judgment-not-verdicts.md) and [0006](0006-fetcher-design.md) all
stand. One card, one owner is untouched.
