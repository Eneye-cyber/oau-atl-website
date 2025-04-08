/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['atl.greatifealumni.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iwtgqsyjhughrtxcqcys.supabase.co',
        port: '',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: "oau-atl-image-server.onrender.com",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  
};

export default nextConfig;
