import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import ContentLayout from '../components/layouts/ContentLayout';
import EventCard from '../components/other/EventCard';
import LoaderComponent from '../components/other/LoaderComponent';
import { device } from '../styles';
import { intersectionObserverConfig } from '../utils/configs';
import { slugs } from '../utils/routes';
import { Event } from '../utils/types';

const Events = ({ apiEndpoint, key }: { apiEndpoint: any; key: string }) => {
  const navigate = useNavigate();
  const getEvents = async (page: number) => {
    const events = await apiEndpoint({
      page,
    });

    return {
      data: events.rows,
      page: events.page < events.totalPages ? events.page + 1 : undefined,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery(
    [key],
    ({ pageParam }) => getEvents(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.page,
      cacheTime: 60000,
    },
  );

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
    return (
      <EventsContainer>
        {data?.pages.map((page, pageIndex) => {
          return (
            <React.Fragment key={pageIndex}>
              {page.data.map((event: Event) => (
                <EventCard event={event} onClick={() => navigate(slugs.event(event?.id))} />
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
