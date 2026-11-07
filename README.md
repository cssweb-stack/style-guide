# College Website Style Guide

This site reads shared CSS, templates, assets, and configuration directly from the sibling `css-shared` repository. Its configuration and navigation live in `css-shared/src/data/units/style-guide/`.

## Where to edit

- Page content: `src/<page>/index.html`.
- Banners: `src/banners/image-banner.html`, `banner-with-label.html`, and `banner-with-label-and-credit.html`.
- Grids: `src/grids/equal.html`, `left-sidebar.html`, and `right-sidebar.html`.
- Components: `src/components/`.
- Shared document shell: `src/includes/base.njk` forwards to the authoritative shared base template.
- Header/footer comparison shell: `src/includes/comparison.njk`.
- Guide-only presentation: `src/css/style-guide.css` (color chips, comparison spacing, and demo sizing; uses the shared palette).
- Color-chip value labels: `src/assets/colors.js`.
- Local demo media: `src/media/`.

Source filenames and browser URLs are independent: explicit page permalinks keep existing URLs working, including `/layout/grids/`.

## Local commands

- `npm run dev`: watch and serve on port 8082.
- `npm run shared:check`: validate the shared-source connection and selected configuration.
- `npm run clean`: remove generated output.
- `npm run build`: regenerate `_site`.

Keep `scripts/`, `eleventy.config.js`, `shared.config.json`, `package.json`, and `package-lock.json`; they support the build. `node_modules/`, `_site/`, and `.shared-state.json` are generated and ignored by Git. Do not edit generated pages.

The style guide is excluded from the 13-unit header/footer comparisons. Those comparisons use the actual shared templates and each unit's data.
