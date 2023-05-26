import { InvalidArgumentError } from "../../../src/modules/shared/errors/domain/InvalidArgumentError";
import { Location } from "../../../src/modules/shared/location/domain/Location";

describe("Location", () => {
  describe("constructor", () => {
    it("should create a location instance with valid latitude and longitude", () => {
      const latitude = 50;
      const longitude = -120;

      const location = new Location({ latitude, longitude });

      expect(location.latitude).toBe(latitude);
      expect(location.longitude).toBe(longitude);
    });

    it("should throw InvalidArgumentError when the longitude is invalid", () => {
      const latitude = 50;
      const invalidLongitude = -200;

      expect(() => new Location({ latitude, longitude: invalidLongitude })).toThrow(
        InvalidArgumentError
      );
    });

    it("should throw InvalidArgumentError when the latitude is invalid", () => {
      const invalidLatitude = 100;
      const longitude = -120;

      expect(() => new Location({ latitude: invalidLatitude, longitude })).toThrow(
        InvalidArgumentError
      );
    });
  });
});
