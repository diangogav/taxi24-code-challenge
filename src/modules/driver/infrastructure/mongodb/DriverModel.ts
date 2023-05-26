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
  location: {
    type:{
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    },
    required: true
  },
}, { collection: 'drivers', timestamps: true })

export const DriverModel = mongoose.model('drivers', driverSchema);
