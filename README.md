# Our Lady of the Snows School — Website Redesign

A modern redesign concept for [snowsnv.org](https://snowsnv.org/), the Catholic K–8 parochial school in Reno, Nevada.
This version keeps the school's existing content, photos and links and gives them a new look with 3D animation.

## Highlights

- **3D hero (three.js)**: a polished gold cross with gyroscope halo rings, light rays and falling snow (a nod to *Our Lady of the Snows*). It follows the mouse and spins in on load.
- **3D interactions throughout**: flip cards for the four Schoolwide Learning Expectations, tilt-and-glare cards, a draggable 3D photo carousel, a rotating 3D testimonial cube, and photos that tilt into place as you scroll.
- **Our Patroness section**: the story of the miraculous August snowfall and the Basilica of St. Mary Major.
- **All original pages rebuilt (55)**, with the same URL structure: Faith, Academics, Student Life, Parents, Admissions, About, Welcome Home, News, Calendar and the four news posts.
- **New features**: site-wide search (Ctrl/⌘ + K), a filterable faculty & staff directory, an upcoming-events list that hides past dates automatically, and an animated Welcome Home campaign progress ring.
- Responsive from phone to desktop, keyboard accessible, and respects `prefers-reduced-motion`.
- Brand palette taken from the school crest: royal blue and gold.

## Project structure

```
index.html, */index.html   generated pages (served as-is by GitHub Pages)
assets/css/style.css       design system and components
assets/js/main.js          interactions (tilt, reveal, carousel, cube, search, snow)
assets/js/hero3d.js        three.js hero scene
assets/img/                original school photos (resized for the web)
src/content.mjs            page content
src/nav.mjs                site navigation
src/build.mjs              static site generator
```

## Editing and rebuilding

Edit content in `src/content.mjs` (or navigation in `src/nav.mjs`), then run:

```bash
node src/build.mjs
```

To preview locally:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Notes

- PDFs (handbook, supply lists, calendars) still link to the files hosted on snowsnv.org, so they stay current.
- A few outdated external links from the original site were replaced. The Diocese of Reno moved to catholicreno.org, the Washoe County MAP PDFs now point to the NWEA Family Toolkit, and the expired Vintage Affair ticketing pages now point to the gala email and Instagram.
