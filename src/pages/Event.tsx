import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import styled from 'styled-components';
import ContentLayout from '../components/layouts/ContentLayout';
import Icon from '../components/other/Icons';
import LoaderComponent from '../components/other/LoaderComponent';
import PreviewMap from '../components/other/PreviewMap';
import Tag from '../components/other/Tag';
import { buttonLabels, IconName } from '../utils';
import api from '../utils/api';
import { getIconUrl, getTimeLabel } from '../utils/functions';

const Event = () => {
  const { id = '' } = useParams();
  const { data: event, isLoading } = useQuery({
    queryKey: ['event', id],
    queryFn: () => api.getEvent({ id }),
  });

  if (isLoading || !event) {
    return <LoaderComponent />;
  }

  const app = event.app;

  const appIcon = getIconUrl(app.icon);

  return (
    <ContentLayout
      title={event?.name}
      customSubTitle={<Tag icon={<SvgIcon src={appIcon} />} text={app.name} />}
    >
      <Line>
        <Time>
          <TimeIcon name={IconName.time} />
          {getTimeLabel(event)}
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

const SvgIcon = styled.img`
  width: 16px;
`;

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
