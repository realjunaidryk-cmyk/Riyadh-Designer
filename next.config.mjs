/** @type {import('next').NextConfig} */
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig = {
  reactStrictMode: true,
  // STATIC_EXPORT=1 npm run build writes a plain static site to out/ (used for previews)
  ...(staticExport
    ? { output: "export", images: { unoptimized: true } }
    : {
        async redirects() {
          return [{ source: "/", destination: "/en", permanent: false }];
        },
      }),
};

export default nextConfig;
