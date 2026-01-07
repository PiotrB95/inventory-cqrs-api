import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String, required: true, maxLength: 50 },
  price: { type: Number, required: true, min: 0.01 },
  stock: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
});

export const ProductModel = mongoose.model('Product', ProductSchema);
