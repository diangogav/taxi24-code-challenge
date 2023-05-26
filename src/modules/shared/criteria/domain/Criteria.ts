import { Filter } from "./Filter";

export class Criteria {
  readonly filter: Filter;
  readonly limit: number;

  constructor({ filter, limit }: { filter: Filter, limit?: number }) {
    this.filter = filter;
    this.limit = limit || 10
  }
}