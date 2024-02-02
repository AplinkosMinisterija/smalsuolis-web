import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import styled from 'styled-components';
import DefaultLayout from '../components/layouts/DefaultLayout';
import EventCard from '../components/other/EventCard';
import LoaderComponent from '../components/other/LoaderComponent';
import { device } from '../styles';
import api from '../utils/api';
import { handleAlert } from '../utils/functions';

const Event = () => {
  const { id = '' } = useParams();
  const { data, isLoading } = useQuery(['event', id], () => api.getEvent({ id: id }), {
    onError: () => {
      handleAlert();
    },

    retry: false,
  });

  if (isLoading || !data) {
    return <LoaderComponent />;
  }

  return (
    <DefaultLayout>
      <EventsContainer>
        <EventCard event={data} />
      </EventsContainer>
    </DefaultLayout>
  );
};

export default Event;

const EventsContainer = styled.div`
  display: flex;
  max-width: 800px;

  margin: auto;
  margin-top: 30px;
  width: 100%;
  gap: 12px;
  flex-direction: column;
  @media ${device.mobileL} {
    padding: 12px;
  }
`;
