//'use client';

import { usePathname } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';


import { LinkWithChannel } from '../atoms/LinkWithChannel';

export const Logo = () => {
	const pathname = usePathname();
	const t = getTranslations("metadata")

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
