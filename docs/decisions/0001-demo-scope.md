# 0001 — Build the real app on fake data, not a marketing page

- **Date:** 2026-11-19
- **Status:** Accepted
- **Decided by:** Rene (lead)

## Context

Two projects were being planned separately and collided:

- **Group 7's graded deliverable** — six people, four of whom do not write code, working through
  the professor's process kit (plan first, Definition of Done, four review roles, DEVBOOK/BUGLOG,
  one feature per commit).
- **The Purchases App** — Rene's solo UTSA MS IT final project. A public PWA with Supabase auth and
  Row Level Security, server-side Claude API calls, ten-plus database tables, scheduled price
  watching.

Earlier planning had assumed the group deliverable was a static four-section marketing page. That
assumption came from our own earlier planning session, **not from the professor**. His `GUIDE.md`
says the kit "works with any AI tool" and his `AGENTS.md` fills its example Project section with
Python, Streamlit and SQLite. The team kit's own `docs/PLAN.md` had already flagged it as unchecked
assumption A2: *"Plain HTML/CSS is acceptable for the assignment — check the assignment brief."*

Rene confirmed on 2026-11-19 that the assignment scope is **open-ended**. The professor constrains
the *process*, not the stack or the subject. So the constraint we had been designing around did not
exist.

## Options considered

| Option | Verdict | Why |
|---|---|---|
| Static landing page about the app | Rejected | Contains no working software. Four teammates write copy and learn nothing about the product |
| Group builds the full Supabase app | Rejected | Four non-technical teammates cannot contribute to RLS policies or edge functions. Rene would carry ~90% of it, and `GUIDE.md` is explicit that *"your grade depends on whether you can explain and defend the work"* — for all six |
| **Real app front end and data model, running on committed data** | **Accepted** | Working software, every teammate contributes defensible work, and nothing is thrown away |

## Decision

Build the Purchases App's real front end and data model — purchase cards, stages, source tables,
comparison tables, the share-as-text message — running on data committed to the repo. No Supabase,
no auth, no server, no API spend. Hosted on GitHub Pages.

The app itself remains a separate, later project.

## Consequences

**Makes easy.** The product brief already asked for this. §10 specifies *"cached sample AI results
so the demo works offline / without API cost"* — so we are building a piece of the MS project first,
for free, with six people instead of one. The four non-technical teammates do product research,
which is the actual skilled work here, and each can defend their own contribution at grading.

**Makes hard.** More lead work than a marketing page. The app layer (`app/store.js`,
`app/render/*`, `data/cards/`) does not exist in either kit and is new code.

**Gave up.** No accounts, no logins, no live AI calls from the page, no receipt upload, no
notifications. All deferred to the MS project, where a server exists.
