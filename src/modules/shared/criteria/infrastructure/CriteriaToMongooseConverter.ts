import { Criteria } from '../domain/Criteria';

type MongooseQuery = {
  filters: { [key: string]: unknown };
  options: {
    limit?: number;
    skip?: number
  }
};
export class CriteriaToMongooseConverter {
  convert(criteria: Criteria): MongooseQuery {
    const query: MongooseQuery = { filters: {}, options: {} };
    query.filters = {};

    if (criteria.hasFilters()) {
      query.filters = criteria.filters.value.reduce((obj, filter) => {
        if (filter.operator.isEquals()) {
          return {
            ...obj,
            [filter.field.value]: filter.value.value,
          };
        } else {
          return obj;
        }
      }, {});
    }

    if (criteria.pageSize !== null) {
      query.options.limit = criteria.pageSize;
    }
    if (criteria.pageNumber !== null && criteria.pageSize !== null) {
      query.options.skip = criteria.pageSize * (criteria.pageNumber - 1);
    }

    return query;
  }
}
