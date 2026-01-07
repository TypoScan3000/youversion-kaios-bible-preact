# KaiOS Bible App - Preact

Small, lightweight Bible app built for KaiOS using Preact.

## Architecture

Yarn workspaces monorepo with Turbo:

- `apps/` - Language-specific apps (dev, english, hindi)
- `packages/kaios-core` - Shared UI, pages, routing
- `packages/generators` - Vite manifest plugins
- `packages/offline-data` - Bible ZIPs and VOTD files
- `packages/types` - Shared TypeScript types

## Commands

```shell
yarn install        # Install dependencies
yarn dev            # Dev server at http://localhost:3000 (runs apps/dev)
yarn validate       # Lint, typecheck, test
yarn build          # Build all apps for all platforms
```

## Developer Tools

In Chrome DevTools, use responsive view at 240×296 (320px screen - 24px system tray).

## Templates

Template pages for navigation patterns. Keys `z` and `x` map to left/right soft buttons.

| Template | Path | URL |
|----------|------|-----|
| Base | [packages/kaios-core/src/pages/_template/TemplatePage.tsx](packages/kaios-core/src/pages/_template/TemplatePage.tsx) | /template |
| Tabs w/ list | [packages/kaios-core/src/pages/_template/TemplatePageTabs.tsx](packages/kaios-core/src/pages/_template/TemplatePageTabs.tsx) | /template/tabs |
| Grid | [packages/kaios-core/src/pages/_template/TemplatePageGrid.tsx](packages/kaios-core/src/pages/_template/TemplatePageGrid.tsx) | /template/grid |

## Routing

Custom hash router in [packages/kaios-core/src/routes/](packages/kaios-core/src/routes/). Routes defined in `Routes.tsx`.

## Adding a New Language App

1. Create folder in `apps/` (e.g., `apps/bengali`)
2. Copy `package.json`, `src/`, vite configs from existing app (e.g., `apps/english`)
3. Create `config.ts` - see [apps/english/config.ts](apps/english/config.ts) for example:
   - `offlineBibleVersion` - ID from [packages/offline-data](packages/offline-data/README.md)
   - `offlineVotdFile` - VOTD JSON filename
4. Copy offline data to `public/offline/`:
   - Bible ZIP from `packages/offline-data/src/bibles/`
   - VOTD JSON from `packages/offline-data/src/votd/`
5. Update `public/icons/` with app icons

## Building

Builds target 3 platforms via Turbo:

```shell
yarn build:kaios2   # KaiOS 2.x (manifest.webapp)
yarn build:kaios3   # KaiOS 3.x (manifest.webmanifest)
yarn build:jio      # JioPhone (manifest.webapp)
yarn build          # All platforms
```

Output in each app's `dist/` folder.

## Licensing

- Code: MIT (see `LICENSE`)
- Offline Bible data: CC-BY-SA 4.0 and Public Domain (see `NOTICE`)
- App icons/images in `apps/*/public/`: Not licensed for reuse
