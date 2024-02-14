import { useCallback, useEffect, useState } from 'react';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { matchPath, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { getErrorMessage, LoginForm, ReactQueryError, routes, ServerErrorCodes, slugs } from '.';
import api from './api';
import { handleAlert } from './functions';
import { clearCookies, handleUpdateTokens } from './loginFunctions';
import { intersectionObserverConfig } from './configs';
import { AxiosError } from 'axios';

const cookies = new Cookies();

export const useGetUserInfoQuery = () => {
  const token = cookies.get('token');
  const refreshToken = cookies.get('refreshToken');

  const { mutateAsync: refresh } = useMutation({
    mutationFn: api.refreshToken,
    onError: ({ response }: any) => {
      if (response.status === ServerErrorCodes.NOT_FOUND) {
        cookies.remove('refreshToken', { path: '/' });
      }
    },
    onSuccess: (data) => {
      handleUpdateTokens(data);
    },
  });

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: api.getUserInfo,
    retry: false,
    enabled: !!token,
  });

  // useEffect(() => {
  //   console.log('error', error);
  //
  //   const errResponse = (error as any)?.response;
  //   if (errResponse) {
  //     if (errResponse === ServerErrorCodes.NO_PERMISSION) {
  //       console.log('refreshToken', refreshToken, refresh);
  //       if (refreshToken) {
  //         refresh().then((data) => {
  //           console.log('data', data);
  //         });
  //       }
  //     } else {
  //       handleAlert();
  //     }
  //   }
  // }, [error]);

  return { data, isLoading, error, loggedIn: !!data?.id && !error && !isLoading };
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: LoginForm) => {
      const { email, password, refresh } = values;
      const params = {
        password,
        refresh,
        email: email.toLocaleLowerCase(),
      };
      return api.login(params);
    },
    onError: ({ response }: ReactQueryError) => {
      const text = getErrorMessage(response?.data?.message);
    },
    onSuccess: async (data) => {
      handleUpdateTokens(data);
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    retry: false,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: api.logout,
    onError: async () => {
      //TODO: do we realy need to clear cookies on logout error
      handleAlert();
      clearCookies();
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onSuccess: async () => {
      clearCookies();
      await queryClient.invalidateQueries({ queryKey: ['user'] });
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

  const { data, mutateAsync, isPending } = useMutation({
    mutationFn: () => api.verifyUser({ h, s }),
    onError: () => {
      navigate(slugs.login);
    },
  });

  useEffect(() => {
    mutateAsync();
  }, [mutateAsync]);

  return { data, mutateAsync, isLoading: isPending };
};

export const useSetPassword = () => {
  const [searchParams] = useSearchParams();
  const { h, s } = Object.fromEntries([...Array.from(searchParams)]);
  const { data, mutateAsync, isPending } = useMutation({
    mutationFn: ({ password }: { password: string }) => {
      return api.setPassword({ h, s, password });
    },
    onError: () => {
      handleAlert();
    },
  });

  return { isSuccess: data?.success, mutateAsync, isLoading: isPending };
};

export const useWindowSize = (width: string) => {
  const [isInRange, setIsInRange] = useState(false);

  const handleResize = useCallback(() => {
    const mediaQuery = window.matchMedia(width);
    setIsInRange(mediaQuery.matches);
  }, [width]);

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

export const useInfinityLoad = (
  queryKey: string,
  fn: (params: { page: number }) => any,
  observerRef: any,
) => {
  const queryFn = async (page: number) => {
    const data = await fn({
      page,
    });
    return {
      ...data,
      data: data.rows, // TODO: backend could return data instead of rows
    };
  };

  const result = useInfiniteQuery({
    queryKey: [queryKey],
    initialPageParam: 1,
    queryFn: ({ pageParam }: any) => queryFn(pageParam),
    getNextPageParam: (lastPage, _pages) => {
      const { page, totalPages } = lastPage;
      return page < totalPages ? page + 1 : undefined;
    },
    gcTime: 60000,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = result;
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
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, data, observerRef]);

  return result;
};
