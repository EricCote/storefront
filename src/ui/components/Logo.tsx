'use client';

import { usePathname } from 'next/navigation';
import { LinkWithChannel } from '../atoms/LinkWithChannel';

const companyName = 'Jolar';

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
