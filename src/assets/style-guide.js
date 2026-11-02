(() => {
const ready = () => {
const oldSections = {"palette": "/colors/", "typography": "/typography/headings/", "lists": "/typography/lists/", "media-rows": "/layout/media-rows/", "grids": "/layout/grids/", "dividers": "/layout/dividers-and-spacing/", "buttons": "/components/buttons/", "callouts": "/components/callouts/", "tiles": "/components/tiles/", "frames": "/components/photo-frames/", "profiles": "/components/faculty-profiles/", "advising": "/components/advising/", "icons": "/components/icons/", "bluesky": "/components/bluesky/", "graphics": "/shell/graphics/", "ownership": "/reference/where-to-edit/"};
const oldHash = window.location.hash.slice(1);
if (document.querySelector('[data-guide-home]') && oldSections[oldHash]) {
const home = document.querySelector('[data-guide-home]').href;
window.location.replace(home + oldSections[oldHash].replace(/^\//, '') + '#' + oldHash);
return;
}

for (const button of document.querySelectorAll('[data-copy-code]')) {
button.addEventListener('click', async () => {
const code = button.closest('.sg-code').querySelector('code').textContent;
const status = button.closest('.sg-code').querySelector('[role="status"]');
try {
if (navigator.clipboard && window.isSecureContext) {
await navigator.clipboard.writeText(code);
} else {
const field = document.createElement('textarea');
field.value = code;
field.setAttribute('readonly', '');
field.style.position = 'fixed';
field.style.opacity = '0';
document.body.append(field);
field.select();
let copied = false;
try { copied = document.execCommand('copy'); }
finally { field.remove(); }
if (!copied) throw new Error('Clipboard unavailable');
}
status.textContent = 'Copied.';
} catch {
status.textContent = 'Select the code below and copy it manually.';
}
});
}
for (const swatch of document.querySelectorAll('.sg-swatch')) {
const rgb = getComputedStyle(swatch.querySelector('.sg-swatch-color')).backgroundColor;
const channels = rgb.match(/\d+/g);
const label = swatch.querySelector('[data-color-value]');
if (label && channels?.length >= 3) label.textContent = '#' + channels.slice(0,3).map(n => Number(n).toString(16).padStart(2,'0')).join('');
}
for (const node of document.querySelectorAll('[data-token]')) {
const value = getComputedStyle(document.documentElement).getPropertyValue(node.dataset.token).trim();
if (value) node.textContent = value;
}
for (const frame of document.querySelectorAll('[data-type-frame]')) {
const resize = () => {
const body = frame.contentDocument?.body;
if (body) frame.style.height = Math.ceil(body.getBoundingClientRect().height) + 2 + 'px';
};
frame.addEventListener('load', () => {
resize();
const body = frame.contentDocument?.body;
if (body && typeof ResizeObserver !== 'undefined') new ResizeObserver(resize).observe(body);
});
if (frame.contentDocument?.readyState === 'complete') resize();
}
};
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
else ready();
})();
