import EventsContainer from '../components/containers/EventsContainer';
import { descriptions, titles } from '../utils';
import api from '../utils/api';

const MyEvents = () => {
  return (
    <EventsContainer
      apiEndpoint={api.getNewsfeed}
      queryKey={'newsfeed'}
      emptyStateTitle={titles.myEventsEmptyState}
      emptyStateDescription={descriptions.myEventsEmptyState}
    />
  );
};

export default MyEvents;
