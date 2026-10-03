import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silence monorepo lockfile detection warning
  outputFileTracingRoot: join(__dirname, '../'),
};

export default nextConfig;
