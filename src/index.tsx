import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { UserProvider } from './components/UserProvider';
import { GlobalStyle, theme } from './styles/index';
import { handleAlert } from './utils';

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
  <CookiesProvider>
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
  </CookiesProvider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
