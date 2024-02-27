import React, { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

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
    gcTime: 2 * 60 * 60 * 1000,
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
        subscriptionsCount: data?.subscriptions || 0,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
