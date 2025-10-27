import React from "react";

import { IconButton } from "@/checkout/components/IconButton";
import { useCheckoutRemovePromoCodeMutation } from "@/checkout/graphql";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { isOrderConfirmationPage } from "@/checkout/lib/utils/url";
import { RemoveIcon } from "@/checkout/ui-kit/icons";

import { SummaryMoneyRow, type SummaryMoneyRowProps } from "./SummaryMoneyRow";

interface SummaryPromoCodeRowProps extends SummaryMoneyRowProps {
	promoCode?: string;
	promoCodeId?: string;
	editable: boolean;
}

export const SummaryPromoCodeRow: React.FC<SummaryPromoCodeRowProps> = ({
	promoCode,
	promoCodeId,
	editable,
	...rest
}) => {
	const { checkout } = useCheckout({ pause: isOrderConfirmationPage() });
	const [, checkoutRemovePromoCode] = useCheckoutRemovePromoCodeMutation();

	const onDelete = () => {
		const variables = promoCode ? { promoCode: promoCode } : { promoCodeId: promoCodeId as string };

		void checkoutRemovePromoCode({
			languageCode: "EN_US",
			checkoutId: checkout.id,
			...variables,
		});
	};

	return (
		<SummaryMoneyRow {...rest}>
			{editable && (
				<div>
					<IconButton onClick={onDelete} ariaLabel="remove promo code" icon={<RemoveIcon aria-hidden />} />
				</div>
			)}
		</SummaryMoneyRow>
	);
};
