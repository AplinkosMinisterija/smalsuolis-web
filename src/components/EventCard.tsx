import styled from 'styled-components';
import { device } from '../styles';
import { Event, getIconUrl, getTimeLabel } from '../utils';
import Tag from './Tag';

const EventCard = ({ event, onClick }: { event: Event; onClick?: () => void }) => {
  const { app } = event;
  const appIcon = getIconUrl(app.icon);
  return (
    <Container onClick={onClick}>
      <Row>
        <Name>{event.name}</Name>
        <Time>{getTimeLabel(event)}</Time>
      </Row>

      <Tag text={app.name} icon={<AppIcon src={appIcon} />} />
    </Container>
  );
};

export default EventCard;

const AppIcon = styled.img`
  height: 16px;
`;

const Container = styled.a`
  background: ${({ theme }) => theme.colors.largeButton.GREY};
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 8px;
  width: 100%;
  display: grid;
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

const Row = styled.div`
  display: flex;
  gap: 12px;
  @media ${device.mobileL} {
    gap: 4px;
    flex-wrap: wrap-reverse;
  }
`;

const Time = styled.div`
  white-space: nowrap;
`;

const Name = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;