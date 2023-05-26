export type DriverFilter = {
  isAvailable: boolean;
  nearest: {
    latitude: number;
    longitude: number;
  }
}

export class DriverGetterFilter {
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

  get value() {
    return this.filter
  }
}