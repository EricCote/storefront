import { type ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export const ErrorContentWrapper = ({ children }: Props) => {
	return (
		<div className='max-w-(--breakpoint-sm) mx-auto flex flex-col items-center gap-y-4 bg-neutral-50 px-8 py-16 text-center'>
			{children}
		</div>
	);
};
