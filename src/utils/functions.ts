import { format, isToday, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import { routes } from './routes';
import { validationTexts } from './texts';
import { Event } from './types';

export const getErrorMessage = (error?: string) =>
  validationTexts[error as keyof typeof validationTexts] || validationTexts.error;

export const handleAlert = (responseError?: string) => {
  toast.error(getErrorMessage(responseError), {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

export const handleToastSuccess = (message: string) => {
  toast.success(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

export const formatDate = (date?: Date | string) =>
  date ? format(new Date(date), 'yyyy-MM-dd') : '';

export const formatDateAndTime = (date?: Date | string) =>
  date ? format(new Date(date), 'yyyy-MM-dd HH:MM') : '';

export const formatTime = (date?: Date | string) => (date ? format(new Date(date), 'HH:MM') : '');

export const getTimeLabel = (event: Event) => {
  const { startAt, endAt, isFullDay } = event;

  const startAtParsed = parseISO(startAt);

  if (endAt) {
    const endAtParsed = parseISO(endAt);
    return `${formatDateAndTime(startAtParsed)} - ${formatDateAndTime(endAtParsed)}`;
  }

  const todayLabel = isToday(startAtParsed) ? `Šiandien` : '';

  if (isFullDay) {
    return todayLabel || formatDate(startAt);
  }

  return todayLabel ? `${todayLabel} ${formatTime(startAt)}` : formatDateAndTime(startAt);
};

export const isEmpty = (value: any) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

export const filterRoutes = (loggedIn: boolean) => {
  return routes.filter((route) => {
    if (!route?.slug) return false;
    if (Object.prototype.hasOwnProperty.call(route, 'loggedIn')) {
      return route.loggedIn === loggedIn;
    }
    return true;
  });
};

export const filterMenuRoutes = (loggedIn: boolean) => {
  return filterRoutes(loggedIn).filter((route) => !!route.iconName);
};

export const getIconUrl = (icon: string) => {
  const base64SVG = window.btoa(icon);
  return `data:image/svg+xml;base64,${base64SVG}`;
};
