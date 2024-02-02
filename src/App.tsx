import { isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import LoaderComponent from './components/other/LoaderComponent';
import { useAppSelector } from './state/hooks';
import api from './utils/api';
import { ServerErrorCodes } from './utils/constants';
import { useCheckAuthMutation } from './utils/hooks';
import { handleUpdateTokens } from './utils/loginFunctions';
import { routes, slugs } from './utils/routes';
const cookies = new Cookies();

function App() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const [initialLoading, setInitialLoading] = useState(true);
  const location = useLocation();

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

  const { isLoading: checkAuthLoading } = useCheckAuthMutation();

  useEffect(() => {
    (async () => {
      await shouldUpdateTokens();

      setInitialLoading(false);
    })();
  }, [location.pathname, shouldUpdateTokens]);

  const isLoading = [initialLoading, updateTokensMutation.isLoading, checkAuthLoading].some(
    (loading) => loading,
  );

  if (isLoading) return <LoaderComponent />;

  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          {(routes || []).map((route, index) => (
            <Route key={`route-${index}`} path={route.slug} element={route.component} />
          ))}
        </Route>
        <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
          {(routes || []).map((route, index) => (
            <Route key={`route-${index}`} path={route.slug} element={route.component} />
          ))}
        </Route>
        <Route path="*" element={<Navigate to={loggedIn ? slugs.login : slugs.login} />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

const PublicRoute = () => {
  return <Outlet />;
};

const ProtectedRoute = ({ loggedIn }: { loggedIn: boolean }) => {
  if (!loggedIn) {
    return <Navigate to={slugs.login} replace />;
  }

  return <Outlet />;
};

export default App;
