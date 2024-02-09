import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import ContentLayout from '../components/layouts/ContentLayout';
import EventCard from '../components/other/EventCard';
import Icon, { IconName } from '../components/other/Icons';
import LoaderComponent from '../components/other/LoaderComponent';
import { device } from '../styles';
import { descriptions, isEmpty, titles } from '../utils';
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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, isLoading } =
    useInfiniteQuery([key], ({ pageParam }) => getEvents(pageParam), {
      getNextPageParam: (lastPage) => lastPage.page,
      cacheTime: 60000,
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

    if (isEmpty(data?.pages?.[0]?.data)) {
      return (
        <>
          <StyledIcon name={IconName.airBallon} />
          <Title>{titles.emptyState}</Title>
          <Description>{descriptions.emptyState}</Description>
        </>
      );
    }

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

const Title = styled.div`
  font-size: 1.9rem;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  margin: 30px 0px 20px 0px;
`;

const Description = styled.div`
  line-height: 24px;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 24px;
  text-align: center;
`;

const Invisible = styled.div`
  width: 10px;
  height: 16px;
`;

const StyledIcon = styled(Icon)`
  text-align: center;
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
