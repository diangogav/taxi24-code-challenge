export interface DomainEventSubscriber<T> {
  handle(event: T): Promise<void>;
}

export class EventBus {
  private static instance: EventBus;
  private subscribers: Map<string, Array<DomainEventSubscriber<unknown>>> = new Map();

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  subscribe(eventType: string, subscriber: DomainEventSubscriber<unknown>) {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, []);
    }
    this.subscribers.get(eventType)?.push(subscriber);
  }

  publish<T>(eventType: string, event: T) {
    const subscribers = this.subscribers.get(eventType);
    if (subscribers) {
      subscribers.forEach(subscriber => subscriber.handle(event));
    }
  }
}