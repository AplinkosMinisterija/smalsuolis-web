import { useEffect, useState } from 'react';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { matchPath, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { routes, ServerErrorCodes, slugs } from '.';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { actions as userAction, UserReducerProps } from '../state/user/reducer';
import api from './api';
import { handleAlert, handleGetCurrentLocation } from './functions';
import { clearCookies, emptyUser } from './loginFunctions';
import { intersectionObserverConfig } from './configs';

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

  const { isLoading, error } = useQuery([token, 'token'], () => api.getUserInfo(), {
    onSuccess: (data: UserReducerProps) => {
      if (data) {
        dispatch(userAction.setUser({ userData: data, loggedIn: true }));
      }
    },
    retry: false,
    enabled: !!token,
  });

  const errResponse = (error as any)?.response;

  if (errResponse) {
    if (errResponse === ServerErrorCodes.NO_PERMISSION) {
      clearCookies();
      dispatch(userAction.setUser(emptyUser));
    } else {
      handleAlert();
    }
  }

  return { isLoading };
};

export const useFilteredRoutes = () => {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  //TODO: do not use from redux state

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

export const useInfinityLoad = (queryKey: string, fn: Function, observerRef: any) => {
  const queryFn = async (page: number) => {
    const data = await fn({
      page,
    });

    return {
      data: data.rows,
      page: data.page < data.totalPages ? data.page + 1 : undefined,
    };
  };

  const result = useInfiniteQuery([queryKey], ({ pageParam }) => queryFn(pageParam), {
    getNextPageParam: (lastPage) => lastPage.page,
    cacheTime: 60000,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = result;
  console.log('data', data);
  useEffect(() => {
    const currentObserver = observerRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, intersectionObserverConfig);

    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, data]);

  return result;
};
