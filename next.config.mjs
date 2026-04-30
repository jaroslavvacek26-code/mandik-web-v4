import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "mandik.info" },
      { protocol: "https", hostname: "mandik.online" },
      { protocol: "https", hostname: "wi1rvkmguv1ndwwa.public.blob.vercel-storage.com" },
    ],
  },
  // KRITICKÉ pro Vercel: použij next-intl jako external Node.js modul,
  // jinak Vercel zbundluje a __dirname zmizí (ESM nemá __dirname)
  experimental: {
    serverComponentsExternalPackages: ["next-intl"],
  },
};

export default withNextIntl(nextConfig);
