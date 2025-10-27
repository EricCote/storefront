import { notFound } from 'next/navigation';
import { type ResolvingMetadata, type Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { ProductListByCategoryDocument } from '@/gql/graphql';
import { executeGraphQL } from '@/lib/graphql';
import { ProductList } from '@/ui/components/ProductList';
import { displayLang, type Translatable } from '@/i18n/translate';

export const generateMetadata = async (
	props: { params: Promise<{ slug: string; channel: string }> },
	parent: ResolvingMetadata,
): Promise<Metadata> => {
	const params = await props.params;
	const locale = await getLocale();
	const { category } = await executeGraphQL(ProductListByCategoryDocument, {
		variables: { slug: params.slug, channel: params.channel },
		revalidate: 60,
	});

	const cat = category as unknown as Translatable;

	return {
		title: `${displayLang(locale, cat, 'name') || 'Category'} | ${displayLang(locale, cat, 'seoTitle') || (await parent).title?.absolute}`,
		description:
			displayLang(locale, cat, 'seoDescription') ||
			displayLang(locale, cat, 'description') ||
			displayLang(locale, cat, 'seoTitle') ||
			displayLang(locale, cat, 'title'),
	};
};

export default async function Page(props: { params: Promise<{ slug: string; channel: string }> }) {
	const params = await props.params;
	const { category } = await executeGraphQL(ProductListByCategoryDocument, {
		variables: { slug: params.slug, channel: params.channel },
		revalidate: 60,
	});

	const locale = await getLocale();

	if (!category || !category.products) {
		notFound();
	}

	const { products } = category;

	const cat = category as unknown as Translatable;

	return (
		<div className='mx-auto max-w-7xl p-8 pb-16'>
			<h1 className='pb-8 text-xl font-semibold'>{displayLang(locale, cat, 'name')}</h1>
			<ProductList products={products.edges.map((e) => e.node)} />
		</div>
	);
}
