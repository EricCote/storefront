'use client';

import { useEffect } from 'react';

export function ThemeInitializer() {
	useEffect(() => {
		try {
			const theme = localStorage.getItem('saleor-theme');
			if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
				document.documentElement.setAttribute('data-theme', 'dark');
			} else {
				document.documentElement.setAttribute('data-theme', 'light');
			}
		} catch {
			console.error('Failed to set theme');
		}
	}, []);

	return null;
}
