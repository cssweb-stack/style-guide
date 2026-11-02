(() => {
const ready = () => {
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
const frame = document.querySelector('[data-type-frame]');
const slider = document.querySelector('[data-preview-size]');
if (!frame || !slider) return;
const output = document.querySelector('[data-preview-value]');
const previewCode = document.querySelector('[data-preview-code]');
const reset = document.querySelector('[data-preview-reset]');
let initialSize = 32;
const initialize = () => {
const heading = frame.contentDocument?.querySelector('h1');
if (!heading) return;
initialSize = Math.round(parseFloat(frame.contentWindow.getComputedStyle(heading).fontSize));
slider.value = String(initialSize);
output.value = initialSize + 'px';
};
frame.addEventListener('load', initialize);
if (frame.contentDocument?.readyState === 'complete') initialize();
slider.addEventListener('input', () => {
const heading = frame.contentDocument?.querySelector('h1');
if (!heading) return;
heading.style.fontSize = slider.value + 'px';
output.value = slider.value + 'px';
previewCode.textContent = ':root {\n--heading-1-size: ' + slider.value + 'px;\n}';
});
reset.addEventListener('click', () => {
const heading = frame.contentDocument?.querySelector('h1');
if (heading) heading.style.removeProperty('font-size');
slider.value = String(initialSize);
output.value = initialSize + 'px';
previewCode.textContent = 'No preview override applied.';
});
};
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',ready);
else ready();
})();
