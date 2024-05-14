import {
  Button,
  ButtonVariants,
  ContentLayout,
  useStorage,
} from '@aplinkosministerija/design-system';
import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { device } from '../styles';
import {
  IconName,
  isEmpty,
  subtitle,
  useGetCurrentRoute,
  useInfinityLoad,
  Event,
  buttonsTitles,
  Filters,
  Subscription,
} from '../utils';
import EmptyState from './EmptyState';
import EventCard from './EventCard';
import LoaderComponent from './LoaderComponent';
import Icon from './Icons';
import EventFilterModal from './EventFilterModal';
import MapView from './MapView';
import CopiedFromDSContentLayout from './CopiedFromDSContentLayout';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import { UserContext, UserContextType } from './UserProvider';

const EventsContainer = ({
  isMyEvents = false,
  apiEndpoint,
  queryKey,
  emptyStateDescription,
  emptyStateTitle,
}: {
  isMyEvents?: boolean;
  apiEndpoint: any;
  queryKey: string;
  emptyStateDescription?: string;
  emptyStateTitle: string;
}) => {
  const filters = useStorage<Filters>('filters', {}, true);

  const [showingListNotMap, setShowingListNotMap] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const { loggedIn } = useContext<UserContextType>(UserContext);
  const currentRoute = useGetCurrentRoute();
  const observerRef = useRef<any>(null);

  const { data: subsResponse } = useQuery({
    queryKey: ['allSubscriptions'],
    queryFn: () => api.getAllSubscriptions(),
    enabled: loggedIn && isMyEvents,
  });
  const allSubscriptions = subsResponse ?? [];

  const getFilter = () => {
    const { apps, timeRange, subscriptions } = filters.value;
    let filterSubs: Subscription[] = [];
    if (isMyEvents) {
      filterSubs = subscriptions && subscriptions.length ? subscriptions : allSubscriptions;
    }
    return {
      ...(apps ? { app: { $in: apps.map((app) => app.id) } } : null),
      ...(filterSubs.length ? { subscription: { $in: filterSubs.map((sub) => sub.id) } } : null),
      ...(timeRange ? { startAt: timeRange.query } : null),
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
    if (showingListNotMap) {
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
    } else {
      return <MapView filters={getFilter()} />;
    }
  };

  return (
    <CopiedFromDSContentLayout currentRoute={currentRoute} limitWidth={showingListNotMap}>
      {!isLoading && (
        <FilterRow>
          <CountText>{events && `${subtitle.foundRecords} ${events.pages[0].total}`}</CountText>
          <FilterButton onClick={() => setShowFilterModal(true)}>
            <FilterIconWrapper>
              {!isEmpty(filters.value) && <FilterBadge />}
              <Icon name={IconName.filter} size={22} color={'#1B4C28'} />
            </FilterIconWrapper>
            <FilterText>{buttonsTitles.filter}</FilterText>
          </FilterButton>
        </FilterRow>
      )}
      <Container>{renderContent()}</Container>
      <MapAndListButton
        variant={ButtonVariants.TERTIARY}
        onClick={() => {
          setShowingListNotMap((view) => !view);
        }}
      >
        {showingListNotMap ? (
          <>
            {buttonsTitles.showMap}
            <Icon name={IconName.map} size={22} color={'white'} />
          </>
        ) : (
          <>
            {buttonsTitles.showList}
            <Icon name={IconName.list} size={22} color={'white'} />
          </>
        )}
      </MapAndListButton>
      <EventFilterModal
        isMyEvents={isMyEvents}
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
      />
    </CopiedFromDSContentLayout>
  );
};

export default EventsContainer;

const Invisible = styled.div`
  width: 10px;
  height: 16px;
`;

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;
  overflow-y: auto;
  align-items: center;
  flex-direction: column;
  padding: 20px 0px;
  width: 100%;
  height: 100%;
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

const MapAndListButton = styled(Button)`
  position: absolute;
  z-index: 10;
  bottom: 30px;
  width: auto;
  @media ${device.mobileL} {
    bottom: 15px;
  }
`;
