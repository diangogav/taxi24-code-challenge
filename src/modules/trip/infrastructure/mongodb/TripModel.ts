import mongoose, { Schema } from "mongoose"

const tripModel = new Schema({
  id: {
    type: String,
    required: true
  },
  passengerId: {
    type: String,
    required: true
  },
  driverId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["active", "completed"],
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: false
  },
  startLocation: {
    type: {
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
  endLocation: {
    type: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    },
  }
}, { collection: 'trips', timestamps: true })

export const TripModel = mongoose.model('trips', tripModel);
