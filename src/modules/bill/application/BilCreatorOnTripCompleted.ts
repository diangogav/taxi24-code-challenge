import { DomainEventSubscriber } from "../../shared/event-bus/EventBus";
import { TripCompleterDomainEvent } from "../../shared/trip/domain/TripCompleterDomainEvent";
import { Uuid } from "../../shared/value-objets/Uuid";
import { Bill } from "../domain/Bill";
import { BillRepository } from "../domain/BillRepository";

export class BillCreatorOnTripCompleted implements DomainEventSubscriber<TripCompleterDomainEvent> {
  static readonly ListenTo = TripCompleterDomainEvent.DOMAIN_EVENT;

  constructor(private readonly billRepository: BillRepository) { }

  async handle(event: TripCompleterDomainEvent): Promise<void> {
    const bill = new Bill({
      ...event.data,
      id: Uuid.random().value
    })

    await this.billRepository.create(bill);
  }
}