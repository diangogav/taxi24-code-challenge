import { Uuid } from "../../shared/value-objets/Uuid";

export class Passenger {
  readonly id: string;
  readonly name: string;

  constructor({ id, name }: { id: string; name: string }) {
    this.id = new Uuid(id).value;
    this.name = name;
  }
}