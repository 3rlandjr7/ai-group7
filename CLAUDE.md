@AGENTS.md

# Team web page: rules for Claude

## Project
- **What it is:** the front end of a purchase research and tracking app. Each thing you are
  shopping for is a card that moves through stages, carrying its research, a comparison of
  finalists and a price table. Built on data committed to the repo — no backend. See
  `docs/decisions/0001`.
- Stack: plain HTML + CSS + a little JavaScript. `index.html` loads each block from a file with a
  small script; no build step, no framework.
- Repo: https://github.com/3rlandjr7/ai-group7. Default branch: `main`. Hosting: GitHub Pages [TBD].
- **Components** live one per file and have one owner each, like sections did. A component is a
  self-contained block: card tile, comparison table, price table, share box.
- **Purchase cards** are data files, one per product, one owner each.
- Component styles are scoped under their own id. Components use the variables in `styles.css` —
  never hard-code colors or fonts.
- Components must not contain `<script>` tags (included HTML doesn't run them). Ask the lead if
  one needs JS.
- **Prices** come only from merchants whose storefronts publish product JSON openly. Amazon, Best
  Buy and Walmart are linked **without** prices — republishing theirs breaks their terms. See
  `docs/decisions/0003`.
- Process rules (plan, Definition of Done, four roles, DEVBOOK/BUGLOG) are in `AGENTS.md`.
- **Decisions** live in `docs/decisions/`. If you are choosing between options and rejecting one,
  run `/decide` and write the record. Requirements index: `docs/COURSE-REQUIREMENTS.md`.
- **The product brief is `docs/BRIEF.md`** — what the app is meant to do. `docs/PLAN.md` and every
  decision record cite its sections as §1–§14, so read it before changing either.

## Read these before starting work
1. `docs/PLAN.md` — the features, who owns what, and the open questions
2. `docs/decisions/` — **why** it is built this way, newest last. Read 0001 and 0005 at minimum
3. `DEVBOOK.md` — what exists now and what is not yet confirmed
4. `docs/BRIEF.md` — the product spec, when a decision cites a § you need

Do not re-derive a decision that already has a record. If you disagree with one, write a new record
that supersedes it rather than quietly doing something different.

## Who owns what
- Lead: [name]. Owns `index.html`, `styles.css`, the data layer, the price fetcher, `CLAUDE.md`,
  `AGENTS.md`, `.claude/`, and everything outside the component and card files. Reviews and merges
  every PR.
- Co-integrator: [name]. Edits component and card files only, through PRs. Also owns the
  robots.txt gate and the compliance log.
- Component owners: card tile [name], comparison table [name], price table [name], share box [name].
- Each of those four also owns two purchase-card data files. See `docs/decisions/0004`.
- If a change needs a file the user doesn't own, stop and tell them to ask the lead.

## Git rules
- Default branch: check it (`git remote show origin`); don't assume `main`.
- Work on your own branch named `<firstname>/<topic>` (lowercase, no spaces).
- Sync with merge, not rebase: `git fetch origin && git merge origin/<default>`.
- Conflicts: resolve only when clearly safe (different lines added, whitespace only, or entirely inside a section file this branch owns). Otherwise `git merge --abort`, explain which files conflicted, and tell the user to ask the lead. Always stop on conflicts in `index.html`, `styles.css`, the data layer or config.
- One feature or fix per commit/PR. Commit messages say what changed and how it was checked.

## Never
- Push or commit to the default branch, force-push, `reset --hard`, rebase, or delete branches.
- Commit secrets (`.env`, keys) or files over 10 MB.
- Pick "ours" or "theirs" for a whole file without the user saying so.

## Talking to the user
- Plain English, short. Say what happened and what to do next. No git jargon without a one-line explanation.
