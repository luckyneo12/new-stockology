# Stockology

A Next.js 14 + TypeScript + TailwindCSS project for Stockology Securities.

## Requirements
- Node.js 18+
- pnpm, npm or yarn

## Getting Started
```bash
# install deps
npm install

# run dev server
npm run dev

# build
npm run build

# start production server
npm start
```

## Tech Stack
- Next.js 14 (App Router)
- React 18
- TypeScript
- TailwindCSS
- framer-motion (animations)
- MUI (some components)

## Environment
No env variables required for local development by default.

## Notes
- Most animated components are client-only. Next config transpiles motion packages to avoid SSR bundling issues on 14.2.x.
- Images are served from `public/`.

## Project Scripts
- dev: Run the Next.js dev server
- build: Production build
- start: Start production server
- lint: Lint with Next ESLint config

## Deployment
Any Node-compatible host. Build with `npm run build` and run `npm start`.

## License
Proprietary © Stockology Securities Private Limited
