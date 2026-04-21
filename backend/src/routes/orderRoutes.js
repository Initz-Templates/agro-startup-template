const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { requireAuth } = require("../middlewares/auth");

const router = express.Router();

router.use(requireAuth);

router.post("/", async (req, res) => {
  const { items, billing, pricing, payment } = req.body;
  if (!Array.isArray(items) || items.length === 0 || !pricing || !payment) {
    return res.status(400).json({ message: "Invalid order payload", code: "VALIDATION_ERROR" });
  }
  if (
    !billing?.fullName?.trim() ||
    !billing?.email?.trim() ||
    !billing?.addressLine1?.trim() ||
    !billing?.city?.trim() ||
    !billing?.country?.trim() ||
    !billing?.zipCode?.trim() ||
    !billing?.phoneNumber?.trim()
  ) {
    return res.status(400).json({ message: "Complete shipping address is required", code: "VALIDATION_ERROR" });
  }

  for (const item of items) {
    if (!mongoose.Types.ObjectId.isValid(item.productId)) {
      return res.status(400).json({ message: "Invalid product id in items", code: "VALIDATION_ERROR" });
    }
    const product = await Product.findById(item.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found", code: "NOT_FOUND" });
    }
    if (product.quantity < item.quantity) {
      return res.status(400).json({ message: `Insufficient stock for ${product.product_name}`, code: "INSUFFICIENT_STOCK" });
    }
  }

  const order = await Order.create({
    userId: req.user._id,
    items,
    billing: billing || {},
    pricing,
    payment,
    status: "pending",
  });

  for (const item of items) {
    await Product.findByIdAndUpdate(item.productId, { $inc: { quantity: -item.quantity } });
  }

  return res.status(201).json(order);
});

router.get("/me", async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
  return res.json(orders);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Order not found", code: "NOT_FOUND" });
  }
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Order not found", code: "NOT_FOUND" });
  }
  const isOwner = order.userId.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== "farmer") {
    return res.status(403).json({ message: "Forbidden", code: "FORBIDDEN" });
  }
  return res.json(order);
});

module.exports = router;
