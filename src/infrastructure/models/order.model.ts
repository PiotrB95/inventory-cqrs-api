import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  appliedDiscountType: { type: String, required: false },
});

export const OrderModel = mongoose.model('Order', OrderSchema);
