import EventsContainer from '../components/containers/EventsContainer';
import { titles } from '../utils';
import api from '../utils/api';

const Events = () => {
  return (
    <EventsContainer
      apiEndpoint={api.getEvents}
      queryKey={'events'}
      emptyStateTitle={titles.eventsEmptyState}
    />
  );
};

export default Events;
