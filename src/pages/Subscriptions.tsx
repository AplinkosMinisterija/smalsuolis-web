import api from '../utils/api';
import { App, IconName, slugs, Subscription, useGetCurrentRoute, useInfinityLoad } from '../utils';
import React, { useRef } from 'react';
import styled from 'styled-components';
import LoaderComponent from '../components/LoaderComponent';
import { device } from '../styles';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { ContentLayout } from '@aplinkosministerija/design-system';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import EmptyState from '../components/EmptyState';
import SubscriptionCard from '../components/SubscriptionCard';

const Subscriptions = () => {
  const currentRoute = useGetCurrentRoute();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const observerRef = useRef<any>(null);

  const { data: subscriptions, isFetching } = useInfinityLoad(
    'subscriptions',
    api.getSubscriptions,
    observerRef,
  );

  const { data: appsResponse, isLoading: appsLoading } = useQuery({
    queryKey: ['apps'],
    queryFn: () => api.getApps({ page: 1 }),
  });

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    queryClient.invalidateQueries({ queryKey: ['user'] });
  };

  const { mutateAsync: updateSubscription } = useMutation({
    mutationFn: api.updateSubscription,
    onSuccess,
  });

  const handleSubscriptionActive = (id: number, active: boolean) => {
    updateSubscription({ id, params: { active } });
  };

  const emptySubscriptions = !!subscriptions?.pages[0]?.data?.length;

  return (
    <ContentLayout currentRoute={currentRoute}>
      <Container>
        <ButtonsContainer>
          <NewSubscriptionButton onClick={() => navigate(slugs.subscription('nauja'))}>
            Nauja prenumerata
          </NewSubscriptionButton>
        </ButtonsContainer>
        {!emptySubscriptions ? (
          <EmptyState
            title="Jūs neturite prenumeratų"
            description="Kad galėtumėte matyti naujienas jūsų pasirinktomis temomis bei gautumėte naujienlaiškius elektroniniu paštu, sukurkite naują prenumeratą."
            icon={IconName.airBallon}
          />
        ) : (
          <SubscriptionsContainer>
            {subscriptions?.pages.map((page: { data: Subscription<App>[] }, pageIndex: number) => {
              return (
                <React.Fragment key={pageIndex}>
                  {page?.data.map((subscription) => {
                    return (
                      <SubscriptionCard
                        subscription={subscription}
                        onClick={() => navigate(slugs.subscription(subscription?.id?.toString()))}
                        onActiveChange={(e) =>
                          subscription?.id ? handleSubscriptionActive(subscription.id, e) : {}
                        }
                        apps={appsResponse?.rows}
                      />
                    );
                  })}
                </React.Fragment>
              );
            })}
            {observerRef && <Invisible ref={observerRef} />}
            {isFetching && <LoaderComponent />}
          </SubscriptionsContainer>
        )}
      </Container>
    </ContentLayout>
  );
};

export default Subscriptions;

const Container = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  padding: 32px 0;
  width: 100%;

  @media ${device.mobileL} {
    padding: 12px;
  }
`;

const SubscriptionsContainer = styled.div`
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

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 16px;
  margin-left: auto;
  @media ${device.mobileL} {
    padding: 0 12px;
  }
`;

const Invisible = styled.div`
  width: 10px;
  height: 16px;
`;

const NewSubscriptionButton = styled.a`
  color: #1f5c2e;
  text-decoration: underline;
  float: right;
  width: fit-content;
  margin-left: auto;
  cursor: pointer;
`;

const DeleteSubscriptionButton = styled.a`
  color: ${({ theme }) => theme.colors.danger};
  text-decoration: underline;
  float: right;
  cursor: pointer;
`;
