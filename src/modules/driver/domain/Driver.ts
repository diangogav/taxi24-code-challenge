export class Driver {
  readonly id: string;
  readonly name: string;
  readonly isAvailable: boolean;
  readonly location: {
    latitude: number;
    longitude: number;
  }

  constructor({ id, name, isAvailable, location }: { id: string; name: string; isAvailable: boolean; location: { latitude: number; longitude: number } }) {
    this.id = id;
    this.name = name;
    this.isAvailable = isAvailable;
    this.location = location
  }
}