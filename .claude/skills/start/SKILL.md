---
name: start
description: Start or resume work. Gets the latest code and puts you on your own branch.
disable-model-invocation: true
---

# /start [topic]

1. If `git status --porcelain` shows unsaved changes, run the `/save` steps first.
2. Find the default branch (`git remote show origin`). `git fetch origin`.
3. Ask for the user's first name if you don't know it, and the topic if none was given (e.g. `about`). Branch name: `<firstname>/<topic>`, lowercase, spaces → `-`, other symbols removed.
4. If that branch exists (locally or on origin), switch to it and merge `origin/<default>` into it, following the conflict rules in CLAUDE.md. Otherwise `git switch -c <branch> origin/<default>`.
5. Report in one line: which branch they're on and that it's up to date. Then suggest PROMPTS.md #11 if they're resuming work.
