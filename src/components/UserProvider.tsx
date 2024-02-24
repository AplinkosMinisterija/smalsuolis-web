import React, { createContext, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api, { Resources } from '../utils/api';
import { AxiosError } from 'axios/index';
import { useMutation } from '@tanstack/react-query';
import { updateTokens } from '../utils/loginFunctions';
import Cookies from 'universal-cookie';
import { routes } from '../utils';

const excludedRouters = [Resources.ME];

export const isUserError = (error: AxiosError) => {
  const url = error?.request?.responseURL;
  return excludedRouters.some((ep) => url.includes(ep));
};

const cookies = new Cookies();

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
  const queryClient = useQueryClient();
  const {
    data,
    error: userError,
    isLoading: userLoading,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return api.getUserInfo();
    },
    gcTime: 0,
  });

  const {
    mutateAsync: refresh,
    error: refreshTokenError,
    isPending,
  } = useMutation({
    mutationFn: api.refreshToken,
    onSuccess: (response) => {
      updateTokens(response);
      refetch();
    },
    onError: (error) => {
      const errorCode = (error as AxiosError).response?.status;
      if (errorCode == 404) {
        cookies.remove('refreshToken', { path: '/' });
      }
    },
  });

  const {
    data: subsCount,
    isLoading: subsCountLoading,
    error: subsCountError,
  } = useQuery({
    queryKey: ['subsCount'],
    queryFn: api.getSubscriptionsCount,
    enabled: !userLoading && !isPending && !userError,
  });

  useEffect(() => {
    if (userError) {
      const errorCode = (userError as AxiosError).response?.status;
      const refreshToken = cookies.get('refreshToken');
      if (errorCode == 401 && refreshToken) {
        const slug = window.location.pathname;
        const route = routes.find((r) => r.slug === slug);
        if (route?.loggedIn) {
          cookies.set('page', slug, {
            path: '/',
            expires: new Date(new Date().getTime() + 2 * 60 * 1000),
          });
        }
        refresh(refreshToken);
      } else {
        cookies.remove('page');
      }
    }
  }, [userError]);

  useEffect(() => {
    if (userLoading) {
      // invalidate subscriptions count query so that it would re-fetch after user query succeeds.
      queryClient.invalidateQueries({ queryKey: ['subsCount'] });
    }
  }, [userLoading]);

  const error = userError || refreshTokenError;
  const isLoading = userLoading || isPending || subsCountLoading;
  const loggedIn = !error && !!data?.id;

  return (
    <UserContext.Provider
      value={{ data, error, isLoading, loggedIn, subscriptionsCount: subsCount || 0 }}
    >
      {children}
    </UserContext.Provider>
  );
};
