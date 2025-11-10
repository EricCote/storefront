import { invariant } from 'ts-invariant';

import Link from 'next/link';

import { RootWrapper } from './pageWrapper';

export const metadata = {
	title: 'Checkout · Saleor Storefront example',
};

export default async function CheckoutPage(props: {
	searchParams: Promise<{ checkout?: string; order?: string }>;
}) {
	const searchParams = await props.searchParams;
	invariant(process.env.NEXT_PUBLIC_SALEOR_API_URL, 'Missing NEXT_PUBLIC_SALEOR_API_URL env variable');

	if (!searchParams.checkout && !searchParams.order) {
		return null;
	}

	return (
		<div className='min-h-dvh bg-white'>
			<section className='mx-auto flex min-h-dvh max-w-7xl flex-col p-8'>
				<div className='flex items-center font-bold'>
					<Link aria-label='homepage' href='/'>
						Centre d'arts Préville
					</Link>
				</div>
				<h1 className='mt-8 text-3xl font-bold text-neutral-900'>Checkout</h1>

				<section className='mt-6 mb-12 flex-1'>
					<RootWrapper saleorApiUrl={process.env.NEXT_PUBLIC_SALEOR_API_URL} />
				</section>
			</section>
		</div>
	);
}
