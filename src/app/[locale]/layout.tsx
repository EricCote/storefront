import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Suspense, type ReactNode } from 'react';
import { type Locale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { DraftModeNotification } from '@/ui/components/DraftModeNotification';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout(props: {
	children: ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { children, params: paramsPromise } = props;
	const { locale } = await paramsPromise;

	// Validate locale on render (for dynamic routes)
	if (!routing.locales.includes(locale as Locale)) {
		notFound();
	}

	return (
		<html lang={locale} className='min-h-dvh'>
			<body className={`${inter.className} min-h-dvh`}>
				<NextIntlClientProvider>
					{children}
					<Suspense>
						<DraftModeNotification />
					</Suspense>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
