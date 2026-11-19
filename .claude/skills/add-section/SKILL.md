---
name: add-section
description: Turn a teammate's Claude artifact into a section of the site. Paste the artifact's code or share link after the command.
disable-model-invocation: true
---

# /add-section <name> <code or link>

1. The section must be one of the planned ones in CLAUDE.md (hero, about, features, contact). If it isn't, stop and tell the user to ask the lead.
2. Get the code. If the user gave a link you can't open, ask them to paste the code.
3. If they're not on a branch for this, run the `/start` steps with topic `<name>`.
4. Copy this section's Definition of Done from docs/PLAN.md and list your assumptions before changing anything.
5. Clean it up to fit the site:
   - Keep only the section markup. Remove `<html>`, `<head>`, `<body>`, headers, footers and navigation.
   - Wrap it in `<section id="<name>">`, and scope all its CSS under `#<name>`.
   - Replace hard-coded colors and fonts with the variables from `styles.css`.
   - Remove `<script>` tags and external libraries, and tell the user what was removed.
6. Save it to `sections/<name>.html`. If the file already has real content (not the placeholder), show what would change and ask before overwriting.
7. Run the `/preview` steps and check the section at phone width (375px) and desktop width. Mark each DoD item ✅ / ❌ / ⚠️.
8. Run `/save` with the message "Add <name> section" (or "Update <name> section").
9. Report what changed from the original artifact in one or two lines. Say "ready for the Tester", not "done".
