# KaiOS Bible App - Preact

Small, lightweight Bible app built for KaiOS using Preact.

## Getting Started

### Commands

```shell
# Install dependencies
yarn install

# Run dev server at http://localhost:3000
yarn dev

# Lint & typecheck
yarn validate
```

### Developer Tools

In Chrome, after opening developer tools click the "responsive" view and set the size to 240 width x 296 height (320 screen size - 24px system tray).

## Templates

Several template pages exist to get started with using the ui and navigation controls. `z` and `x` are mapped to left and right "soft" buttons, respectively.

- [Base](src/pages/_template/TemplatePage.tsx): http://localhost:3000/template
- [Tabs w/ list](src/pages/_template/TemplatePageTabs.tsx): http://localhost:3000/template/tabs
- [Grid](src/pages/_template/TemplatePageGrid.tsx): http://localhost:3000/template/grid

## Routing

Routes are defined in [src/app.tsx](src/app.tsx). See the [Preact ISO router docs](https://preactjs.com/guide/v10/preact-iso#route) for info on adding routes and path matching.

## Bundles

To add a new bundle:

1. Create a folder in the appropriate place in `_distribution/app-bundles`.
2. Ensure icons, manifest, and other files required by the platform are included.
3. If a new offline bible version is needed, add it to `_distribution/offline`.
4. If adding a new locale, update `/_distribution/config.ts`.
5. Add a bundle config inside vite.config.ts
6. If needed, create a new tsconfig with necessary deviations from base.
7. Finally, set up the bundle build script in package.json

### KaiOS 2

- One `manifest.webapp` with array of locales

### KaiOS 3

- One `manifest.webmanifest` per locale

## Licensing

- Code in this repository is licensed under MIT (see `LICENSE`).
- Offline Bible data includes CC-BY-SA 4.0 bundles (IDs 1883, 1884, 1885, 1895, 1898, 1899, 1910, 1911, 1912, 1979, 1980, 2743) and Public Domain bundles (IDs 206, 819). See `NOTICE` for details and attribution requirements.
- App icons and images in `apps/*/public/icons` and `apps/*/public/resources` are project assets and are not licensed for reuse without permission.
