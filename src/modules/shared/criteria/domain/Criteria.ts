export class Criteria {
  constructor(readonly filter: { [key: string]: unknown }) {
    this.filter = this.deleteKeysWithUndefinedValue(filter);
  }

  private deleteKeysWithUndefinedValue(object: { [key: string]: unknown }): { [keys: string]: unknown } {
    return Object.fromEntries(
      Object.entries(object).filter(([_, value]) => value !== undefined)
    );
  }
}