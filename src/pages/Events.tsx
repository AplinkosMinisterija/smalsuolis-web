import EventsContainer from '../components/EventsContainer';
import { titles } from '../utils';
import api from '../utils/api';

const Events = () => {
  return (
    <EventsContainer
      apiEndpoint={api.getEvents}
      countEndpoint={api.getEventsCount}
      queryKey={'events'}
      emptyStateTitle={titles.eventsEmptyState}
    />
  );
};

export default Events;
