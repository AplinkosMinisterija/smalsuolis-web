import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { matchPath, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { LoginForm, SetPassword, routes, slugs } from '.';
import api from './api';
import { intersectionObserverConfig } from './configs';
import { clearCookies, updateTokens } from './loginFunctions';

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
    onSuccess: async (data: { token: string; refreshToken?: string }) => {
      updateTokens(data);
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: api.logout,
    onError: async () => {
      clearCookies();
      await queryClient.invalidateQueries();
    },
    onSuccess: async () => {
      clearCookies();
      await queryClient.invalidateQueries();
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
    mutationFn: ({ password }: SetPassword) => {
      return api.setPassword({ h, s, password });
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
  queryKeys: any[],
  fn: (params: { page: number }) => any,
  observerRef: any,
  filters = {},
  enabled = true,
) => {
  const queryFn = async (page: number) => {
    const data = await fn({
      ...filters,
      page,
    });
    return {
      ...data,
      data: data.rows, // TODO: backend could return data instead of rows
    };
  };

  const result = useInfiniteQuery({
    enabled,
    queryKey: queryKeys,
    initialPageParam: 1,
    queryFn: ({ pageParam }: any) => queryFn(pageParam),
    getNextPageParam: (lastPage: any) => {
      return lastPage?.page < lastPage?.totalPages ? lastPage.page + 1 : undefined;
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
