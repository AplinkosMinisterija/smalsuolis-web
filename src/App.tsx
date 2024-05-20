import { DefaultLayout, filterMenuRoutes, filterRoutes } from '@aplinkosministerija/design-system';
import { useContext } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import LoaderComponent from './components/LoaderComponent';
import { UserContext, UserContextType } from './components/UserProvider';
import { IconName, useGetCurrentRoute, useLogout } from './utils';
import { routes, slugs } from './utils/routes';
import Icon from './components/Icons';

function App() {
  const navigate = useNavigate();
  const { isLoading, loggedIn, subscriptionsCount } = useContext<UserContextType>(UserContext);
  const currentRoute = useGetCurrentRoute();
  const { mutateAsync: logout } = useLogout();

  if (isLoading) return <LoaderComponent />;

  const authRoutes = filterRoutes(routes, loggedIn);
  const menuRoutes = filterMenuRoutes(routes, loggedIn);

  const mainPage = loggedIn
    ? subscriptionsCount > 0
      ? slugs.myEvents
      : slugs.newSubscription
    : slugs.events;

  return (
    <DefaultLayout
      loggedIn={loggedIn}
      currentRoute={currentRoute}
      menuRoutes={menuRoutes || []}
      logo={<Icon name={IconName.sidebarLogo} />}
      loginSlug={slugs.login}
      onGoHome={() => navigate('/')}
      onLogin={() => navigate(slugs.login)}
      onLogout={() => logout()}
      onRouteSelected={(slug) => navigate(slug)}
    >
      <Routes>
        <Route>
          {authRoutes.map((route, index) => (
            <Route key={`route-${index}`} path={route.slug} element={route.component} />
          ))}
        </Route>
        <Route path="*" element={<Navigate to={mainPage} />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
