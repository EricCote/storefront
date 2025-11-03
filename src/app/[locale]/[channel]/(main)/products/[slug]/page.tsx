import edjsHTML from 'editorjs-html';
import { type ResolvingMetadata, type Metadata } from 'next';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { type WithContext, type Product } from 'schema-dts';
import { invariant } from 'ts-invariant';
import xss from 'xss';

import { CheckoutAddLineDocument, ProductDetailsDocument, ProductListDocument } from '@/gql/graphql';
import { displayLang, type Translatable } from '@/i18n/translate';
import * as Checkout from '@/lib/checkout';
import { executeGraphQL } from '@/lib/graphql';
import { formatMoney, formatMoneyRange } from '@/lib/utils';
import { AvailabilityMessage } from '@/ui/components/AvailabilityMessage';
import { ProductGallery } from '@/ui/components/ProductGallery';
import { VariantSelector } from '@/ui/components/VariantSelector';

import { AddButton } from './AddButton';
import { Locale } from 'next-intl';
//import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";
// Import Swiper React components
// Client-only product gallery (Swiper is used inside the client component)

interface CalloutProps {
	children?: React.ReactNode;
}

const components: Partial<Record<string, React.ComponentType<any>>> = {
	h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h1 className='mt-8 mb-4 text-5xl font-extrabold text-teal-600' {...props} />
	),
	//p: (props) => <p className="mb-4 text-lg leading-relaxed text-gray-700" {...props} />,
	// A custom 'Callout' component that you can use with Markdown syntax
	// by simply writing <Callout>This is a callout!</Callout> in the string.
	Callout: ({ children }: CalloutProps) => (
		<div className='my-4 rounded border-l-4 border-yellow-500 bg-yellow-100 p-4'>
			<p className='font-medium text-yellow-800'>{children}</p>
		</div>
	),
};

export async function generateMetadata(
	props: {
		params: Promise<{ slug: string; channel: string }>;
		searchParams: Promise<{ variant?: string }>;
	},
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const [searchParams, params] = await Promise.all([props.searchParams, props.params]);
	//const t = await getTranslations('products');
	const locale = await getLocale();
	const { product } = await executeGraphQL(ProductDetailsDocument, {
		variables: {
			slug: decodeURIComponent(params.slug),
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!product) {
		notFound();
	}

	const productName =
		displayLang(locale, product as unknown as Translatable, 'seoTitle') ||
		displayLang(locale, product as unknown as Translatable, 'name');
	const variantRef = product.variants?.find(({ id }) => id === searchParams.variant);

	const variantName = displayLang(locale, variantRef as unknown as Translatable, 'name');
	const productNameAndVariant = variantName ? `${productName} - ${variantName}` : productName;

	return {
		title: `${displayLang(locale, product as unknown as Translatable, 'name')} | ${displayLang(locale, product as unknown as Translatable, 'name') || (await parent).title?.absolute}`,
		description: product.seoDescription || productNameAndVariant,
		alternates: {
			canonical: process.env.NEXT_PUBLIC_STOREFRONT_URL
				? process.env.NEXT_PUBLIC_STOREFRONT_URL + `/products/${encodeURIComponent(params.slug)}`
				: undefined,
		},
		openGraph: product.media
			? {
					images: [
						{
							url: product.media[0].url,
							alt: productName,
						},
					],
				}
			: null,
	};
}

export async function generateStaticParams({ params }: { params: { channel: string } }) {
	const { products } = await executeGraphQL(ProductListDocument, {
		revalidate: 60,
		variables: { first: 20, channel: params.channel },
		withAuth: false,
	});

	const paths = products?.edges.map(({ node: { slug } }) => ({ slug })) || [];
	return paths;
}

const parser = edjsHTML();

export default async function Page(props: {
	params: Promise<{ slug: string; channel: string; locale: string }>;
	searchParams: Promise<{ variant?: string }>;
}) {
	const [searchParams, params] = await Promise.all([props.searchParams, props.params]);
	const locale = params.locale;
	//const t = await getTranslations('products');
	const { product } = await executeGraphQL(ProductDetailsDocument, {
		variables: {
			slug: decodeURIComponent(params.slug),
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!product) {
		notFound();
	}

	//const id = product.id;
	//const firstImage = product.thumbnail;
	const images = product.media;
	const description = product?.description ? parser.parse(JSON.parse(product?.description)) : null;

	const mdxEn = product.mdxEn;
	const mdxFr = product.mdxFr;

	const variants = product.variants;
	const selectedVariantID = searchParams.variant;
	const selectedVariant = variants?.find(({ id }) => id === selectedVariantID);

	// Determine which images to show in the gallery
	const galleryImages =
		selectedVariant?.media && selectedVariant.media.length > 0 ? selectedVariant.media : images;

	async function addItem() {
		'use server';

		const checkout = await Checkout.findOrCreate({
			checkoutId: await Checkout.getIdFromCookies(params.channel),
			channel: params.channel,
		});
		invariant(checkout, 'This should never happen');

		await Checkout.saveIdToCookie(params.channel, checkout.id);

		if (!selectedVariantID) {
			return;
		}

		// TODO: error handling
		await executeGraphQL(CheckoutAddLineDocument, {
			variables: {
				id: checkout.id,
				productVariantId: decodeURIComponent(selectedVariantID),
			},
			cache: 'no-cache',
		});

		revalidatePath('/cart');
	}

	const isAvailable = variants?.some((variant) => variant.quantityAvailable) ?? false;

	const productName = displayLang(locale, product as unknown as Translatable, 'name');
	const variantRef = product.variants?.find(({ id }) => id === searchParams.variant);

	const variantName = displayLang(locale, variantRef as unknown as Translatable, 'name');
	const productNameAndVariant = variantName ? `${productName} - ${variantName}` : productName;

	const price = selectedVariant?.pricing?.price?.gross
		? formatMoney(
				selectedVariant.pricing.price.gross.amount,
				selectedVariant.pricing.price.gross.currency,
				locale,
			)
		: isAvailable
			? formatMoneyRange(
					{
						start: product?.pricing?.priceRange?.start?.gross,
						stop: product?.pricing?.priceRange?.stop?.gross,
					},
					locale,
				)
			: '';

	const productJsonLd: WithContext<Product> = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		image: (product.media && product.media[0].url) ?? '',
		...(selectedVariant
			? {
					name: `${productNameAndVariant}`,
					description:
						displayLang(locale, product as unknown as Translatable, 'seoDescription') ||
						`${productNameAndVariant}`,
					offers: {
						'@type': 'Offer',
						availability: selectedVariant.quantityAvailable
							? 'https://schema.org/InStock'
							: 'https://schema.org/OutOfStock',
						priceCurrency: selectedVariant.pricing?.price?.gross.currency,
						price: selectedVariant.pricing?.price?.gross.amount,
					},
				}
			: {
					name: productName,
					description:
						displayLang(locale, product as unknown as Translatable, 'seoDescription') || productName,
					offers: {
						'@type': 'AggregateOffer',
						availability: product.variants?.some((variant) => variant.quantityAvailable)
							? 'https://schema.org/InStock'
							: 'https://schema.org/OutOfStock',
						priceCurrency: product.pricing?.priceRange?.start?.gross.currency,
						lowPrice: product.pricing?.priceRange?.start?.gross.amount,
						highPrice: product.pricing?.priceRange?.stop?.gross.amount,
					},
				}),
	};

	return (
		<section className='mx-auto grid max-w-7xl p-8'>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(productJsonLd),
				}}
			/>
			<form className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-8' action={addItem}>
				<div className='md:col-span-1 lg:col-span-5'>
					{galleryImages && (
						// <ProductImageWrapper
						// 	priority={true}
						// 	alt={firstImage.alt ?? ""}
						// 	width={1024}
						// 	height={1024}
						// 	src={firstImage.url}
						// />
						<ProductGallery images={galleryImages} productName={productJsonLd.name as string} />
					)}
				</div>
				<div className='flex flex-col pt-6 sm:col-span-1 sm:px-6 sm:pt-0 lg:col-span-3 lg:pt-16'>
					<div>
						<h1 className='mb-4 flex-auto text-3xl font-medium tracking-tight text-neutral-900'>
							{productNameAndVariant}
						</h1>
						<p className='mb-8 text-sm' data-testid='ProductElement_Price'>
							{price}
						</p>

						{variants && (
							<VariantSelector
								selectedVariant={selectedVariant}
								variants={variants}
								product={product}
								channel={params.channel}
								locale={locale as Locale}
							/>
						)}
						<AvailabilityMessage isAvailable={isAvailable} />
						{product.attributes.map((attr, idx) => (
							<div className='mt-8' key={attr.attribute.name}>
								<strong>{displayLang(locale, attr.attribute as unknown as Translatable, 'name')}:</strong>{' '}
								{attr.values[idx].plainText}
							</div>
						))}

						<div className='mt-8'>
							<AddButton disabled={!selectedVariantID || !selectedVariant?.quantityAvailable} />
						</div>
						{mdxEn && (
							<div className='mx-auto prose prose-lg mt-8 text-neutral-500'>
								{/* mdxFr is expected to be HTML/HTML-like. Sanitize before injecting. */}
								<h2 className='text-2xl font-bold text-neutral-600'>Description</h2>
								<ReactMarkdown
									remarkPlugins={[remarkGfm]}
									rehypePlugins={[rehypeRaw]}
									components={components}
								>
									{locale != 'en' && mdxFr ? mdxFr : mdxEn}
								</ReactMarkdown>
							</div>
						)}
						{false && description && (
							<div className='mt-8 space-y-6 text-sm text-neutral-500'>
								{description?.map((content) => (
									<div key={content} dangerouslySetInnerHTML={{ __html: xss(content) }} />
								))}
							</div>
						)}
					</div>
				</div>
			</form>
			{/* render MDX French fragment at the end of the form */}
			{false && mdxEn && (
				<div className='mx-auto prose mt-8 text-neutral-500'>
					{/* mdxFr is expected to be HTML/HTML-like. Sanitize before injecting. */}
					<h2 className='text-2xl font-bold text-neutral-600'>Description</h2>
					<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
						{locale != 'en' && mdxFr ? mdxFr : mdxEn}
					</ReactMarkdown>
				</div>
			)}
		</section>
	);
}
