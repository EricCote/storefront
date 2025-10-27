import { getTranslations } from 'next-intl/server';

export default async function Page(props: { params: Promise<{ locale: string; channel: string }> }) {
	const { locale, channel } = await props.params;
	const t = await getTranslations('test');

	return (
		<div className='p-8 text-center'>
			<h1 className='text-3xl font-bold'>{t('welcome')}</h1>
			<p className='mt-4 text-gray-600'>
				Language: {locale} | Channel: {channel}
			</p>
		</div>
	);
}
