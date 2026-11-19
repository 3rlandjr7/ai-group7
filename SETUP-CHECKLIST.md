# One-time setup (lead)

- [ ] Decide repo visibility: on GitHub Free, branch protection and Pages need a **public** repo.
- [ ] Fill in the placeholders: team names, site title, colors and fonts in `styles.css` (mirror them in TEAMMATE-GUIDE.md), hosting line in `CLAUDE.md`, the Project section in `AGENTS.md`
- [ ] Commit the starter files to the default branch (the only time anyone commits to it directly)
- [ ] GitHub → Settings → Collaborators: add the co-integrator. Only they need repo access; the other 4 don't need GitHub accounts.
- [ ] GitHub → Settings → Branches: protect the default branch. Require a pull request and **1 approval**. Leave "Do not allow bypassing" **unchecked** so you (admin) can merge your own PRs with `/merge`.
- [ ] GitHub → Settings → Pages: deploy from the default branch / root
- [ ] Both Claude Code users: install the `gh` CLI and run `gh auth login`
- [ ] Send TEAMMATE-GUIDE.md to the other four
