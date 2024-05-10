import { ContentLayout, useStorage } from '@aplinkosministerija/design-system';
import React, { useContext, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { device } from '../styles';
import {
  IconName,
  isEmpty,
  subtitle,
  useGetCurrentRoute,
  useInfinityLoad,
  Event,
  buttonsTitles,
} from '../utils';
import EmptyState from './EmptyState';
import EventCard from './EventCard';
import LoaderComponent from './LoaderComponent';
import Icon from './Icons';
import EventFilterModal from './EventFilterModal';
import { EventFilterContext, EventFilterContextType } from './EventFilterProvider';

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
  const { filters } = useContext<EventFilterContextType>(EventFilterContext);
  const currentRoute = useGetCurrentRoute();
  const observerRef = useRef<any>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const getFilter = () => {
    return {
      ...(filters.apps ? { app: { $in: filters.apps.map((app) => app.id) } } : null),
      ...(filters.timeRange ? { startAt: filters.timeRange.query } : null),
    };
  };

  const {
    data: events,
    isFetching,
    isLoading,
  } = useInfinityLoad([queryKey, filters], apiEndpoint, observerRef, { filter: getFilter() });

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
      {!isLoading && (
        <FilterRow>
          <CountText>{events && `${subtitle.foundRecords} ${events.pages[0].total}`}</CountText>
          <FilterButton onClick={() => setShowFilterModal(true)}>
            <FilterIconWrapper>
              {!isEmpty(filters) && <FilterBadge />}
              <Icon name={IconName.filter} size={22} color={'#1B4C28'} />
            </FilterIconWrapper>
            <FilterText>{buttonsTitles.filter}</FilterText>
          </FilterButton>
        </FilterRow>
      )}
      <Container>{renderContent()}</Container>
      <EventFilterModal visible={showFilterModal} onClose={() => setShowFilterModal(false)} />
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

const FilterButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  gap: 5px;
`;

const FilterText = styled.div`
  font-family: Plus Jakarta Sans;
  font-size: 16px;
  font-weight: 600;
  line-height: 20.16px;
  text-align: left;
  user-select: none;
  color: #1b4c28;
`;

const FilterIconWrapper = styled.div`
  position: relative;
`;

const FilterBadge = styled.div`
  position: absolute;
  top: 2px;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  border: 1px solid #ffffff;
  background-color: ${({ theme }) => theme.colors.primary};
`;
