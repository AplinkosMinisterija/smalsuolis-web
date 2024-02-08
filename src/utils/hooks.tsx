import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { matchPath, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { routes, slugs } from '.';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { actions as userAction, UserReducerProps } from '../state/user/reducer';
import api from './api';
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

export const useGetUserInfoQuery = () => {
  const dispatch = useAppDispatch();
  const token = cookies.get('token');

  const { isLoading } = useQuery([token, 'token'], () => api.getUserInfo(), {
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

export const useFilteredRoutes = () => {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);

  return routes.filter((route) => {
    if (!route?.slug) return false;

    if (Object.prototype.hasOwnProperty.call(route, 'loggedIn')) {
      return route.loggedIn === loggedIn;
    }

    return true;
  });
};

export const useMenuRouters = () => {
  return useFilteredRoutes().filter((route) => !!route.iconName);
};

export const useLogoutMutation = () => {
  const dispatch = useAppDispatch();

  const { mutateAsync } = useMutation(() => api.logout(), {
    onError: () => {
      handleAlert();
      clearCookies();
      dispatch(userAction.setUser(emptyUser));
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
  const navigate = useNavigate();

  if (!h || !s) {
    navigate(slugs.login);
  }

  const { data, mutateAsync, isLoading } = useMutation(() => api.verifyUser({ h, s }), {
    onError: () => {
      navigate(slugs.login);
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

export const useWindowSize = (width: string) => {
  const [isInRange, setIsInRange] = useState(false);

  const handleResize = () => {
    const mediaQuery = window.matchMedia(width);
    setIsInRange(mediaQuery.matches);
  };

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return isInRange;
};

export const useGetCurrentRoute = () => {
  const currentLocation = useLocation();

  return routes?.find(
    (route: any) => !!matchPath({ path: route.slug, end: true }, currentLocation.pathname),
  );
};
