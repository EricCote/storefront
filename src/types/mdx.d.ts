// Type declarations for MDX imports
declare module '*.mdx' {
	import type { ComponentType } from 'react';
	const MDXComponent: ComponentType<Record<string, unknown>>;
	export default MDXComponent;
}

declare module '@/content/*.mdx' {
	import type { ComponentType } from 'react';
	const MDXComponent: ComponentType<Record<string, unknown>>;
	export default MDXComponent;
}
