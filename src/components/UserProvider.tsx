import React, { createContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import { AxiosError } from 'axios/index';
import { useMutation } from '@tanstack/react-query';
import { updateTokens } from '../utils/loginFunctions';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export type UserContextType = {
  data: any;
  error: Error | null;
  isLoading: boolean;
  loggedIn: boolean;
};

const defaultValue: UserContextType = {
  data: null,
  error: null,
  isLoading: true,
  loggedIn: false,
};
export const UserContext: any = createContext<UserContextType>(defaultValue);

export const UserProvider = ({ children }: any) => {
  const {
    data,
    error: userError,
    isLoading: userLoading,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: api.getUserInfo,
    retry: false,
    gcTime: 60 * 60 * 1000,
  });

  const {
    mutateAsync: refresh,
    error: refreshTokenError,
    isPending,
  } = useMutation({
    mutationFn: api.refreshToken,
    retry: false,
    onSuccess: () => {
      updateTokens(data);
      refetch();
    },
    onError: (error) => {
      const errorCode = (error as AxiosError).response?.status;
      if (errorCode == 404) {
        cookies.remove('refreshToken', { path: '/' });
      }
    },
  });

  useEffect(() => {
    if (userError) {
      const errorCode = (userError as AxiosError).response?.status;
      const refreshToken = cookies.get('refreshToken');
      if (errorCode == 401 && refreshToken) {
        refresh(refreshToken);
      }
    }
  }, [userError]);

  const error = userError || refreshTokenError;
  const isLoading = userLoading || isPending;
  const loggedIn = !error && !!data?.id;

  return (
    <UserContext.Provider value={{ data, error, isLoading, loggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
