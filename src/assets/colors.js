// Display the actual shared color value beneath each chip.
(() => {
const ready = () => {
for (const swatch of document.querySelectorAll('.sg-swatch')) {
const rgb = getComputedStyle(swatch.querySelector('.sg-swatch-color')).backgroundColor;
const channels = rgb.match(/\d+/g);
const label = swatch.querySelector('[data-color-value]');
if (label && channels?.length >= 3) label.textContent = '#' + channels.slice(0,3).map(n => Number(n).toString(16).padStart(2,'0')).join('');
}
};
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
else ready();
})();
