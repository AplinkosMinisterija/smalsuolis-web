import About from '../pages/About';
import { default as CreatePassword } from '../pages/CreatePassword';
import Event from '../pages/Event';
import Events from '../pages/Events';
import RemindPassword from '../pages/ForgotPassword';
import Login from '../pages/Login';
import MyEvents from '../pages/MyEvents';
import Profile from '../pages/Profile';
import Registration from '../pages/Registration';
import ResetPassword from '../pages/ResetPassword';
import Subscription from '../pages/Subscription';
import Subscriptions from '../pages/Subscriptions';
import { IconName } from './constants';
import { titles } from './texts';

export const slugs = {
  login: '/prisijungimas',
  forgotPassword: '/pamirsau',
  resetPassword: '/atstatyti',
  registration: '/registracija',
  createAccount: '/pakvietimas',
  profile: '/profilis',
  events: '/visos-naujienos',
  myEvents: '/mano-naujienos',
  subscriptions: '/prenumeratos',
  subscription: (id?: string) => `/prenumeratos/${id}`,
  newSubscription: `/prenumeratos/nauja`,
  event: (id?: string) => `/ivykis/${id}`,
  about: '/apie-mus',
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
    back: true,
    slug: slugs.subscription(':id'),
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
    title: titles.myEvents,
    description: 'Visos atrinktos naujienos',
    iconName: IconName.list,
    loggedIn: true,
    component: <MyEvents />,
    slug: slugs.myEvents,
  },
  {
    title: titles.allEvents,
    iconName: IconName.fourSquares,
    component: <Events />,
    slug: slugs.events,
  },
  {
    component: <Event />,
    slug: slugs.event(':id'),
  },
  {
    component: <About />,
    title: titles.about,
    iconName: IconName.book,
    back: false,
    slug: slugs.about,
  },
  {
    component: <Profile />,
    title: titles.profile,
    loggedIn: true,
    iconName: IconName.profile,
    back: false,
    slug: slugs.profile,
  },
];
