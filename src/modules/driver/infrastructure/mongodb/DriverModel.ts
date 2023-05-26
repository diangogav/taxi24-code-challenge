import mongoose, { Schema } from "mongoose"

const driverSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  },
}, { collection: 'drivers', timestamps: true })

driverSchema.index({ coordinates: '2dsphere' });

export const DriverModel = mongoose.model('drivers', driverSchema);
