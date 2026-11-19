# DEVBOOK

The story of this app: what it does **now**, and **why** it was built that way.
Newest entry at the top. The Docs writer adds one entry per feature or fix
(`agents/docs-writer.md`).

Someone new (or you, three weeks from now) should be able to read this and understand
the app without asking you.

---

## How the app works (keep this section current)

- **What it is:** Group 7's one-page website. _(Add one sentence on the topic and audience.)_
- **Main parts:** `index.html` (page shell, header/footer, loads each section), `styles.css` (shared colors and fonts), `sections/hero.html`, `sections/about.html`, `sections/features.html`, `sections/contact.html`
- **Data:** none. Static content only.
- **How to run / test:** `/preview`, then the manual checks in `docs/PLAN.md`

---

## Entry template (copy for each change)

### YYYY-MM-DD: <feature or fix name> (F#)
- **What changed:** _plain English, 1–3 sentences_
- **Why:** _the decision and the reason; alternatives we rejected_
- **Definition of Done and evidence:**
  - [x] _check 1_: _how it was shown (command, screenshot, number)_
  - [x] _check 2_: _..._
- **Files touched:** _list_
- **Not confirmed / known limits:** _be honest; "none" is allowed only if true_
- **Reviewer verdict:** _Approved / Approved with notes_

---

## Entries

### 2026-11-18: Project set up
- **What changed:** Added the professor's starter kit (AGENTS.md, PLAN.md, DEVBOOK.md, BUGLOG.md, role prompts) next to our team CLAUDE.md and skills.
- **Why:** So every section has a plan, a check and a record before it's merged.
- **Definition of Done and evidence:**
  - [ ] All four files exist in the repo (`ls` shows them)
  - [ ] Claude Code lists the AGENTS.md rules when asked "What rules are you following?"
- **Files touched:** AGENTS.md, CLAUDE.md, docs/PLAN.md, DEVBOOK.md, BUGLOG.md, agents/, prompts/, examples/, GUIDE.md
- **Not confirmed / known limits:** not committed yet; site topic still to be filled in
- **Reviewer verdict:** (pending)
