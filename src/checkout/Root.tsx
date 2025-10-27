'use client';
import { useAuthChange, useSaleorAuthContext } from '@saleor/auth-sdk/react';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import { type Client, Provider as UrqlProvider, cacheExchange, createClient, fetchExchange } from 'urql';


import { PageNotFound } from '@/checkout/views/PageNotFound';

import { alertsContainerProps } from './hooks/useAlerts/consts';
import { RootViews } from './views/RootViews';
import './index.css';

export const Root = ({ saleorApiUrl }: { saleorApiUrl: string }) => {
	const saleorAuthClient = useSaleorAuthContext();

	const makeUrqlClient = () =>
		createClient({
			url: saleorApiUrl,
			suspense: true,
			requestPolicy: 'cache-first',
			fetch: (input, init) => saleorAuthClient.fetchWithAuth(input as RequestInfo, init as RequestInit),
			exchanges: [cacheExchange, fetchExchange],
		});

	const [urqlClient, setUrqlClient] = useState<Client>(makeUrqlClient());
	useAuthChange({
		saleorApiUrl,
		onSignedOut: () => setUrqlClient(makeUrqlClient()),
		onSignedIn: () => setUrqlClient(makeUrqlClient()),
	});

	return (
		<UrqlProvider value={urqlClient}>
			<ToastContainer {...alertsContainerProps} />
			<ErrorBoundary FallbackComponent={PageNotFound}>
				<RootViews />
			</ErrorBoundary>
		</UrqlProvider>
	);
};
