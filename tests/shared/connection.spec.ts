import { PgConnection } from '../../src/modules/shared/database/infrastructure/postgres/PgConnection';

describe("Pg Connection", () => {
  it("Should have only one instance", () => {
    const sut = PgConnection.getInstance();
    const sut2 = PgConnection.getInstance();

    expect(sut).toBe(sut2);
  });
});
