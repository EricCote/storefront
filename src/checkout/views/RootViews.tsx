import { Suspense } from 'react';

import { getQueryParams } from '@/checkout/lib/utils/url';
import { PaymentProcessingScreen } from '@/checkout/sections/PaymentSection/PaymentProcessingScreen';
import { Checkout, CheckoutSkeleton } from '@/checkout/views/Checkout';
import { OrderConfirmation, OrderConfirmationSkeleton } from '@/checkout/views/OrderConfirmation';

export const RootViews = () => {
	const orderId = getQueryParams().orderId;

	if (orderId) {
		return (
			<Suspense fallback={<OrderConfirmationSkeleton />}>
				<OrderConfirmation />
			</Suspense>
		);
	}

	return (
		<PaymentProcessingScreen>
			<Suspense fallback={<CheckoutSkeleton />}>
				<Checkout />
			</Suspense>
		</PaymentProcessingScreen>
	);
};
