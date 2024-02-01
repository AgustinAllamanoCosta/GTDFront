import { ReactNode } from 'react';
import { EventContext } from '../../contexts/eventContext';
import { useEffect, useState } from 'react';
import { Analytics, logEvent } from 'firebase/analytics';
import { BusEvent, EventBus } from '../../events/EventBus';

export enum SUBSCRIBER_NAMES {
  METRICS = 'metrics',
}

const MetricContext = ({
  children,
  analytics,
}: {
  children: ReactNode;
  analytics: Analytics | undefined;
}) => {
  const [eventBus] = useState<EventBus>(new EventBus());

  const sendMetrics = (event: BusEvent) => {
    if (analytics) logEvent(analytics, event.data.name, event.data);
  };

  useEffect(() => {
    if (analytics) eventBus.subscribe(SUBSCRIBER_NAMES.METRICS, sendMetrics);
  }, []);

  return (
    <EventContext.Provider
      value={{
        eventBus,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default MetricContext;