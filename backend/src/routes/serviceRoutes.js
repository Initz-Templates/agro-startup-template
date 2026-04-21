const express = require("express");
const serviceOffers = require("../data/serviceOffers");

const router = express.Router();

router.get("/offers", (req, res) => {
  res.json(serviceOffers);
});

module.exports = router;
