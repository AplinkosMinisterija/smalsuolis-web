import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from './components/layouts/DefaultLayout';
import LoaderComponent from './components/other/LoaderComponent';
import { slugs } from './utils/routes';
import { filterRoutes } from './utils';
import { useContext, useEffect, useState } from 'react';
import { UserContext, UserContextType } from './components/UserProvider';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';

const cookies = new Cookies();

function App() {
  const navigate = useNavigate();
  const { isLoading, loggedIn, subscriptionsCount } = useContext<UserContextType>(UserContext);

  useEffect(() => {
    if (!isLoading) {
      const page = cookies.get('page');
      const mainPage = loggedIn
        ? page
          ? page
          : subscriptionsCount > 0
            ? slugs.myEvents
            : slugs.newSubscription
        : slugs.events;
      if (mainPage === page) {
        cookies.remove('page');
      }
      navigate(mainPage);
    }
  }, [isLoading, loggedIn]);

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
      </Routes>
    </DefaultLayout>
  );
}

export default App;
