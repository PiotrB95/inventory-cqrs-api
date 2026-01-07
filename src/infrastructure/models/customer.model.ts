import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, enum: ['US', 'EU', 'ASIA'], required: true },
});

export const CustomerModel = mongoose.model('Customer', CustomerSchema);
