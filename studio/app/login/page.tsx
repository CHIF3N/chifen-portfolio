'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin/cv');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? 'Incorrect passphrase.');
        setPassword('');
      }
    } catch {
      setError('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div className="card" style={{ width: '100%', maxWidth: '360px', textAlign: 'center' }}>
        {/* Logo */}
        <p
          style={{
            fontWeight: 800,
            fontSize: '1.5rem',
            letterSpacing: '-0.03em',
            marginBottom: '0.25rem',
          }}
        >
          Chif<span style={{ color: 'var(--accent)' }}>3</span>n Studio
        </p>
        <span className="chip" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
          Private
        </span>

        <form onSubmit={submit} style={{ marginTop: '1rem' }}>
          <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <label
              htmlFor="password"
              className="label"
              style={{ marginBottom: '0.5rem', display: 'block' }}
            >
              Passphrase
            </label>
            <input
              id="password"
              type="password"
              className="input"
              autoComplete="current-password"
              autoFocus
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your passphrase"
            />
          </div>

          {error && (
            <p
              style={{
                color: 'var(--error)',
                fontSize: '0.8rem',
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: '8px',
                padding: '0.5rem 0.75rem',
                marginBottom: '1rem',
                textAlign: 'left',
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !password}
            style={{ width: '100%' }}
          >
            {loading ? 'Checking…' : 'Enter Studio →'}
          </button>
        </form>

        <p
          style={{
            marginTop: '1.5rem',
            fontSize: '0.72rem',
            color: 'var(--text-faint)',
          }}
        >
          This tool is private. No sign-up. No recovery.
        </p>
      </div>
    </div>
  );
}
