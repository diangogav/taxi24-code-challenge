export type DriverFilter = {
  isAvailable: boolean;
  nearest: {
    latitude: number;
    longitude: number;
  },
  maxDistanceInMeters: number;
}

export class DriverGetterFilterBuilder {
  private filter: Partial<DriverFilter> = {}

  available() {
    this.filter.isAvailable = true;
    return this;
  }

  nearestTo(latitude: number, longitude: number) {
    this.filter.nearest = {
      latitude,
      longitude
    }
    return this;
  }

  maxDistance(distanceInMeters: number) {
    this.filter.maxDistanceInMeters = distanceInMeters;
  }

  get value() {
    return this.filter
  }
}