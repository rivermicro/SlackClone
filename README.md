# Slack Clone

A polished Slack-style workspace built with Next.js and React. The application renders server-side using `getServerSideProps` and hydrates into a rich, multi-column chat experience with responsive layout, light/dark theming, and a fully interactive composer.

## Features

- **Sticky workspace navigation** – A translucent top bar that stays visible while you scroll, exposes the current conversation, a user summary, and a one-click light/dark theme toggle.
- **Toggable sidebar** – Channel and direct message lists live inside a scrollable sidebar that can be shown or hidden for focused reading, collapsing into an overlay on smaller screens.
- **Independent scroll regions** – Both the sidebar and conversation panel maintain their own scroll positions, mirroring the behaviour of the Slack desktop client.
- **Rich chat timeline** – Messages are grouped by day with avatars, role information, optional file attachments, and an input composer that supports Shift+Enter for new lines.
- **Optimistic sending** – Drafts submitted in the composer immediately appear in the active conversation using the signed-in user’s identity.

## Tech stack

- **Next.js 14** for server-side rendering and routing.
- **React 18** with hooks for component state and UI interactions.
- **CSS variables** to drive theming with light and dark palettes.

## Getting started

Install dependencies and launch the development server:

```bash
npm install
npm run dev
```

Navigate to `http://localhost:3000` to explore the workspace. The top navigation theme toggle is persisted to `localStorage`, and the sidebar can be toggled from the menu button next to the workspace title.

## Production build

Create an optimized build and start the SSR server:

```bash
npm run build
npm run start
```

The `getServerSideProps` handler in `src/pages/index.js` seeds workspace data and runs for every request, ensuring the initial HTML response contains the latest channel metadata and timeline content.
