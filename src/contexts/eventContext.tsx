import { createContext } from 'react';
import { EventBus } from '../events/EventBus';

export const EventContext = createContext<{
  eventBus: EventBus;
}>({
  eventBus: new EventBus(),
});
