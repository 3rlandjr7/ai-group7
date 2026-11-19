---
name: ship
description: Submit your work for review. Syncs with the default branch and opens a pull request with a plain-English summary.
disable-model-invocation: true
---

# /ship

1. Check `gh` is installed (`gh --version`) and logged in (`gh auth status`). If not, explain how to fix it and stop.
2. If you're on the default branch, stop and suggest `/start`.
3. Run the `/save` steps if there are unsaved changes.
4. `git fetch origin && git merge origin/<default>`, following the conflict rules in CLAUDE.md. Push.
5. Check the process records: the change should have a DEVBOOK.md entry (and BUGLOG.md entries for any bugs found). If missing, offer to run `agents/docs-writer.md` first.
6. If a PR for this branch already exists (`gh pr view`), say it's updated and give the link. Otherwise:
   `gh pr create --base <default> --title "<summary>" --body "<what changed, why, how it was checked, what wasn't checked>"`
7. Never merge. Give the PR link and say the lead will review it.
