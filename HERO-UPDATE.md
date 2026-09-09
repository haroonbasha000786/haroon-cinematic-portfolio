# First-section photo update

Only the opening figure has changed. The first section uses an AI-generated, eight-pose, frame-based walk derived from Haroon's supplied photograph. It has empty hands, no cigarette and no smoke. It is a stylized photographic animation, not newly filmed footage or a full-motion video face swap.

The existing hero typography, backdrop, lighting, reveal and page layout are preserved. About, universe video, timeline, project gallery and finale retain their previous images and behavior. The shared `profile.portrait` setting remains `null`, so this update does not propagate the face into other scenes.

- `public/images/haroon-walk-sheet.png`: generated eight-pose source asset. Its green backdrop is keyed out in the browser.
- `src/lib/hero-walk.js`: hero-only compositing, pose registration and walk playback.
- `src/main.js`: uses the new hero clip.
- `HERO-IMAGE-PROMPTS.md`: generation prompts used with the built-in image tool.

For a fully natural filmed walk, replace this generated sequence with a short, full-body recording of Haroon walking normally, with no cigarette, against a plain backdrop. That is a separate media replacement; the current change is frame-based.

Run `npm run dev` and refresh the page to see the update. Rebuild with `npm run build` before hosting.
