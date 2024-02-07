import { IconName } from '../components/other/Icons';
import CreateUser from '../pages/CreateUser';
import Event from '../pages/Event';
import Events from '../pages/Events';
import RemindPassword from '../pages/ForgotPassword';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Registration from '../pages/Registration';
import { titles } from './texts';

export const slugs = {
  login: '/prisijungimas/',
  forgotPassword: '/pamirsau',
  registration: '/registracija',
  createAccount: '/pakvietimas',
  profile: '/profilis',
  events: '/ivykiai',
  event: (id?: string) => `/ivykis/${id}`,
};

export const routes = [
  {
    component: <Login />,
    loggedIn: false,
    title: titles.login,
    back: false,
    slug: slugs.login,
  },

  {
    component: <Profile />,
    title: titles.profile,
    loggedIn: true,
    iconName: IconName.profile,
    back: false,
    slug: slugs.profile,
  },
  {
    component: <RemindPassword />,
    title: titles.forgotPassword,
    slug: slugs.forgotPassword,
  },
  {
    component: <Registration />,
    title: titles.registration,
    loggedIn: false,
    slug: slugs.registration,
  },
  {
    title: titles.createAccount,
    component: <CreateUser />,
    loggedIn: false,
    slug: slugs.createAccount,
  },
  {
    component: <Events />,
    slug: slugs.events,
  },
  {
    component: <Event />,
    slug: slugs.event(':id'),
  },
];
