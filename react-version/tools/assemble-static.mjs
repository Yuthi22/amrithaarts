// One-off helper: injects the icon sprite into index.html and merges the
// component stylesheets into a single assets/css/style.css.
import fs from 'node:fs'

const root = 'C:/Amritha'
const read = (p) => fs.readFileSync(`${root}/${p}`, 'utf8')

/* ---------- Icon sprite ---------- */
let html = read('index.html')
if (html.includes('<!-- ICON SPRITE -->')) {
  const sprite = read('tools/sprite.html')
    .split('\n')
    .map((line) => '      ' + line)
    .join('\n')
  html = html.replace('      <!-- ICON SPRITE -->', sprite)
  fs.writeFileSync(`${root}/index.html`, html)
}

/* ---------- Stylesheet ---------- */
const fonts = [
  ['Cinzel', 400, 'normal', 'cinzel-latin-400-normal'],
  ['Cinzel', 500, 'normal', 'cinzel-latin-500-normal'],
  ['Cinzel', 600, 'normal', 'cinzel-latin-600-normal'],
  ['Cormorant Garamond', 500, 'normal', 'cormorant-garamond-latin-500-normal'],
  ['Cormorant Garamond', 600, 'normal', 'cormorant-garamond-latin-600-normal'],
  ['Cormorant Garamond', 700, 'normal', 'cormorant-garamond-latin-700-normal'],
  ['Cormorant Garamond', 700, 'italic', 'cormorant-garamond-latin-700-italic'],
  ['Great Vibes', 400, 'normal', 'great-vibes-latin-400-normal'],
  ['Jost', 400, 'normal', 'jost-latin-400-normal'],
  ['Jost', 400, 'italic', 'jost-latin-400-italic'],
  ['Jost', 500, 'normal', 'jost-latin-500-normal'],
  ['Jost', 600, 'normal', 'jost-latin-600-normal'],
]
const fontFaces = fonts
  .map(
    ([family, weight, style, file]) =>
      `@font-face {\n  font-family: '${family}';\n  font-style: ${style};\n  font-weight: ${weight};\n  font-display: swap;\n  src: url('../fonts/${file}.woff2') format('woff2');\n}`,
  )
  .join('\n\n')

const parts = [
  ['Base: colours, fonts, buttons, helpers', 'src/styles/global.css'],
  ['Header & mobile menu', 'src/components/Header.css'],
  ['Hero', 'src/components/Hero.css'],
  ['Meet our principal', 'src/components/Principal.css'],
  ['Teaching philosophy & creative journey', 'src/components/Programmes.css'],
  ['Popups (shared)', 'src/components/ui/Modal.css'],
  ['Classes', 'src/components/Classes.css'],
  ['Class details popup', 'src/components/ClassModal.css'],
  ['Achievements & gallery preview', 'src/components/Highlights.css'],
  ['Gallery popup & photo viewer', 'src/components/Gallery.css'],
  ['Footer', 'src/components/Footer.css'],
  ['Connect LMS popup', 'src/components/LmsModal.css'],
]

const banner = (title) => `\n/* ==========================================================================\n   ${title}\n   ========================================================================== */\n\n`

const icons = `.icon-sprite {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

/* Icons are drawn with <svg class="icon"><use href="#i-name" /></svg>.
   Line thickness can be changed per icon with style="--sw: 1.5". */
.icon {
  fill: none;
  stroke: currentColor;
  stroke-width: var(--sw, 2);
  stroke-linecap: round;
  stroke-linejoin: round;
}

.lotus {
  --sw: 1.4;
}

.menu-toggle__close {
  display: none;
}

.menu-toggle[aria-expanded='true'] .menu-toggle__open {
  display: none;
}

.menu-toggle[aria-expanded='true'] .menu-toggle__close {
  display: block;
}
`

let css = `/* Amritha School of Dance — landing page styles */\n${banner('Fonts (stored locally in assets/fonts)')}${fontFaces}\n`
for (const [title, file] of parts) {
  css += banner(title) + read(file).replace(/^\/\* =+[\s\S]*?=+ \*\/\n\n/, '').trim() + '\n'
}
css += banner('Icons') + icons

fs.mkdirSync(`${root}/assets/css`, { recursive: true })
fs.writeFileSync(`${root}/assets/css/style.css`, css)
console.log('style.css lines:', css.split('\n').length, '| sprite injected:', !read('index.html').includes('<!-- ICON SPRITE -->'))
