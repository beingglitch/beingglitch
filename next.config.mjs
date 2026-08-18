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
};

export default withMDX(nextConfig);
