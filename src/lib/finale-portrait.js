// Use the supplied portrait's actual pixels. Only the background mask was
// generated, so the face, clothing, sunglasses and pose are not regenerated.
export async function finalePortrait() {
  const photo = new Image();
  const mask = new Image();
  photo.src = 'public/images/haroon-finale-original.png';
  mask.src = 'public/images/haroon-finale-mask.png';
  await Promise.all([photo.decode(), mask.decode()]);
  const w = photo.naturalWidth, h = photo.naturalHeight;
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(mask, 0, 0, w, h);
  const matte = ctx.getImageData(0, 0, w, h);
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(photo, 0, 0);
  const pixels = ctx.getImageData(0, 0, w, h);
  let left = w, right = 0, top = h, bottom = 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    const alpha = Math.round(Math.max(0, Math.min(1, (matte.data[i] - 24) / 207)) * 255);
    pixels.data[i + 3] = alpha;
    if (alpha > 10) { left = Math.min(left, x); right = Math.max(right, x); top = Math.min(top, y); bottom = Math.max(bottom, y); }
  }
  if (right <= left || bottom <= top) throw new Error('Empty finale portrait mask');
  ctx.putImageData(pixels, 0, 0);
  const result = document.createElement('canvas');
  result.width = right - left + 1; result.height = bottom - top + 1;
  result.getContext('2d').drawImage(canvas, left, top, result.width, result.height, 0, 0, result.width, result.height);
  return result;
}
