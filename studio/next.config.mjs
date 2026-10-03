/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Enable React 19 features.
   * `serverExternalPackages` prevents firebase-admin (if added later)
   * from being bundled in Client Components.
   */
  experimental: {},
  /**
   * Keep the Gemini API key strictly server-side.
   * NEXT_PUBLIC_* variables are exposed to the browser; GEMINI_API_KEY is not.
   */
  env: {},
};

export default nextConfig;
