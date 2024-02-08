import { format } from 'date-fns';
import styled from 'styled-components';
import { Event, Subscription, subscriptionFrequencyTitles } from '../../utils';
import Icon from '../other/Icons';
import api from '../../utils/api';
import { useInfiniteQuery } from 'react-query';

const SubscriptionCard = ({
  subscription,
  onClick,
}: {
  subscription: Subscription;
  onClick?: () => void;
}) => {
  return (
    <Container onClick={onClick}>
      <InnerContainer>
        <Content>
          <Name>{subscriptionFrequencyTitles[subscription.frequency]}</Name>
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

const TimeIcon = styled(Icon)``;

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
`;
