# DEVBOOK

The story of this app: what it does **now**, and **why** it was built that way.
Newest entry at the top. The Docs writer adds one entry per feature or fix
(`agents/docs-writer.md`).

Someone new (or you, three weeks from now) should be able to read this and understand
the app without asking you.

---

## How the app works (keep this section current)

- **What it is:** the front end of a purchase research and tracking app. Each thing you are
  shopping for is a card that moves through stages — idea, researching, shortlisted, decided,
  bought, return window, owned — carrying its sources, a comparison of 2–3 finalists and a price
  table. No backend: everything is committed to the repo.
- **Main parts:** `index.html` (page shell, header/footer, loads each block), `styles.css` (shared
  colours, fonts and spacing), the four section placeholders in `sections/`, and — still to be
  built — the data layer, the four teammate components, and the price fetcher.
- **Data:** one file per purchase card, committed to the repo and validated on load. Live prices
  come from independent Shopify and WooCommerce storefronts, which publish product JSON openly;
  big-box retailers are linked without prices. See `docs/decisions/0003`.
- **How to run / test:** `/preview`, then the Definition of Done checks in `docs/PLAN.md`. Must be
  served over HTTP — opening the file directly shows an empty page.

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

### 2026-11-19: Research design settled, palette and name applied (0005)
- **What changed:** Decided how research survives price changes (decision 0005), applied the
  colour palette to `styles.css` with three verdict colours, named the app **Shortlist**, and
  rewrote `TEAMMATE-GUIDE.md` so the team can start without waiting on the lead.
- **Why:** A card stored a verdict ("Leaf Two wins"). Verdicts are built from prices, prices
  change, so the verdict went quietly wrong while still looking authoritative. Four mechanisms for
  *detecting* that were designed and discarded — a staleness badge, price-movement triggers,
  rank-inversion detection, per-card conditions — each because a simpler framing removed the need
  for the last. The card now stores only what a human decided; the fetcher supplies what changes.
  Rejected: a question tree per category (breaks the card-and-stages concept), an evidence ledger
  with no conclusions (honest but useless), and versioning the prompt to regenerate on demand
  (LLM output varies between runs, so the reproducibility claim undermines itself).
- **Definition of Done and evidence:**
  - [x] **Palette is accessible** — all 9 foreground/background pairs computed against
        `--color-bg`: text 16.21, muted 5.16, primary 5.77, accent 4.84, good 5.77, warn 5.67,
        bad 6.23, text-on-surface 14.73, muted-on-surface 4.69. **All pass WCAG AA (4.5) for
        normal text.**
  - [x] **The page still works after the change** — re-ran the F1 browser check: 0 console
        errors, all 4 placeholders load, no horizontal scroll at 375/768/1280.
  - [x] **Teammates can start without the lead** — `TEAMMATE-GUIDE.md` carries real colours and
        tells the team to split components and products among themselves.
- **Files touched:** styles.css, index.html, README.md, TEAMMATE-GUIDE.md, docs/PLAN.md,
  docs/COURSE-REQUIREMENTS.md, docs/decisions/0005-*.md
- **Not confirmed / known limits:** the name **Shortlist** is provisional. Assumption A7 is
  unchecked — whether teammates can write genuine reader-fact discriminators rather than filler
  will only be known when the first card comes through review. The research design has not been
  tested against a real card yet; it was reviewed in discussion, not in use.
- **Reviewer verdict:** (pending — no fresh-chat Reviewer pass has been run)

### 2026-11-19: Page shell verified and BUG-001 fixed (F1)
- **What changed:** Checked the shipped page shell against F1's Definition of Done in a real
  browser, found one bug, and fixed it. `styles.css` gained
  `html { scroll-padding-top: 6rem; }`.
- **Why:** F1 is the page shell every section depends on, so it has to be proven before anyone
  builds on it. The shell itself came with the team kit, so this was verification rather than
  construction. The bug was fixed with one global rule instead of per-section `scroll-margin-top`,
  because every future anchor target needs the same offset.
- **Definition of Done and evidence:**
  - [x] **No console errors** — headless Chromium against `http://localhost:8000`:
        `console_errors: []`, `page_errors: []`, `failed_requests: []`. All six assets HTTP 200.
  - [x] **All 4 placeholders load** — hero, about, features and contact all found with visible
        text; `include_errors: []`, so no include hit the "Couldn't load" fallback.
  - [~] **Nav links scroll** — all anchors move the viewport, and after the fix `#about` resolves
        to its own position (201). But `#features` and `#contact` both still clamp at 233, which
        is this stub page's maximum scroll — it is only ~1100px tall. `#hero` reports no movement,
        correctly, since the page already starts there. **This check cannot be fully satisfied
        until the sections hold real content.**
  - [x] **Looks right at 375px** — `scrollWidth == clientWidth` at 375, 768 and 1280, so no
        horizontal scroll at any width. Screenshot at 375px shows the header stacking, all four
        placeholders and the footer, nothing clipped.
- **Files touched:** styles.css, BUGLOG.md
- **Not confirmed / known limits:** the nav check above is incomplete until sections have real
  content. Tested in Chromium only. Not yet tested on GitHub Pages. `docs/PLAN.md`,
  `TEAMMATE-GUIDE.md`, `CLAUDE.md` and `README.md` still describe the superseded marketing-page
  plan — decision 0001 supersedes them and the rewrite is the next commit. The "How the app works"
  section at the top of this file is also still the old description.
- **Reviewer verdict:** (pending — no fresh-chat Reviewer pass has been run)

### 2026-11-19: Project set up
- **What changed:** Added the professor's starter kit (AGENTS.md, GUIDE.md, PLAN.md, DEVBOOK.md,
  BUGLOG.md, role prompts) next to our team CLAUDE.md, skills and page shell. Added
  `docs/decisions/` with three decision records, two portable skills (`/decide`, `/new-skill`)
  and `docs/COURSE-REQUIREMENTS.md`.
- **Why:** So every change from here on has a plan, a check and a record. The decision records
  exist because DEVBOOK captures *what* we built and BUGLOG captures what broke, but neither
  holds the options we rejected and why — which is the reasoning that gets lost first.
- **Definition of Done and evidence:**
  - [x] **All files exist in the repo** — `find . -type f -not -path './.git/*' | wc -l` → **37**.
        Every one of the professor's 14 files confirmed present (0 missing, checked against the
        zip). `git status --short` showed 17 lines, all `??`, **no `D` lines** — nothing deleted
        by unpacking the team kit over his.
  - [x] **Claude Code reads the AGENTS.md rules** — `CLAUDE.md` line 1 is `@AGENTS.md`
        (`head -1`), and both files loaded automatically into this session's context, so the
        seven rules are in force rather than merely present.
  - [x] **README points at the process** — `grep` returns
        "Process: start with GUIDE.md; the AI follows AGENTS.md".
  - [x] **The professor's rules survived the team kit's version of AGENTS.md** —
        `grep -c '^[0-9]\. \*\*' AGENTS.md` → **7**.
- **Files touched:** AGENTS.md, CLAUDE.md, GUIDE.md, README.md, DEVBOOK.md, BUGLOG.md,
  SETUP-CHECKLIST.md, TEAMMATE-GUIDE.md, .gitignore, index.html, styles.css, sections/,
  agents/, prompts/, examples/, docs/PLAN.md, docs/COURSE-REQUIREMENTS.md, docs/decisions/,
  .claude/skills/
- **Not confirmed / known limits:** the site topic and team names are still placeholders
  (`[name]`, `[Site name]`). The repo's **default branch is `claude/gifted-archimedes-ybtos9`,
  not `main`** — that should be changed in GitHub settings before Pages or branch protection is
  set up. Committed as `4d518ca`.
- **Reviewer verdict:** (pending — no fresh-chat Reviewer pass has been run)
