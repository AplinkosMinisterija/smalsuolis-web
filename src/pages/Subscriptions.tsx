import ContentLayout from '../components/layouts/ContentLayout';
import api from '../utils/api';
import { slugs, useInfinityLoad } from '../utils';
import React, { useRef } from 'react';
import styled from 'styled-components';
import LoaderComponent from '../components/other/LoaderComponent';
import { device } from '../styles';
import Button from '../components/buttons/Button';
import { useNavigate } from 'react-router';

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
        <SubscriptionsContainer>
          <ButtonsContainer>
            <Button onClick={() => navigate(slugs.subscription('nauja'))}>Nauja prenumerata</Button>
          </ButtonsContainer>
          {/*{subscriptions?.rows?.map()}*/}
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
