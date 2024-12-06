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
    ],
  },
  
};

export default nextConfig;
