import createMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
	matcher: [
		// Match all pathnames except for
		// - ... if they start with `api`, `_next`, `_trpc` or `_vercel`
		// - .... if they are static files (contain a dot)
		// - ... the ones we want to exclude
		'/((?!api|_next|.*\\..*|trpc|_vercel|checkout).*)',
	],
};
