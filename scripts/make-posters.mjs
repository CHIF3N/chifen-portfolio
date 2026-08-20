/**
 * Pulls the first frame out of every clip in public/scenes and writes it beside
 * the clip as a .webp. Scene3D derives the poster path from the video path, so
 * a clip without a still renders an empty box until this has run.
 *
 * Needs ffmpeg on PATH. It is not part of `npm run build`: the stills are
 * committed, and only change when the clips do.
 */
import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import path from 'node:path';

const dir = 'public/scenes';
const clips = readdirSync(dir).filter((file) => file.endsWith('.mp4'));

if (!clips.length) {
  console.log('No clips in %s, nothing to do.', dir);
  process.exit(0);
}

try {
  execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
} catch {
  console.error('ffmpeg is not on PATH. Install it, then run this again.');
  process.exit(1);
}

for (const clip of clips) {
  const from = path.join(dir, clip);
  const to = from.replace(/\.mp4$/, '.webp');
  // 800px wide covers the largest scene at 2x. Frame 0 rather than a frame
  // further in, so the clip taking over is not a visible jump.
  execFileSync('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-ss', '0', '-i', from,
    '-frames:v', '1',
    '-vf', 'scale=800:-2',
    '-c:v', 'libwebp', '-quality', '78', '-compression_level', '6',
    to,
  ]);
  console.log('%s -> %s', from, to);
}
