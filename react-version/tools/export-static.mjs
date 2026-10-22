// One-off helper: exports icons, decorations, fonts and images from the React
// version so the plain HTML landing page needs no Node.js.
import { createServer } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

const root = 'C:/Amritha'
const out = (...p) => path.join(root, ...p)
fs.mkdirSync(out('assets/images/decor'), { recursive: true })
fs.mkdirSync(out('assets/fonts'), { recursive: true })

const server = await createServer({ root, logLevel: 'error', server: { middlewareMode: true }, appType: 'custom' })
const load = (p) => server.ssrLoadModule(p)

const React = await import('react')
const { renderToStaticMarkup } = await import('react-dom/server')
const lucide = await import('lucide-react')
const { Lotus } = await load('/src/components/decor/Lotus.tsx')
const { LotusBloom } = await load('/src/components/decor/LotusBloom.tsx')
const { LeafBranch } = await load('/src/components/decor/LeafBranch.tsx')
const { Mandala } = await load('/src/components/decor/Mandala.tsx')
const { GoldWave } = await load('/src/components/decor/GoldWave.tsx')
const brand = await load('/src/components/decor/BrandIcons.tsx')

const h = React.createElement
const inner = (html) => html.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')
const viewBox = (html) => html.match(/viewBox="([^"]+)"/)[1]

/* ---------- Icon sprite ---------- */
const lucideIcons = {
  'arrow-right': 'ArrowRight', menu: 'Menu', x: 'X', 'graduation-cap': 'GraduationCap', 'book-open': 'BookOpen',
  'scroll-text': 'ScrollText', trophy: 'Trophy', star: 'Star', presentation: 'Presentation', users: 'Users',
  heart: 'Heart', music: 'Music', palette: 'Palette', 'person-standing': 'PersonStanding', 'file-text': 'FileText',
  user: 'User', expand: 'Expand', phone: 'Phone', mail: 'Mail', 'map-pin': 'MapPin', check: 'Check',
  'chevron-left': 'ChevronLeft', 'chevron-right': 'ChevronRight',
}
const symbols = []
for (const [id, name] of Object.entries(lucideIcons)) {
  const html = renderToStaticMarkup(h(lucide[name]))
  symbols.push(`<symbol id="i-${id}" viewBox="0 0 24 24">${inner(html)}</symbol>`)
}
const lotus = renderToStaticMarkup(h(Lotus))
symbols.push(`<symbol id="i-lotus" viewBox="${viewBox(lotus)}">${inner(lotus)}</symbol>`)
for (const [id, Comp, mode] of [
  ['whatsapp', brand.WhatsAppIcon, 'fill'],
  ['facebook', brand.FacebookIcon, 'fill'],
  ['youtube', brand.YouTubeIcon, 'fill'],
  ['instagram', brand.InstagramIcon, 'stroke'],
]) {
  const body = inner(renderToStaticMarkup(h(Comp)))
  const wrap = mode === 'fill' ? '<g fill="currentColor" stroke="none">' : '<g fill="none" stroke="currentColor" stroke-width="2">'
  symbols.push(`<symbol id="i-${id}" viewBox="0 0 24 24">${wrap}${body}</g></symbol>`)
}
fs.writeFileSync(out('tools/sprite.html'), symbols.join('\n'))

/* ---------- Decoration SVG files ---------- */
const GOLD = '#c99a3c'
const toFile = (name, el) => {
  let svg = renderToStaticMarkup(el)
  const [, , w, hgt] = viewBox(svg).split(' ').map(Number)
  svg = svg
    .replace(/ class="[^"]*"/, '')
    .replace(/ aria-hidden="true"/, '')
    .replace(/ focusable="false"/, '')
    .replace(/id="[^"]+"/g, 'id="fill"')
    .replace(/url\(#[^)]+\)/g, 'url(#fill)')
    .replace('<svg', `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${hgt}" color="${GOLD}"`)
  fs.writeFileSync(out('assets/images/decor', name), svg)
}
toFile('mandala.svg', h(Mandala))
toFile('leaf-branch.svg', h(LeafBranch, { leaves: 9 }))
toFile('leaf-branch-small.svg', h(LeafBranch, { leaves: 6 }))
toFile('lotus-bloom.svg', h(LotusBloom))
toFile('lotus-bloom-filled.svg', h(LotusBloom, { filled: true }))
toFile('gold-wave.svg', h(GoldWave))

await server.close()

/* ---------- Fonts (latin subset) ---------- */
const fonts = [
  ['cinzel', 'cinzel-latin-400-normal'], ['cinzel', 'cinzel-latin-500-normal'], ['cinzel', 'cinzel-latin-600-normal'],
  ['cormorant-garamond', 'cormorant-garamond-latin-500-normal'], ['cormorant-garamond', 'cormorant-garamond-latin-600-normal'],
  ['cormorant-garamond', 'cormorant-garamond-latin-700-normal'], ['cormorant-garamond', 'cormorant-garamond-latin-700-italic'],
  ['great-vibes', 'great-vibes-latin-400-normal'],
  ['jost', 'jost-latin-400-normal'], ['jost', 'jost-latin-400-italic'], ['jost', 'jost-latin-500-normal'], ['jost', 'jost-latin-600-normal'],
]
for (const [pkg, file] of fonts) {
  fs.copyFileSync(out(`node_modules/@fontsource/${pkg}/files/${file}.woff2`), out('assets/fonts', `${file}.woff2`))
}

/* ---------- Images ---------- */
for (const f of fs.readdirSync(out('src/assets/images'))) {
  fs.copyFileSync(out('src/assets/images', f), out('assets/images', f))
}
fs.copyFileSync(out('public/favicon.png'), out('assets/images/favicon.png'))
fs.copyFileSync(out('public/apple-touch-icon.png'), out('assets/images/apple-touch-icon.png'))

console.log('symbols:', symbols.length)
console.log('decor:', fs.readdirSync(out('assets/images/decor')).join(', '))
console.log('fonts:', fs.readdirSync(out('assets/fonts')).length, 'images:', fs.readdirSync(out('assets/images')).length)
