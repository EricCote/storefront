import { notFound } from 'next/navigation';
import { type ResolvingMetadata, type Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { ProductListByCollectionDocument } from '@/gql/graphql';
import { executeGraphQL } from '@/lib/graphql';
import { ProductList } from '@/ui/components/ProductList';
import { displayLang, type Translatable } from '@/i18n/translate';

export const generateMetadata = async (
	props: { params: Promise<{ slug: string; channel: string }> },
	parent: ResolvingMetadata,
): Promise<Metadata> => {
	const params = await props.params;
	const locale = await getLocale();
	const { collection } = await executeGraphQL(ProductListByCollectionDocument, {
		variables: { slug: params.slug, channel: params.channel },
		revalidate: 60,
	});

	const coll = collection as unknown as Translatable;

	return {
		title: `${displayLang(locale, coll, 'name') || 'Category'} | ${displayLang(locale, coll, 'seoTitle') || (await parent).title?.absolute}`,
		description:
			displayLang(locale, coll, 'seoDescription') ||
			displayLang(locale, coll, 'description') ||
			displayLang(locale, coll, 'seoTitle') ||
			displayLang(locale, coll, 'title'),
	};
};

export default async function Page(props: { params: Promise<{ slug: string; channel: string }> }) {
	const params = await props.params;
	const locale = await getLocale();
	const { collection } = await executeGraphQL(ProductListByCollectionDocument, {
		variables: { slug: params.slug, channel: params.channel },
		revalidate: 60,
	});

	if (!collection || !collection.products) {
		notFound();
	}

	const { products } = collection;

	const coll = collection as unknown as Translatable;

	return (
		<div className='mx-auto max-w-7xl p-8 pb-16'>
			<h1 className='pb-8 text-xl font-semibold'>{displayLang(locale, coll, 'name')}</h1>
			<ProductList products={products.edges.map((e) => e.node)} />
		</div>
	);
}
