# Prompt Library: things good developers ask, every day

Copy and paste these, filling in the `<...>` parts. They work in any AI chat tool.

---

## 1. Make it ask questions before it starts
> Before writing anything, ask me up to 3 questions about `<feature>`. Start with the ones
> where a wrong guess would cost the most. Wait for my answers.

> What would you need to know about my business to get this right that I haven't told you?

## 2. Surface the assumptions
> List every assumption you're making about `<feature / the data / the user>`. For each one,
> tell me how we could check it, and what breaks if it's wrong.

> You just wrote `<code/answer>`. What did you assume that I didn't actually say?

## 3. Get trade-offs, not just one answer
> Give me 2–3 ways to do `<thing>`, with the pros and cons of each, then recommend one and say why.

> What is the simplest version of this that would still be useful?

## 4. Define "done" before building
> Write a Definition of Done for `<feature>`: checks I can run or see, with real example
> numbers from `<sample data>`.

> Turn "the report should be accurate" into something we can actually test.

## 5. Keep it small and in lane
> Make only the change needed for `<feature>`. Tell me which files you'll touch first.

> You changed `<file>`, which wasn't part of this feature. Why? Undo anything that wasn't needed.

> Is there anything in this change I didn't ask for?

## 6. Make it prove things
> Run it and paste the actual output. Don't summarize.

> How do you know that works? Show me the line of code or the test that proves it.

> Which parts of what you just told me have you **not** checked?

> Check that number by hand: take three rows from the data and work out the total yourself.

## 7. Understand the code (you must be able to explain it)
> Explain `<function>` to me as if I'm a business student who's new to Python. What does each part do, and why?

> If my instructor asked me why this works, what would I say?

> What would happen if `<input>` was empty, negative, or text?

## 8. When something breaks
> Here's the error: `<paste whole error>`. Before fixing anything, tell me what you think the
> **root cause** is and how sure you are. Then give me the smallest fix.

> Write a test that fails because of this bug. Then fix the bug and show the test passing.

> Write the BUGLOG entry for this bug using the template in BUGLOG.md.

## 9. When it's going in circles
> Stop. We've tried this 3 times. Summarize what we tried, what happened each time, and
> what we still don't know. Suggest a different approach.

> Let's start over from the last working commit. What's the smallest next step?

## 10. End of a session (hand-off note for next time)
> Write a short hand-off note: what we finished (with evidence), what's in progress,
> open bugs, open questions, and the exact next step. Add it to the top of DEVBOOK.md.

## 11. Start of a session
> Read AGENTS.md, docs/PLAN.md, the latest DEVBOOK.md entry and the open BUGLOG items.
> Tell me where we are and what the next step is. Don't write code yet.

---

## Red flags: stop and question the AI when it ...
- says "this should work" or "all tests pass" without showing output
- uses a library function you can't find in the docs (it may have made it up)
- changes lots of files for a small feature
- quietly changes your test so that it passes
- gives a confident number that you haven't checked by hand
- fixes the symptom ("added a try/except") without explaining the cause
