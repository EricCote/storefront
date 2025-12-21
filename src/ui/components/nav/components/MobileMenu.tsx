'use client';

import { Transition, Dialog, DialogPanel, TransitionChild } from '@headlessui/react';
import { Fragment, type ReactNode } from 'react';

import { Logo } from '../../Logo';

import { CloseButton } from './CloseButton';
import { OpenButton } from './OpenButton';
import { useMobileMenu } from './useMobileMenu';

type Props = {
	children: ReactNode;
};

export const MobileMenu = ({ children }: Props) => {
	const { closeMenu, openMenu, isOpen } = useMobileMenu();

	return (
		<>
			<OpenButton onClick={openMenu} aria-controls='mobile-menu' />
			<Transition show={isOpen}>
				<Dialog onClose={closeMenu}>
					<DialogPanel className='fixed inset-0 z-20 flex h-dvh w-screen flex-col overflow-y-scroll'>
						<TransitionChild
							as='div'
							className='sticky top-0 z-10 flex h-16 shrink-0 bg-neutral-100/50 px-3 backdrop-blur-md sm:px-8'
							enter='motion-safe:transition-all motion-safe:duration-150'
							enterFrom='bg-transparent'
							enterTo='bg-neutral-100'
							leave='motion-safe:transition-all motion-safe:duration-150'
							leaveFrom='bg-neutral-100'
							leaveTo='bg-transparent'
						>
							<Logo />
							<CloseButton onClick={closeMenu} aria-controls='mobile-menu' />
						</TransitionChild>
						<TransitionChild
							as={Fragment}
							enter='motion-safe:transition-all motion-safe:duration-150'
							enterFrom='opacity-0 -translate-y-3 bg-transparent'
							enterTo='opacity-100 translate-y-0 bg-white'
							leave='motion-safe:transition-all motion-safe:duration-150'
							leaveFrom='opacity-100 translate-y-0 bg-white'
							leaveTo='opacity-0 -translate-y-3 bg-transparent'
						>
							<ul
								className="flex h-full flex-col whitespace-nowrap p-3 pt-0 sm:p-8 sm:pt-0 [&>*:nth-child(n+3)]:border-t [&>*:nth-child(n+3)]:border-neutral-200 [&>li]:py-3"
								id="mobile-menu"
							>
								{children}
							</ul>
						</TransitionChild>
					</DialogPanel>
				</Dialog>
			</Transition>
		</>
	);
};
