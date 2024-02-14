import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from './components/layouts/DefaultLayout';
import LoaderComponent from './components/other/LoaderComponent';
import { useGetUserInfoQuery } from './utils/hooks';
import { slugs } from './utils/routes';
import { filterRoutes } from './utils';

function App() {
  const { isLoading: userInfoLoading, loggedIn } = useGetUserInfoQuery();

  if (userInfoLoading) return <LoaderComponent />;

  const routes = filterRoutes(loggedIn);

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
