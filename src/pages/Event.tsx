import { ContentLayout } from '@aplinkosministerija/design-system';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import EventCard from '../components/EventCard';
import LoaderComponent from '../components/LoaderComponent';
import api from '../utils/api';

const EventPage = () => {
  const { id = '' } = useParams();
  const { data: event, isLoading } = useQuery({
    queryKey: ['event', id],
    queryFn: () => api.getEvent({ id }),
  });

  if (isLoading) return <LoaderComponent />;

  if (!event) return <></>;

  return (
    <ContentLayout>
      <EventCard key={event.id} event={event} isOpen={true} />
    </ContentLayout>
  );
};

export default EventPage;
