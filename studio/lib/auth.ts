/**
 * auth.ts — Stateless HMAC session token using the Web Crypto API.
 *
 * Uses globalThis.crypto.subtle (available in Edge runtime, Node.js 18+, and browsers).
 * No Node.js `crypto` module import — compatible with Next.js middleware Edge runtime.
 *
 * Flow:
 *   POST /api/auth/login   → validates password → sets httpOnly cookie
 *   middleware             → reads cookie → isValidToken() → allow or redirect
 *   POST /api/auth/logout  → clears cookie
 */

const COOKIE_NAME = 'studio_session';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const MESSAGE = 'chifen-studio-v1';

function getPassword(): string {
  return process.env.ADMIN_PASSWORD || 'chif3n';
}

/** Import the ADMIN_PASSWORD as an HMAC-SHA-256 key. */
async function importKey(usage: 'sign' | 'verify'): Promise<CryptoKey> {
  const raw = new TextEncoder().encode(getPassword());
  return crypto.subtle.importKey('raw', raw, { name: 'HMAC', hash: 'SHA-256' }, false, [usage]);
}

/** Derive the expected hex token (HMAC of MESSAGE using ADMIN_PASSWORD). */
async function deriveToken(): Promise<string> {
  const key = await importKey('sign');
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(MESSAGE));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Validate a token from the cookie.
 * Uses HMAC verify — constant-time, safe against timing attacks.
 */
export async function isValidToken(token: string | undefined): Promise<boolean> {
  if (!token || !getPassword()) return false;

  // Convert hex token string → Uint8Array
  const parts = token.match(/.{1,2}/g);
  if (!parts || parts.length !== 32) return false; // SHA-256 = 32 bytes
  const tokenBytes = new Uint8Array(parts.map((b) => parseInt(b, 16)));

  const key = await importKey('verify');
  try {
    return await crypto.subtle.verify(
      'HMAC',
      key,
      tokenBytes,
      new TextEncoder().encode(MESSAGE)
    );
  } catch {
    return false;
  }
}

/** Build a Set-Cookie header string for a new session. */
export async function buildSessionCookie(): Promise<string> {
  const token = await deriveToken();
  return `${COOKIE_NAME}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`;
}

/** Build a Set-Cookie header string that expires the session. */
export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`;
}

export { COOKIE_NAME };
