import { Divider } from '@/checkout/components/Divider';
import { Title } from '@/checkout/components/Title';

import { PaymentMethods } from './PaymentMethods';

export const PaymentSection = () => {
	return (
		<>
			<Divider />
			<div className='py-4' data-testid='paymentMethods'>
				<Title>Payment methods</Title>
				<PaymentMethods />
			</div>
		</>
	);
};
