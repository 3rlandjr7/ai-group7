# Shortlist

A purchase research and tracking app, built by six people with Claude.

Each thing you're shopping for is a card that moves through stages — idea, researching,
shortlisted, decided, bought, return window, owned — carrying its sources, a comparison of the
finalists, and a price table showing where it's cheapest today.

**Process:** start with [GUIDE.md](GUIDE.md); the AI follows [AGENTS.md](AGENTS.md).
Plan: [docs/PLAN.md](docs/PLAN.md). Why it's built this way: [docs/decisions/](docs/decisions/).

## Who does what
| Person | Role | Owns |
|---|---|---|
| Rene | Lead: repo, shell, styles, data layer, price fetcher. Reviews and merges PRs | `index.html`, `styles.css` |
| Camila | Co-integrator: turns artifacts into components, runs the robots.txt gate | conversions, compliance log |
| [Name] | Builds a component in free Claude + 2 research cards | purchase card tile |
| [Name] | Builds a component in free Claude + 2 research cards | comparison table |
| [Name] | Builds a component in free Claude + 2 research cards | price table + "is the sale real?" |
| [Name] | Builds a component in free Claude + 2 research cards | share-message box |

## How it fits together
- `index.html`: page shell — header, nav, footer. Loads every block from its own file.
- `styles.css`: shared colours, fonts and spacing. Everything else uses these variables.
- One file per component and one per purchase card, each with a single owner — so two people
  are never editing the same file.

## Where the prices come from
Independent Shopify and WooCommerce merchants publish their product data openly, with no key and
no sign-up, so we read it directly. Amazon, Best Buy and Walmart don't permit republishing their
prices, so those are **linked without a price** instead. The fetcher checks each site's
`robots.txt` first and logs anything it skips. See [decision 0003](docs/decisions/0003-independent-merchant-price-data.md).

## Run it locally
`python3 -m http.server 8000`, then open http://localhost:8000. Or use `/preview` in Claude Code.

## Claude Code commands
`/start` → `/add-section` → `/preview` → `/save` → `/ship`. The lead uses `/merge`. Use `/undo` if something goes wrong.
