import { differenceInHours, differenceInMinutes, differenceInSeconds, format } from 'date-fns';
import { toast } from 'react-toastify';
import { validationTexts } from './texts';
import { routes } from './routes';

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

export const getTimeDifference = (date: Date) => {
  const inputDate = new Date(date);
  const currentDate = new Date();

  const seconds = differenceInSeconds(currentDate, inputDate);
  const minutes = differenceInMinutes(currentDate, inputDate);
  const hours = differenceInHours(currentDate, inputDate);

  if (hours > 23) {
    return formatDate(inputDate);
  }

  if (minutes > 59) {
    return `${hours} val.`;
  }

  if (seconds > 59) {
    return `${minutes} min.`;
  }

  return `${seconds} s.`;
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
