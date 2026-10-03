'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, type User } from 'firebase/auth';
import { auth, googleProvider, ADMIN_UID } from '@/lib/firebase';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function signIn() {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sign-in failed.');
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Checking auth…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="card w-full max-w-sm text-center">
          <div className="chip mx-auto w-fit">Private</div>
          <h1
            style={{ fontFamily: 'Inter', fontSize: '1.5rem', fontWeight: 700, marginTop: '1rem' }}
          >
            Chifen Studio
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Admin AI CV Studio — Fanaka Edition
          </p>
          <button className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%' }} onClick={signIn}>
            Sign in with Google
          </button>
          {error && (
            <p style={{ color: 'var(--error)', fontSize: '0.8rem', marginTop: '0.75rem' }}>{error}</p>
          )}
        </div>
      </div>
    );
  }

  // Verify this is the right Google account.
  if (ADMIN_UID && user.uid !== ADMIN_UID) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="card w-full max-w-sm text-center">
          <p style={{ color: 'var(--error)', fontWeight: 600 }}>Access denied.</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Signed in as {user.email}. This tool is private.
          </p>
          <button
            className="btn btn-ghost"
            style={{ marginTop: '1rem' }}
            onClick={() => auth.signOut()}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
