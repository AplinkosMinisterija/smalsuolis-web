import { format } from 'date-fns';
import styled from 'styled-components';
import { monthShorthands } from '../../utils/texts';
import { Event } from '../../utils/types';
import Icon from './Icons';

const EventCard = ({ event, onClick }: { event: Event; onClick?: () => void }) => {
  const { startAt, endAt, isFullDay, name } = event;

  const formattedDay = format(new Date(startAt), 'dd');
  const formattedMonth = monthShorthands[new Date(startAt).getMonth()];
  const formattedTime = !isFullDay
    ? `${format(new Date(startAt), 'HH:mm')} - ${endAt ? format(new Date(endAt), 'HH:mm') : '-'}`
    : 'Visą dieną';

  return (
    <Container onClick={onClick}>
      <InnerContainer>
        <DateContainer>
          <Month>{formattedMonth}</Month>
          <Day>{formattedDay}</Day>
        </DateContainer>
        <Content>
          <Name>{name}</Name>

          <Time>
            <TimeIcon name="time" />
            {formattedTime}
          </Time>
        </Content>
      </InnerContainer>
    </Container>
  );
};

export default EventCard;

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
