import { getTranslations } from 'next-intl/server';

import { getServerAuthClient } from '@/app/config';

export async function LoginForm() {
	const t = await getTranslations('login');

	return (
		<div className='mx-auto mt-16 w-full max-w-lg'>
			<form
				className='rounded border border-neutral-200 p-8 shadow-md'
				action={async (formData) => {
					'use server';

					 
					const email = formData.get('email')?.toString();
					const password = formData.get('password')?.toString();
					 

					if (!email || !password) {
						throw new Error(t('required'));
					}

					const { data } = await (
						await getServerAuthClient()
					).signIn({ email, password }, { cache: 'no-store' });

					if (data.tokenCreate.errors.length > 0) {
						// setErrors(data.tokenCreate.errors.map((error) => error.message));
						// setFormValues(DefaultValues);
					}
				}}
			>
				<div className='mb-2'>
					<label className='sr-only' htmlFor='email'>
						{t('email')}
					</label>
					<input
						type='email'
						name='email'
						placeholder={t('email')}
						className='w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-2'
					/>
				</div>
				<div className='mb-4'>
					<label className='sr-only' htmlFor='password'>
						{t('password')}
					</label>
					<input
						type='password'
						name='password'
						placeholder={t('password')}
						autoCapitalize='off'
						autoComplete='off'
						className='w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-2'
					/>
				</div>
				<button
					className='rounded bg-neutral-800 px-4 py-2 text-neutral-200 hover:bg-neutral-700'
					type='submit'
				>
					{t('login')}
				</button>
			</form>
			<div></div>
		</div>
	);
}
