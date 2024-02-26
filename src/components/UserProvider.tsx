import React, { createContext, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api, { Resources } from '../utils/api';
import { AxiosError } from 'axios/index';

const excludedRouters = [Resources.ME];

export const isUserError = (error: AxiosError) => {
  const url = error?.request?.responseURL;
  return excludedRouters.some((ep) => url.includes(ep));
};

export type UserContextType = {
  data: any;
  error: Error | null;
  isLoading: boolean;
  loggedIn: boolean;
  subscriptionsCount: number;
};

const defaultValue: UserContextType = {
  data: null,
  error: null,
  isLoading: true,
  loggedIn: false,
  subscriptionsCount: 0,
};

export const UserContext: any = createContext<UserContextType>(defaultValue);

export const UserProvider = ({ children }: any) => {
  const {
    data,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return api.getUserInfo();
    },
    gcTime: 0,
  });

  const error = userError;
  const isLoading = userLoading;
  const loggedIn = !error && !!data?.id;

  return (
    <UserContext.Provider
      value={{
        data,
        error,
        isLoading,
        loggedIn,
        subscriptionsCount: data?.subscriptions?.length || 0,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
