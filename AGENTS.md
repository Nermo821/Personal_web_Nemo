# AGENTS.md

## Cursor Cloud specific instructions

This repository is a **fully static website** (Windows XP desktop–style personal portfolio). It is plain HTML + CSS + vanilla JS with **no package manager, no build step, and no dependencies** to install.

### Structure
- `index.html` — desktop entry point (icons, start menu, taskbar).
- `pages/*.html` — content pages (`about`, `projects`, `resume`, `contact`).
- `assets/styles.css` — all styling.
- `assets/desktop.js` — desktop/start-menu/taskbar/window interactions.
- `assets/editor.js` — in-page content editing, saved to browser `localStorage`.

### Run (development)
Serve the repo root over HTTP (do NOT just open `file://`, because JS uses relative asset paths and `localStorage`):
```
python3 -m http.server 8000
```
Then open `http://localhost:8000/index.html`. Node is also available if you prefer `npx serve`.

### Lint / Test / Build
- There is **no build, no lint config, and no automated test suite** in this repo. "Building" is unnecessary — the served files are the deliverable.
- Verify changes by serving the site and checking pages in the browser (HTTP 200 on `index.html` and `pages/*.html`).

### Gotchas
- The "编辑/保存" (Edit/Save) feature persists content to the visitor's `localStorage` only; it does NOT write back to the HTML files. To change site source permanently, edit the HTML directly.
- Each editable page uses a unique `data-editable-page` key for its `localStorage` entry — keep these unique when adding pages.
