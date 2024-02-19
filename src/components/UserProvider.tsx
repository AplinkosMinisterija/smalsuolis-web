import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios/index';
import { createContext, useEffect } from 'react';
import Cookies from 'universal-cookie';
import api, { Resources } from '../utils/api';
import { updateTokens } from '../utils/loginFunctions';

const excludedRouters = [Resources.ME];
const cookies = new Cookies();

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
  const queryClient = useQueryClient();

  const {
    data,
    error: userError,
    isLoading: userLoading,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const token = cookies.get('token');

      if (!token) return;

      return api.getUserInfo();
    },
    retry: false,
  });

  const {
    mutateAsync: refresh,
    error: refreshTokenError,
    isPending,
  } = useMutation({
    mutationFn: api.refreshToken,
    retry: false,
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

    retry: false,
    enabled: !userLoading && !isPending && !userError,
  });

  useEffect(() => {
    if (userError) {
      const errorCode = (userError as AxiosError).response?.status;
      const refreshToken = cookies.get('refreshToken');
      if (errorCode == 401 && refreshToken) {
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
