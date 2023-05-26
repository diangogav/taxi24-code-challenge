import mongoose, { Schema } from "mongoose"

const driverSchema = new Schema({
  id: String,
  name: String,
  isAvailable: Boolean,
  location: {
    latitude: Number,
    longitude: Number
  },
}, { collection: 'drivers', timestamps: true })

export const DriverModel = mongoose.model('drivers', driverSchema);
