export const VERIFY_PATTERN = /\{\{VERIFY:\s*([^}]+?)\s*\}\}/g;

export type VerifySegment = { text: string; verify: boolean };

/** Split a string into plain and {{VERIFY: ...}} segments for highlighted rendering. */
export function splitVerify(input: string): VerifySegment[] {
  const segments: VerifySegment[] = [];
  let cursor = 0;

  for (const match of input.matchAll(VERIFY_PATTERN)) {
    const start = match.index;
    if (start > cursor) {
      segments.push({ text: input.slice(cursor, start), verify: false });
    }
    segments.push({ text: match[1], verify: true });
    cursor = start + match[0].length;
  }

  if (cursor < input.length) {
    segments.push({ text: input.slice(cursor), verify: false });
  }
  return segments;
}

export function hasVerify(input: string): boolean {
  return new RegExp(VERIFY_PATTERN.source).test(input);
}
