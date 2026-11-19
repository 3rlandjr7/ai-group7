# BUGLOG

Every bug we find goes here, even small ones, and even ones the AI caused.
Newest at the top. A bug isn't closed until the **Proof of fix** is filled in.

---

## Template

### BUG-### : <short name>
- **Found:** YYYY-MM-DD, by _(me / Tester / Reviewer / user)_
- **What happened:** _what you saw vs. what you expected; paste the exact error_
- **How to reproduce:** _numbered steps, with the data used_
- **Root cause:** _why it happened (not just where)_
- **Fix:** _what changed, which file(s)_
- **Proof of fix:** _the test or check that failed before and passes now_
- **Test added so it can't come back:** _test name, or "none, because ..."_
- **Status:** open / fixed / won't fix (why)

---

## Bugs

### BUG-001 : Clicking a nav link hides the section heading behind the sticky header (phone width)
- **Found:** 2026-11-19, by Tester (F1 Definition of Done check)
- **What happened:** At 375px wide, clicking **About** in the nav scrolls the page so that the
  `About (coming soon)` heading sits *underneath* the sticky header. Only the body text below it is
  visible. Measured: header bottom at y=92, heading top at y=52 — a 40px overlap.
  At desktop width (1280px) the same click is fine, so the bug is phone-only.
- **How to reproduce:** 1) Serve the repo (`/preview`) 2) Open at 375px wide with a viewport short
  enough that `#about` is reachable by scrolling (e.g. 375x400) 3) Click **About** in the nav
  4) The heading is not visible; the text under it is.
- **Root cause:** `.site-header` is `position: sticky`, so it covers the top of the viewport, but
  nothing offsets the scroll target for it. An anchor jump puts the section's top edge at y=0,
  underneath the header. At desktop it survives by luck: `main > section` has `padding: 4rem` top
  (64px) against a 59px header, so the heading clears it by 5px. The 600px media query drops that
  padding to `2rem` (32px) while the stacked header grows to 92px, so the margin disappears and
  becomes a 40px overlap. `styles.css` defines no `scroll-margin-top` or `scroll-padding-top`
  anywhere — confirmed by grep.
- **Fix:** `styles.css` — added `html { scroll-padding-top: 6rem; }` with a comment explaining why.
  One rule covers every anchor target, rather than patching each section.
- **Proof of fix:** re-ran the same check. At **375x400** the overlap went from **+40px to -56px**
  and `heading_hidden_behind_header` flipped `true` -> `false`. At **1280x800** it stayed clear
  (-121px), so the fix did not regress desktop. Confirmed visually: the `About (coming soon)`
  heading is now fully below the header instead of hidden by it.
- **Test added so it can't come back:** the F1 check script asserts `heading_hidden_behind_header`
  at both 1280px and 375px.
- **Status:** fixed

---
