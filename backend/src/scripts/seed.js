const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const env = require("../config/env");
const User = require("../models/User");
const Product = require("../models/Product");

const farmerProfiles = [
  { name: "Arjun Verma", email: "farmer.arjun@agro.com" },
  { name: "Meera Singh", email: "farmer.meera@agro.com" },
  { name: "Raghav Patel", email: "farmer.raghav@agro.com" },
  { name: "Nisha Reddy", email: "farmer.nisha@agro.com" },
  { name: "Kabir Das", email: "farmer.kabir@agro.com" },
];

const catalog = [
  "Alphonso Mango", "Banana Robusta", "Pomegranate", "Papaya Red Lady", "Guava Allahabad",
  "Sweet Lime", "Custard Apple", "Dragon Fruit", "Watermelon", "Muskmelon",
  "Tomato Hybrid", "Onion Red", "Potato Kufri", "Carrot Nantes", "Beetroot",
  "Spinach", "Coriander", "Mint", "Green Chili", "Capsicum",
  "Cauliflower", "Cabbage", "Broccoli", "French Beans", "Peas",
  "Bottle Gourd", "Bitter Gourd", "Pumpkin", "Brinjal", "Okra",
  "Corn Sweet", "Wheat Sharbati", "Basmati Rice", "Millet Bajra", "Sorghum Jowar",
  "Tur Dal", "Moong Dal", "Chana Dal", "Black Gram", "Kidney Beans",
  "Groundnut", "Mustard Seed", "Sesame", "Sunflower Seeds", "Soybean",
  "Fresh Turmeric", "Ginger", "Garlic", "Lemongrass", "Moringa Leaves",
];

const categories = ["Fruits", "Vegetables", "Pulses", "Grains", "Seeds", "Herbs"];

const imageForProduct = (name, index) => {
  const keyword = encodeURIComponent(name.toLowerCase().replace(/\s+/g, ","));
  return `https://loremflickr.com/1200/900/${keyword},fresh,produce?lock=${index + 1}`;
};

const descriptionFor = (name) =>
  `${name} is sourced from registered local farmers, harvested in peak season, and quality checked for freshness, taste, and safe handling standards.`;

const reviewTemplates = [
  { name: "Ananya Sharma", rating: 5, comment: "Fresh produce and excellent packaging quality." },
  { name: "Rahul Kapoor", rating: 4, comment: "Good value and timely delivery, will order again." },
  { name: "Priya Menon", rating: 5, comment: "Clean, farm-fresh items with great taste." },
];

const run = async () => {
  await connectDB(env.mongoUri);

  const passwordHash = await bcrypt.hash("Farmer@123", 10);
  const farmers = [];
  for (const profile of farmerProfiles) {
    let farmer = await User.findOne({ email: profile.email });
    if (!farmer) {
      farmer = await User.create({
        name: profile.name,
        email: profile.email,
        passwordHash,
        role: "farmer",
      });
      console.log(`Farmer created: ${profile.email} / Farmer@123`);
    }
    farmers.push(farmer);
  }

  const customerEmail = "buyer@agro.com";
  const existingCustomer = await User.findOne({ email: customerEmail });
  if (!existingCustomer) {
    const customerHash = await bcrypt.hash("Buyer@123", 10);
    await User.create({
      name: "Demo Buyer",
      email: customerEmail,
      passwordHash: customerHash,
      role: "customer",
    });
    console.log("Customer created: buyer@agro.com / Buyer@123");
  }

  const count = await Product.countDocuments();
  if (count < 50) {
    const toCreate = [];
    const missing = 50 - count;
    for (let i = 0; i < missing; i += 1) {
      const productName = catalog[i % catalog.length];
      const farmer = farmers[i % farmers.length];
      toCreate.push({
        farmerId: farmer._id,
        farmerName: farmer.name,
        product_name: productName,
        title: `${categories[i % categories.length]}, Farm Fresh`,
        image: imageForProduct(productName, i),
        price: 80 + ((i * 27) % 620),
        discount: (i * 3) % 21,
        quantity: 20 + ((i * 5) % 180),
        review: reviewTemplates.length,
        review_name: reviewTemplates[0].name,
        review_date: "2026-04-01",
        description: descriptionFor(productName),
        reviews: reviewTemplates.map((item) => ({
          userId: farmer._id,
          name: item.name,
          rating: item.rating,
          comment: item.comment,
        })),
      });
    }
    await Product.insertMany(toCreate);
    console.log(`Seeded ${toCreate.length} products. Total is now at least 50.`);
  }

  process.exit(0);
};

run().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
