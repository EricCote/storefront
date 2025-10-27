'use client';

import { LinkWithChannel } from '../atoms/LinkWithChannel';
import { usePathname } from '@/i18n/navigation';

const companyName = 'Desired Deviance';

export const Logo = () => {
	const pathname = usePathname();

	if (pathname === '/') {
		return (
			<h1 className='flex items-center font-bold' aria-label='homepage'>
				{companyName}
			</h1>
		);
	}
	return (
		<div className='flex items-center font-bold'>
			<LinkWithChannel className='text-center' aria-label='homepage' href='/'>
				{companyName}
			</LinkWithChannel>
		</div>
	);
};
