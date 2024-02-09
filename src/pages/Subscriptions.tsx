import ContentLayout from '../components/layouts/ContentLayout';
import api from '../utils/api';
import { App, Event, slugs, Subscription, useInfinityLoad } from '../utils';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import LoaderComponent from '../components/other/LoaderComponent';
import { device } from '../styles';
import { useNavigate } from 'react-router';
import SubscriptionCard from '../components/cards/SubscriptionCard';

const Subscriptions = () => {
  const navigate = useNavigate();
  const observerRef = useRef<any>(null);

  const { data: subscriptions, isFetching } = useInfinityLoad(
    'subscriptions',
    api.getSubscriptions,
    observerRef,
  );

  return (
    <ContentLayout>
      <Container>
        <ButtonsContainer>
          <NewSubscriptionButton onClick={() => navigate(slugs.subscription('nauja'))}>
            Nauja prenumerata
          </NewSubscriptionButton>
        </ButtonsContainer>
        <SubscriptionsContainer>
          {subscriptions?.pages.map((page, pageIndex) => {
            return (
              <React.Fragment key={pageIndex}>
                {page.data.map((subscription: Subscription<App>) => (
                  <SubscriptionCard
                    subscription={subscription}
                    onClick={() => navigate(slugs.subscription(subscription?.id?.toString()))}
                  />
                ))}
              </React.Fragment>
            );
          })}
          {observerRef && <Invisible ref={observerRef} />}
          {isFetching && <LoaderComponent />}
        </SubscriptionsContainer>
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
  width: 100%;
  margin-bottom: 16px;
`;

const Invisible = styled.div`
  width: 10px;
  height: 16px;
`;

const NewSubscriptionButton = styled.a`
  color: #1f5c2e;
  text-decoration: underline;
  float: right;
`;
