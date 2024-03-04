import styled from 'styled-components';
import { App, Frequency, getIconUrl, Subscription } from '../utils';
import Tag from './Tag';
import { Switch } from '@aplinkosministerija/design-system';

const frequencyLabels = {
  [Frequency.DAY]: 'kasdieninė',
  [Frequency.WEEK]: 'savaitinė',
  [Frequency.MONTH]: 'mėnesinė',
};

const SubscriptionCard = ({
  subscription,
  onClick,
  onActiveChange,
}: {
  subscription: Subscription<App>;
  onClick: () => void;
  onActiveChange: (e: boolean) => void;
}) => {
  return (
    <Container>
      <InnerContainer>
        <Content onClick={onClick}>
          <Name>
            {`${subscription.active ? 'Aktyvi' : 'Neaktyvi'} ${frequencyLabels[subscription.frequency]} prenumerata`}{' '}
          </Name>
          <AppsContainer>
            {subscription.apps?.map((app) => {
              const appIcon = getIconUrl(app.icon);
              return (
                <Tag
                  icon={<AppIcon src={appIcon} />}
                  text={app.name}
                  color={'#101010'}
                  backgroundColor={'#f7f7f7'}
                />
              );
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

const AppIcon = styled.img`
  height: 16px;
  margin-right: 4px;
`;

const InnerContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 12px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #d4ddde;
  box-shadow: 0px 8px 16px #00465014;
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
  font-size: 1.7rem;
  font-weight: bold;
`;

const AppsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 8px;
  margin-top: 16px;
`;
