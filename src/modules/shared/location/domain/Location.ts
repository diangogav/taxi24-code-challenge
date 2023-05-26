export class Location {
  readonly latitude: number;
  readonly longitude: number;

  constructor({ latitude, longitude }: { latitude: number; longitude: number }) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}