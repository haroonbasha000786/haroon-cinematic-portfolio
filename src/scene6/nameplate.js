import { profile } from '../profile.js';

// Live typography replaces the reference's baked-in identity. Keep the same
// tall cream wordmark, black frame and red light field, with editable text.
export async function nameplate() {
  await document.fonts.load('400 400px Anton');
  const canvas = document.createElement('canvas');
  canvas.width = 1600; canvas.height = 900;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1600, 900);
  const glow = ctx.createRadialGradient(800, 430, 10, 800, 430, 820);
  glow.addColorStop(0, '#b51913'); glow.addColorStop(.42, '#500704'); glow.addColorStop(1, '#000');
  ctx.fillStyle = glow; ctx.fillRect(0, 0, 1600, 900);
  const ink = ctx.createLinearGradient(0, 40, 0, 790);
  ink.addColorStop(0, '#fff1e4'); ink.addColorStop(.42, '#eebaae'); ink.addColorStop(1, '#94140e');
  ctx.fillStyle = ink; ctx.font = '400 720px Anton'; ctx.textBaseline = 'top';
  const width = ctx.measureText(profile.wordmark).width;
  ctx.save(); ctx.translate(300, 5); ctx.scale(1000 / width, 1.22); ctx.fillText(profile.wordmark, 0, 0); ctx.restore();
  return canvas;
}
