'use client';

import { clsx } from 'clsx';
import { GlobeIcon } from 'lucide-react';
//import { LinkWithChannel } from '@/ui/atoms/LinkWithChannel';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

import { usePathname, useRouter } from '@/i18n/navigation';

export const LanguageNavItem = () => {
	const pathname = usePathname();
	const locale = useLocale();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const newLocale = locale === 'fr' ? 'en' : 'fr';

	const handleLocaleSwitch = () => {
		// Option 1: Using router (softer refresh)
		startTransition(() => {
			router.replace({ pathname }, { locale: newLocale });
		});

		// Option 2: Force full page reload (more reliable for locale switching)
		// window.location.href = `/${newLocale}${pathname}`;
	};

	return (
		<button
			onClick={handleLocaleSwitch}
			disabled={isPending}
			className='relative flex items-center'
			data-testid='LanguageNavItem'
		>
			<GlobeIcon className='h-6 w-6 shrink-0' aria-hidden='true' />
			<div
				className={clsx(
					'absolute right-0 bottom-0 -mr-2 -mb-2 flex h-4 w-[3ch] flex-col items-center justify-center rounded bg-neutral-900 text-xs font-medium text-white',
					isPending && 'opacity-50',
				)}
			>
				{locale}
			</div>
		</button>
	);
};
