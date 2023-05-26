import { InvalidArgumentError } from "../../errors/domain/InvalidArgumentError";

export class Location {
  readonly latitude: number;
  readonly longitude: number;

  constructor({ latitude, longitude }: { latitude: number; longitude: number }) {
    this.ensureIsValidLongitude(longitude);
    this.ensureIsValidLatitude(latitude);
    this.longitude = longitude;
    this.latitude = latitude;
  }

  private ensureIsValidLongitude(longitude: number) {
    if (longitude < -180 || longitude > 180) {
      throw new InvalidArgumentError('Invalid longitude value');
    }
  }

  private ensureIsValidLatitude(latitude: number) {
    if (latitude < -90 || latitude > 90) {
      throw new InvalidArgumentError('Invalid latitude value');
    }
  }

}