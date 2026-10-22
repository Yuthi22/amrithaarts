# Amritha School of Dance — website

React + TypeScript + Vite rebuild of the `amritha.png` design.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production files in dist/
npm run preview    # serve the production build
```

## Where to edit

| What | File |
| --- | --- |
| All text, contact numbers, WhatsApp number, email | `src/data/site.ts` |
| LMS link (Connect LMS button) | `contact.lmsUrl` in `src/data/site.ts` |
| Facebook / YouTube / Instagram links | `contact.social` in `src/data/site.ts` |
| Class descriptions (Theory / Practical / Paper Classes) | `danceClasses` in `src/data/site.ts` |
| Gallery photos and captions | `galleryItems` in `src/data/site.ts` |
| Colours, fonts, buttons | `src/styles/global.css` |
| Each section's layout | `src/components/*.tsx` + matching `.css` |

## Images

Web-optimised copies live in `src/assets/images/`. The originals in `images/` and the
`amritha.png` design file are left untouched.

- From your `images/` folder: logo, hero procession, principal portrait, Sri Lanka's Got Talent
  banner, Eastern and Ballet class photos.
- The four "Creative Journey" card photos (`journey-*.webp`) and four gallery photos
  (`gallery-*.webp`) were cut out of the `amritha.png` mockup because they were not in
  `images/`. Replace them with real photos by saving new files under the same names.
