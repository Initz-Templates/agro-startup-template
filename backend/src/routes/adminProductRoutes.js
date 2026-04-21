const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const { requireAuth, requireRole } = require("../middlewares/auth");

const router = express.Router();
const MAX_BASE64_IMAGE_LENGTH = 1_500_000;
const BASE64_IMAGE_REGEX = /^data:image\/(png|jpe?g|webp);base64,[A-Za-z0-9+/=\s]+$/i;

const normalizeCategory = (category) => {
  if (typeof category !== "string") return "";
  return category
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const isValidProductImage = (image) => {
  if (typeof image !== "string" || !image.trim()) {
    return false;
  }
  const normalizedImage = image.trim();
  if (normalizedImage.startsWith("http://") || normalizedImage.startsWith("https://")) {
    return true;
  }
  if (!BASE64_IMAGE_REGEX.test(normalizedImage)) {
    return false;
  }
  return normalizedImage.length <= MAX_BASE64_IMAGE_LENGTH;
};

router.use(requireAuth, requireRole("farmer"));

router.get("/", async (req, res) => {
  const products = await Product.find({ farmerId: req.user._id }).sort({ createdAt: -1 });
  res.json(products);
});

router.get("/categories", async (req, res) => {
  const categories = await Product.distinct("title");
  const normalized = [...new Set(categories.map((category) => normalizeCategory(category)).filter(Boolean))].sort(
    (a, b) => a.localeCompare(b)
  );
  return res.json(normalized);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Product not found", code: "NOT_FOUND" });
  }
  const product = await Product.findOne({ _id: req.params.id, farmerId: req.user._id });
  if (!product) {
    return res.status(404).json({ message: "Product not found", code: "NOT_FOUND" });
  }
  return res.json(product);
});

router.post("/", async (req, res) => {
  const { product_name, title, image, price } = req.body;
  if (!product_name || !title || !image || typeof price !== "number") {
    return res.status(400).json({ message: "product_name, title, image, price are required", code: "VALIDATION_ERROR" });
  }
  if (!isValidProductImage(image)) {
    return res.status(400).json({
      message: "Image must be a valid URL or a PNG/JPG/WEBP base64 string under size limit.",
      code: "VALIDATION_ERROR",
    });
  }
  const normalizedTitle = normalizeCategory(title);
  if (!normalizedTitle) {
    return res.status(400).json({ message: "Category is required", code: "VALIDATION_ERROR" });
  }
  const product = await Product.create({
    ...req.body,
    title: normalizedTitle,
    farmerId: req.user._id,
    farmerName: req.user.name,
  });
  return res.status(201).json(product);
});

router.put("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Product not found", code: "NOT_FOUND" });
  }
  if (typeof req.body.image !== "undefined" && !isValidProductImage(req.body.image)) {
    return res.status(400).json({
      message: "Image must be a valid URL or a PNG/JPG/WEBP base64 string under size limit.",
      code: "VALIDATION_ERROR",
    });
  }
  const payload = { ...req.body };
  if (typeof payload.title !== "undefined") {
    payload.title = normalizeCategory(payload.title);
    if (!payload.title) {
      return res.status(400).json({ message: "Category is required", code: "VALIDATION_ERROR" });
    }
  }
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id, farmerId: req.user._id },
    payload,
    { new: true, runValidators: true }
  );
  if (!product) {
    return res.status(404).json({ message: "Product not found", code: "NOT_FOUND" });
  }
  return res.json(product);
});

router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Product not found", code: "NOT_FOUND" });
  }
  const product = await Product.findOneAndDelete({ _id: req.params.id, farmerId: req.user._id });
  if (!product) {
    return res.status(404).json({ message: "Product not found", code: "NOT_FOUND" });
  }
  return res.json({ success: true });
});

module.exports = router;
