import { getTranslations } from 'next-intl/server';

import { CurrentUserOrderListDocument } from '@/gql/graphql';
import { executeGraphQL } from '@/lib/graphql';
import { LoginForm } from '@/ui/components/LoginForm';
import { OrderListItem } from '@/ui/components/OrderListItem';

export default async function OrderPage() {
	const { me: user } = await executeGraphQL(CurrentUserOrderListDocument, {
		cache: 'no-cache',
	});

	const t = await getTranslations('orders');

	if (!user) {
		return <LoginForm />;
	}

	const orders = user.orders?.edges || [];

	return (
		<div className='mx-auto max-w-7xl p-8'>
			<h1 className='text-2xl font-bold tracking-tight text-neutral-900'>
				{t('orders', { user: user.firstName ?? user.email })}
			</h1>

			{orders.length === 0 ? (
				<div className='mt-8'>
					<div className='rounded border border-neutral-100 bg-white p-4'>
						<div className='flex items-center'>{t('no_orders')}</div>
					</div>
				</div>
			) : (
				<ul className='mt-8 space-y-6'>
					{orders.map(({ node: order }) => {
						return <OrderListItem order={order} key={order.id} />;
					})}
				</ul>
			)}
		</div>
	);
}
