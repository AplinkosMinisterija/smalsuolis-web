import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import styled, { useTheme } from 'styled-components';
import { device } from '../styles';
import { IconName, isEmpty, subtitle, useGetCurrentRoute, useInfinityLoad } from '../utils';
import { slugs } from '../utils/routes';
import { Event } from '../utils/types';
import { ContentLayout } from '@aplinkosministerija/design-system';
import EmptyState from './EmptyState';
import EventCard from './EventCard';
import LoaderComponent from './LoaderComponent';
import Icon from './Icons';

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
  const theme = useTheme();
  const currentRoute = useGetCurrentRoute();
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
                <EventCard key={event.id} event={event} />
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
    <ContentLayout currentRoute={currentRoute}>
      <FilterRow>
        <CountText>{`${subtitle.foundRecords} ${events && events.pages[0].total}`}</CountText>
        {/* <FilterIconWrapper>
          <Icon name={IconName.filter} size={18} color={theme.colors.success} />
        </FilterIconWrapper> */}
      </FilterRow>
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
  padding: 20px 0px;
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

const FilterRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 12px 0 12px;
`;

const CountText = styled.div`
  font-family: Plus Jakarta Sans;
  font-size: 14px;
  font-weight: 500;
  line-height: 17.64px;
  text-align: left;
  color: #4b5768;
`;

const FilterIconWrapper = styled.div``;

const Badge = styled.div``;
