import ReactDOM from 'react-dom/client';
import {
  MutationCache,
  Query,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryKey,
} from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { GlobalStyle, theme } from './styles/index';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { UserProvider, isUserError } from './components/UserProvider';
import { AxiosError } from 'axios';
import { handleAlert, routes, slugs } from './utils';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const handleGlobalError = (queryClient: any, error: Error, query: any) => {
  const code = (error as AxiosError)?.response?.status;
  if (code == 401) {
    // only for non users queries
    if (!(query.queryKey.includes('user') && query.queryKey.length === 1)) {
      queryClient.invalidateQueries({ queryKey: ['user'] });
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
