import withMDX from '@next/mdx';
// import remarkGfm from 'remark-gfm';
// import rehypeSlug from 'rehype-slug';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const basicConfig: NextConfig = {
	images: {
		contentDispositionType: 'inline',
        remotePatterns: [
	{
				hostname: '*',
			},
            // Add other specific domains you need
        ], dangerouslyAllowLocalIP: true,
	},

	typedRoutes: false,
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

	// used in the Dockerfile
	output:
		process.env.NEXT_OUTPUT === 'standalone'
			? 'standalone'
			: process.env.NEXT_OUTPUT === 'export'
				? 'export'
				: undefined,
};

const mdx = withMDX({
	extension: /\.mdx?$/,
	options: {
		 remarkPlugins: ['remark-gfm'],
		 rehypePlugins: ['rehype-slug', 'rehype-autolink-headings'],
		providerImportSource: '@mdx-js/react',
	},
});

export default withNextIntl(mdx(basicConfig));
