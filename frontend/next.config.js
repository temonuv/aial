/** @type {import('next').NextConfig} */
const nextConfig = {
  // Top-level: Allow dev origins for Docker networking (backend fetches, browser tools)
  allowedDevOrigins: [
    'http://localhost:3001',
    'http://127.0.0.1:3001',
    'http://dobrydealer.pl:3001',
    'https://dobrydealer.pl:3001',
    'http://172.18.0.0/16',
  ],
  // Prod perf: Always-on SWC minify (no config needed in v15)
  // Future: Static export for board report PDFs
  // output: 'export',
};

module.exports = nextConfig;