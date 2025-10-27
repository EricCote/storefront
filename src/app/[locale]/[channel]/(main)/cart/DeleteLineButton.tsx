'use client';

import { useTranslations } from 'next-intl';
import { useTransition } from 'react';

import { deleteLineFromCheckout } from './actions';

type Props = {
	lineId: string;
	checkoutId: string;
};

export const DeleteLineButton = ({ lineId, checkoutId }: Props) => {
	const [isPending, startTransition] = useTransition();
	const t = useTranslations('cart');

	return (
		<button
			type='button'
			className='text-sm text-neutral-500 hover:text-neutral-900'
			onClick={() => {
				if (isPending) return;
				startTransition(() => deleteLineFromCheckout({ lineId, checkoutId }));
			}}
			disabled={isPending}
		>
			{isPending ? t('removing') : t('remove')}
			<span className='sr-only'>{t('line_from_cart')}</span>
		</button>
	);
};
