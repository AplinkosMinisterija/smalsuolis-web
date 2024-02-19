import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Tabs from '../components/buttons/Tabs';
import ContentLayout from '../components/layouts/ContentLayout';
import EmptyState from '../components/other/EmptyState';
import EventCard from '../components/other/EventCard';
import LoaderComponent from '../components/other/LoaderComponent';
import { device } from '../styles';
import { EventFilter, IconName, isEmpty, useInfinityLoad } from '../utils';
import { slugs } from '../utils/routes';
import { Event } from '../utils/types';

const Events = ({
  apiEndpoint,
  queryKey,
  emptyStateDescription,
  emptyStateTitle,
}: {
  apiEndpoint: any;
  queryKey: string;
  emptyStateDescription?: string;
  emptyStateTitle: string;
}) => {
  const navigate = useNavigate();
  const observerRef = useRef<any>(null);
  const [filter, setFilter] = useState(EventFilter.UPCOMING);

  const getFilter = () => {
    if (filter === EventFilter.PREVIOUS) {
      return { startAt: { $lte: new Date() } };
    }

    return { startAt: { $gte: new Date() } };
  };

  const {
    data: events,
    isFetching,
    isLoading,
  } = useInfinityLoad(`${queryKey}-${filter}`, apiEndpoint, observerRef, { filter: getFilter() });

  const renderContent = () => {
    if (isLoading) return <LoaderComponent />;

    if (isEmpty(events?.pages?.[0]?.data)) {
      return (
        <EmptyState
          title={emptyStateTitle}
          description={emptyStateDescription}
          icon={IconName.airBallon}
        />
      );
    }

    return (
      <EventsContainer>
        {events?.pages.map((page, pageIndex) => {
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
      <Tabs
        options={[
          { label: 'Įvykę įvykiai', value: EventFilter.PREVIOUS },
          { label: 'Suplanuoti įvykiai', value: EventFilter.UPCOMING },
        ]}
        onChange={setFilter}
        value={filter}
      />
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
  padding: 32 0px;
  width: 100%;

  @media ${device.mobileL} {
    padding: 12px 0px;
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
