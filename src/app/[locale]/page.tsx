import { type Locale } from 'next-intl';
import { redirect } from '@/i18n/navigation';

export default async function LocalePage(props: { params: Promise<{ locale: string }> }) {
	const { locale } = await props.params;
	redirect({ href: '/default-channel', locale: locale as Locale });
}
