import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from './components/layouts/DefaultLayout';
import LoaderComponent from './components/other/LoaderComponent';
import { slugs } from './utils/routes';
import { filterRoutes } from './utils';
import { useContext } from 'react';
import { UserContext, UserContextType } from './components/UserProvider';

function App() {
  const { isLoading, loggedIn, subscriptionsCount } = useContext<UserContextType>(UserContext);

  if (isLoading) return <LoaderComponent />;

  const routes = filterRoutes(loggedIn);

  return (
    <DefaultLayout>
      <Routes>
        <Route>
          {routes.map((route, index) => (
            <Route key={`route-${index}`} path={route.slug} element={route.component} />
          ))}
        </Route>
        <Route
          path="*"
          element={
            <Navigate
              to={
                loggedIn
                  ? subscriptionsCount > 0
                    ? slugs.myEvents
                    : slugs.newSubscription
                  : slugs.events
              }
            />
          }
        />
      </Routes>
      <ToastContainer />
    </DefaultLayout>
  );
}

export default App;
