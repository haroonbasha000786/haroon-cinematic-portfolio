Generated with the built-in image-generation tool, using the user's `haroon.jpg` as the identity reference.

## Walk-pose generation

Use case: identity-preserve.
Asset type: a photorealistic WALK CYCLE SPRITE SHEET for a website foreground actor.
Reference image: the attached seated photograph is the identity and clothing reference of the consenting user. Preserve his facial identity, Indian skin tone, hair shape, beard, mustache and realistic proportions closely.
Create ONE transparent PNG with EXACTLY 8 equal-size cells in a 4-column by 2-row grid, no lines between cells and no labels. The entire image is a wide 3:2 rectangle. Each cell is a tall portrait with identical camera, subject scale and lighting; every cell shows this SAME man from head to both shoes, centered with feet on the same baseline and a little margin around head and feet. Transparent alpha background in ALL cells, no fake checkerboard, no floor or cast shadows. Suggested total size 3072x2048 pixels.
Content: a normal relaxed walk toward the camera, with both arms swinging naturally low at the sides and EMPTY HANDS. Absolutely NO cigarette, smoke, vapor, smoking gesture, or hand raised to face. He wears his reference white and blue-gray geometric-pattern button-down shirt with sleeves rolled, light gray trousers and simple dark shoes. The source chair and green room must disappear. Complete the unseen lower legs and shoes naturally.
Sequential frames in reading order, equally spaced phases of a single seamless gait cycle: 1 left foot forward right arm forward; 2 left foot plants and right heel lifts; 3 right foot passes under hips; 4 right foot swings forward; 5 right foot forward left arm forward; 6 right foot plants and left heel lifts; 7 left foot passes under hips; 8 left foot swings forward leading naturally back to frame 1. Small realistic front-view limb movements. Facial expression calm and confident looking toward camera, same head and torso size and position in all cells. Do not translate the whole person within the cells. Keep face and shirt identical across poses.
Lighting: clean soft neutral cinematic frontal light with restrained warm/red edge light suitable for placing over a black-and-red portfolio. Photographic natural texture, sharp face, no cartoon rendering. Do not add any text, website UI, scenery, furniture or objects. Critical: exactly eight separate non-overlapping complete figures, four columns and two rows, consistent registration, real transparency.

## Background correction

Edit only the background of the eight-frame walking sprite sheet. Keep all figures, faces, poses, clothing and the 4-column by 2-row registration unchanged. Replace the checkerboard with flat RGB(0,255,0) chroma green, including gaps between arms and body and between legs. No shadows, texture, grid lines or text. Preserve empty hands, with no smoke or cigarette. The website removes this green background at runtime.

The first generated file had an opaque checkerboard instead of an alpha channel. The final asset uses a green background and explicit runtime chroma keying; it is not described as a transparent source PNG.
