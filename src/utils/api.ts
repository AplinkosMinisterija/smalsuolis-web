import Axios, { AxiosInstance, AxiosResponse } from 'axios';

import Cookies from 'universal-cookie';
import { App, Event, Stats, Subscription } from './types';
const cookies = new Cookies();

interface Get {
  resource: string;
  page?: number;
  populate?: string[];
  municipalityId?: string;
  filter?: string | any;
  query?: string;
  pageSize?: string;
  search?: string;
  searchFields?: string[];
  sort?: string[];
  scope?: string;
  fields?: string[];
  id?: string;
  geom?: any;
  responseType?: any;
}

export interface GetAllResponse<T> {
  rows: T[];
  totalPages: number;
  page: number;
  pageSize: number;
  error?: any;
}

interface GetOne {
  resource: string;
  id?: string | any;
  populate?: string[];
  scope?: string;
  filter?: string | any;
}
interface UpdateOne<T = any> {
  resource?: string;
  id?: number | string;
  params?: T;
}

interface DeleteOne {
  resource?: string;
  id?: number | string;
}

interface Create {
  resource: string;
  params?: any;
  config?: any;
  id?: string;
}

export enum Resources {
  LOGIN = 'auth/login',
  REFRESH_TOKEN = 'auth/refresh',
  VERIFY_USER = 'auth/change/verify',
  SET_PASSWORD = 'auth/change/accept',
  REMIND_PASSWORD = 'auth/change/remind',
  LOG_OUT = 'auth/logout',
  ME = 'users/me',
  EVENTS = 'events',
  NEWSFEED = 'newsfeed',
  SUBSCRIPTIONS = 'subscriptions',
  APPS = 'apps',
  USERS = 'users',
  STATS = 'stats',
}
class Api {
  private AuthApiAxios: AxiosInstance;
  private readonly proxy: string = import.meta.env.VITE_PROXY_BASE_URL ?? '/api';

  constructor() {
    this.AuthApiAxios = Axios.create();

    this.AuthApiAxios.interceptors.request.use(
      (config) => {
        const token = cookies.get('token');
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }

        config.url = this.proxy + config.url;

        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );
  }

  errorWrapper = async (endpoint: () => Promise<AxiosResponse<any, any>>) => {
    const res = await endpoint();
    return res.data;
  };

  get = async ({ resource, id, ...rest }: Get) => {
    const config = {
      params: { page: 1, pageSize: 10, ...rest },
    };

    return this.errorWrapper(() =>
      this.AuthApiAxios.get(`/${resource}${id ? `/${id}` : ''}`, config),
    );
  };

  getCount = async ({ resource, ...rest }: Get) => {
    const config = {
      params: { ...rest },
    };

    return this.errorWrapper(() => this.AuthApiAxios.get(`/${resource}/count`, config));
  };

  getAll = async ({ resource, ...rest }: Get) => {
    const config = {
      params: { ...rest },
    };

    return this.errorWrapper(() => this.AuthApiAxios.get(`/${resource}/all`, config));
  };

  getOne = async ({ resource, id, populate, ...rest }: GetOne) => {
    const config = {
      params: { ...(!!populate && { populate }), ...rest },
    };

    return this.errorWrapper(() =>
      this.AuthApiAxios.get(`/${resource}${id ? `/${id}` : ''}`, config),
    );
  };

  patch = async ({ resource, id, params }: UpdateOne) => {
    return this.errorWrapper(() =>
      this.AuthApiAxios.patch(`/${resource}/${id ? `/${id}` : ''}`, params),
    );
  };

  delete = async ({ resource, id }: DeleteOne) => {
    return this.errorWrapper(() => this.AuthApiAxios.delete(`/${resource}/${id ? `/${id}` : ''}`));
  };

  post = async ({ resource, id, params, config = {} }: Create) => {
    return this.errorWrapper(() =>
      this.AuthApiAxios.post(`/${resource}${id ? `/${id}` : ''}`, params, config),
    );
  };

  getUserInfo = async () => {
    return this.get({ resource: Resources.ME });
  };

  logout = async () => {
    return this.post({ resource: Resources.LOG_OUT });
  };

  updateProfile = async (params: any): Promise<any> => {
    return this.patch({
      resource: Resources.ME,
      params,
    });
  };

  refreshToken = async (refreshToken: string) => {
    return this.post({
      resource: Resources.REFRESH_TOKEN,
      params: { token: refreshToken },
    });
  };

  login = async (params: { password: string; email: string }) => {
    return this.post({
      resource: Resources.LOGIN,
      params,
    });
  };

  remindPassword = async (params: { email: string }) => {
    return this.post({
      resource: Resources.REMIND_PASSWORD,
      params,
    });
  };

  registration = async (params: { email: string }) => {
    return this.post({
      resource: Resources.USERS,
      params,
    });
  };

  verifyUser = async (params: {
    h: string;
    s: string;
  }): Promise<{
    inviter: { name: string; email: string };
    user: { email: string };
  }> => {
    return this.post({
      resource: Resources.VERIFY_USER,
      params,
    });
  };

  setPassword = async (params: { h: string; s: string; password: string }): Promise<any> => {
    return this.post({
      resource: Resources.SET_PASSWORD,
      params,
    });
  };

  getEvents = async ({
    page,
    query,
  }: {
    page: number;
    query: any;
  }): Promise<GetAllResponse<Event>> => {
    return this.get({
      resource: Resources.EVENTS,
      query,
      populate: ['geom', 'app'],
      sort: ['-startAt'],
      page,
    });
  };

  getEventsCount = async ({ query }: { query: any }): Promise<number> => {
    return this.getCount({
      resource: Resources.EVENTS,
      query,
    });
  };

  getEvent = async ({ id }: { id: any }): Promise<Event> => {
    return this.getOne({
      resource: Resources.EVENTS,
      id,
      populate: ['geom', 'app'],
    });
  };

  getNewsfeed = async ({
    page,
    query,
  }: {
    page: number;
    query: any;
  }): Promise<GetAllResponse<Event>> => {
    return this.get({
      resource: Resources.NEWSFEED,
      query,
      populate: ['geom', 'app'],
      sort: ['-startAt'],
      page,
    });
  };

  getNewsfeedCount = async ({ query }: { query: any }): Promise<number> => {
    return this.getCount({
      resource: Resources.NEWSFEED,
      query,
    });
  };

  getSubscriptions = async ({ page }: { page: number }): Promise<GetAllResponse<Subscription>> => {
    return this.get({
      resource: Resources.SUBSCRIPTIONS,
      populate: ['apps', 'eventsCount'],
      sort: ['name'],
      page,
    });
  };

  getAllSubscriptions = async (): Promise<Subscription[]> => {
    return this.getAll({
      resource: Resources.SUBSCRIPTIONS,
      populate: ['geom'],
    });
  };

  getSubscription = async ({ id }: { id: string }): Promise<Subscription> => {
    return this.getOne({
      resource: Resources.SUBSCRIPTIONS,
      populate: ['geom'],
      id,
    });
  };

  createSubscription = async (params: Subscription): Promise<Subscription> => {
    return this.post({
      resource: Resources.SUBSCRIPTIONS,
      params,
    });
  };

  updateSubscription = async ({
    id,
    params,
  }: {
    id: number | string;
    params: Subscription;
  }): Promise<Subscription> => {
    return this.patch({
      resource: Resources.SUBSCRIPTIONS,
      id,
      params,
    });
  };

  deleteSubscription = async (id: number | string): Promise<any> => {
    return this.delete({
      resource: Resources.SUBSCRIPTIONS,
      id,
    });
  };

  getSubscriptionsCount = async (): Promise<number> => {
    return this.getCount({
      resource: Resources.SUBSCRIPTIONS,
    });
  };

  deleteSubscriptions = async (ids: number[]): Promise<any> => {
    return this.post({
      resource: Resources.SUBSCRIPTIONS + '/delete',
      params: {
        ids,
      },
    });
  };

  getApps = async ({ page }: { page: number }): Promise<GetAllResponse<App>> => {
    return this.get({
      resource: Resources.APPS,
      page,
    });
  };

  getAllApps = async (): Promise<App[]> => {
    return this.getAll({
      resource: Resources.APPS,
    });
  };

  getStats = async (date: { $gte: string; $lt: string }): Promise<Stats> => {
    // return this.get({
    //   resource: Resources.STATS,
    //   query: JSON.stringify({ startAt: date }),
    // });
  };
}

const api = new Api();

export default api;
