import EventsContainer from '../components/EventsContainer';
import { descriptions, titles } from '../utils';
import api from '../utils/api';

const MyEvents = () => {
  return (
    <EventsContainer
      isMyEvents
      countEndpoint={api.getNewsfeedCount}
      apiEndpoint={api.getNewsfeed}
      queryKey={'newsfeed'}
      emptyStateTitle={titles.myEventsEmptyState}
      emptyStateDescription={descriptions.myEventsEmptyState}
    />
  );
};

export default MyEvents;
