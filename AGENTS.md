# AGENTS.md

## Cursor Cloud specific instructions

### Project overview
This is a **dependency-free static website** — a Windows XP desktop–style personal portfolio. It is plain HTML/CSS/JS with no build system, package manager, tests, or linter. See `README.md` for file structure (entry is `index.html`; content pages live in `pages/`; styles/scripts in `assets/`).

### Running locally (dev)
Serve the repo root over HTTP so relative asset paths resolve correctly:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html`. Any static file server works; `python3` is preinstalled, so no install step is needed.

### Notes / gotchas
- There is **nothing to build, test, or lint** — the startup update script is intentionally a no-op.
- Page content is editable in-browser via the `编辑`/`保存` buttons; edits persist to `localStorage` (key `portfolio-page:<name>`), not to disk. Use `恢复默认` to clear local edits. To change content permanently, edit the HTML files directly.
- Prefer serving over HTTP rather than opening files via `file://` to avoid relative-path quirks.
