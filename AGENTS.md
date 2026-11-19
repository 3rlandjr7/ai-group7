# Working Rules for the AI Assistant

> **Students:** this file is the contract between you and your AI coding assistant.
> Most tools read `AGENTS.md` on their own (GitHub Copilot, Cursor, Codex, and Claude Code
> through the `CLAUDE.md` file next to it). If yours doesn't, paste this file into the chat
> at the start of every session. Edit the **Project** section for your app. Keep the rules.

## Project

- **App:** a purchase research and tracking app, for people buying considered things — appliances,
  tools, electronics, home goods — who want trustworthy research instead of SEO listicles. Each
  purchase is a card carrying its sources, a comparison of finalists and a price table.
- **Stack:** plain HTML + CSS + a little JavaScript. `index.html` loads each block from its own
  file; shared colours and fonts live in `styles.css`. No build step, no framework, no backend —
  data is committed to the repo.
- **How to run it:** `/preview` (or `python3 -m http.server 8000`, then open http://localhost:8000).
  It must be served over HTTP — opening `index.html` directly from disk shows an empty page,
  because the blocks are fetched.
- **How to test it:** no automated tests. "Tests" are the manual checks in each feature's
  Definition of Done in `docs/PLAN.md`: the page loads with no console errors, it reads correctly
  at phone width (375px), links work, prices are sorted correctly, and only `styles.css` variables
  are used. Paste the real output — never claim a check passed without running it.
- **Decisions:** `docs/decisions/`. Requirements index: `docs/COURSE-REQUIREMENTS.md`.
- **Plan:** `docs/PLAN.md`. **Project history:** `DEVBOOK.md`. **Bugs:** `BUGLOG.md`.
- **Team rules** (owners, git safety, branches): see `CLAUDE.md`. If the two files conflict, ask.

### How our team runs the four roles
| Role | When | How |
|---|---|---|
| Author | Building a section | `/add-section` (or the section owner's artifact chat) |
| Tester | Before `/ship` | Fresh chat + `agents/tester.md`, plus `/preview` at desktop and phone width |
| Docs writer | Before `/ship` | `agents/docs-writer.md` adds the DEVBOOK / BUGLOG entries in the same PR |
| Reviewer | Before the lead merges | Fresh chat + `agents/reviewer.md` on the PR diff; verdict goes in the PR, then `/merge` |

## The Rules (follow every one, on every change)

1. **Ask before you assume.** If something about the request is unclear, ask me one question
   instead of guessing. When you do have to guess, label it: _"Assumption: ..."_.
   Tell me about trade-offs even when you have a favourite option.
2. **Smallest change that works.** Build only what I asked for. No extra features "for later".
   If three lines do it, write three lines.
3. **Stay in your lane.** Only touch the files this change needs. If you see something else
   worth fixing, tell me. Don't fix it without asking.
4. **Define "done" first.** Before writing code, write a short **Definition of Done**: a list of
   checks we can actually run or see (e.g. "the total on the dashboard equals the sum in the
   CSV, $1,240.50"). It isn't done until every check has been shown to pass.
5. **Stop if we drift.** If the work turns out different from what we agreed, stop and ask me.
6. **Explain the code.** Every function you add or change gets a short comment saying *why*
   it exists and any gotcha. Don't just restate the code.
7. **Prove it, don't claim it.** Only say something works if you ran it or can point to the
   line that shows it. If you didn't check, say "I haven't checked this". Never invent test
   results, file contents, or library functions.

## Every change goes through four roles

Each role is a separate pass. Don't judge your own work in the same breath as writing it.

| Role | Job | Prompt |
|---|---|---|
| **Author** | Writes the change, sticking to the plan and the Definition of Done | `agents/author.md` |
| **Tester** | Runs the code and tries to break it. Re-reads every claim and checks it against the code | `agents/tester.md` |
| **Docs writer** | Updates `DEVBOOK.md` (and `BUGLOG.md` if something was broken) | `agents/docs-writer.md` |
| **Reviewer / Judge** | Compares the change to the goal and gives a verdict: approve or send back | `agents/reviewer.md` |

## Records we keep

- **`DEVBOOK.md`**: what the app does now and *why* we built it that way. Add an entry after
  every feature.
- **`BUGLOG.md`**: every bug we found: what broke, why, the fix, and how we proved the fix.
- **Commits**: one feature or fix per commit. The message says what changed and how it was
  verified.

## Never

- Never put passwords, API keys, or `.env` files in code or commits.
- Never delete data or files without showing me what will be deleted and asking first.
- Never say "all tests pass" unless you just ran them and they did.
