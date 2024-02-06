import Axios, { AxiosInstance, AxiosResponse } from 'axios';

import Cookies from 'universal-cookie';
import { Event } from './types';
const cookies = new Cookies();

interface GetAll {
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
}
interface UpdateOne {
  resource?: string;
  id?: string;
  params?: any;
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
  REMIND_PASSWORD = 'auth/remind',
  LOG_OUT = 'auth/logout',
  ME = 'users/me',
  events = 'events',
  USERS = 'users',
}

class Api {
  private AuthApiAxios: AxiosInstance;
  private readonly proxy: string = '/api';

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

  get = async ({ resource, id, populate }: GetAll) => {
    const config = {
      params: { ...(!!populate && { populate }) },
    };

    return this.errorWrapper(() =>
      this.AuthApiAxios.get(`/${resource}${id ? `/${id}` : ''}`, config),
    );
  };

  getOne = async ({ resource, id, populate }: GetOne) => {
    const config = {
      params: { ...(!!populate && { populate }) },
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

  post = async ({ resource, id, params, config = {} }: Create) => {
    return this.errorWrapper(() =>
      this.AuthApiAxios.post(`/${resource}${id ? `/${id}` : ''}`, params, config),
    );
  };

  checkAuth = async () => {
    return this.get({ resource: Resources.ME });
  };

  logout = async () => {
    return this.post({ resource: Resources.LOG_OUT });
  };

  refreshToken = async () => {
    return this.post({
      resource: Resources.REFRESH_TOKEN,
      params: { token: cookies.get('refreshToken') },
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

  getEvents = async ({ page }: { page: number }): Promise<GetAllResponse<Event>> => {
    return this.get({
      resource: Resources.events,
      populate: ['geom'],
      page,
    });
  };

  getEvent = async ({ id }: { id: string }): Promise<Event> => {
    return this.getOne({
      resource: Resources.events,
      populate: ['geom'],
      id,
    });
  };
}

const api = new Api();

export default api;
