export interface BusEvent {
  name: string;
  data?: any;
}

export interface Subscriber {
  subscriberName: string;
  subscriberFunction: (event: BusEvent) => void;
}

export class EventBus {
  private subscribers: Subscriber[];

  constructor() {
    this.subscribers = [];
  }

  publish(event: BusEvent): void {
    this.subscribers?.forEach((sub) => sub.subscriberFunction(event));
  }

  subscribe(
    subscriberName: string,
    subscriberFunction: (event: BusEvent) => void,
  ): void {
    this.subscribers.push({ subscriberName, subscriberFunction });
  }

  unsubscribe(subscriberName: string): void {
    const indexUnsuscribed = this.subscribers.findIndex(
      (sub) => sub.subscriberName === subscriberName,
    );
    this.subscribers.splice(indexUnsuscribed, 1);
  }
}
