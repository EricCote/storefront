import { type Metadata } from 'next';
import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';

import { displayLang, type Translatable } from '@/i18n/translate';
import * as Checkout from '@/lib/checkout';
import { formatMoney, getHrefForVariant } from '@/lib/utils';
import { LinkWithChannel } from '@/ui/atoms/LinkWithChannel';

import { CheckoutLink } from './CheckoutLink';
import { DeleteLineButton } from './DeleteLineButton';

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('cart');
	const t2 = await getTranslations('metadata');

	return {
		title: `${t('title')} · ${t2('title')}`,
		description: t2('description'),
		metadataBase: process.env.NEXT_PUBLIC_STOREFRONT_URL
			? new URL(process.env.NEXT_PUBLIC_STOREFRONT_URL)
			: undefined,
	};
}

// export const metadata = {
// 	title: 'Shopping Cart · Nom Entreprise',
// };

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const params = await props.params;
	const t = await getTranslations('cart');
	const locale = await getLocale();

	const checkoutId = await Checkout.getIdFromCookies(params.channel);

	const checkout = await Checkout.find(checkoutId);

	if (!checkout || checkout.lines.length < 1) {
		return (
			<section className='mx-auto max-w-7xl p-8'>
				<h1 className='mt-8 text-3xl font-bold text-neutral-900'>{t('empty_cart')}</h1>
				<p className='my-12 text-sm text-neutral-500'>{t('no_items')}</p>
				<LinkWithChannel
					href='/products'
					className='inline-block max-w-full rounded border border-transparent bg-neutral-900 px-6 py-3 text-center font-medium text-neutral-50 hover:bg-neutral-800 aria-disabled:cursor-not-allowed aria-disabled:bg-neutral-500 sm:px-16'
				>
					{t('explore_products')}
				</LinkWithChannel>
			</section>
		);
	}

	return (
		<section className='mx-auto max-w-7xl p-8'>
			<h1 className='mt-8 text-3xl font-bold text-neutral-900'>{t('your_cart')}</h1>
			<form className='mt-12'>
				<ul
					data-testid='CartProductList'
					role='list'
					className='divide-y divide-neutral-200 border-t border-b border-neutral-200'
				>
					{checkout.lines.map((item) => (
						<li key={item.id} className='flex py-4'>
							<div className='aspect-square h-24 w-24 shrink-0 overflow-hidden rounded-md border border-neutral-200 bg-neutral-50 sm:h-32 sm:w-32'>
								{item.variant?.product?.thumbnail?.url && (
									<Image
										src={item.variant.product.thumbnail.url}
										alt={item.variant.product.thumbnail.alt ?? ''}
										width={200}
										height={200}
										className='h-full w-full object-contain object-center'
									/>
								)}
							</div>
							<div className='relative flex flex-1 flex-col justify-between p-4 py-2'>
								<div className='flex justify-between justify-items-start gap-4'>
									<div>
										<LinkWithChannel
											href={getHrefForVariant({
												productSlug: item.variant.product.slug,
												variantId: item.variant.id,
											})}
										>
											<h2 className='font-medium text-neutral-700'>
												{displayLang(locale, item.variant?.product as unknown as Translatable, 'name')}
											</h2>
										</LinkWithChannel>
										<p className='mt-1 text-sm text-neutral-500'>
											{displayLang(
												locale,
												item.variant?.product?.category as unknown as Translatable,
												'name',
											)}
										</p>
										{item.variant.name !== item.variant.id && Boolean(item.variant.name) && (
											<p className='mt-1 text-sm text-neutral-500'>
												{t('variant')}
												{displayLang(locale, item.variant as unknown as Translatable, 'name')}
											</p>
										)}
									</div>
									<p className='text-right font-semibold text-neutral-900'>
										{formatMoney(item.totalPrice.gross.amount, item.totalPrice.gross.currency, locale)}
									</p>
								</div>
								<div className='flex justify-between'>
									<div className='text-sm font-bold'>Qty: {item.quantity}</div>
									<DeleteLineButton checkoutId={checkoutId} lineId={item.id} />
								</div>
							</div>
						</li>
					))}
				</ul>

				<div className='mt-12'>
					<div className='rounded border border-neutral-200 bg-neutral-50 px-4 py-2'>
						<div className='flex items-center justify-between gap-2 py-2'>
							<div>
								<p className='font-semibold text-neutral-900'>{t('your_total')} </p>
								<p className='mt-1 text-sm text-neutral-500'>{t('shipping')}</p>
							</div>
							<div className='font-medium text-neutral-900'>
								{formatMoney(checkout.totalPrice.gross.amount, checkout.totalPrice.gross.currency, locale)}
							</div>
						</div>
					</div>
					<div className='mt-10 text-center'>
						<CheckoutLink
							checkoutId={checkoutId}
							disabled={!checkout.lines.length}
							className='w-full sm:w-1/3'
						/>
					</div>
				</div>
			</form>
		</section>
	);
}
