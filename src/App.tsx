import { isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import DefaultLayout from './components/layouts/DefaultLayout';
import LoaderComponent from './components/other/LoaderComponent';
import { useAppSelector } from './state/hooks';
import api from './utils/api';
import { ServerErrorCodes } from './utils/constants';
import { useFilteredRoutes, useGetUserInfoQuery } from './utils/hooks';
import { handleUpdateTokens } from './utils/loginFunctions';
import { slugs } from './utils/routes';
const cookies = new Cookies();

function App() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const [initialLoading, setInitialLoading] = useState(true);
  const location = useLocation();

  const routes = useFilteredRoutes();

  const updateTokensMutation = useMutation(api.refreshToken, {
    onError: ({ response }: any) => {
      if (isEqual(response.status, ServerErrorCodes.NOT_FOUND)) {
        cookies.remove('refreshToken', { path: '/' });
      }
    },
    onSuccess: (data) => {
      handleUpdateTokens(data);
    },
  });

  const updateTokensMutationMutateAsyncFunction = updateTokensMutation.mutateAsync;

  const shouldUpdateTokens = useCallback(async () => {
    if (!cookies.get('token') && cookies.get('refreshToken')) {
      await updateTokensMutationMutateAsyncFunction();
    }
  }, [updateTokensMutationMutateAsyncFunction]);

  const { isLoading: userInfoLoading } = useGetUserInfoQuery();

  useEffect(() => {
    (async () => {
      await shouldUpdateTokens();

      setInitialLoading(false);
    })();
  }, [location.pathname, shouldUpdateTokens]);

  const isLoading = [initialLoading, updateTokensMutation.isLoading, userInfoLoading].some(
    (loading) => loading,
  );

  if (isLoading) return <LoaderComponent />;

  return (
    <DefaultLayout>
      <Routes>
        <Route>
          {routes.map((route, index) => (
            <Route key={`route-${index}`} path={route.slug} element={route.component} />
          ))}
        </Route>
        <Route path="*" element={<Navigate to={loggedIn ? slugs.profile : slugs.login} />} />
      </Routes>
      <ToastContainer />
    </DefaultLayout>
  );
}

export default App;
