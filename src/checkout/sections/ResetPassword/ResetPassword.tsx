import React from "react";

import { Button } from "@/checkout/components/Button";
import { PasswordInput } from "@/checkout/components/PasswordInput";
import { FormProvider } from "@/checkout/hooks/useForm/FormProvider";
import { useResetPasswordForm } from "@/checkout/sections/ResetPassword/useResetPasswordForm";

import { SignInFormContainer, type SignInFormContainerProps } from "../Contact/SignInFormContainer";

interface ResetPasswordProps extends Pick<SignInFormContainerProps, "onSectionChange"> {
	onResetPasswordSuccess: () => void;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ onSectionChange, onResetPasswordSuccess }) => {
	const form = useResetPasswordForm({ onSuccess: onResetPasswordSuccess });

	return (
		<SignInFormContainer
			title="Reset password"
			redirectSubtitle="Remembered your password?"
			redirectButtonLabel="Sign in"
			onSectionChange={onSectionChange}
			subtitle="Provide a new password for your account"
		>
			<FormProvider form={form}>
				<PasswordInput name="password" label="Password" required />
				<div className="mt-4 flex w-full flex-row items-center justify-end">
					<Button ariaLabel="Reset password" label="Reset password" type="submit" />
				</div>
			</FormProvider>
		</SignInFormContainer>
	);
};
