const express = require("express");
const newsArticles = require("../data/newsArticles");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(newsArticles);
});

router.get("/:id", (req, res) => {
  const article = newsArticles.find((item) => item.id === req.params.id);
  if (!article) {
    return res.status(404).json({ message: "News article not found", code: "NOT_FOUND" });
  }
  return res.json(article);
});

module.exports = router;
