import { useContext } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { DefaultLayout } from 'design-system';
import LoaderComponent from './components/LoaderComponent';
import { UserContext, UserContextType } from './components/UserProvider';
import { filterMenuRoutes, filterRoutes, IconName, useGetCurrentRoute, useLogout } from './utils';
import { slugs } from './utils/routes';
import Icon from './components/Icons';

function App() {
  const navigate = useNavigate();
  const { isLoading, loggedIn, subscriptionsCount } = useContext<UserContextType>(UserContext);
  const currentRoute = useGetCurrentRoute();
  const { mutateAsync: logout } = useLogout();

  if (isLoading) return <LoaderComponent />;

  const routes = filterRoutes(loggedIn);

  const mainPage = loggedIn
    ? subscriptionsCount > 0
      ? slugs.myEvents
      : slugs.newSubscription
    : slugs.events;

  return (
    <DefaultLayout
      loggedIn={loggedIn}
      currentRoute={currentRoute}
      routes={filterMenuRoutes(loggedIn) || []}
      logo={<Icon name={IconName.sidebarLogo} />}
      loginSlug={slugs.login}
      onGoBack={() => navigate(-1)}
      onGoHome={() => navigate('/')}
      onLogin={() => navigate(slugs.login)}
      onLogout={() => logout()}
      onRouteSelected={(slug) => navigate(slug)}
    >
      <Routes>
        <Route>
          {routes.map((route, index) => (
            <Route key={`route-${index}`} path={route.slug} element={route.component} />
          ))}
        </Route>
        <Route path="*" element={<Navigate to={mainPage} />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
