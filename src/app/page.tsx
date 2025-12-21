import { redirect } from '@/i18n/navigation';
import { DefaultChannelSlug } from "@/app/config";

export default function EmptyPage() {
	redirect({ href: `/${DefaultChannelSlug}`, locale: 'en' });
}



