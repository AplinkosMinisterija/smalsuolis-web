import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { device } from '../styles';
import { IconName, isEmpty, useInfinityLoad } from '../utils';
import { slugs } from '../utils/routes';
import { Event } from '../utils/types';
import { Tabs } from 'design-system';
import ContentLayout from './layouts/ContentLayout';
import EmptyState from './EmptyState';
import EventCard from './EventCard';
import LoaderComponent from './LoaderComponent';

enum EventFilter {
  HAPPENED = 'HAPPENED',
  PLANNED = 'PLANNED',
}

const EventsContainer = ({
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
  const [filter, setFilter] = useState(EventFilter.HAPPENED);

  const getFilter = () => {
    const currentDate = new Date();
    const filterCondition = filter === EventFilter.HAPPENED ? '$lte' : '$gte';

    return {
      startAt: {
        [filterCondition]: currentDate,
      },
    };
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
      <InnerContainer>
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
      </InnerContainer>
    );
  };

  return (
    <ContentLayout>
      <Tabs
        options={[
          { label: 'Įvykę įvykiai', value: EventFilter.HAPPENED },
          { label: 'Suplanuoti įvykiai', value: EventFilter.PLANNED },
        ]}
        onChange={setFilter}
        value={filter}
      />
      <Container>{renderContent()}</Container>
    </ContentLayout>
  );
};

export default EventsContainer;

const Invisible = styled.div`
  width: 10px;
  height: 16px;
`;

const Container = styled.div`
  display: flex;
  overflow-y: auto;
  align-items: center;
  flex-direction: column;
  padding: 32px 0px;
  width: 100%;

  @media ${device.mobileL} {
    padding: 12px 0px;
  }
`;

const InnerContainer = styled.div`
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
