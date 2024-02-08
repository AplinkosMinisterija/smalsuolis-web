import { IconName } from '../components/other/Icons';
import { default as CreatePassword } from '../pages/CreatePassword';
import Event from '../pages/Event';
import Events from '../pages/Events';
import RemindPassword from '../pages/ForgotPassword';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Registration from '../pages/Registration';
import ResetPassword from '../pages/ResetPassword';
import { titles } from './texts';
import Subscriptions from '../pages/Subscriptions';
import Subscription from '../pages/Subscription';

export const slugs = {
  login: '/prisijungimas/',
  forgotPassword: '/pamirsau',
  resetPassword: '/atstatyti',
  registration: '/registracija',
  createAccount: '/pakvietimas',
  profile: '/profilis',
  subscriptions: '/prenumeratos',
  subscription: (id?: string) => `/prenumeratos/${id}`,
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
    component: <ResetPassword />,
    loggedIn: false,
    title: titles.resetPassword,
    back: false,
    slug: slugs.resetPassword,
  },
  {
    component: <Subscriptions />,
    title: titles.subscriptions,
    loggedIn: true,
    iconName: IconName.settings,
    back: false,
    slug: slugs.subscriptions,
  },
  {
    component: <Subscription />,
    title: titles.subscription,
    loggedIn: true,
    slug: slugs.subscription(':id'),
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
    component: <CreatePassword />,
    loggedIn: false,
    slug: slugs.createAccount,
  },
  {
    title: titles.events,
    iconName: IconName.fourSquares,
    component: <Events />,
    slug: slugs.events,
  },
  {
    component: <Event />,
    slug: slugs.event(':id'),
  },
];
