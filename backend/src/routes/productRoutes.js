const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const { requireAuth } = require("../middlewares/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Product not found", code: "NOT_FOUND" });
  }
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found", code: "NOT_FOUND" });
  }
  return res.json(product);
});

router.post("/:id/reviews", requireAuth, async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Product not found", code: "NOT_FOUND" });
  }
  const { rating, comment } = req.body;
  if (typeof rating !== "number" || rating < 1 || rating > 5 || !comment?.trim()) {
    return res.status(400).json({ message: "rating (1-5) and comment are required", code: "VALIDATION_ERROR" });
  }

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found", code: "NOT_FOUND" });
  }

  const review = {
    userId: req.user._id,
    name: req.user.name,
    rating,
    comment: comment.trim(),
  };
  product.reviews.push(review);
  product.review = product.reviews.length;
  product.review_name = review.name;
  product.review_date = new Date().toISOString().slice(0, 10);

  await product.save();
  return res.status(201).json({ success: true, reviews: product.reviews });
});

module.exports = router;
