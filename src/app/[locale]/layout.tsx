import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { type Locale, NextIntlClientProvider } from 'next-intl';
import { Suspense, type ReactNode } from 'react';

import { routing } from '@/i18n/routing';
import { DraftModeNotification } from '@/ui/components/DraftModeNotification';
import { ThemeProvider } from '@/ui/components/ThemeProvider';
import { ThemeScript } from '@/ui/components/ThemeScript';

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
			<head>
				<script async src='test.js'></script>
			</head>
			<body className={`${inter.className} min-h-dvh`}>
				<ThemeProvider defaultTheme='system' storageKey='saleor-theme'>
					<NextIntlClientProvider>
						{children}
						<Suspense>
							<DraftModeNotification />
						</Suspense>
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
