import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import Cookies from 'universal-cookie';
import App from './App';
import { UserProvider } from './components/UserProvider';
import { GlobalStyle, theme } from './styles/index';
import { ServerErrorCodes, handleAlert } from './utils';
import api from './utils/api';
import { updateTokens } from './utils/loginFunctions';
import { isEqual } from 'lodash';

const cookies = new Cookies();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const handleGlobalError = async (queryClient: QueryClient, error: Error, query?: any) => {
  const code = (error as AxiosError)?.response?.status;

  console.log('handleGlobalError', error);

  if (isEqual(code, ServerErrorCodes.NO_PERMISSION)) {
    // Try to refresh token if any query fails with 401
    const refreshToken = cookies.get('refreshToken');

    if (refreshToken) {
      try {
        const response = await api.refreshToken(refreshToken);
        updateTokens(response);
        location.reload();
      } catch (e: any) {
        handleAlert();
      }
    }
    // Invalidate user query in order to rerender page (only for non users queries)
    if (!(query?.queryKey?.includes('user') && query?.queryKey?.length === 1)) {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  } else {
    const method = (error as AxiosError).config?.method;

    // Display an error toast only if the request method was "GET" .
    if (method === 'get' && error.name === 'AxiosError') {
      const errType = (error as any).response?.data?.type;
      handleAlert(errType);
    }
  }
};

const queryClient: any = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => handleGlobalError(queryClient, error, query),
  }),
  mutationCache: new MutationCache({
    onError: (error) => handleGlobalError(queryClient, error),
  }),
});

root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <UserProvider>
          <App />
          <ToastContainer />
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>,
);
