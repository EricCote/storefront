import { getLocale } from 'next-intl/server';


import type { ProductListItemFragment } from '@/gql/graphql';
import { displayLang, type Translatable } from '@/i18n/translate';
import { formatMoneyRange } from '@/lib/utils';
import { ProductImageWrapper } from '@/ui/atoms/ProductImageWrapper';

import { LinkWithChannel } from '../atoms/LinkWithChannel';

export async function ProductElement({
	product,
	loading,
	priority,
}: { product: ProductListItemFragment } & { loading: 'eager' | 'lazy'; priority?: boolean }) {
	const locale = await getLocale();
	return (
		<li data-testid='ProductElement'>
			<LinkWithChannel href={`/products/${product.slug}`} key={product.id}>
				<div>
					{product?.thumbnail?.url && (
						<ProductImageWrapper
							loading={loading}
							src={product.thumbnail.url}
							alt={product.thumbnail.alt ?? ''}
							width={512}
							height={512}
							sizes={'512px'}
							priority={priority}
						/>
					)}
					<div className='mt-2 flex justify-between'>
						<div>
							<h3 className='mt-1 text-sm font-semibold text-neutral-900'>
								{displayLang(locale, product as unknown as Translatable, 'name')}
							</h3>
							<p className='mt-1 text-sm text-neutral-500' data-testid='ProductElement_Category'>
								{displayLang(locale, product.category as unknown as Translatable, 'name')}
							</p>
						</div>
						<p className='mt-1 text-sm font-medium text-neutral-900' data-testid='ProductElement_PriceRange'>
							{formatMoneyRange(
								{
									start: product?.pricing?.priceRange?.start?.gross,
									stop: product?.pricing?.priceRange?.stop?.gross,
								},
								locale,
							)}
						</p>
					</div>
				</div>
			</LinkWithChannel>
		</li>
	);
}
