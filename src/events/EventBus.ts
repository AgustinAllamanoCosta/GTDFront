export interface BusEvent {
  name: string;
  data?: any;
}

export interface Subscriber {
  subscriberName: string;
  subscriberFunction: (event: BusEvent) => void;
}

export class EventBus {
  private topic: string;
  private subscribers: Subscriber[];

  constructor(topic?: string) {
    this.topic = topic ? topic : 'global';
    this.subscribers = [];
  }

  publish(event: BusEvent): void {
    console.log('events ', event);
    console.log('subcribers ', this.subscribers);
    this.subscribers?.forEach((sub) => sub.subscriberFunction(event));
  }

  subscribe(
    subscriberName: string,
    subscriberFunction: (event: BusEvent) => void,
  ): void {
    console.log('subcribe ', subscriberName);
    this.subscribers.push({ subscriberName, subscriberFunction });
    console.log('subcribe ', this.subscribers);
  }

  unsubscribe(subscriberName: string): void {
    const indexUnsuscribed = this.subscribers.findIndex(
      (sub) => sub.subscriberName === subscriberName,
    );
    this.subscribers.splice(indexUnsuscribed, 1);
  }
}
