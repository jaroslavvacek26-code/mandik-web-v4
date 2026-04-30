const createNextIntlPlugin = require("next-intl/plugin");

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
  async redirects() {
    return [
      // Přesměrování z kořene na českou verzi
      {
        source: "/",
        destination: "/cs",
        permanent: false,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
