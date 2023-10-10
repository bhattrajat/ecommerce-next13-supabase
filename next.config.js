/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fjtopbpiavldkrwiknfn.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
