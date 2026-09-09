# Current personal photo assets

The first section uses `public/images/haroon-walk-sheet.png`, an AI-generated frame-based walk with empty hands and no smoking. Its implementation is in `src/lib/hero-walk.js`. It is not a filmed walking video.

The closing scene now replaces the smoking reference actor with your supplied second image: the black suit, sunglasses and hand at the jacket. The original image is copied unchanged to `public/images/haroon-finale-original.png`. Its face, clothes and pose are used directly, without regeneration. A mask generated with the built-in image tool isolates it from the embedded background at runtime, using `src/lib/finale-portrait.js`.

The finale's existing editable HAROON wordmark, scene placement, captions and motion remain. The portrait aspect ratio is preserved. Its no-WebGL fallback also uses your supplied second image.

The biography, creative-universe film, timeline and project gallery retain their previous images and behavior. The shared `profile.portrait` remains `null`.

Validation: source build, local assets, first-section compositing/pause/reduced-motion checks, and closing portrait mask compositing passed. Generated compositing previews were inspected. Browser visual and interaction testing was not performed.

## Mask prompt — built-in image tool

Create a precise foreground segmentation mask of the supplied second image. Keep the same aspect ratio, crop, scale and registration. Use solid white for the entire person, including hair, sunglasses, beard, black suit, arms, hands and trousers; use black for the surrounding lettering and red background. Preserve narrow antialiased edges. Fill the person's interior white without face or clothing details. Do not move, re-pose or extend the subject. Keep the lower edge exactly as cropped. No text, border, scenery or checkerboard.
