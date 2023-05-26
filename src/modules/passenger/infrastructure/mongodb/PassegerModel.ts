import mongoose, { Schema } from "mongoose"

const passengerSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
}, { collection: 'passengers', timestamps: true })

export const PassengerModel = mongoose.model('passengers', passengerSchema);
