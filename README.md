# CSS Website Style Guide

Two main reference pages: Content Components at / and Site Shell at /shell/. A separate typography specimen preserves one H1 per document. Privacy information is at /privacy/.

## Local setup on your Mac

Clone cssweb-stack/style-guide beside css-shared, geo, and soc. Copy this folder’s contents into that empty clone, including .github and .gitignore. Keep the clone’s .git folder. In VS Code use File > Add Folder to Workspace, select style-guide, then right-click that folder > Open in Integrated Terminal.

```
npm ci
npm run dev
```

The guide uses port 8082. Keep GEO on 8080 and SOC on 8081. Each site needs a running terminal only when you want its local preview.

## GitHub Pages

On the GitHub website choose style-guide > Settings > Pages > Build and deployment > Source > GitHub Actions. In GitHub Desktop select style-guide, enter “Add shared website style guide”, click Commit to main, then Publish branch or Push origin. Check Actions > Build and publish Style Guide. Intended public URL: https://cssweb-stack.github.io/style-guide/.

## Source ownership

The real component rules and includes come from cssweb-stack/css-shared. The guide adds labels, code panels and specimen frames in src/style-guide.css. The shared base layout still requests geo.css; Eleventy publishes the guide-only stylesheet under that compatibility output name. Never edit generated shared copies inside this repository.

Classes, variants and code examples document the current shared implementation. Pending changes, including funding tile text centering and centralizing remaining hero appearance settings, are called out rather than silently corrected.

## Browser-only H1 preview

The slider changes the H1 inside the typography iframe. It writes no files, makes no network calls, and does not change GEO, SOC or shared source. Reset removes its inline preview value. The suggested CSS is displayed for review, not applied globally.

## Preview branches

An online preview can use a separate shared branch by changing this guide’s shared.config.json ref. Keep GEO and SOC configured to main. Local builds use localPath or SHARED_SOURCE, not the ref: they read whichever branch is checked out in that local shared folder. For simultaneous stable and preview builds, use a separate css-shared-preview clone and point the guide’s localPath to it. Merge approved shared changes to main to release them on the next site rebuild.

Hourly workflows rebuild against the configured shared ref. GitHub schedules can be delayed. Use Actions > Build and publish Style Guide > Run workflow for a manual build.

## Current reference

Includes colors, H1-H6, tagline/lead/body text, notes, credits, six list examples including all four nesting combinations, three media widths, three- and five-column grids, all divider/spacer sizes, white divider, seven button colors, filled/outline/soft treatments, icons/arrows, seven callout colors, four mini callouts, nine tile colors, degree/date/funding/navigation tiles, three photo mats, complete/minimal faculty cards, advising, a static Bluesky card, and the shared shell ownership map. Code panels support copy with a manual fallback.

No live Bluesky account or analytics is configured. Sample portraits are generic SVG illustrations; sample contacts use example.invalid. The demonstration hero carries the existing GEO source credit.

Also includes a gallery of all 22 current shared icons, the university logo, and six shared background assets. Palette hex labels and media/divider measurements update from the loaded styles in the browser.
