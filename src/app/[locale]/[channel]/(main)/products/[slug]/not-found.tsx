import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
	const t = await getTranslations('products');
	return (
		<div className='mx-auto max-w-7xl px-8 py-16'>
			<div className='mx-auto max-w-3xl text-center'>
				<h2 className='font-bold text-blue-600'>404</h2>
				<p className='text-2xl font-semibold tracking-tight text-neutral-900'>{t('product_not_found')}</p>
			</div>
		</div>
	);
}
