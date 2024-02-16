import ContentLayout from '../components/layouts/ContentLayout';
import api from '../utils/api';
import { App, IconName, slugs, Subscription, useInfinityLoad } from '../utils';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import LoaderComponent from '../components/other/LoaderComponent';
import { device } from '../styles';
import { useNavigate } from 'react-router';
import SubscriptionCard from '../components/cards/SubscriptionCard';
import Button from '../components/buttons/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import EmptyState from '../components/other/EmptyState';

const Subscriptions = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const observerRef = useRef<any>(null);
  const [deleteEnabled, setDeleteEnabled] = useState(false);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<number[]>([]);

  const { data: subscriptions, isFetching } = useInfinityLoad(
    'subscriptions',
    api.getSubscriptions,
    observerRef,
  );

  const { mutateAsync: updateSubscription } = useMutation({
    mutationFn: api.updateSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });

  const { mutateAsync: deleteSubscriptions } = useMutation({
    mutationFn: (params: number[]) => api.deleteSubscriptions(params),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });

  const handleEnableDelete = (enabled: boolean) => {
    if (!enabled) {
      setSelectedSubscriptions([]);
    }
    setDeleteEnabled(enabled);
  };

  const updateSelectedSubscriptions = (checked: boolean, id: number) => {
    let updatedSubscriptions = selectedSubscriptions;
    if (checked) {
      updatedSubscriptions = [...selectedSubscriptions, id];
    } else {
      updatedSubscriptions = selectedSubscriptions.filter((sub) => sub !== id);
    }
    setSelectedSubscriptions(updatedSubscriptions);
  };

  const handleDeleteSubscriptions = () => {
    deleteSubscriptions(selectedSubscriptions);
    setDeleteEnabled(false);
  };
  const handleSubscriptionActive = (id: number, active: boolean) => {
    updateSubscription({ id: id.toString(), params: { active } });
  };

  const emptySubscriptions = !!subscriptions?.pages[0]?.data?.length;

  return (
    <ContentLayout>
      <Container>
        <ButtonsContainer>
          {emptySubscriptions && (
            <DeleteSubscriptionButton onClick={() => handleEnableDelete(!deleteEnabled)}>
              Ištrinti prenumeratą
            </DeleteSubscriptionButton>
          )}
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
                  {page?.data.map((subscription) => (
                    <SubscriptionCard
                      subscription={subscription}
                      canDelete={deleteEnabled}
                      deleteChecked={selectedSubscriptions.includes(subscription.id)}
                      onClick={() => navigate(slugs.subscription(subscription?.id?.toString()))}
                      onDelete={(e) => updateSelectedSubscriptions(e, subscription.id)}
                      onActiveChange={(e) => handleSubscriptionActive(subscription.id, e)}
                    />
                  ))}
                </React.Fragment>
              );
            })}
            {observerRef && <Invisible ref={observerRef} />}
            {isFetching && <LoaderComponent />}
            {deleteEnabled && (
              <Button variant={Button.colors.DANGER} onClick={handleDeleteSubscriptions}>
                Ištrinti pažymėtas prenumeratas
              </Button>
            )}
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
  padding: 32px;
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
  color: ${({ theme }) => theme.colors.error};
  text-decoration: underline;
  float: right;
  cursor: pointer;
`;
