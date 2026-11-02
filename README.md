# College Website Style Guide

Reorganized into a purpose-led homepage and dedicated reference pages. Navigation: Home, Colors, Typography, Layout, Components, Heroes, Site Shell. Heroes contains Hero Only; Hero with Label; Hero with Label and Attribution.

The guide has no sitewide hero. Only the three hero example pages show one. A shared base-layout setting, site.hero.enabled=false, controls omission; it defaults to enabled for existing sites. The two independent options showLocation and showAttribution remain available. GEO, SOC, and WGSS retain their current behavior.

## Installation on your Mac

1. From the package, replace css-shared/src/_includes/layouts/base.njk in your existing LOCAL css-shared repository. Keep the previously installed WGSS hero component update.
2. In GitHub Desktop select css-shared. Summary: Allow pages without a hero. Commit to main, then Push origin.
3. In your existing LOCAL style-guide repository, replace the ENTIRE src folder with this package’s style-guide/src folder. Do not replace the outer repository folder or .git. Shared generated files are restored automatically at build time.
4. Replace README.md if desired. All other existing root files remain unchanged.
5. In VS Code, stop the guide preview if running and restart npm run dev in the style-guide terminal. Dependencies and package.json have not changed. Local port remains 8082.
6. In GitHub Desktop select style-guide. Summary: Organize style guide into focused reference pages. Commit to main, then Push origin. Check Actions for green.

Shared first, style-guide second. GEO, SOC and WGSS need no source changes.

## What changed

The homepage explains the purpose and provides six category links. Typography separates headings/introductions, body text/links, and lists. Layout separates media rows, grids, and dividers/spacing. Components each have their own pages, including icons and the optional Bluesky reference. Site Shell documents header, navigation, search and footer, with separate graphics and maintainer reference pages.

Examples continue to use the actual shared CSS and includes. Code remains collapsed until needed. The H1 editing slider is removed: this is a reference guide rather than a design editor. Copy buttons, live palette values and spacing measurements remain. An isolated heading specimen retains a single H1 per document. Old homepage section bookmarks redirect to their new dedicated pages.

## Ownership

Shared rules: css-shared/src/common.css and shell.css. Shared markup: css-shared/src/_includes. Guide-only presentation: style-guide/src/style-guide.css. Guide content: local page folders. Navigation: src/_data/navigation.json. Unit identity: src/_data/site.json. Hero assignments: src/_data/heroes.json. The current shared base still requests geo.css; Eleventy maps local style-guide.css to that compatibility output name.

## Preview branches

Local builds read the shared folder’s checked-out files. Published builds fetch the configured repository and ref. Use a separate preview checkout/branch for experimental shared changes while published sites remain on main. This guide does not publish style changes from its browser UI.
