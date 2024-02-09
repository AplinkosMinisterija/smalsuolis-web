import styled from 'styled-components';
import { App, Frequency, Subscription, subscriptionFrequencyTitles } from '../../utils';

import Tag from '../other/Tag';

const frequencyLabels = {
  [Frequency.DAY]: 'kasdieninė',
  [Frequency.WEEK]: 'savaitinė',
  [Frequency.MONTH]: 'mėnesinė',
};

const SubscriptionCard = ({
  subscription,
  onClick,
}: {
  subscription: Subscription<App>;
  onClick?: () => void;
}) => {
  return (
    <Container onClick={onClick}>
      <InnerContainer>
        <Content>
          <Name>
            {`${subscription.active ? 'Aktyvi' : 'Neaktyvi'} ${frequencyLabels[subscription.frequency]} prenumerata`}{' '}
          </Name>
          <AppsContainer>
            {subscription.apps?.map((app) => (
              <Tag
                icon={<AppIcon src={app.icon} />}
                text={app.name}
                color={'#101010'}
                backgroundColor={'#f7f7f7'}
              />
            ))}
          </AppsContainer>
        </Content>
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
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  margin-right: 12px;
  border-radius: 4px;
  background-color: #edf1f2;
  color: ${({ theme }) => theme.colors.primary};
`;

const Month = styled.div`
  font-size: 12px;
`;

const Day = styled.div`
  font-size: 24px;
  font-weight: Bold;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Time = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 1.4rem;
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
