'use client';

import { Fragment } from 'react';
import clsx from 'clsx';
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react';
import { UserInfo } from './components/UserInfo';
import { UserAvatar } from './components/UserAvatar';
import { type UserDetailsFragment } from '@/gql/graphql';
import { logout } from '@/app/actions';
import { LinkWithChannel } from '@/ui/atoms/LinkWithChannel';

type Props = {
	user: UserDetailsFragment;
};

export function UserMenu({ user }: Props) {
	return (
		<Menu as='div' className='relative'>
			<MenuButton className='relative flex rounded-full bg-neutral-200 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800 focus:outline-none'>
				<span className='sr-only'>Open user menu</span>
				<UserAvatar user={user} />
			</MenuButton>
			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<MenuItems className='ring-opacity-5 absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-neutral-200 bg-white py-1 text-start shadow ring-1 ring-neutral-200 focus:outline-none'>
					<UserInfo user={user} />
					<div className='flex flex-col px-1 py-1'>
						<MenuItem>
							{({ active }) => (
								<LinkWithChannel
									href='/orders'
									className={clsx(
										active && 'bg-neutral-100',
										'block px-4 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-700',
									)}
								>
									My orders
								</LinkWithChannel>
							)}
						</MenuItem>
					</div>
					<div className='flex flex-col px-1 py-1'>
						<MenuItem>
							{({ active }) => (
								<form action={logout}>
									<button
										type='submit'
										className={clsx(
											active && 'bg-neutral-100',
											'block px-4 py-2 text-start text-sm font-medium text-neutral-500 hover:text-neutral-700',
										)}
									>
										Log Out
									</button>
								</form>
							)}
						</MenuItem>
					</div>
				</MenuItems>
			</Transition>
		</Menu>
	);
}
