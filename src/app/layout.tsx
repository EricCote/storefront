import { getTranslations } from 'next-intl/server';
import './globals.css';
import { type ReactNode } from 'react';
import { type Metadata } from 'next';

type Props = {
	children: ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('metadata');

	return {
		title: t('title'),
		description: t('description'),
		metadataBase: process.env.NEXT_PUBLIC_STOREFRONT_URL
			? new URL(process.env.NEXT_PUBLIC_STOREFRONT_URL)
			: undefined,
	};
}

// export const metadata: Metadata = {
// 	title: 'Entreprise',
// 	description: 'Description.',
// 	metadataBase: process.env.NEXT_PUBLIC_STOREFRONT_URL
// 		? new URL(process.env.NEXT_PUBLIC_STOREFRONT_URL)
// 		: undefined,
// };

export default function RootLayout({ children }: Props) {
	return children;
}
