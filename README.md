# N. Haroon Basha — cinematic portfolio

## Latest photo changes

The opening now uses a generated, frame-based non-smoking walk based on your seated photograph. The closing portrait uses the exact pixels from your supplied black-suit/sunglasses image, with a generated background mask. These changes are independent of `profile.portrait`; the other sections retain their previous media. See `HERO-UPDATE.md` and `PHOTO-UPDATES.md`. The generic photo instructions below describe the original shared-portrait option; they no longer override the customized opening or closing figures.

This is a personalized adaptation of the actual code in `cinematic-portofilo-main.zip`, retaining its WebGL scenes, local fonts, textures, videos and measured layouts. Your biography, skills, career dates, project descriptions and contact details come from the supplied resume.

## Run

Install Node.js 20 or later if needed. Open a terminal inside this folder:

```sh
npm run dev
```

Open `http://127.0.0.1:5173`. There are no third-party package dependencies to install. Do not double-click `index.html`: browser module loading needs a local HTTP server.

```sh
npm run build
npm run preview
```

The build checks JavaScript syntax, module imports, local HTML assets, duplicate IDs and section anchors, then copies the site into `build/`. Upload the **contents of `build/`** to a static web host. Keep the `public/` and `src/` paths intact.

## Add your photo

1. Add a transparent, full-body PNG as `public/images/haroon.png`. A centered subject with minimal empty padding works best. The current cinematic figures are supplied reference actors.
2. Open `src/profile.js` and change:

   ```js
   portrait: null,
   ```

   to:

   ```js
   portrait: 'public/images/haroon.png',
   ```

3. Refresh the local page. Rebuild before redeploying.

This sets the hero still, About portrait, timeline figure, gallery figure and finale figure. The hero adapter preserves the original packed-alpha compositor. A PNG gives a still portrait with the scene's movement and lighting; it does not generate walking footage. Transparent PNGs work best; an opaque image keeps its rectangular background.

**Video exception:** `public/media/universe.mp4` is a pre-rendered reference movie. Its face and tool labels are part of the video, so the portrait setting cannot replace them. Replace that movie and its `universe.jpg` poster together, or separately rebuild the procedural universe. The website labels this scene as reference imagery.

## Change content

- `index.html`: biography, readable skills/experience, contact text, header identity and links.
- `src/profile.js`: portrait setting and 12 project descriptions. Keep contact text in `index.html` synchronized if changing your contact details here.
- `src/scene/type.js`: hero wordmark (`HAROON`).
- `src/profile.js`: finale wordmark (`HAROON`).
- `src/scene3/layout3.js`: the five career milestone cards. 2022 is Freelance Work; 2025 is removed; 2026 is Integfarms My Health School, full-time.
- `src/styles/profile.css`: readable content panels and accessibility additions.
- `public/Haroon_Basha_Resume_2026.pdf`: original resume download, copied unchanged. It includes the personal details in your supplied PDF.

## Replace project images

The gallery currently uses the ZIP's sample artwork, visibly marked **Reference artwork**. Its labels and detail dialogs contain your resume-based project experience. It does not claim those sample designs are yours.

Replace the 12 `public/projects/p*.png` images with your actual work, retaining filenames and image dimensions/aspect ratios for the closest visual match. The mapping and measured placement are in `src/scene4/layout4.js`; project text uses the same array order in `src/profile.js`. If you use completely different proportions, update card geometry too.

The gallery preserves the reference's selected mobile cards. All 12 descriptions are additionally available in the readable project list below the scene.

## What matches and what changes

Preserved: the original black/red opening, condensed fonts, letter reveal, grain, chips, arrows, header drawing, creative-universe film, clock timeline geometry, project amphitheater, lighting, parallax and scene choreography.

Personalized: name, title, biography, five milestone dates, project descriptions, contact links and resume download. Readable dark sections hold information that would be too small inside the scenes. The final baked “GIREESH” image is replaced with editable live HAROON typography in the same cream/red visual treatment; it is not pixel-identical to the original smoky bitmap. The original optional second finale image is omitted because it is not personalized.

Remaining reference media: cinematic actors, universe film/tool labels and project thumbnails. Add your image and actual artwork to finish the personal imagery. There is no fabricated portrait, project result, testimonial or social profile.

## Accessibility and validation

Includes semantic resume content, a skip link, keyboard focus styles, native project dialogs, mobile navigation and a Pause motion control. The site honors reduced-motion preferences. The reference's complex scenes require WebGL; readable resume and project content remains available if rendering fails.

The source build and local HTTP/media checks were performed. Browser visual and interaction testing was not performed. Visual equivalence is based on retaining the reference implementation, not on a pixel-difference test.

## Files to keep private

`.openai/hosting.json` identifies the private Sites preview. It contains no credentials. The downloadable source package excludes the internal Git repository, generated build duplicates and hosting registration so you can use the code with your own host.
