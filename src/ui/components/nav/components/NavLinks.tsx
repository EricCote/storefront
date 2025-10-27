import { getLocale, getTranslations } from 'next-intl/server';
import { NavLink } from './NavLink';
import { Link } from '@/i18n/navigation';
import { executeGraphQL } from '@/lib/graphql';
import { MenuGetBySlugDocument } from '@/gql/graphql';
import { displayLang, type Translatable } from '@/i18n/translate';

export const NavLinks = async ({ channel }: { channel: string }) => {
	const locale = await getLocale();
	const t = await getTranslations('nav');
	const navLinks = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: 'navbar', channel },
		revalidate: 60 * 60 * 24, // Revalidate every 24 hours,
	});

	return (
		<>
			<NavLink href='/products'>{t('all')}</NavLink>
			{navLinks.menu?.items?.map((item) => {
				if (item.category) {
					return (
						<NavLink key={item.id} href={`/categories/${item.category.slug}`}>
							{displayLang(locale, item.category as unknown as Translatable, 'name')}
						</NavLink>
					);
				}
				if (item.collection) {
					return (
						<NavLink key={item.id} href={`/collections/${item.collection.slug}`}>
							{displayLang(locale, item.collection as unknown as Translatable, 'name')}
						</NavLink>
					);
				}
				if (item.page) {
					return (
						<NavLink key={item.id} href={`/pages/${item.page.slug}`}>
							{displayLang(locale, item.page as unknown as Translatable, 'name')}
						</NavLink>
					);
				}
				if (item.url) {
					return (
						<Link key={item.id} href={item.url}>
							{displayLang(locale, item as unknown as Translatable, 'name')}
						</Link>
					);
				}
				return null;
			})}
		</>
	);
};
