import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
const mongoUrl = process.env.MONGO_DB_URI;
import { randUuid, randFullName, randNearbyGPSCoordinate } from "@ngneat/falso"
import { DriverModel } from '../../src/modules/driver/infrastructure/mongodb/DriverModel';

if(!mongoUrl) { throw new Error("MONGO_DB_URI env is required.")}

mongoose.connect(mongoUrl)
  .then(async () => {
    console.log("Connected to database");
    const drivers = generateDrivers();
    await DriverModel.deleteMany({});
    await DriverModel.insertMany(drivers);
    process.exit(0);
  })

function generateDrivers() {
  const drivers = [];

  for(let i = 0; i < 10; i++ ) {
    const coordinates = randNearbyGPSCoordinate();
    drivers.push({
      id: randUuid(),
      name: randFullName(),
      isAvailable: true,
      location: {
        latitude: coordinates[0],
        longitude: coordinates[1]
      }
    })
  }

  return drivers;
}