---
name: merge
description: Lead only. Review an open pull request, preview it, and merge it once you approve.
disable-model-invocation: true
---

# /merge [PR number]

1. Confirm the user is the lead named in CLAUDE.md. If not, stop.
2. If there are unsaved changes, stop and suggest `/save`.
3. If no number was given, run `gh pr list` and show each PR in one line (number, author, title). Ask which one.
4. `gh pr checkout <n>`. Summarize the diff in plain English, and flag:
   - changes to `index.html`, `styles.css` or config by anyone other than the lead
   - hard-coded colors or fonts, `<script>` tags, external libraries
   - secrets or large files
   - a missing DEVBOOK.md entry
   - a decision made but not recorded: the diff chooses between options, or the DEVBOOK entry says
     "instead of", but `docs/decisions/` has nothing covering it. Ask the author to run `/decide`
   - a Definition of Done ticked without evidence beside it: AGENTS.md rule 7 is "prove it, don't
     claim it", so a bare [x] with no command output, number or screenshot is a send-back
   - merge conflicts (`gh pr view <n> --json mergeable`)
5. Offer to run the Reviewer: a fresh chat with `agents/reviewer.md`, given the plan entry, `gh pr diff <n>`, the Tester's report and the DEVBOOK/BUGLOG entries. Post its verdict as a PR comment.
6. Run the `/preview` steps so the lead can check it on desktop and at phone width.
7. Ask: merge, request changes, or skip?
   - **Merge (someone else's PR):** `gh pr review <n> --approve`, then `gh pr merge <n> --merge`.
   - **Merge (lead's own PR):** `gh pr merge <n> --merge --admin` (you can't approve your own PR).
   - **Request changes:** `gh pr review <n> --request-changes --body "<lead's notes>"`
   - Don't delete the branch.
8. `git switch <default> && git pull --ff-only`. Stop the preview server.
9. Report the result in one line. If GitHub Pages is on, mention the site updates within a few minutes.
