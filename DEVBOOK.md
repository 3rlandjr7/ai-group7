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

### 2026-11-20: Live price fetcher and robots gate (F9, F10)
- **What changed:** `tools/fetch_prices.py` reads each card's store URLs and writes current prices
  to `data/prices/<slug>.json`, gated on `robots.txt`. `.github/workflows/prices.yml` runs it
  daily. `app/store.js` gained `getPrices()`. Decision 0006 records the design.
- **Why:** Decision 0005 split the card (what a human decided) from the prices (what changes).
  This is the second half. Prices live in their own files so the machine never edits files
  teammates are working on — which also makes the workflow's rebase-and-retry safe, since humans
  never touch price files.
- **Definition of Done and evidence:**
  - [x] **Real prices from real stores** — `leafshave.com 79.00 USD (was 109.00)`,
        `hensonshaving.com 105.00 USD (was 150.96)`, each the cheapest **available** variant.
  - [x] **The robots gate fails closed** — pointed at a host whose `robots.txt` is unreachable:
        `skipped-by-robots … robots.txt unreadable (URLError) - failing closed`, no fetch
        attempted. This was the exact defect found during the A4 test, now fixed and proven.
  - [x] **A failure keeps the last good price with its ORIGINAL date** — broke a URL on purpose:
        status `not-found`, price still `79.0 USD`, `price_checked_at` still `03:13:16` while
        `checked_at` moved to `03:13:32`. Claiming we checked today would have been a lie.
  - [x] **A single 404 does not mean discontinued** — ran three times: strikes 1 and 2 stayed
        quiet, `delisted` fired only on strike 3. Stores rename slugs.
  - [x] **F1 and F2 did not regress** — re-ran both: 0 console errors, 4 placeholders, no
        horizontal scroll at 375/768/1280, card still loads and validates.
- **Files touched:** tools/fetch_prices.py, .github/workflows/prices.yml, app/store.js,
  data/compliance-log.json, docs/decisions/0006, docs/decisions/0004 (superseded pointer),
  docs/PLAN.md, docs/COURSE-REQUIREMENTS.md, SETUP-CHECKLIST.md
- **Not confirmed / known limits:** **Five correctness bugs were found by running against real
  stores that four rounds of design review missed** — `variants[0]` would have reported a razor at
  $139 instead of $79; prices are strings that sort wrongly; `/products/<handle>.json` omits
  `available` entirely so an in-stock razor read as out-of-stock; `compare_at_price` is sometimes
  equal to the price, which would invent a fake discount; out-of-stock items are in the feed. All
  fixed, all recorded in 0006. I also **wrongly claimed Henson's prices were CAD** after reading
  its country field instead of its currency field — it sells in USD, and `docs/PLAN.md` is
  corrected. **WooCommerce is untested** and unwritten: the candidate hosts were unreachable from
  this container, which is a limit of the environment, not evidence Woo is unusable. The workflow
  has **never run in Actions** — only locally. Prices are keyed per card though a price belongs to
  a product; the same item in two cards would be stored twice.
- **Reviewer verdict:** (pending — no fresh-chat Reviewer pass has been run)

### 2026-11-19: Data layer — cards load and are validated (F2)
- **What changed:** `app/schema.js` validates every purchase card, `app/store.js` loads them behind
  the `DataStore` interface from decision 0002, and `app/main.js` reports what loaded. A test
  fixture and a manifest were added under `data/cards/`.
- **Why:** Cards are hand-written, converted from a teammate's Markdown, so some will be malformed.
  Without validation a missing field becomes `undefined` and the card renders half-empty with no
  clue why. The validator also **enforces decision 0005**: fields like `winner`, `score` and `rank`
  are rejected outright rather than ignored, because accepting them quietly would let the design
  rot back to storing verdicts.
- **Definition of Done and evidence:**
  - [x] **Valid cards load** — browser reports `1 card loaded and valid`, 0 console errors, and all
        four section placeholders still render.
  - [x] **A malformed card is rejected with a readable on-screen error, not a blank page** — a
        deliberately broken card produced **10 errors**, each naming the field and the reason, e.g.
        *"has \"winner\" — a stored verdict — see decision 0005, the pick is a \"choose X if\"
        branch, not a field"* and *"stage \"shopping\" is not one of idea, researching,
        shortlisted, …"*. The valid card still loaded alongside it and the page stayed intact.
  - [x] **F1 did not regress** — re-ran its check: 0 console errors, 4 placeholders, no horizontal
        scroll at 375/768/1280.
- **Files touched:** app/schema.js, app/store.js, app/main.js, data/cards/index.json,
  data/cards/_fixture.json, index.html, styles.css, docs/PLAN.md
- **Not confirmed / known limits:** `data/cards/index.json` is a **shared manifest** — the one file
  every new card touches, which is the merge-conflict risk the per-card files were designed to
  avoid. It stays because GitHub Pages cannot list a directory and the alternatives are worse;
  conflicts are one line and trivial. The fixture is **not real research** — the team writes the
  first real card together at the kickoff, and the fixture is deleted then. Nothing renders a card
  yet; that is F3 onward. Tested in Chromium only.
- **Reviewer verdict:** (pending — no fresh-chat Reviewer pass has been run)

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
  *(Resolved later the same day: the default branch was moved to `main` and the stray branch
  deleted. Left above as written, since this entry records what was true at the time.)*
- **Reviewer verdict:** (pending — no fresh-chat Reviewer pass has been run)

### 2026-11-20: F7 — dashboard, cards grouped by stage
- **What changed:** New `app/dashboard.js` renders every valid card under its stage heading with
  a count. `app/main.js` calls it instead of printing a bare total; `index.html` swapped the
  `#app-status` block for `#dashboard`; dashboard styles appended to `styles.css`, all scoped
  under `#dashboard`.
- **Why:** F2's "2 cards loaded and valid." proved the data layer worked but answered nobody's
  question. The reader wants to know what they are shopping for and how far each one has got —
  that is a grouping, not a count. The count survives inside each stage heading, where it means
  something. Stages are iterated from `STAGES` in `schema.js` rather than from the data, so they
  always read in life-cycle order no matter what order the manifest lists cards in.
- **Deliberately not built:** the card entries are plain — title, finalists, owner, date. F3
  (card tile) is a teammate's component and owns how one card looks. Styling a handsome tile here
  would guarantee one of the two gets thrown away.
- **Definition of Done and evidence:**
  - [x] **Every card appears under the correct stage heading** — page rendered
        `["Researching 1","Shortlisted 1"]` with 2 card entries: the test fixture and
        "Everyday cream dinner plates, 10.5 in. stoneware".
  - [x] **Counts match the files on disk** — counted independently from the manifest:
        `{'researching': 1, 'shortlisted': 1}`. Identical to the headings.
  - [x] **A broken card still fails loudly (F2 not regressed)** — a deliberately malformed
        `_broken.json` (bad stage, a forbidden `winner` field, no sources, no finalists) produced
        **7 readable on-screen errors** naming each field and why, while both valid cards still
        rendered and the page stayed intact. 0 uncaught page errors. Test file removed afterwards.
  - [x] **No console errors, no horizontal scroll** — clean at 1280px and 375px.
  - [x] **Only `styles.css` variables** — 0 hex, `rgb()` or `hsl()` literals in the dashboard
        block.
- **Files touched:** `app/dashboard.js` (new), `app/main.js`, `index.html`, `styles.css`
- **Not confirmed / known limits:** no Tester or Reviewer pass has been run in a fresh chat.
  `data/cards/_fixture.json` now occupies a stage heading of its own, so fake data sits beside
  real research and looks legitimate on screen — it should be deleted now that a real card
  exists, which is what its own note says to do. The dashboard does not link a card to anything,
  because there is no detail view yet.
- **Reviewer verdict:** (pending)

### 2026-11-20: Direction change (0007) and F8b — the shared research template
- **What changed:** Decision `0007` supersedes `0004`: the per-teammate component split is
  dropped. Avery plans the webpage build, Camila implements it in Claude Code. Research is
  unchanged — Bryce, Avery, Robert and Raul each write two purchase cards. New
  `prompts/product-research.md` is the one shared research template (F8b). `TEAMMATE-GUIDE.md`,
  `CLAUDE.md`, `README.md`, `docs/PLAN.md` (F3–F6, Q2) and `MEETING-KICKOFF.md` updated to match.
- **Why:** The repo described a process the team had abandoned. `TEAMMATE-GUIDE.md` in
  particular was about to be sent to three people telling them their first job was to build a UI
  component in free Claude — work nobody wants any more. And its line 48 promised "the research
  prompt template Rene sends you", which did not exist, so the guide could not be sent at all.
  F8b existed to stop eight cards coming back in eight shapes (0005); with components gone, the
  cards are now the *only* thing three teammates have to defend at grading, which raises the
  stakes on it rather than lowering them.
- **Design note:** the template outputs **Markdown, not JSON** — teammates author no JSON
  (0004, and `app/schema.js`'s own header: *"converted from a teammate's Markdown"*). Its seven
  output headings map one-to-one onto the schema so conversion is mechanical. It records its
  inputs in an `inputs` field, which needed **no schema change**: `validateCard` rejects only the
  five FORBIDDEN keys and ignores unknown ones.
- **Definition of Done and evidence:**
  - [x] **Tier words in the template are the ones the validator accepts** — `schema.js` has
        `TIERS = ['most-credible', 'fair', 'low']`; the template asks for
        `most-credible,fair,low`. Exact match.
  - [x] **Every forbidden field is named as "do not produce"** — schema FORBIDDEN is
        `winner, best, score, weights, rank`; all five appear in the template's rules.
        **MISSING from template: none.**
  - [x] **An `inputs` field validates with no schema edit** — dinner-plates card plus an
        `inputs` object → **VALID**. Control: the same card plus `winner` → **rejected**,
        *'has "winner" — a stored verdict'*. So the template's claim about both is true.
  - [x] **The guide no longer tells anyone to build a component** — one `component` match left
        in `TEAMMATE-GUIDE.md`, and it is the "this changed at the kickoff" note itself.
  - [x] **The guide no longer promises a file that doesn't exist** — it now names
        `prompts/product-research.md`, which is present (8,739 bytes).
  - [x] **Page unaffected** — stages still `["Researching 1","Shortlisted 1"]`, 0 console
        errors, no horizontal scroll at 375px.
- **Files touched:** `docs/decisions/0007-avery-plans-camila-builds.md` (new),
  `docs/decisions/0004-teammate-owns-a-component.md` (status line only — the one edit the
  records' own rules allow), `prompts/product-research.md` (new), `TEAMMATE-GUIDE.md`,
  `CLAUDE.md`, `README.md`, `docs/PLAN.md`, `MEETING-KICKOFF.md`
- **Not confirmed / known limits:** **the template has not yet produced a card.** It is verified
  against the schema mechanically, not end to end — nobody has pasted it into free Claude and
  come back with research. The first teammate to run it is the real test, and the template should
  be treated as version 1 until one card has come back through it. `[group chat]` is still blank
  in `TEAMMATE-GUIDE.md`. `sections/*.html` and `index.html` are untouched on purpose — what
  replaces them is Avery's plan's business.
- **Reviewer verdict:** (pending)

### 2026-11-20: Integrate the two open branches (F8 keyboard card, design brief, docs under 0007)
- **What changed:** Merged `claude/blissful-mccarthy-rup9gc` (clean) and
  `claude/awesome-clarke-3ij3j4` (6 conflicts) into one integration branch. From `clarke` this
  brings Bryce's second card, `data/cards/gaming-keyboard.json`, and `docs/DESIGN-BRIEF.md` — one
  page for whoever designs the look, instead of BRIEF + PLAN + six decision records. `docs/BRIEF.md`
  §10 now says the nine seed products are an example list, not a fixed one.
- **Why the conflicts resolved the way they did:** `clarke` was written against decision `0004`
  and assigned four component owners — card tile Avery, comparison table Bryce, price table Raul,
  share box Robert. `0007` (on `blissful`, decided by Rene at the kickoff) supersedes `0004` and
  deletes that split. The records' own rule is that the newest accepted record wins, so every
  conflicted hunk took the `0007` side. This is a **content** decision, not a mechanical one:
  `clarke`'s version of those five doc files describes a process the team has abandoned.
- **Not a straight "take ours" anywhere.** Three hunks kept `clarke`'s work:
  - `data/cards/index.json` — both card slugs, not one. A list gaining a different entry on each
    side is the clearly-safe conflict case.
  - `TEAMMATE-GUIDE.md` "Send it in" — `clarke` deleted the dead `[group chat]` placeholder, which
    the F8b entry above had logged as a known blank. Kept that deletion, kept `0007`'s recipient:
    "Send it to Camila, who adds it to the site". The blank is now gone from the guide.
  - `docs/PLAN.md` Q6 — kept `clarke`'s "example list, not fixed" clarification.
- **`DESIGN-BRIEF.md` edited on the way in (4 lines).** It was written under `0004` and said "the
  four components, one owner each". Under `0007` they are four blocks of one page with one planner
  and one builder. §2, §3, §4 and §7 reworded; the design content itself — tokens, 375px rule,
  honest empty states, out-of-scope list — is untouched.
- **Definition of Done and evidence:**
  - [x] **No conflict markers anywhere** — repo-wide grep for `<<<<<<<`, `>>>>>>>`, `=======`
        outside `.git` → **NONE**. `git diff --diff-filter=U` → empty.
  - [x] **Both new cards validate** — `validateCard` on each: `gaming-keyboard` **VALID**
        (9 sources, 3 finalists, owner Bryce, researched_on 2026-11-19);
        `dinner-plates` **VALID** (4 sources, 3 finalists, owner Bryce, 2026-11-19).
  - [x] **The page renders all three cards under the right stages** — served over HTTP, headings
        read `["Your purchases","Researching 1","Shortlisted 2"]`, and the text contains
        "dinner plates", "Logitech G316" and "Test fixture". No validation errors on screen.
  - [x] **No console errors, no horizontal scroll** — checked at 1280px and 375px: **0 console
        errors, 0 page errors**, `scrollWidth > clientWidth` false at both. Screenshot taken at
        375px.
  - [x] **`index.json` is valid JSON** — parses, lists `dinner-plates, gaming-keyboard`.
  - [x] **No component-owner language left** — `TEAMMATE-GUIDE.md`, `CLAUDE.md`, `README.md`,
        `MEETING-KICKOFF.md` and `docs/PLAN.md` F3–F6/Q2 all read per `0007`. The first run of
        this check **failed**: three passages described the old split and had auto-merged without
        conflicting, so resolving the six conflicts had not caught them — `MEETING-KICKOFF.md`
        "build **one component**" and "Your component", and `docs/PLAN.md`'s teammate row "Build
        one component, research two cards". All three rewritten; re-run leaves one hit, the
        `CLAUDE.md` line that says the split *is dropped*.
- **Files touched:** `CLAUDE.md`, `README.md`, `TEAMMATE-GUIDE.md`, `MEETING-KICKOFF.md`,
  `docs/PLAN.md`, `docs/DESIGN-BRIEF.md`, `data/cards/index.json`, plus everything the two merges
  carried in.
- **Not confirmed / known limits:**
  - **No fresh-chat Tester or Reviewer pass has been run** on either branch or on this merge.
    Three DEVBOOK entries now read "Reviewer verdict: (pending)".
  - ~~`data/cards/_fixture.json` is still there~~ — **deleted 2026-11-20** on the lead's say-so,
    now that two real cards exist, which is what the F7 entry and the fixture's own note both
    asked for. It was the whole of "Researching 1": fake data with owner `[name]` sitting above
    real research. Nothing in the code referenced it — `grep -rn '_fixture'` outside `.git` hit
    only `index.json` and past DEVBOOK entries — so the delete is just the file plus its slug.
    After it: headings read `["Your purchases","Shortlisted 2"]`, the empty "Researching" heading
    correctly does not render, both real cards still show, 0 console errors and no horizontal
    scroll at 1280px and 375px.
  - **F8 is 2 of 8 cards, and both are Bryce's.** Avery, Robert and Raul have not started. Nothing
    in this merge changes that.
  - The keyboard card's sourcing is thinner than the plates card: 7 `fair` + 2 `low`, no
    `most-credible`, and 8 of its 9 sources are dated `"not stated"`. That passes the schema —
    `0005` allows `"not stated"` on purpose — but it is worth a look before F8 is called done.
- **Reviewer verdict:** (pending)
