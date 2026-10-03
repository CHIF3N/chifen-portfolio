/**
 * Firebase client initialisation for blog engagement (likes + comments).
 *
 * Configuration values come from environment variables. Provide them via:
 *   - .env (local development)
 *   - Vercel project settings → Environment Variables (production)
 *
 * Required variables:
 *   PUBLIC_FIREBASE_API_KEY
 *   PUBLIC_FIREBASE_AUTH_DOMAIN
 *   PUBLIC_FIREBASE_PROJECT_ID
 *   PUBLIC_FIREBASE_STORAGE_BUCKET
 *   PUBLIC_FIREBASE_MESSAGING_SENDER_ID
 *   PUBLIC_FIREBASE_APP_ID
 *
 * In Astro, PUBLIC_ prefix is required for client-side access via import.meta.env.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

/** Initialise once; reuse on subsequent imports (Astro hot-reload safe). */
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
