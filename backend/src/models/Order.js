const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], required: true },
    billing: {
      fullName: { type: String, default: "" },
      email: { type: String, default: "" },
      addressLine1: { type: String, default: "" },
      addressLine2: { type: String, default: "" },
      city: { type: String, default: "" },
      country: { type: String, default: "" },
      state: { type: String, default: "" },
      zipCode: { type: String, default: "" },
      phoneNumber: { type: String, default: "" },
      note: { type: String, default: "" },
    },
    pricing: {
      subtotal: { type: Number, required: true, min: 0 },
      shippingCost: { type: Number, required: true, min: 0 },
      couponDiscount: { type: Number, required: true, min: 0 },
      total: { type: Number, required: true, min: 0 },
    },
    payment: {
      method: { type: String, required: true },
      cardLast4: { type: String, default: "" },
    },
    status: { type: String, enum: ["pending", "paid", "shipped", "delivered"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
