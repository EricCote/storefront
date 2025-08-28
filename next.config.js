/** @type {import('next').NextConfig} */
import withMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const config = {
	images: {
		remotePatterns: [
			{
				hostname: "*",
			},
		],
	},
	experimental: {
		typedRoutes: false,
	},
	// used in the Dockerfile
	output:
		process.env.NEXT_OUTPUT === "standalone"
			? "standalone"
			: process.env.NEXT_OUTPUT === "export"
				? "export"
				: undefined,
};

const mdx = withMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
		providerImportSource: "@mdx-js/react",
	},
});

export default mdx(config);
