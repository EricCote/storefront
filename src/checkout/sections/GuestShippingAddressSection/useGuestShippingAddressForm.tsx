import { omit } from 'lodash-es';
import { useMemo } from 'react';

import {
	getAddressFormDataFromAddress,
	getAddressInputData,
	getAddressValidationRulesVariables,
} from '@/checkout/components/AddressForm/utils';
import { useCheckoutShippingAddressUpdateMutation } from '@/checkout/graphql';
import {
	type AutoSaveAddressFormData,
	useAutoSaveAddressForm,
} from '@/checkout/hooks/useAutoSaveAddressForm';
import { useCheckout } from '@/checkout/hooks/useCheckout';
import { useCheckoutFormValidationTrigger } from '@/checkout/hooks/useCheckoutFormValidationTrigger';
import { useFormSubmit } from '@/checkout/hooks/useFormSubmit';
import { useSetCheckoutFormValidationState } from '@/checkout/hooks/useSetCheckoutFormValidationState';

export const useGuestShippingAddressForm = () => {
	const {
		checkout: { shippingAddress },
	} = useCheckout();

	const [, checkoutShippingAddressUpdate] = useCheckoutShippingAddressUpdateMutation();
	const { setCheckoutFormValidationState } = useSetCheckoutFormValidationState('shippingAddress');

	const onSubmit = useFormSubmit<AutoSaveAddressFormData, typeof checkoutShippingAddressUpdate>(
		useMemo(
			() => ({
				scope: 'checkoutShippingUpdate',
				onSubmit: checkoutShippingAddressUpdate,
				parse: ({ languageCode, checkoutId, ...rest }) => ({
					languageCode,
					checkoutId,
					shippingAddress: getAddressInputData(omit(rest, 'channel')),
					validationRules: getAddressValidationRulesVariables({ autoSave: true }),
				}),
				onSuccess: ({ data, formHelpers }) => {
					void setCheckoutFormValidationState({
						...formHelpers,
						values: getAddressFormDataFromAddress(data.checkout?.shippingAddress),
					});
				},
			}),
			[checkoutShippingAddressUpdate, setCheckoutFormValidationState],
		),
	);

	const form = useAutoSaveAddressForm({
		onSubmit,
		initialValues: getAddressFormDataFromAddress(shippingAddress),
		scope: 'checkoutShippingUpdate',
	});

	useCheckoutFormValidationTrigger({
		form,
		scope: 'shippingAddress',
	});

	return form;
};
