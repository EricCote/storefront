import { type ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/ui/components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Desired Deviance',
	description: 'checkout page',
};

export default function RootLayout(props: { children: ReactNode }) {
	return (
		<html lang='en' className='min-h-dvh'>
			<body className={`${inter.className} min-h-dvh`}>
				<main>
					<AuthProvider>{props.children}</AuthProvider>
				</main>
			</body>
		</html>
	);
}
