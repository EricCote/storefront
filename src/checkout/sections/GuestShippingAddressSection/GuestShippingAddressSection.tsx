import { AddressForm } from '@/checkout/components/AddressForm';
import { useAvailableShippingCountries } from '@/checkout/hooks/useAvailableShippingCountries';
import { FormProvider } from '@/checkout/hooks/useForm/FormProvider';
import { useGuestShippingAddressForm } from '@/checkout/sections/GuestShippingAddressSection/useGuestShippingAddressForm';

export const GuestShippingAddressSection = () => {
	const { availableShippingCountries } = useAvailableShippingCountries();

	const form = useGuestShippingAddressForm();

	const { handleChange, handleBlur } = form;

	return (
		<FormProvider form={form}>
			<AddressForm
				title='Shipping address'
				availableCountries={availableShippingCountries}
				fieldProps={{
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
		</FormProvider>
	);
};
