import mongoose, { Schema } from "mongoose"

const billSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  driverName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
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
}, { collection: 'bills', timestamps: true })

export const BillModel = mongoose.model('bills', billSchema);
