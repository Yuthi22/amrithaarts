# Amritha School of Dance — landing page

A plain HTML + CSS + JavaScript landing page. No Node.js, no build step, no backend.

## Open it

Double-click **`index.html`**. It opens in your browser and everything works (menu, class
popups, gallery, photo viewer).

To view it at `http://localhost:5173` instead (optional), run this in PowerShell; Java is
already installed on this PC:

```powershell
& 'C:\Program Files\Java\jdk-24\bin\jwebserver.exe' -d C:\Amritha -b 127.0.0.1 -p 5173
```

## Files

| File | What it is |
| --- | --- |
| `index.html` | All page content: text, sections, footer, popups, gallery photos |
| `assets/css/style.css` | All styling: colours, fonts, layout, mobile sizes |
| `assets/js/main.js` | Menu, popups, gallery and photo viewer |
| `assets/images/` | Website photos and gold decorations |
| `assets/fonts/` | Fonts (stored locally, so they work offline) |
| `images/`, `amritha.png` | Your original photos and design — untouched |
| `react-version/` | Backup of the earlier React version (needs Node.js). Safe to delete if you don't need it. |

## Common edits

- **Text** — edit it directly in `index.html`.
- **WhatsApp number, LMS link, class popup text** — top of `assets/js/main.js`
  (`WHATSAPP_NUMBER`, `LMS_URL`, `CLASSES`). Phone/WhatsApp links in `index.html` use the same numbers.
- **Facebook / YouTube / Instagram** — in the footer of `index.html`, replace
  `<span class="is-disabled" ...>` with `<a href="YOUR-LINK" target="_blank" rel="noopener noreferrer" aria-label="Facebook">`
  (and the closing `</span>` with `</a>`).
- **Gallery photos** — add/remove items in the "Full gallery" popup near the bottom of `index.html`;
  the photo viewer picks them up automatically.
- **Hero slideshow** — the slides are in the `hero__slides` block at the top of `index.html`
  (slide 1: procession, slide 2: `hero-stage.webp`). Images change every 4 seconds, and also when
  the mouse moves onto the hero (swipe on phones). To add a slide, copy a `<div class="hero__slide">`
  block. Change the timing with `HERO_INTERVAL` at the top of `assets/js/main.js` (4000 = 4 seconds).
- **Colours** — the `:root` block near the top of `assets/css/style.css`.

Still cut out of the `amritha.png` mockup: the Arts card photo (`journey-arts.webp`). Replace it with
a real photo by saving a new file under the same name (or update the file name in `index.html`).

The first four photos in the "Full gallery" popup are also the four thumbnails shown on the page —
keep the `data-open-photo` numbers in order (0, 1, 2 …) when you add or remove photos.

## Putting it online

Upload the whole folder (or just `index.html` and `assets/`) to any static host —
Netlify Drop, GitHub Pages, Cloudflare Pages or regular web hosting. No server code is needed.
