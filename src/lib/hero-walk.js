// A relaxed, planted pose from the approved suit image; no regenerated face.
const SHEET = 'public/images/haroon-suit-walk-sheet.png';

export async function heroWalkClip() {
  const image = new Image();
  image.src = SHEET;
  await image.decode();
  const w = image.naturalWidth / 4;
  const h = image.naturalHeight / 2;
  if (!Number.isInteger(w) || !Number.isInteger(h)) throw new Error('Invalid hero walk grid');

  const scratch = document.createElement('canvas');
  scratch.width = w; scratch.height = h;
  const ctx = scratch.getContext('2d', { willReadFrequently: true });
  const packed = document.createElement('canvas');
  packed.width = w * 2; packed.height = h;
  const out = packed.getContext('2d');
  const frames = [];

  for (const frame of [2]) {
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(image, (frame % 4) * w, Math.floor(frame / 4) * h, w, h, 0, 0, w, h);
    const pixels = ctx.getImageData(0, 0, w, h);
    // Chroma dominance preserves the navy suit, white shirt and skin.
    // The source itself remains unchanged; compositing happens at runtime.
    let top = h, headMass = 0, headX = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const r = pixels.data[i], g = pixels.data[i + 1], b = pixels.data[i + 2];
        const excess = g - Math.max(r, b);
        const alpha = 1 - Math.min(1, Math.max(0, (excess - 12) / 65));
        pixels.data[i + 3] = Math.round(alpha * 255);
        if (excess > 12) pixels.data[i + 1] = Math.min(g, Math.max(r, b) + 8);
        if (alpha > .8) top = Math.min(top, y);
      }
    }
    // Register the head across all poses so the face does not jump sideways.
    for (let y = top; y < Math.min(h, top + h * .14); y++) {
      for (let x = 0; x < w; x++) {
        const alpha = pixels.data[(y * w + x) * 4 + 3] / 255;
        headMass += alpha; headX += x * alpha;
      }
    }
    ctx.putImageData(pixels, 0, 0);
    const normalized = document.createElement('canvas');
    normalized.width = w; normalized.height = h;
    const nc = normalized.getContext('2d', { willReadFrequently: true });
    nc.drawImage(scratch, Math.round(w / 2 - headX / Math.max(headMass, 1)), Math.round(h * .025 - top));
    const color = nc.getImageData(0, 0, w, h);
    const mask = nc.createImageData(w, h);
    for (let i = 0; i < color.data.length; i += 4) {
      const alpha = color.data[i + 3];
      mask.data[i] = mask.data[i + 1] = mask.data[i + 2] = alpha;
      mask.data[i + 3] = 255;
      color.data[i + 3] = 255;
    }
    const texture = document.createElement('canvas');
    texture.width = w * 2; texture.height = h;
    const tc = texture.getContext('2d');
    tc.putImageData(color, 0, 0); tc.putImageData(mask, w, 0);
    frames.push(texture);
  }

  let elapsed = 0, resumed = 0, playing = false, previous = -1;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches || new URLSearchParams(location.search).get('motion') === 'off';
  const paint = (time) => {
    const seconds = time / 1000;
    const settle = Math.min(1, seconds / 2);
    // A visible but restrained shift (about 5px at the head in this texture).
    // Keep the ankle pivot fixed and transform the original portrait intact.
    const angle = reduced ? 0 : settle * (.009 * Math.sin(seconds * Math.PI * 2 / 5.6)
      + .0015 * Math.sin(seconds * Math.PI * 2 / 9.7));
    out.fillStyle = '#000'; out.fillRect(0, 0, w * 2, h);
    for (let half = 0; half < 2; half++) {
      out.save();
      out.beginPath(); out.rect(half * w, 0, w, h); out.clip();
      out.translate(half * w + w / 2, h * .97);
      out.rotate(angle);
      out.drawImage(frames[0], half * w, 0, w, h, -w / 2, -h * .97, w, h);
      out.restore();
    }
  };
  paint(0);
  return {
    el: packed, w, h, ready: true, isPhoto: true, isRelaxedPortrait: true,
    whenReady: async () => {},
    play: async () => { if (!reduced && !playing) { resumed = performance.now(); playing = true; } return true; },
    pause: () => { if (playing) elapsed += performance.now() - resumed; playing = false; },
    poll: () => {
      const time = elapsed + (playing ? performance.now() - resumed : 0);
      const index = reduced ? 0 : Math.floor(time * 60 / 1000);
      if (index === previous) return false;
      previous = index; paint(time); return true;
    },
    box: () => [0, .025, 1, .99],
    seamFade: () => 1,
  };
}
