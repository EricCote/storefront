'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<button
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
			className='relative inline-flex items-center justify-center text-sm font-medium transition-colors dark:text-gray-100'
			aria-label='Toggle theme'
		>
			<Sun className='h-6 w-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
			<Moon className='absolute h-6 w-6 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
		</button>
	);
}
