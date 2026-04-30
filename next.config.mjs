/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "mandik.info" },
      { protocol: "https", hostname: "mandik.online" },
      { protocol: "https", hostname: "wi1rvkmguv1ndwwa.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
