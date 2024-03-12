import styled from 'styled-components';
import { App, Frequency, getIconUrl, IconName, Subscription } from '../../utils';
import Switch from '../buttons/Switch';
import Icon from '../other/Icons';
import AppItem from '../other/AppsItem';

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
  const futureApps = subscription.apps.length === 0;
  const allApps = !futureApps && subscription.apps.length === apps?.length;
  const showApps = !futureApps && !allApps;

  return (
    <Container>
      <InnerContainer>
        <Content onClick={onClick}>
          <Name>{`${frequencyLabels[subscription.frequency]}`} </Name>
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
              subscription.apps?.map((app) => {
                const appIcon = getIconUrl(app.icon);
                return <AppItem app={app} selected={true} />;
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
  background: ${({ theme }) => theme.colors.largeButton.GREY};
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
