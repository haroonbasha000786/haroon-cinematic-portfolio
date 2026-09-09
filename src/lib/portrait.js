import { profile } from '../profile.js';

export const portraitSource = (fallback) => profile.portrait || fallback;

// Adapt a normal transparent image to the reference renderer's packed-alpha
// interface. No video processing or extra software is required for a photo.
export async function photoClip() {
  const img = new Image();
  img.src = profile.portrait;
  await img.decode();
  const w = Math.min(img.naturalWidth, 1200);
  const h = Math.round(img.naturalHeight * w / img.naturalWidth);
  const canvas = document.createElement('canvas');
  canvas.width = w * 2; canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, w, h);
  const color = ctx.getImageData(0, 0, w, h);
  const mask = ctx.createImageData(w, h);
  for (let i = 0; i < color.data.length; i += 4) {
    const a = color.data[i + 3];
    mask.data[i] = mask.data[i + 1] = mask.data[i + 2] = a;
    mask.data[i + 3] = 255;
    color.data[i + 3] = 255;
  }
  ctx.putImageData(color, 0, 0); ctx.putImageData(mask, w, 0);
  let dirty = true;
  return { el: canvas, w, h, ready: true, isPhoto: true,
    whenReady: async () => {}, play: async () => true, pause: () => {},
    poll: () => { const value = dirty; dirty = false; return value; },
    box: () => [0, 0, 1, 1], seamFade: () => 1 };
}
