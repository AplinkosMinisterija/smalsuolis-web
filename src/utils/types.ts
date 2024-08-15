import { flow } from 'lodash';
import { AppType } from './constants';

import { Frequency } from './constants';
import { subMonths, subWeeks } from 'date-fns/fp';
import { formatDateAndTime, formatDateFrom, formatDateTo, formatToZonedDate } from './functions';
import { FeatureCollection } from '@aplinkosministerija/design-system';

export interface App {
  id: number;
  key: AppType;
  name: string;
  description: string;
  icon: string;
}

export interface Subscription<T = number> {
  id: number;
  name: string;
  user?: number;
  apps?: T[];
  geom?: FeatureCollection;
  frequency?: Frequency;
  active?: boolean;
  eventsCount?: { allTime: number; new: number };
}

export interface SubscriptionForm extends Subscription {
  futureApps: boolean;
  apps: number[];
  frequency: Frequency;
  active: boolean;
}

export interface Event {
  id?: string;
  externalId?: any;
  body?: any;
  createdAt: Date;
  geom: any;
  startAt: string;
  endAt?: string;
  isFullDay: boolean;
  name: string;
  url?: string;
  app: App;
}

export interface User {
  id?: string;
  email?: string;
}

export interface PasswordForm {
  password: string;
  repeatPassword: string;
  oldPassword?: string;
}

export interface UpdatePassword {
  password: string;
  oldPassword: string;
}

export interface SetPassword {
  password: string;
}

export interface ReactQueryError {
  response: {
    data: {
      type: string;
      message: string;
    };
  };
}

export interface LoginForm {
  email: string;
  password: string;
  refresh: boolean;
}

// ---- Filters ----

export enum TimeRanges {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  FUTURE = 'FUTURE',
}

export interface TimeRangeItem {
  key: TimeRanges;
  query: any;
  name: string;
}

export const timeRangeQuery = {
  [TimeRanges.FUTURE]: {
    $gte: flow(formatToZonedDate, formatDateAndTime)(new Date()),
  },
  [TimeRanges.DAY]: {
    $gte: flow(formatDateFrom, formatDateAndTime)(new Date()),
    $lt: flow(formatDateTo, formatDateAndTime)(new Date()),
  },
  [TimeRanges.WEEK]: {
    $gte: flow(formatDateFrom, subWeeks(1), formatDateAndTime)(new Date()),
    $lt: flow(formatDateTo, formatDateAndTime)(new Date()),
  },
  [TimeRanges.MONTH]: {
    $gte: flow(formatDateFrom, subMonths(1), formatDateAndTime)(new Date()),
    $lt: flow(formatDateTo, formatDateAndTime)(new Date()),
  },
};

export const timeRangeItems: TimeRangeItem[] = [
  {
    key: TimeRanges.DAY,
    query: timeRangeQuery[TimeRanges.DAY],
    name: 'Šios dienos',
  },
  {
    key: TimeRanges.WEEK,
    query: timeRangeQuery[TimeRanges.WEEK],
    name: 'Šios savaitės',
  },
  {
    key: TimeRanges.MONTH,
    query: timeRangeQuery[TimeRanges.MONTH],
    name: 'Šio mėnesio',
  },
  {
    key: TimeRanges.FUTURE,
    query: timeRangeQuery[TimeRanges.FUTURE],
    name: 'Būsimi',
  },
];

export interface Filters {
  apps?: App[];
  subscriptions?: Subscription[];
  timeRange?: TimeRangeItem;
}

export interface Stats {
  byApp: {
    infostatyba: {
      count: number;
      byTag: Record<string, { count: number }>;
    };
    izuvinimas: {
      count: number;
    };
    miskoKirtimai: {
      count: number;
      byTag: Record<string, { count: number; area: number }>;
    };
  };
  count: number;
}
