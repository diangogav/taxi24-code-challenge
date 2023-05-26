export class DriverGetterFilter {
  readonly isAvailable?: boolean;
  constructor({ isAvailable } : { isAvailable?: boolean }) {
    this.isAvailable = isAvailable
  }
}