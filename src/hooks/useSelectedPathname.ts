'use client';

import { useParams } from 'next/navigation';

import { usePathname } from '@/i18n/navigation';

function useSelectedPathname() {
	const pathname = usePathname();

	const { channel } = useParams<{ channel?: string }>();

	const selectedPathname = channel ? pathname.replace(`/${channel}`, '') : pathname;
	return selectedPathname;
}

export default useSelectedPathname;
