import ReactDOM from 'react-dom/client';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { GlobalStyle, theme } from './styles/index';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { UserProvider } from './components/UserProvider';
import { AxiosError } from 'axios';
import { handleAlert } from './utils';
import api from './utils/api';
import Cookies from 'universal-cookie';
import { updateTokens } from './utils/loginFunctions';
const cookies = new Cookies();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const handleGlobalError = async (queryClient: QueryClient, error: Error, query: any) => {
  const code = (error as AxiosError)?.response?.status;
  if (code == 401) {
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
    if (!(query.queryKey.includes('user') && query.queryKey.length === 1)) {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  } else {
    handleAlert();
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
    onError: (error, query) => handleGlobalError(queryClient, error, query),
  }),
});

root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <UserProvider>
            <App />
          </UserProvider>
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
