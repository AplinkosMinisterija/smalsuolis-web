import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import ContentLayout from '../components/layouts/ContentLayout';
import EventCard from '../components/other/EventCard';
import Icon from '../components/other/Icons';
import LoaderComponent from '../components/other/LoaderComponent';
import { device } from '../styles';
import { descriptions, IconName, isEmpty, titles } from '../utils';
import { intersectionObserverConfig } from '../utils/configs';
import { slugs } from '../utils/routes';
import { Event } from '../utils/types';
import EmptyState from '../components/other/EmptyState';

const Events = ({ apiEndpoint, queryKey }: { apiEndpoint: any; queryKey: string }) => {
  const navigate = useNavigate();
  const getEvents = async (page: number) => {
    const events = await apiEndpoint({
      page,
    });

    return {
      ...events,
      data: events.rows,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: [queryKey],
      initialPageParam: 1,
      queryFn: ({ pageParam }: any) => getEvents(pageParam),
      getNextPageParam: (lastPage) => {
        const { page, totalPages } = lastPage;
        return page < totalPages ? page + 1 : undefined;
      },
      gcTime: 60000,
    });

  const observerRef = useRef<any>(null);

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

  const renderContent = () => {
    if (isLoading) return <LoaderComponent />;

    if (!data?.pages?.[0]?.data?.length) {
      return (
        <EmptyState
          title={titles.emptyState}
          description={descriptions.emptyState}
          icon={IconName.airBallon}
        />
      );
    }

    return (
      <EventsContainer>
        {data?.pages.map((page, pageIndex) => {
          return (
            <React.Fragment key={pageIndex}>
              {page.data.map((event: Event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => navigate(slugs.event(event?.id))}
                />
              ))}
            </React.Fragment>
          );
        })}
        {observerRef && <Invisible ref={observerRef} />}
        {isFetching && <LoaderComponent />}
      </EventsContainer>
    );
  };

  return (
    <ContentLayout>
      <Container>{renderContent()}</Container>
    </ContentLayout>
  );
};

export default Events;

const Invisible = styled.div`
  width: 10px;
  height: 16px;
`;

const Container = styled.div`
  display: flex;
  overflow-y: auto;
  align-items: center;
  flex-direction: column;
  padding: 32px;
  width: 100%;

  @media ${device.mobileL} {
    padding: 12px;
  }
`;

const EventsContainer = styled.div`
  display: flex;
  max-width: 800px;

  margin: auto;
  width: 100%;
  gap: 12px;
  flex-direction: column;
  @media ${device.mobileL} {
    padding: 12px;
  }
`;
