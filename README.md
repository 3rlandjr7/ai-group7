# ai-group7

Group 7's web page, built by six people with Claude.

**Process:** start with [GUIDE.md](GUIDE.md); the AI follows [AGENTS.md](AGENTS.md). Plan: [docs/PLAN.md](docs/PLAN.md).

## Who does what
| Person | Role | Section |
|---|---|---|
| [Lead] | Lead: repo, layout, styles, reviews and merges PRs | header / footer |
| [Name] | Co-integrator: turns artifacts into sections | [section] |
| [Name] | Builds a section in free Claude | hero |
| [Name] | Builds a section in free Claude | about |
| [Name] | Builds a section in free Claude | features |
| [Name] | Builds a section in free Claude | contact |

## How it fits together
- `index.html`: page shell. Loads every file in `sections/`.
- `styles.css`: shared colors, fonts and spacing.
- `sections/<name>.html`: one file per section, one owner each.

## Run it locally
`python3 -m http.server 8000`, then open http://localhost:8000. Or use `/preview` in Claude Code.

## Claude Code commands
`/start` → `/add-section` → `/preview` → `/save` → `/ship`. The lead uses `/merge`. Use `/undo` if something goes wrong.
