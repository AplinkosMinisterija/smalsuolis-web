import { device } from '@aplinkosministerija/design-system';
import styled from 'styled-components';
import { App, Frequency, IconName, Subscription } from '../utils';
import AppItem from './AppsItem';
import Icon from './Icons';

const frequencyLabels = {
  [Frequency.DAY]: 'Naujienos kasdien',
  [Frequency.WEEK]: 'Naujienos kas savaitę',
  [Frequency.MONTH]: 'Naujienos kas mėnesį',
};

const SubscriptionCard = ({
  subscription,
  onClick,
  apps = [],
}: {
  subscription: Subscription<App>;
  onClick: () => void;
  apps?: App[];
}) => {
  const futureApps = subscription?.apps?.length === 0;
  const allApps = !futureApps && subscription?.apps?.length === apps?.length;
  const showApps = !futureApps && !allApps;

  return (
    <Container>
      <InnerContainer>
        <Content onClick={onClick}>
          <Name>
            {`${subscription?.frequency ? frequencyLabels[subscription?.frequency] : ''}`}{' '}
          </Name>
          <AppsContainer>
            {futureApps && (
              <AppItem
                icon={<Icon name={IconName.search} />}
                text={'Automatinis naujų sričių pridėjimas'}
                selected={true}
              />
            )}
            {allApps && (
              <AppItem
                icon={<Icon name={IconName.search} />}
                text={'Esu smalsus domina viskas'}
                selected={true}
              />
            )}
            {showApps &&
              subscription.apps?.map((app: App) => {
                return <AppItem key={`app_${app.id}`} app={app} selected={true} />;
              })}
          </AppsContainer>
        </Content>
        <EventsCount>
          <EventsCountLabel>{'Įvykių skaičius'}</EventsCountLabel>
          <EventsCountTotal>{subscription.eventsCount?.total}</EventsCountTotal>
          <EventsCountLatest>{`+ ${subscription.eventsCount?.latest}`}</EventsCountLatest>
        </EventsCount>
      </InnerContainer>
    </Container>
  );
};

export default SubscriptionCard;

const Container = styled.div`
  width: 100%;
  cursor: pointer;
`;

const EventsCountLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 10.08px;
  color: ${({ theme }) => theme.colors.text.secondary};
  @media ${device.mobileS} {
    font-size: 0.8rem;
  }
`;

const EventsCountTotal = styled.div`
  font-size: 2rem;
  font-weight: 700;
  line-height: 22.68px;
  color: black;
  @media ${device.mobileS} {
    font-size: 1.8rem;
  }
`;

const EventsCountLatest = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 15.12px;
  color: #1b4c28;
  @media ${device.mobileS} {
    font-size: 1.2rem;
  }
`;

const EventsCount = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 3px;
`;

const InnerContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.GREY};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const Name = styled.div`
  font-size: 2rem;
  font-weight: bold;
  @media ${device.mobileS} {
    font-size: 1.8rem;
  }
`;

const AppsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 8px;
  margin-top: 16px;
`;
