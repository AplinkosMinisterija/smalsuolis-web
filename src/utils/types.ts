import { AppType } from './constants';

export type ChildrenType = string | JSX.Element | JSX.Element[] | any;

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

export interface App {
  id: string;
  key: AppType;
  name: string;
  icon?: string;
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
