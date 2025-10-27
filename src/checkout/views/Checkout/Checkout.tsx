import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { useCheckout } from "@/checkout/hooks/useCheckout";
import { CheckoutForm, CheckoutFormSkeleton } from "@/checkout/sections/CheckoutForm";
import { Summary, SummarySkeleton } from "@/checkout/sections/Summary";
import { CheckoutSkeleton } from "@/checkout/views/Checkout/CheckoutSkeleton";

import { useUser } from "../../hooks/useUser";
import { EmptyCartPage } from "../EmptyCartPage";
import { PageNotFound } from "../PageNotFound";

export const Checkout = () => {
	const { checkout, fetching: fetchingCheckout } = useCheckout();
	const { loading: isAuthenticating } = useUser();

	const isCheckoutInvalid = !fetchingCheckout && !checkout && !isAuthenticating;

	const isInitiallyAuthenticating = isAuthenticating && !checkout;

	const isEmptyCart = checkout && !checkout.lines.length;

	return isCheckoutInvalid ? (
		<PageNotFound />
	) : isInitiallyAuthenticating ? (
		<CheckoutSkeleton />
	) : (
		<ErrorBoundary FallbackComponent={PageNotFound}>
			<div className="page">
				{isEmptyCart ? (
					<EmptyCartPage />
				) : (
					<div className="grid min-h-screen grid-cols-1 gap-x-16 lg:grid-cols-2">
						<Suspense fallback={<CheckoutFormSkeleton />}>
							<CheckoutForm />
						</Suspense>
						<Suspense fallback={<SummarySkeleton />}>
							<Summary {...checkout} />
						</Suspense>
					</div>
				)}
			</div>
		</ErrorBoundary>
	);
};
