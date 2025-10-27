import { redirect } from '@/i18n/navigation';

export default function EmptyPage() {
	redirect({ href: '/default-channel', locale: 'en' });
}
