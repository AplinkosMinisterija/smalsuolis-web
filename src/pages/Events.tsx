import { isEqual } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import NavButtonGroup from '../components/buttons/NavButtonGroup';
import ContentLayout from '../components/layouts/ContentLayout';
import EventCard from '../components/other/EventCard';
import LoaderComponent from '../components/other/LoaderComponent';
import { device } from '../styles';
import api from '../utils/api';
import { intersectionObserverConfig } from '../utils/configs';
import { EventStatusTypes } from '../utils/constants';
import { slugs } from '../utils/routes';
import { eventStatusLabels } from '../utils/texts';
import { Event } from '../utils/types';

const Events = () => {
  const [status, setStatus] = useState(EventStatusTypes.UPCOMING);
  const navigate = useNavigate();
  const getEvents = async (page: number) => {
    const fishStockings = await api.getEvents({
      page,
    });

    return {
      data: fishStockings.rows,
      page: fishStockings.page < fishStockings.totalPages ? fishStockings.page + 1 : undefined,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery(
    ['events'],
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
        <ButtonsContainer>
          <NavButtonGroup
            options={Object.keys(EventStatusTypes)}
            isSelected={(option) => isEqual(option, status)}
            getOptionLabel={(option: EventStatusTypes) => eventStatusLabels[option]}
            onChange={(option) => setStatus(option)}
          />
        </ButtonsContainer>
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

const ButtonsContainer = styled.div`
  min-width: 400px;
  margin: auto;
  @media ${device.mobileL} {
    min-width: 100%;
  }
`;

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
