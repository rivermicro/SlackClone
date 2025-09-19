# Slack Clone

A polished, single-page Slack workspace experience that runs entirely in the browser using a lightweight custom React-compatible runtime. It showcases a multi-column layout with live channel switching, rich message timelines, and an interactive composer that mirrors Slack-style messaging.

## Features

- **Workspace navigation** – Starred channels, channel lists, and direct messages with presence indicators.
- **Rich conversation header** – Channel highlights, recaps, member counts, and quick actions for direct messages.
- **Message timeline** – Grouped by day with avatars, roles, reactions, and file attachments.
- **Interactive composer** – Slack-like keyboard behavior (Enter to send, Shift + Enter for new lines) plus action shortcuts.
- **Responsive styling** – High-fidelity visuals, gradient backgrounds, soft shadows, and adaptive layout down to tablet widths.

## Project structure

The app ships as static assets and relies on a minimal React-style renderer (`src/mini-react.js` and `src/mini-react-dom.js`) to support hooks and component composition without external dependencies.

```
.
├── index.html          # Entry point linking the styles and client bundle
├── src/
│   ├── App.js          # Main workspace experience and UI components
│   ├── mini-react.js   # Minimal React-compatible runtime with hooks
│   ├── mini-react-dom.js
│   ├── main.js         # Boots the application
│   └── styles.css      # Global styles and layout system
└── scripts/build.js    # Copies static assets into the dist folder
```

## Running locally

1. Use any static file server to serve the project root (for example `python -m http.server`), or simply open `index.html` directly in a modern browser.
2. The workspace loads immediately with seeded data so no backend configuration is required.

## Building

Run the build script to generate a `dist/` folder with the latest sources:

```bash
npm run build
```

The command copies `index.html`, `src/`, and supporting files into the distribution directory, making it easy to deploy the static site on any hosting platform.
