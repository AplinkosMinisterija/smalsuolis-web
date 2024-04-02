import styled from 'styled-components';
import Tag from './Tag';
import { svgToUrl, Switch } from '@aplinkosministerija/design-system';
import AppItem from './AppsItem';
import Icon from './Icons';
import { App, Frequency, IconName, Subscription } from '../utils';

const frequencyLabels = {
  [Frequency.DAY]: 'Naujienos kasdien',
  [Frequency.WEEK]: 'Naujienos kas savaitę',
  [Frequency.MONTH]: 'Naujienos kas mėnesį',
};

const SubscriptionCard = ({
  subscription,
  onClick,
  onActiveChange,
  apps = [],
}: {
  subscription: Subscription<App>;
  onClick: () => void;
  onActiveChange: (e: boolean) => void;
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
                const appIcon = svgToUrl(app.icon);
                return <AppItem key={`app_${app.id}`} app={app} selected={true} />;
              })}
          </AppsContainer>
        </Content>
        <SwitchWrapper>
          <Switch value={subscription.active} onChange={(e) => onActiveChange(e.target.checked)} />
        </SwitchWrapper>
      </InnerContainer>
    </Container>
  );
};

export default SubscriptionCard;

const Container = styled.div`
  width: 100%;
  cursor: pointer;
`;

const InnerContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.GREY};
  align-items: center;
`;

const SwitchWrapper = styled.div`
  padding: 0 8px;
  align-self: flex-start;
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
`;

const AppsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 8px;
  margin-top: 16px;
`;

const AppIcon = styled.img`
  height: 16px;
  margin-right: 4px;
`;
