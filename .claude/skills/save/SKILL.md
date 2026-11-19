---
name: save
description: Save and back up your work. Commits all changes with a clear message and pushes your branch.
disable-model-invocation: true
---

# /save [message]

1. `git branch --show-current`. If it's the default branch, STOP. Explain, and offer to move the changes to a new branch (`git switch -c <firstname>/<topic>`), then continue.
2. `git status` and `git diff --stat`. If nothing changed, say so and stop.
3. Check for files that shouldn't be committed (`.env`, keys, `node_modules`, files over 10 MB). List them, leave them out, and suggest adding them to `.gitignore`.
4. `git add -A`, then unstage anything flagged in step 3.
5. Write the commit message from the diff: a summary line (max 60 characters, imperative, e.g. "Add contact section") and a 1–3 line body saying how it was checked. If the user gave a message, use it as the summary.
6. `git commit`, then `git push -u origin <branch>`.
7. If the push is rejected because the remote has new commits, merge `origin/<branch>` following the conflict rules in CLAUDE.md, then push again. Never force-push.
8. Report in one line what was saved.
