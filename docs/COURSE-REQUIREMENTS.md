# Course requirements — index and checklist

What the professor requires, and where to look it up. **This file is an index, not a copy.**
`AGENTS.md` and `GUIDE.md` are the authoritative text; duplicating them here would let the two
drift apart. Every line below cites its source so it can be re-read rather than trusted from memory.

> Those two files arrive with the starter kit. If they are not in the repo root yet, the kit has not
> been unpacked.

---

## What he requires

**The seven working rules** — `AGENTS.md`, "The Rules":

1. Ask before you assume; label guesses as *"Assumption: …"*; give trade-offs even when you have a
   favourite.
2. Smallest change that works. No extra features "for later."
3. Stay in your lane — only touch the files the change needs.
4. **Define "done" first**, as checks that can actually be run or seen.
5. Stop if we drift from what was agreed.
6. Explain the code — every function says *why* it exists.
7. **Prove it, don't claim it.** Only say something works if you ran it. Never invent test results,
   file contents or library functions.

**Four separate roles per change** — `AGENTS.md`, "Every change goes through four roles":
Author → Tester (**fresh chat**) → Docs writer → Reviewer/Judge (**fresh chat**). The prompts are in
`agents/`. The point of a fresh chat is that whoever wrote the code defends it; someone new looks
for problems.

**Records** — `AGENTS.md`, "Records we keep":
- `DEVBOOK.md` — an entry after every feature: what, why, Definition of Done with evidence, files
  touched, what was *not* confirmed, reviewer verdict.
- `BUGLOG.md` — every bug: what broke, why, the fix, and how the fix was proved.
- Commits — **one feature or fix per commit**, message saying what changed and how it was verified.

**Never** — `AGENTS.md`, "Never": no secrets or `.env` in commits; never delete files without
showing what will go and asking; never say "all tests pass" unless they were just run and did.

---

## What to hand in

From `GUIDE.md`, "What to hand in":

- [ ] The repo, with a commit history of **one feature per commit**
- [ ] `docs/PLAN.md` with the assumptions and open questions **resolved**
- [ ] `DEVBOOK.md` with an entry for **every** feature
- [ ] `BUGLOG.md` with **every** bug found — *finding bugs is good; hiding them isn't*
- [ ] A short reflection: **one place where the AI was wrong, and how your process caught it**

> The reflection is already half-written: `docs/decisions/0003` records a case where research
> overturned Claude's own recommendation before any code existed.

---

## What he does NOT constrain

**Confirmed by Rene, 2026-11-19:** the assignment is **open-ended**. The professor constrains the
*process*, not the deliverable.

- **Stack** — not specified. `GUIDE.md` says the kit *"works with any AI tool"*, and the example
  Project section in `AGENTS.md` is filled with Python, Streamlit and SQLite — not a web page.
- **Subject** — not specified.
- **Hosting** — not specified.

This is written down because the assumption was wrong **twice** during planning. The starter kit's
`docs/PLAN.md` had flagged it correctly as unchecked assumption A2 (*"Plain HTML/CSS is acceptable
for the assignment — check the assignment brief"*) and it was treated as settled anyway. Do not
re-derive it; if it needs revisiting, ask the professor and update this line with the date.

---

## When to write what

| What happened | Where it goes |
|---|---|
| An option was considered and **rejected** | new `docs/decisions/NNNN-*.md` (run `/decide`) |
| Features, Definition of Done or scope changed | edit `docs/PLAN.md` |
| An assumption was confirmed or disproved | update its row in `docs/PLAN.md` §6 |
| A feature shipped | `DEVBOOK.md` entry |
| Something broke | `BUGLOG.md` entry |

**Nothing gets written** for renames, formatting, copy tweaks, or any change where you cannot name
what the entry would say.

---

## Decisions log

| # | Decision | Date |
|---|---|---|
| [0001](decisions/0001-demo-scope.md) | Build the real app on committed data, not a marketing page | 2026-11-19 |
| [0002](decisions/0002-fake-data-seam.md) | Interfaces at the data and AI boundaries | 2026-11-19 |
| [0003](decisions/0003-independent-merchant-price-data.md) | Live prices from independent merchants | 2026-11-19 |
| [0004](decisions/0004-teammate-owns-a-component.md) | Each teammate owns a UI component, not just research | 2026-11-19 |
| [0005](decisions/0005-research-stores-judgment-not-verdicts.md) | Research stores judgment, not verdicts | 2026-11-19 |

**Assumptions resolved:** A2 — plain HTML/CSS is *acceptable but not required* (2026-11-19).

**Still open:** see `docs/PLAN.md` §7 — who owns which component, which products each person
researches, and the stack choice (currently plain HTML/CSS/JS, assumed not confirmed).

**Closed since:** the `main` branch question (default branch moved, stray branch deleted), which
`docs/PLAN.md` survives (rewritten for the app), app name (**Shortlist**, provisional) and the
colour palette (applied, WCAG AA checked).
