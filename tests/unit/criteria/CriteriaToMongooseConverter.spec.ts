import { Criteria } from '../../../src/modules/shared/criteria/domain/Criteria';
import { CriteriaToMongooseConverter } from '../../../src/modules/shared/criteria/infrastructure/CriteriaToMongooseConverter';
describe('Criteria to mongoose converter', () => {
  const converter = new CriteriaToMongooseConverter();
  it('Should...', () => {
    const criteria = Criteria.fromPrimitives(
      [{ field: 'status', operator: '=', value: 'active' }],
      null,
      null,
      null,
      null
    );

    const query = converter.convert(criteria);
    expect(query.filters).toStrictEqual({ status: 'active' });
  });

  it('Should...', () => {
    const criteria = Criteria.fromPrimitives(
      [{ field: 'status', operator: '=', value: 'active' }],
      null,
      null,
      10,
      2
    );

    const query = converter.convert(criteria);
    expect(query.filters).toStrictEqual({ status: 'active' });
    expect(query.options.limit).toStrictEqual(10);
    expect(query.options.skip).toStrictEqual(10 * (2 - 1));
  });
});
