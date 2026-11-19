---
name: undo
description: Safely undo your last save. Makes a new commit that reverses it, without rewriting history.
disable-model-invocation: true
---

# /undo

1. If you're on the default branch, stop and tell the user to ask the lead.
2. If there are unsaved changes, ask whether to undo those instead (`git restore` on the files they choose) or save them first.
3. Show the last commit (`git log -1 --stat`) in plain English and ask the user to confirm.
4. `git revert --no-edit HEAD`, then `git push`.
5. Report what was undone. To undo older commits, list the last 5 and let the user pick one. Never use `reset --hard` or force-push.
