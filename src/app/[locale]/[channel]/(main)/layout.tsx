import { type ReactNode } from 'react';

import { Footer } from '@/ui/components/Footer';
import { Header } from '@/ui/components/Header';

export default async function RootLayout(props: {
	children: ReactNode;
	params: Promise<{ channel: string }>;
}) {
	const { channel } = await props.params;

	return (
		<>
			<Header channel={channel} />
			<div className='flex min-h-[calc(100dvh-64px)] flex-col'>
				<main className='flex-1'>{props.children}</main>
				<Footer channel={channel} />
			</div>
		</>
	);
}
