import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  endOfDay,
  format,
  startOfDay,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { validationTexts } from './texts';

const cookies = new Cookies();

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

export const handleSetTokens = (data: any) => {
  const { access_token, refresh_token, expires_in } = data;
  cookies.set('token', access_token, {
    path: '/',
    expires: new Date(new Date().getTime() + expires_in * 1000),
  });

  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 10);

  cookies.set('refreshToken', refresh_token, {
    path: '/',
    expires: expirationDate,
  });
};

export const formatTime = (datetime?: Date | string) =>
  datetime ? format(new Date(datetime), 'HH:mm') : '';

export const formatDate = (date?: Date | string) =>
  date ? format(new Date(date), 'yyyy-MM-dd') : '';

export const formatDateTo = (date: string) => {
  return format(utcToZonedTime(endOfDay(new Date(date)), 'Europe/Vilnius'), 'yyyy-MM-dd');
};

export const formatDateFrom = (date: any) => {
  return format(utcToZonedTime(startOfDay(new Date(date)), 'Europe/Vilnius'), 'yyyy-MM-dd');
};

export const formatCoordinates = (coordinates: string) =>
  coordinates?.split(',')?.map((c) => Number(c));

export const secondsToHHMMSS = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  let formatString = '';

  if (hours > 0) {
    formatString += ` ${hours}h.`;
  }

  if (minutes > 0) {
    formatString += ` ${minutes}min.`;
  }

  if (remainingSeconds > 0) {
    formatString += ` ${remainingSeconds}s.`;
  }

  return formatString.trim();
};

export const handleGetCurrentLocation = (onSuccess: (props: any) => void) => {
  navigator.geolocation.getCurrentPosition(
    (location) => {
      const { latitude, longitude } = location.coords;
      onSuccess({ lat: latitude, lng: longitude });
    },
    () => {
      handleAlert('userDeniedLocation');
    },
    { enableHighAccuracy: true, maximumAge: 0 },
  );
};

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
