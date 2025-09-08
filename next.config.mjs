/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
  },

  eslint: {
    // Abaikan error linting saat build (misalnya <a>, <img>, dll)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
