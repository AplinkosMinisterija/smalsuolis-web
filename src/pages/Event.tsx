import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import styled from 'styled-components';
import ContentLayout from '../components/layouts/ContentLayout';
import Icon from '../components/other/Icons';
import LoaderComponent from '../components/other/LoaderComponent';
import PreviewMap from '../components/other/PreviewMap';
import Tag from '../components/other/Tag';
import { appKeyToIconName, appKeyToName, buttonLabels, IconName } from '../utils';
import api from '../utils/api';
import { getTimeDifference } from '../utils/functions';

const Event = () => {
  const { id = '' } = useParams();
  const { data: event, isLoading } = useQuery(['event', id], () => api.getEvent({ id }), {
    retry: false,
  });

  if (isLoading || !event) {
    return <LoaderComponent />;
  }

  const appKey = event.app.key;

  return (
    <ContentLayout
      title={event?.name}
      customSubTitle={
        <Tag icon={<EventIcon name={appKeyToIconName[appKey]} />} text={appKeyToName[appKey]} />
      }
    >
      <Line>
        <Time>
          <TimeIcon name={IconName.time} />
          {getTimeDifference(event.startAt)}
        </Time>
        {event.url && (
          <Button onClick={() => window.open(event.url)}>
            {buttonLabels.website} <EventIcon name={IconName.openInNew} />
          </Button>
        )}
      </Line>
      <MapContainer>
        <PreviewMap value={event.geom} height={'400px'} />
      </MapContainer>
    </ContentLayout>
  );
};

const EventIcon = styled(Icon)`
  width: 15px;
`;

const TimeIcon = styled(Icon)`
  font-size: 1.7rem;
`;

const Time = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 1.4rem;
`;

const Line = styled.div`
  margin: 40px 0 12px 0;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const MapContainer = styled.div`
  width: 100%;
`;

const Button = styled.div`
  background-color: ${({ theme }) => theme.colors.largeButton.GREY};
  border-radius: 4px;
  padding: 8px 12px;
  color: ${({ theme }) => theme.colors.text.primary};
  display: grid;
  grid-template-columns: 1fr 16px;
  align-items: center;
  text-decoration: none;
  gap: 8px;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export default Event;
