# Guided Workflow: Vibe-Coding a Business App the Professional Way

"Vibe coding" means describing what you want and letting an AI write the code. It's fast,
and it's also easy to end up with an app that *looks* finished but gives wrong numbers,
which nobody can explain, and which breaks next week.

This kit gives you the habits that professional developers use to prevent that:

- **Plan before you code**, and let the AI interview *you*.
- **Make assumptions visible.** The AI must label its guesses and ask questions.
- **Define "done"** as checks you can run, not a feeling.
- **Separate the roles:** one AI pass writes, another tests, another documents, and another judges.
- **Keep records:** a DEVBOOK (what and why) and a BUGLOG (what broke and how we proved the fix).

> **You are the project manager and the person responsible.** The AI is a fast, junior developer
> who is confidently wrong sometimes. Your grade depends on whether *you* can explain and
> defend the work.

---

## What's in the kit

| File | What it's for |
|---|---|
| `AGENTS.md` | The rules your AI must follow. Most tools read it automatically. |
| `CLAUDE.md` | A one-line pointer so Claude Code reads AGENTS.md too |
| `docs/PLAN.md` | Your plan: features, Definition of Done, assumptions, open questions |
| `DEVBOOK.md` | The project's history: what was built and why |
| `BUGLOG.md` | Every bug: cause, fix, proof |
| `agents/*.md` | Role prompts to paste: Planner, Author, Tester, Docs writer, Reviewer |
| `prompts/PROMPTS.md` | Copy-paste questions for everyday use |
| `examples/worked-example.md` | One feature taken all the way through the loop |

---

## Step 0: Set up (15 minutes, once)

1. Copy this kit into your project repo (or start from the template repo).
2. Open `AGENTS.md` and fill in the **Project** section: app, stack, how to run, how to test.
3. Make your first commit: `git add . && git commit -m "Project setup: rules, plan, devbook, buglog"`.
4. Check that your tool reads the rules. Ask it: *"What are the rules you're following for this
   project?"* If it can't list them, paste `AGENTS.md` into the chat.

---

## Step 1: Plan (one session, before any code)

1. Open a new chat and paste `agents/planner.md`.
2. Describe your idea in 1–2 sentences, e.g. *"An app for a coffee shop owner to log daily
   sales and see which products make the most money."*
3. **Answer its questions.** If it doesn't ask any, use prompt #1 in `PROMPTS.md`.
4. Read its **assumption list** carefully. This is where most project failures start.
   Correct the wrong ones, and move the ones you can't answer to **Open questions**.
5. Push it to a **small first version**: 3–5 Must features. Everything else goes under Nice or Out of scope.
6. Save the result in `docs/PLAN.md` and commit it.

✅ **You're done planning when:** every Must feature has a Definition of Done with real checks,
and you've looked at every assumption.

---

## Step 2: The build loop (repeat for each feature)

```
  ┌──────────┐   ┌──────────┐   ┌─────────────┐   ┌──────────┐   ┌────────┐
  │  AUTHOR  │──▶│  TESTER  │──▶│ DOCS WRITER │──▶│ REVIEWER │──▶│ COMMIT │
  └──────────┘   └──────────┘   └─────────────┘   └──────────┘   └────────┘
       ▲              │ FAIL                            │ SEND BACK
       └──────────────┴─────────────────────────────────┘
```

**A. Author** (paste `agents/author.md`): *"Build F1 from docs/PLAN.md."*
- Before it codes, it should restate the DoD, list its assumptions, and name the files it will touch.
  **Read these. Answer its questions.**
- When it's finished, it should paste the real test output and mark each DoD item ✅ / ❌ / ⚠️.

**B. Tester** (**new chat**, paste `agents/tester.md`).
- Why a new chat? An AI that just wrote the code tends to defend it. A fresh one looks for problems.
- Give it the changed files and the Author's summary. It runs the code, tries to break it,
  and checks every claim against the code.
- **FAIL** → go back to the Author with the bug reports. Each bug gets a BUGLOG entry.

**C. Docs writer** (paste `agents/docs-writer.md`).
- It writes the DEVBOOK entry and any BUGLOG entries, including **what wasn't confirmed**.

**D. Reviewer / Judge** (**new chat**, paste `agents/reviewer.md`).
- Give it the plan entry, `git diff`, the Tester's report and the new docs.
- It gives **APPROVE**, **APPROVE WITH NOTES**, or **SEND BACK**.

**E. Commit**, one feature per commit. Use the message the Reviewer suggests:
```
F2: Daily sales dashboard

Shows total sales per day from sales table.
Verified: pytest 6 passed; Jan 22 total $1,240.50 matches CSV by hand.
```

**F. Check it yourself (2 minutes).** Before moving on, run the app, click through the feature,
and **check one number by hand**. If you can't explain how the feature works, ask
(PROMPTS.md #7) until you can.

---

## Step 3: When something breaks

1. **Don't** just paste the error and say "fix it".
2. Ask for the **root cause first** (PROMPTS.md #8): what does it think is wrong, and how sure is it?
3. Get a **test that fails** because of the bug. Then fix it, and show the test passing.
4. Add a BUGLOG entry with the proof of fix.
5. If it's going in circles after 3 tries, stop (PROMPTS.md #9), go back to your last working
   commit, and try a smaller step.

---

## Step 4: Start and end every session the same way

- **Start:** PROMPTS.md #11. The AI reads the plan, DEVBOOK and BUGLOG, then tells you where you are.
- **End:** PROMPTS.md #10. It writes a hand-off note so next session starts in 1 minute, not 20.

---

## The habits that matter most

| Habit | Ask this |
|---|---|
| Make it ask, not guess | "What do you need to know before starting?" |
| Make guesses visible | "What are you assuming that I didn't say?" |
| Get options | "Give me 2–3 ways, with pros and cons, and your recommendation." |
| Define done | "How will we *check* that this works?" |
| Keep it small | "Is there anything here I didn't ask for?" |
| Demand proof | "Paste the real output." / "What haven't you checked?" |
| Understand it | "Explain this so I could defend it to my instructor." |

---

## What to hand in (suggested)

- The repo, with a commit history of one feature per commit
- `docs/PLAN.md` with the assumptions and open questions resolved
- `DEVBOOK.md` with an entry for every feature
- `BUGLOG.md` with every bug found (finding bugs is **good**; hiding them isn't)
- A short reflection: one place where the AI was wrong, and how your process caught it
