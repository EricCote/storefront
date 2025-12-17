'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { LinkWithChannel } from '../atoms/LinkWithChannel';

export const Logo = () => {
	const pathname = usePathname();
	const t = useTranslations("metadata");

	if (pathname === '/') {
		return (
			<h1 className='flex items-center font-bold' aria-label='homepage'>
				{t('title')}
			</h1>
		);
	}
	return (
		<div className='flex items-center font-bold'>
			<LinkWithChannel className='text-center' aria-label='homepage' href='/'>
				{t('title')}
			</LinkWithChannel>
		</div>
	);
};
