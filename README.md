# College Website Style Guide

The guide reads css-shared directly. Shared CSS, templates, logos, university settings and unit data are not copied into its source.

Guide settings, navigation and example datasets originate in css-shared/src/data/sites/style-guide/. Real unit records remain in css-shared/src/data/units/.

Navigation begins with Home, Headers and Footers. All remaining navigation items retain their previous order. Headers is a placeholder. Footers renders the actual shared footer for each unit, sorted by shortName, with unique headings and language IDs. The shared footer explicitly uses each unit’s horizontal white logo from logo.variants.whiteHorz.

The existing 22 non-home page sources are unchanged. Their older imports resolve through the compatibility loader; retired divider/spacing fragments remain under src/includes/legacy for those examples. Those examples and their guidance still await review.

The guide stylesheet bundles shared common.css plus its own src/css/style-guide.css. common.css in generated output is a compatibility alias for the standalone typography specimen. Department-specific graphics and sample photos belong to this guide's media folder.

Preview runs on port 8082. Dependencies are installed with npm ci. The node_modules directory is generated locally and excluded from the delivered source and Git.

Validation: 25-page clean build; root and /style-guide/ paths; all local href/src references resolve; 13 footers in order; one Footers H1; unique IDs and valid aria-labelledby references; live rebuild after shared unit-data edits; shared checks pass; no JSON copied into source/output. Browser visual review and publication have not been performed.
