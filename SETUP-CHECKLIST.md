# One-time setup (lead)

- [ ] Decide repo visibility: on GitHub Free, branch protection and Pages need a **public** repo.
- [ ] Fill in the placeholders: team names, site title, colors and fonts in `styles.css` (mirror them in TEAMMATE-GUIDE.md), hosting line in `CLAUDE.md`, the Project section in `AGENTS.md`
- [ ] Commit the starter files to the default branch (the only time anyone commits to it directly)
- [ ] GitHub → Settings → Collaborators: add the co-integrator. Only they need repo access; the other 4 don't need GitHub accounts.
- [ ] GitHub → Settings → Branches: **leave `main` unprotected for now** — see `docs/decisions/0006`. A protected branch rejects CI pushes, which would break the daily price refresh, and with six people a daily rubber-stamped PR is review theatre. If the team grows or someone pushes something they shouldn't: protect it (require a pull request and **1 approval**, leaving "Do not allow bypassing" **unchecked**) and switch the price workflow to opening PRs.
- [ ] GitHub → Settings → Pages: deploy from the default branch / root
- [ ] Both Claude Code users: install the `gh` CLI and run `gh auth login`
- [ ] Send TEAMMATE-GUIDE.md to the other four
