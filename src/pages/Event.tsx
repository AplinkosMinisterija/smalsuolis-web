import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { ContentLayoutContainer, ContentLayoutTitle } from '../components/other/CommonStyles';
import Icon, { IconName } from '../components/other/Icons';
import LoaderComponent from '../components/other/LoaderComponent';
import PreviewMap from '../components/other/PreviewMap';
import Tag from '../components/other/Tag';
import { appKeyToIcon, appKeyToName } from '../utils';
import api from '../utils/api';
import { getTimeDifference, handleAlert } from '../utils/functions';

const Event = () => {
  const { id = '' } = useParams();
  const { data: event, isLoading } = useQuery(['event', id], () => api.getEvent({ id }), {
    onError: () => {
      handleAlert();
    },

    retry: false,
  });

  if (isLoading || !event) {
    return <LoaderComponent />;
  }

  const appKey = event.app.key;

  return (
    <ContentLayoutContainer>
      <ContentLayoutTitle>{event?.name}</ContentLayoutTitle>
      <Tag icon={<EventIcon name={appKeyToIcon[appKey]} />} text={appKeyToName[appKey]} />
      <Line>
        <Time>
          <TimeIcon name={IconName.time} />
          {getTimeDifference(event.startAt)}
        </Time>
      </Line>
      <MapContainer>
        <PreviewMap value={event.geom} height={'400px'} />
      </MapContainer>
    </ContentLayoutContainer>
  );
};

const EventIcon = styled(Icon)`
  width: 20px;
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

export default Event;
