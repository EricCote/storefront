import { Suspense, useState } from 'react';

import { Divider } from '@/checkout/components';
import { AddressSectionSkeleton } from '@/checkout/components/AddressSectionSkeleton';
import { useCheckout } from '@/checkout/hooks/useCheckout';
import { useUser } from '@/checkout/hooks/useUser';
import { getQueryParams } from '@/checkout/lib/utils/url';
import { CollapseSection } from '@/checkout/sections/CheckoutForm/CollapseSection';
import { Contact } from '@/checkout/sections/Contact';
import { ContactSkeleton } from '@/checkout/sections/Contact/ContactSkeleton';
import { DeliveryMethods } from '@/checkout/sections/DeliveryMethods';
import { DeliveryMethodsSkeleton } from '@/checkout/sections/DeliveryMethods/DeliveryMethodsSkeleton';
import { GuestBillingAddressSection } from '@/checkout/sections/GuestBillingAddressSection';
import { GuestShippingAddressSection } from '@/checkout/sections/GuestShippingAddressSection';
import { PaymentSection, PaymentSectionSkeleton } from '@/checkout/sections/PaymentSection';
import { UserBillingAddressSection } from '@/checkout/sections/UserBillingAddressSection';
import { UserShippingAddressSection } from '@/checkout/sections/UserShippingAddressSection';

export const CheckoutForm = () => {
	const { user } = useUser();
	const { checkout } = useCheckout();
	const { passwordResetToken } = getQueryParams();

	const [showOnlyContact, setShowOnlyContact] = useState(!!passwordResetToken);

	return (
		<div className='flex flex-col items-end'>
			<div className='flex w-full flex-col rounded'>
				<Suspense fallback={<ContactSkeleton />}>
					<Contact setShowOnlyContact={setShowOnlyContact} />
				</Suspense>
				<>
					{checkout?.isShippingRequired && (
						<Suspense fallback={<AddressSectionSkeleton />}>
							<CollapseSection collapse={showOnlyContact}>
								<Divider />
								<div className='py-4' data-testid='shippingAddressSection'>
									{user ? <UserShippingAddressSection /> : <GuestShippingAddressSection />}
								</div>
								{user ? <UserBillingAddressSection /> : <GuestBillingAddressSection />}
							</CollapseSection>
						</Suspense>
					)}
					<Suspense fallback={<DeliveryMethodsSkeleton />}>
						<DeliveryMethods collapsed={showOnlyContact} />
					</Suspense>
					<Suspense fallback={<PaymentSectionSkeleton />}>
						<CollapseSection collapse={showOnlyContact}>
							<PaymentSection />
						</CollapseSection>
					</Suspense>
				</>
			</div>
		</div>
	);
};
