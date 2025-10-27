import { clsx } from 'clsx';
import { ShoppingBagIcon } from 'lucide-react';

import * as Checkout from '@/lib/checkout';
import { LinkWithChannel } from '@/ui/atoms/LinkWithChannel';

export const CartNavItem = async ({ channel }: { channel: string }) => {
	const checkoutId = await Checkout.getIdFromCookies(channel);
	const checkout = checkoutId ? await Checkout.find(checkoutId) : null;

	const lineCount = checkout ? checkout.lines.reduce((result, line) => result + line.quantity, 0) : 0;

	return (
		<LinkWithChannel href='/cart' className='relative flex items-center' data-testid='CartNavItem'>
			<ShoppingBagIcon className='h-6 w-6 shrink-0' aria-hidden='true' />
			{lineCount > 0 ? (
				<div
					className={clsx(
						'absolute right-0 bottom-0 -mr-2 -mb-2 flex h-4 flex-col items-center justify-center rounded bg-neutral-900 text-xs font-medium text-white',
						lineCount > 9 ? 'w-[3ch]' : 'w-[2ch]',
					)}
				>
					{lineCount} <span className='sr-only'>item{lineCount > 1 ? 's' : ''} in cart, view bag</span>
				</div>
			) : (
				<span className='sr-only'>0 items in cart</span>
			)}
		</LinkWithChannel>
	);
};
