# Worked Example: One Feature Through the Whole Loop

**App:** "Bean Counter", a sales tracker for a small coffee shop (Python + Streamlit + SQLite).
**Feature:** F2, the daily sales dashboard.

This shows what good conversations with the AI look like. The **📌 notes** point out the habit
each step demonstrates.

---

## 1. Planning (excerpt)

**Student:** _(pastes agents/planner.md)_ I want an app for a coffee shop owner to log sales and
see which products make the most money.

**AI (Planner):** Before I plan anything, three questions:
1. Where does the sales data come from: typed in by hand, or exported from the till (POS)?
2. Does "make the most money" mean **revenue** (sales) or **profit** (sales minus cost)? If it's
   profit, we need a cost for each product.
3. Are there refunds or voided sales in the data?

**Student:** 1) A CSV export from the till. 2) Profit, but revenue is fine for the first version.
3) I'm not sure. I'll check.

**AI:** Thanks. My assumptions so far:
- A1: one shop location. _Check: ask the owner._
- A2: the CSV has one row per item sold, with date, product, quantity and amount. _Check: open a sample export._
- A3: refunds may appear as rows with negative amounts. _Check: search the sample for negative amounts._
- A4: amounts include tax. _Check: compare one receipt with its CSV row._

I'd suggest a first version with **F1 import CSV**, **F2 daily sales dashboard** and **F3 top 5
products by revenue**. Profit can be F4 once we have product costs. That's a Nice, not a Must.

> 📌 **Habits:** it asked before assuming. It turned "most money" into a decision for the
> student. Its guesses are labelled and checkable. It cut scope to a small first version.

The student opens the sample CSV and finds rows with `type = refund` and negative amounts.
**A3 is confirmed.** It goes into the plan as a DoD check:

| # | Feature | Definition of Done |
|---|---|---|
| F2 | Daily sales dashboard | (a) Shows one total per day for the selected month. (b) Jan 22 total = **$1,240.50** (worked out by hand from `sample_data/sales_jan.csv`). (c) Refunds reduce the total. (d) A day with no sales shows $0.00, not an error. |

---

## 2. Author

**Student:** _(pastes agents/author.md)_ Build F2 from docs/PLAN.md.

**AI (Author):**
- **Feature:** a dashboard showing total sales per day for a chosen month.
- **DoD:** (a)–(d) as in the plan.
- **Assumption:** "total" means the sum of `amount` (tax included, per A4). Is that right?
- **Files I'll touch:** `reports.py` (new `daily_total()`), `app.py` (dashboard page),
  `tests/test_reports.py` (new tests). Nothing else.

**Student:** Yes, sum of amount including tax.

_(The AI writes the code and runs the tests.)_

**AI (Author):**
```
$ pytest
tests/test_reports.py ....                 [100%]
4 passed in 0.41s
```
- (a) ✅ the dashboard shows 31 rows for January (screenshot)
- (b) ✅ `test_jan22_total` passes
- (c) ⚠️ **not checked**: the sample test data has no refunds on Jan 22
- (d) ✅ `test_empty_day_is_zero` passes

Ready for the Tester. Something I noticed but didn't change: `app.py` loads the CSV
on every page refresh, which may get slow later.

> 📌 **Habits:** the Author pasted real output, marked an item ⚠️ instead of pretending, and
> reported an out-of-scope issue instead of "fixing" it.

---

## 3. Tester (new chat)

**AI (Tester):**
- **Tests run:** `pytest` → 4 passed (pasted)
- **DoD check:**
  - (a) ✅
  - (b) ❌ **Using the real sample file, Jan 22 shows $1,310.00, not $1,240.50.** The test
    passed only because the test fixture is a tidied-up copy with no refunds.
  - (c) ❌ see Bug 1
  - (d) ✅
- **Bugs found:**
  1. Refunds are **added** to the total. `daily_total()` uses `abs(amount)`, so the two
     Jan 22 refunds (−$34.75 total) are counted as +$34.75, and the total is $69.50 too high.
     _Reproduce:_ load `sample_data/sales_jan.csv`, open the Dashboard, choose Jan 22.
- **False or unsupported claims:** the comment on `daily_total()` says "handles refunds",
  but nothing in the code does.
- **Verdict:** FAIL

> 📌 **Habits:** the Tester checked against the **real** data, not the Author's test data, and
> caught a comment that claimed something the code doesn't do. This is the kind of bug that
> gives a business owner the wrong number with no error message.

**Back to the Author:** _"Fix Bug 1. First write a test that fails because of it, then fix it."_
The new test `test_daily_total_with_refund` fails (1310.00 ≠ 1240.50). The `abs()` is removed,
and now all 5 tests pass. The Tester re-runs everything: **PASS**.

---

## 4. Docs writer

It adds **BUG-001** to `BUGLOG.md` (see the example entry in that file) and this to `DEVBOOK.md`:

```
### 2026-01-24: Daily sales dashboard (F2)
- What changed: New Dashboard page with total sales per day for a chosen month.
- Why: The owner's first question is "how did we do each day?". Totals use the signed
  amount so refunds reduce the day's total (decided after BUG-001).
- DoD and evidence:
  - [x] (a) one row per day: screenshot, 31 rows for January
  - [x] (b) Jan 22 = $1,240.50: test_jan22_total, using the real sample file
  - [x] (c) refunds reduce the total: test_daily_total_with_refund
  - [x] (d) empty day = $0.00: test_empty_day_is_zero
- Files touched: reports.py, app.py, tests/test_reports.py
- Not confirmed: A4 (amounts include tax) still not checked against a real receipt.
  CSV reload speed not measured.
- Reviewer verdict: (pending)
```

---

## 5. Reviewer (new chat)

**AI (Reviewer):**
1. Goal ✅ 2. DoD ✅ all four with evidence 3. Minimum diff ✅ 4. Stayed in lane ✅ 5. Tests ✅
6. Comments ✅ (the false "handles refunds" comment has been corrected) 7. Docs ✅
8. Honesty ✅ (A4 is recorded as unconfirmed) 9. Safety ✅
10. Business sense ✅ I re-added Jan 22 by hand from the CSV and got $1,240.50.

**Verdict: APPROVE WITH NOTES.** Note: confirm A4 with the owner before building F4 (profit).

Suggested commit:
```
F2: Daily sales dashboard

Total sales per day for a chosen month; refunds reduce the total (BUG-001).
Verified: pytest 5 passed; Jan 22 = $1,240.50 matches the CSV by hand.
```

---

## What the process caught

Without the Tester, the student would have handed in a dashboard that **overstated sales
whenever there was a refund**, with every test passing. Three habits caught it:
1. A planning question surfaced refunds (A3) as an assumption to check.
2. The Author marked (c) ⚠️ instead of claiming it worked.
3. A separate Tester checked against the real data and re-read the comments.
