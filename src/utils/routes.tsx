import { AppRoute } from '@aplinkosministerija/design-system';
import Icon from '../components/Icons';
import About from '../pages/About';
import { default as CreatePassword } from '../pages/CreatePassword';
import EventPage from '../pages/Event';
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
import Stats from '../pages/Stats';

export const slugs = {
  login: '/prisijungimas',
  forgotPassword: '/pamirsau',
  resetPassword: '/atstatyti',
  registration: '/registracija',
  createAccount: '/pakvietimas',
  profile: '/profilis',
  events: '/visos-naujienos',
  event: (id?: string) => `/visos-naujienos/${id}`,
  myEvents: '/mano-naujienos',
  subscriptions: '/prenumeratos',
  subscription: (id?: string) => `/prenumeratos/${id}`,
  newSubscription: `/prenumeratos/nauja`,
  about: '/apie-mus',
  stats: '/statistika',
};

export const routes: AppRoute[] = [
  {
    component: <Login />,
    loggedIn: false,
    title: titles.login,
    slug: slugs.login,
  },
  {
    component: <ResetPassword />,
    loggedIn: false,
    title: titles.resetPassword,
    slug: slugs.resetPassword,
  },
  {
    component: <Subscriptions />,
    title: titles.subscriptions,
    loggedIn: true,
    icon: <Icon name={IconName.settings} />,
    slug: slugs.subscriptions,
  },

  {
    component: <EventPage />,
    slug: slugs.event(':id'),
  },

  {
    component: <Subscription />,
    title: titles.subscription,
    loggedIn: true,
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
    description: 'Visi atrinkti įvykiai',
    icon: <Icon name={IconName.list} />,
    loggedIn: true,
    component: <MyEvents />,
    slug: slugs.myEvents,
  },
  {
    title: titles.allEvents,
    icon: <Icon name={IconName.fourSquares} />,
    component: <Events />,
    slug: slugs.events,
  },

  {
    component: <About />,
    title: titles.about,
    icon: <Icon name={IconName.book} />,
    slug: slugs.about,
  },
  {
    component: <Stats />,
    title: titles.stats,
    icon: <Icon name={IconName.arrowTrending} />,
    slug: slugs.stats,
  },
  {
    component: <Profile />,
    title: titles.profile,
    loggedIn: true,
    icon: <Icon name={IconName.profile} />,
    slug: slugs.profile,
  },
];
