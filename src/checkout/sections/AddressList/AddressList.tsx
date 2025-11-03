import { camelCase } from 'lodash-es';
import React from 'react';


import { Button } from '@/checkout/components/Button';
import { SelectBoxGroup } from '@/checkout/components/SelectBoxGroup';
import { Title } from '@/checkout/components/Title';
import { type AddressFragment } from '@/checkout/graphql';
import { useAddressAvailability } from '@/checkout/hooks/useAddressAvailability';
import { type UseFormReturn } from '@/checkout/hooks/useForm';
import { FormProvider } from '@/checkout/hooks/useForm/FormProvider';
import { type AddressListFormData } from '@/checkout/sections/AddressList/useAddressListForm';

import { AddressSelectBox } from '../../components/AddressSelectBox';

export interface AddressListProps {
	onEditChange: (id: string) => void;
	onAddAddressClick: () => void;
	checkAddressAvailability?: boolean;
	title: string;
	form: UseFormReturn<AddressListFormData>;
}

export const AddressList: React.FC<AddressListProps> = ({
	onEditChange,
	checkAddressAvailability = false,
	title,
	onAddAddressClick,
	form,
}) => {
	const {
		values: { addressList },
	} = form;

	const { isAvailable } = useAddressAvailability(!checkAddressAvailability);

	return (
		<FormProvider form={form}>
			<div className='flex flex-col'>
				<Title>{title}</Title>
				{addressList.length < 1 && <p className='mb-3'>You currently have no saved addresses.</p>}
				<Button
					variant='secondary'
					ariaLabel='add address'
					onClick={onAddAddressClick}
					label='Add address'
					className='w-full'
				/>
				<SelectBoxGroup label='user addresses' className='mt-2'>
					{addressList.map(({ id, ...rest }: AddressFragment) => {
						const identifier = `${camelCase(title)}-${id}}`;

						return (
							<AddressSelectBox
								name='selectedAddressId'
								id={identifier}
								key={identifier}
								value={id}
								address={{ ...rest }}
								onEdit={() => onEditChange(id)}
								unavailable={!isAvailable(rest)}
							/>
						);
					})}
				</SelectBoxGroup>
			</div>
		</FormProvider>
	);
};
