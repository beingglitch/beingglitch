import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    // Admin-authored content (blog/work/gallery) can reference Vercel Blob uploads
    // or any pasted external image URL — both need to be allowed here.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async redirects() {
    return [
      // /resume is the address people type and share; the file itself is served
      // from /public as /resume.pdf. Without this, RouteGuard 404s the bare path.
      { source: "/resume", destination: "/resume.pdf", permanent: true },
    ];
  },
};

export default withMDX(nextConfig);
