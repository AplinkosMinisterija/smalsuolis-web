import About from '../pages/About';
import { default as CreatePassword } from '../pages/CreatePassword';
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
import { AppRoute } from '@aplinkosministerija/design-system';
import Icon from '../components/Icons';

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
  about: '/apie-mus',
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
    iconName: IconName.settings,
    icon: <Icon name={IconName.settings} />,
    slug: slugs.subscriptions,
  },
  {
    component: <Subscription />,
    title: titles.subscription,
    backUrl: slugs.subscriptions,
    loggedIn: true,
    slug: slugs.subscription(':id'),
  },
  {
    component: <RemindPassword />,
    title: titles.forgotPassword,
    backUrl: slugs.login,
    slug: slugs.forgotPassword,
  },
  {
    component: <Registration />,
    title: titles.registration,
    backUrl: slugs.login,
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
    icon: <Icon name={IconName.list} />,
    loggedIn: true,
    component: <MyEvents />,
    slug: slugs.myEvents,
  },
  {
    title: titles.allEvents,
    iconName: IconName.fourSquares,
    icon: <Icon name={IconName.fourSquares} />,
    component: <Events />,
    slug: slugs.events,
  },

  {
    component: <About />,
    title: titles.about,
    iconName: IconName.book,
    icon: <Icon name={IconName.book} />,
    slug: slugs.about,
  },
  {
    component: <Profile />,
    title: titles.profile,
    loggedIn: true,
    iconName: IconName.profile,
    icon: <Icon name={IconName.profile} />,
    slug: slugs.profile,
  },
];
