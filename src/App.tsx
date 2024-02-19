import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from './components/layouts/DefaultLayout';
import LoaderComponent from './components/other/LoaderComponent';
import { UserContext, UserContextType } from './components/UserProvider';
import { filterRoutes } from './utils';
import { slugs } from './utils/routes';

function App() {
  const { isLoading, loggedIn, subscriptionsCount } = useContext<UserContextType>(UserContext);

  if (isLoading) return <LoaderComponent />;

  const routes = filterRoutes(loggedIn);

  const getInitialSlug = () => {
    if (!loggedIn) return slugs.events;

    if (!subscriptionsCount) return slugs.newSubscription;

    return slugs.myEvents;
  };

  return (
    <DefaultLayout>
      <Routes>
        <Route>
          {routes.map((route, index) => (
            <Route key={`route-${index}`} path={route.slug} element={route.component} />
          ))}
        </Route>
        <Route path="*" element={<Navigate to={getInitialSlug()} />} />
      </Routes>
      <ToastContainer />
    </DefaultLayout>
  );
}

export default App;
