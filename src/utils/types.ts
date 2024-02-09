import { AppType } from './constants';

import { Frequency } from './constants';

export type ChildrenType = string | JSX.Element | JSX.Element[] | any;

export interface App {
  id: number;
  key: AppType;
  name: string;
  description: string;
  icon: string;
}

export interface Subscription<T = number> {
  id: number;
  user: number;
  apps: T[];
  geom: any;
  frequency: Frequency;
  active: boolean;
}

export type SubscriptionForm = Omit<Subscription, 'id' | 'geom' | 'user'> & {
  id?: number;
  geom?: any; //TODO: should not be omitted
  user?: number;
};

export interface Event {
  id?: string;
  externalId?: any;
  body?: any;
  createdAt: Date;
  geom: any;
  startAt: Date;
  endAt?: Date;
  isFullDay: boolean;
  name: string;
  url?: string;
  app: App;
}

export interface User {
  id?: string;
  firstName?: string;
  phone?: string;
  lastName?: string;
  email?: string;
}

export interface ReactQueryError {
  response: {
    data: {
      type: string;
      message: string;
    };
  };
}
