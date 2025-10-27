
import withMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';


const withNextIntl = createNextIntlPlugin();

const basicConfig: NextConfig = {
	images: {
		contentDispositionType: 'inline' ,
		remotePatterns: [
			{
				hostname: '*',
			},
		],
	},
	experimental: {
		typedRoutes: false,
	},
	// used in the Dockerfile
	output:
		(process.env.NEXT_OUTPUT === 'standalone'
			? 'standalone' 
			: process.env.NEXT_OUTPUT === 'export'
				? 'export'
				: undefined),
};

const mdx = withMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
		providerImportSource: '@mdx-js/react',
	},
});

export default withNextIntl(mdx(basicConfig));
