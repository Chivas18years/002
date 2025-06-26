/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },

  async redirects() {
    return [
      {
        source: '/ignite',
        destination: '/ignite/login',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/api/pix',
        headers: [ { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0' } ],
      },
      {
        source: '/api/ignite/pix-config', // <-- AQUI A CORREÇÃO
        headers: [ { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0' } ],
      },
      {
        source: '/pagamento',
        headers: [ { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0' } ],
      },
      {
        source: '/ignite/:path*',
        headers: [
          { key: 'Cache-control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0' },
        ],
      },
    ];
  },

  env: {
    DISABLE_CACHE: 'true',
  },
};

export default nextConfig;