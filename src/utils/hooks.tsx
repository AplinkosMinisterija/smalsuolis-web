import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useAppDispatch } from '../state/hooks';
import { actions as userAction, UserReducerProps } from '../state/user/reducer';
import api from './api';
import { ServerErrorCodes } from './constants';
import { handleAlert, handleGetCurrentLocation } from './functions';
import { clearCookies, emptyUser } from './loginFunctions';

const cookies = new Cookies();

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<{ lat?: number; lng?: number }>();

  useEffect(() => {
    if (!navigator?.geolocation) return;

    handleGetCurrentLocation((data) => setLocation(data));
  }, []);
  return location;
};

export const useCheckAuthMutation = () => {
  const dispatch = useAppDispatch();
  const token = cookies.get('token');

  const { isLoading } = useQuery([token], () => api.checkAuth(), {
    onError: ({ response }: any) => {
      if (isEqual(response.status, ServerErrorCodes.NO_PERMISSION)) {
        clearCookies();
        dispatch(userAction.setUser(emptyUser));

        return;
      }

      return handleAlert();
    },
    onSuccess: (data: UserReducerProps) => {
      if (data) {
        dispatch(userAction.setUser({ userData: data, loggedIn: true }));
      }
    },
    retry: false,
    enabled: !!token,
  });

  return { isLoading };
};

export const useLogoutMutation = () => {
  const dispatch = useAppDispatch();

  const { mutateAsync } = useMutation(() => api.logout(), {
    onError: () => {
      handleAlert();
    },
    onSuccess: () => {
      clearCookies();
      dispatch(userAction.setUser(emptyUser));
    },
  });

  return { mutateAsync };
};

export const useVerifyUser = () => {
  const [searchParams] = useSearchParams();
  const { h, s } = Object.fromEntries([...Array.from(searchParams)]);
  //const navigate = useNavigate();

  if (!h || !s) {
    // navigate(slugs.login);
  }

  const { data, mutateAsync, isLoading } = useMutation(() => api.verifyUser({ h, s }), {
    onError: () => {
      // navigate(slugs.login);
    },
  });

  useEffect(() => {
    mutateAsync();
  }, [mutateAsync]);

  return { data, mutateAsync, isLoading };
};

export const useSetPassword = () => {
  const [searchParams] = useSearchParams();
  const { h, s } = Object.fromEntries([...Array.from(searchParams)]);

  const { data, mutateAsync, isLoading } = useMutation(
    ({ password }: { password: string }) => {
      return api.setPassword({ h, s, password });
    },
    {
      onError: () => {
        handleAlert();
      },
    },
  );

  return { isSuccess: data?.success, mutateAsync, isLoading };
};
