import styled from 'styled-components';
import { device } from '../../styles';
import { appKeyToIconName, appKeyToName, Event, getTimeDifference } from '../../utils';
import Icon from './Icons';

const EventCard = ({ event, onClick }: { event: Event; onClick?: () => void }) => {
  const { startAt, app } = event;

  return (
    <Container onClick={onClick}>
      <IconContainer>
        <EventIcon name={appKeyToIconName[app.key]} />
      </IconContainer>
      <Content>
        <Name>{appKeyToName[app.key]}</Name>

        <Time>{getTimeDifference(startAt)}</Time>
      </Content>
    </Container>
  );
};

export default EventCard;

const Container = styled.a`
  background: ${({ theme }) => theme.colors.largeButton.GREY};
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 8px;
  width: 100%;
  display: grid;
  grid-template-columns: 48px 1fr;
  padding: 16px;
  gap: 12px;

  @media ${device.mobileL} {
    max-width: 100%;
  }

  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => `${theme.colors.primary}33`};
  }
`;

const EventIcon = styled(Icon)``;

const IconContainer = styled.div`
  background-color: white;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;
`;

const Time = styled.div``;

const Name = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;
