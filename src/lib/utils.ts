export const formatDate = (date: Date | number, locale?: string) => {
	let intl;
	switch (locale) {
		case 'de':
			intl = new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium' });
			break;
		case 'fr':
			intl = new Intl.DateTimeFormat('fr-CA', { dateStyle: 'medium' });
			break;
		default:
			intl = new Intl.DateTimeFormat('en-CA', { dateStyle: 'medium' });
	}
	return intl.format(date);
};

export const formatMoney = (amount: number, currency: string, locale?: string) => {
	let intl;
	switch (locale) {
		case 'de':
			intl = new Intl.NumberFormat('de-DE', {
				style: 'currency',
				currency,
			});
			break;
		case 'fr':
			intl = new Intl.NumberFormat('fr-CA', {
				style: 'currency',
				currency,
			});
			break;
		default:
			intl = new Intl.NumberFormat('en-CA', {
				style: 'currency',
				currency,
			});
	}
	return intl.format(amount);
};

export const formatMoneyRange = (
	range: {
		start?: { amount: number; currency: string } | null;
		stop?: { amount: number; currency: string } | null;
	} | null,
	locale?: string,
) => {
	const { start, stop } = range || {};
	const startMoney = start && formatMoney(start.amount, start.currency, locale);
	const stopMoney = stop && formatMoney(stop.amount, stop.currency, locale);

	if (startMoney === stopMoney) {
		return startMoney;
	}

	return `${startMoney} - ${stopMoney}`;
};

export function getHrefForVariant({
	productSlug,
	variantId,
}: {
	productSlug: string;
	variantId?: string;
}): string {
	const pathname = `/products/${encodeURIComponent(productSlug)}`;

	if (!variantId) {
		return pathname;
	}

	const query = new URLSearchParams({ variant: variantId });
	return `${pathname}?${query.toString()}`;
}
