# Project Plan

> Draft for Group 7's web page. Run `agents/planner.md` with the team to fill in the blanks
> marked _(TBD)_ before anyone builds a section. Leave nothing hidden in **Open questions**.

## 1. The problem
_(TBD: what the site is about, who it's for, and what a visitor should do or learn.)_

## 2. Users
| User | What they need to do | How often |
|---|---|---|
| Site visitor | _(TBD)_ | Once |
| Instructor | Grade the site and our process | Once |

## 3. Features (smallest useful version first)
Every section must also pass the **shared checks**: loads with no console errors; looks right at
desktop and phone width (375px); uses only `styles.css` colors/fonts; no `<script>` tags; links work.

| # | Feature | Owner | Must / Nice | Definition of Done (how we'll check it) |
|---|---|---|---|---|
| F1 | Page shell: header, footer, `styles.css`, section includes | Lead | Must | All 4 section slots load (placeholder text is fine); nav links scroll to each section; shared checks |
| F2 | Hero section | _(name)_ | Must | Headline + one-line pitch + one button that goes to `#contact`; shared checks |
| F3 | About section | _(name)_ | Must | _(TBD: what it must say)_; shared checks |
| F4 | Features section | _(name)_ | Must | _(TBD: e.g. 3 cards, each with a title and one sentence)_; shared checks |
| F5 | Contact section | _(name)_ | Must | _(TBD: email link / form? If a form, where does it send?)_; shared checks |
| F6 | Live on GitHub Pages | Lead | Nice | Public URL loads the same page as `/preview` |

## 4. Data
None. Static text and images in the repo.

## 5. Out of scope
Logins, databases, a backend, multiple pages, JavaScript frameworks.

## 6. Assumptions
| # | Assumption | How we'll check it | Status |
|---|---|---|---|
| A1 | One page with 4 sections (hero, about, features, contact) | Confirm with the team | unchecked |
| A2 | Plain HTML/CSS is acceptable for the assignment | Check the assignment brief | unchecked |
| A3 | Hosting on GitHub Pages | Lead decides | unchecked |
| A4 | Images we use are ours or free to use | Each owner lists the source in the PR | unchecked |

## 7. Open questions
| # | Question | Who decides | Answer |
|---|---|---|---|
| Q1 | What is the site about, and for whom? | Team | |
| Q2 | Who owns each section? | Team | |
| Q3 | Does the contact section need a working form? | Team / instructor | |
| Q4 | What's due, and when (repo, DEVBOOK, BUGLOG, reflection)? | Instructor | |

## 8. Risks
- Sections look inconsistent → `/add-section` swaps in the `styles.css` variables; the Reviewer checks.
- Merge conflicts → each person edits only their own section file.
- AI says "it works" without checking → the Tester runs in a fresh chat; no merge without a Reviewer verdict.
