import { ReactNode, useEffect, useMemo, useState } from 'react';
import { EventContext } from '../../contexts/eventContext';
import { Analytics, logEvent } from 'firebase/analytics';
import { BusEvent, EventBus } from '../../events/EventBus';
import { Configuration } from '../../types/types';
import { IS_END_TO_END } from '../../constants/environment';

export enum SUBSCRIBER_NAMES {
  METRICS = 'metrics',
}

const MetricContext = ({
  children,
  analytics,
  configuration,
}: {
  children: ReactNode;
  analytics: Analytics | undefined;
  configuration: Configuration;
}) => {
  const [eventBus] = useState<EventBus>(new EventBus());
  const eventContextValue = useMemo(
    () => ({
      eventBus,
    }),
    [eventBus],
  );

  const sendMetrics = (event: BusEvent) => {
    if (analytics) logEvent(analytics, event.data.name, event.data);
  };

  useEffect(() => {
    if (analytics && configuration.environment != IS_END_TO_END)
      eventBus.subscribe(SUBSCRIBER_NAMES.METRICS, sendMetrics);
  }, []);

  return (
    <EventContext.Provider value={eventContextValue}>
      {children}
    </EventContext.Provider>
  );
};

export default MetricContext;
