import {
  format,
  isToday,
  parseISO,
  endOfDay,
  startOfDay,
  isTomorrow,
  isYesterday,
  isSameDay,
} from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { toast } from 'react-toastify';
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
  date ? format(new Date(date), 'yyyy-MM-dd HH:mm') : '';

export const formatTime = (date?: Date | string) => (date ? format(new Date(date), 'HH:mm') : '');

function getDateTranslate(date: Date) {
  if (isToday(date)) return 'Šiandien';
  else if (isTomorrow(date)) return 'Rytoj';
  else if (isYesterday(date)) return 'Vakar';
}

export const getTimeLabel = ({ startAt, endAt, isFullDay }: Event) => {
  function getFormatted(value?: string) {
    if (!value) return;

    const parsedValue = parseISO(value);

    const prefix = getDateTranslate(parsedValue);
    if (isFullDay) return prefix ? prefix : formatDate(parsedValue);
    else if (prefix) return `${prefix} ${formatTime(parsedValue)}`;
    return formatDateAndTime(parsedValue);
  }

  const startAtFormatted = getFormatted(startAt);
  const endAtFormatted = getFormatted(endAt);

  if (endAtFormatted) {
    return `${startAtFormatted} - ${endAtFormatted}`;
  }

  return startAtFormatted;
};

export const isEmpty = (value: any) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

export const formatDateTo = (date: Date) => {
  return toZonedTime(endOfDay(date), 'Europe/Vilnius');
};

export const formatDateFrom = (date: Date) => {
  return toZonedTime(startOfDay(new Date(date)), 'Europe/Vilnius');
};

export const formatToZonedDate = (date: Date) => {
  return toZonedTime(new Date(date), 'Europe/Vilnius');
};

export const displayCustomDateFilterLabel = (date: { start?: Date; end?: Date } | undefined) => {
  if (!date?.start) {
    return '-';
  }
  const start = new Date(date.start);
  const end = date.end && new Date(date.end);
  if (!end || isSameDay(start, end)) {
    return `${format(start, 'yyyy-MM-dd')}`;
  } else {
    return `${format(start, 'yyyy-MM-dd')}  -  ${format(end, 'yyyy-MM-dd')}`;
  }
};
