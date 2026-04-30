/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "mandik.info" },
      { protocol: "https", hostname: "mandik.online" },
      { protocol: "https", hostname: "wi1rvkmguv1ndwwa.public.blob.vercel-storage.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/", destination: "/cs", permanent: false },
    ];
  },
};

export default nextConfig;
