---
name: preview
description: Run the site locally and get a link to check it in your browser.
disable-model-invocation: true
---

# /preview

1. Check `python3` is installed. If not, explain how to install it and stop.
2. From the repo root, start a server in the background: `python3 -m http.server 8000`. If port 8000 is busy, use 8001.
3. Give the user the link: http://localhost:8000
4. Check every include loads: request `index.html` and each `sections/*.html` and report any 404s. Ask the user to look for "Couldn't load" messages and to check phone width (browser dev tools → 375px).
5. When they're done, stop the server.
