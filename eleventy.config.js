import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import nunjucks from 'nunjucks';
import { checkShared, loadUnit, loadUH, loadCommon } from './scripts/shared-source.mjs';
const project = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.join(project, 'src');
export default function(eleventyConfig) {
// Diagnostic: use full page reloads while investigating disappearing examples.
eleventyConfig.setServerOptions({ domDiff: false });
const sharedRoot = checkShared();
const sharedDir = path.join(sharedRoot, 'src');
const sharedIncludes = path.join(sharedDir, 'includes');
// Resolve old specimen imports without copying shared templates into this project.
const aliases = {};
function mapIncludes(directory) {
for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
const absolute = path.join(directory, entry.name);
if (entry.isDirectory()) mapIncludes(absolute);
else if (entry.name.endsWith('.njk')) aliases['components/' + entry.name] = path.relative(sharedIncludes, absolute).split(path.sep).join('/');
}
}
mapIncludes(sharedIncludes);
class GuideLoader extends nunjucks.FileSystemLoader {
getSource(name) {
if (name.startsWith('icons/')) name = 'media/' + name;
if (/^components\/(?:divider|space)-/.test(name)) name = 'legacy/' + path.basename(name);
return super.getSource(aliases[name] || name);
}
}
const environment = new nunjucks.Environment(new GuideLoader([sharedIncludes, sharedDir, path.join(sourceDir, 'includes')], { noCache: true }), { autoescape: false });
eleventyConfig.setLibrary('njk', environment);
const eventDate = createRequire(import.meta.url)(path.join(sharedIncludes, 'layouts/events/event-date.cjs'));
eleventyConfig.addFilter('eventDate', eventDate);
eleventyConfig.addFilter('contactFaculty', people => people.filter(person => person.contactOrder).sort((a, b) => a.contactOrder - b.contactOrder));
eleventyConfig.addFilter('telephone', value => String(value || '').replace(/[^\d+]/g, ''));
eleventyConfig.addFilter('navIconColor', name => {
const palette = { blue: 'var(--color-blue)', gold: 'var(--color-gold)', teal: 'var(--color-teal)', purple: 'var(--color-purple)', gray: 'var(--mid-gray)' };
if (!palette[name]) throw new Error(`Unknown navigation icon color: ${name}`);
return palette[name];
});
eleventyConfig.addGlobalData('common', () => loadCommon());
eleventyConfig.addFilter('url', value => {
let url = String(value || '');
url = url.replace(/^\/_media\/heros\//, '/media/heroes/').replace(/^\/_media\/examples\//, '/media/examples/').replace(/^\/_media\/other\/contour-lines.svg$/, '/media/backgrounds/contour-lines.svg').replace(/^\/_media\/branding\/favicon\//, '/media/branding/favicon/').replace(/^\/_media\/branding\/(uh-manoa-logo-white|geo-logo-white)\.svg$/, (_, name) => '/media/branding/logos/' + (name === 'geo-logo-white' ? 'geo-logo-vert-white' : name) + '.svg').replace(/^\/_media\/branding\//, '/media/branding/backgrounds/').replace(/^\/assets\/icons\//, '/media/icons/').replace(/^\/assets\/(site|bluesky-feed)\.js$/, '/assets/js/$1.js');
const prefix = (process.env.SITE_PATH_PREFIX || '/').replace(/\/$/, '');
return url.startsWith('/') && !url.startsWith('//') ? prefix + url : url;
});
eleventyConfig.addGlobalData('footerUnits', () => {
const directory = path.join(sharedDir, 'data/units');
return fs.readdirSync(directory, { withFileTypes: true }).filter(entry => entry.isDirectory() && fs.existsSync(path.join(directory, entry.name, 'unit-details.json'))).map(entry => {
const unit = path.join(directory, entry.name);
return { key: entry.name, site: JSON.parse(fs.readFileSync(path.join(unit, 'unit-details.json'), 'utf8')), social: fs.existsSync(path.join(unit, 'social.json')) ? JSON.parse(fs.readFileSync(path.join(unit, 'social.json'), 'utf8')) : { links: [] } };
}).sort((a, b) => a.site.shortName.localeCompare(b.site.shortName, 'en', { sensitivity: 'base' }));
});
// Reuse the footer comparison's unit selection, ordering, and identity records.
eleventyConfig.addFilter('headerExamples', units => units.map(unit => {
const directory = path.join(sharedDir, 'data/units', unit.key);
const search = JSON.parse(fs.readFileSync(path.join(directory, 'search.json'), 'utf8'));
return {
...unit,
site: {
...unit.site,
search
},
navigation: JSON.parse(fs.readFileSync(path.join(directory, 'navigation.json'), 'utf8'))
};
}));
eleventyConfig.addGlobalData('uh', () => loadUH());
eleventyConfig.addGlobalData('eleventyComputed', {
canonicalUrl: data => (data.site.canonicalSections || []).some(prefix => data.page.url.startsWith(prefix)) ? data.site.url + data.page.url : undefined
});
for (const key of Object.keys(loadUnit())) eleventyConfig.addGlobalData(key, () => loadUnit()[key]);
// Preserve established page variable names while filenames become descriptive.
eleventyConfig.addGlobalData('students', () => loadUnit().graduate_students);
eleventyConfig.addGlobalData('lectures', () => loadUnit().events);
eleventyConfig.setUseGitIgnore(false);
eleventyConfig.addWatchTarget(path.relative(project, sharedDir).split(path.sep).join('/'), { resetConfig: true });
eleventyConfig.addWatchTarget('src/**/*.css');
eleventyConfig.on('eleventy.before', async () => {
checkShared();
// Resolve source-relative assets to copied public paths, including project-prefix-safe CSS URLs.
await build({
absWorkingDir: project,
stdin: {
contents: `@import ${JSON.stringify(path.join(sharedDir, 'css/common.css'))};\n@import "./css/style-guide.css";`,
resolveDir: sourceDir,
sourcefile: 'department-bundle.css',
loader: 'css'
},
outfile: path.join(project, '_site/style-guide.css'),
bundle: true,
minify: true,
charset: 'utf8',
logLevel: 'info',
plugins: [{
name: 'copied-public-assets',
setup(builder) {
builder.onResolve({ filter: /.*/ }, args => {
if (args.kind !== 'url-token') return;
if (/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(args.path)) return { path: args.path, external: true };
const split = args.path.search(/[?#]/);
const assetPath = split < 0 ? args.path : args.path.slice(0, split);
const suffix = split < 0 ? '' : args.path.slice(split);
const absolute = path.resolve(args.resolveDir, assetPath);
if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) throw new Error(`Missing CSS asset: ${absolute}`);
const owner = [sharedDir, sourceDir].find(root => absolute.startsWith(root + path.sep));
if (!owner) throw new Error(`CSS asset is outside shared and department source: ${absolute}`);
const relative = path.relative(owner, absolute).split(path.sep).join('/');
if (!/^(?:assets|media)\//.test(relative)) throw new Error(`CSS assets must live under assets or media: ${relative}`);
return { path: './' + relative + suffix, external: true };
});
}
}]
});
// Retain the standalone typography specimen's existing stylesheet URL.
fs.copyFileSync(path.join(project, '_site/style-guide.css'), path.join(project, '_site/common.css'));
});
// Publish images/fonts/scripts only; JSON, templates and helper modules stay private to the build.
for (const root of [sharedDir, sourceDir]) {
for (const folder of ['assets', 'media']) {
if (fs.existsSync(path.join(root, folder))) eleventyConfig.addPassthroughCopy({ [path.relative(project, path.join(root, folder)).split(path.sep).join('/')]: folder }, { filter: relative => !/(?:^|[\\/])(?:\.DS_Store|\._[^/]*|README\.md)$/.test(relative) });
}
}
return {
pathPrefix: process.env.SITE_PATH_PREFIX || '/',
dir: { input: 'src', includes: 'includes', layouts: 'includes', data: 'data', output: '_site' },
htmlTemplateEngine: 'njk',
markdownTemplateEngine: 'njk',
templateFormats: ['html', 'njk', 'md']
};
}
