@AGENTS.md

# Team web page: rules for Claude

## Project
- Stack: plain HTML + CSS. `index.html` loads each section from `sections/` with a small script; no build step, no framework.
- Repo: https://github.com/3rlandjr7/ai-group7. Hosting: [GitHub Pages from `main` / TBD].
- Planned sections: hero, about, features, contact. `index.html` already includes all four. New sections need the lead.
- Section files: `sections/<name>.html`. Each section's styles are scoped under `#<name>`.
- Sections use the variables in `styles.css`. Never hard-code colors or fonts.
- Sections must not contain `<script>` tags (included HTML doesn't run them). Ask the lead if a section needs JS.
- Process rules (plan, Definition of Done, four roles, DEVBOOK/BUGLOG) are in `AGENTS.md`.

## Who owns what
- Lead: [name]. Owns `index.html`, `styles.css`, `CLAUDE.md`, `AGENTS.md`, `.claude/`, and everything outside `sections/`. Reviews and merges every PR.
- Co-integrator: [name]. Edits files in `sections/` only, through PRs.
- Section owners: hero [name], about [name], features [name], contact [name].
- If a change needs a file the user doesn't own, stop and tell them to ask the lead.

## Git rules
- Default branch: check it (`git remote show origin`); don't assume `main`.
- Work on your own branch named `<firstname>/<topic>` (lowercase, no spaces).
- Sync with merge, not rebase: `git fetch origin && git merge origin/<default>`.
- Conflicts: resolve only when clearly safe (different lines added, whitespace only, or entirely inside a section file this branch owns). Otherwise `git merge --abort`, explain which files conflicted, and tell the user to ask the lead. Always stop on conflicts in `index.html`, `styles.css` or config.
- One feature or fix per commit/PR. Commit messages say what changed and how it was checked.

## Never
- Push or commit to the default branch, force-push, `reset --hard`, rebase, or delete branches.
- Commit secrets (`.env`, keys) or files over 10 MB.
- Pick "ours" or "theirs" for a whole file without the user saying so.

## Talking to the user
- Plain English, short. Say what happened and what to do next. No git jargon without a one-line explanation.
