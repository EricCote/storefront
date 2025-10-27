import { draftMode } from 'next/headers';
import { Link } from '@/i18n/navigation';

export const DraftModeNotification = async () => {
	if (!(await draftMode()).isEnabled) {
		return null;
	}

	return (
		<div className='fixed right-0 bottom-0 z-50 bg-red-100 px-8 py-2 text-red-700'>
			You&apos;re in draft mode. Requests are not cached.{' '}
			<Link className='underline' href='/api/draft/disable'>
				Disable.
			</Link>
		</div>
	);
};
