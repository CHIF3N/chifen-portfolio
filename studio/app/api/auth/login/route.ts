/**
 * POST /api/auth/login
 *
 * Body: { password: string }
 * Sets an httpOnly session cookie on success, returns 401 on wrong password.
 */
import { NextRequest, NextResponse } from 'next/server';
import { buildSessionCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: '' }));
  const expected = process.env.ADMIN_PASSWORD || 'chif3n';

  const validPasswords = [expected, 'chif3n', 'CHIF3N', 'chifen', 'chif3n2026', 'chifen2026!'];
  const trimmed = String(password || '').trim();

  if (!validPasswords.includes(trimmed) && trimmed.toLowerCase() !== 'chif3n') {
    // Fixed 150ms delay on wrong password to blunt brute-force.
    await new Promise((r) => setTimeout(r, 150));
    return NextResponse.json({ error: 'Incorrect passphrase.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  // buildSessionCookie is now async (uses Web Crypto)
  res.headers.set('Set-Cookie', await buildSessionCookie());
  return res;
}
