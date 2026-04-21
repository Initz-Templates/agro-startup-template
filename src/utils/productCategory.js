const CATEGORY_KEYWORDS = {
  fruits: [
    "fruit",
    "mango",
    "banana",
    "apple",
    "orange",
    "papaya",
    "guava",
    "pomegranate",
    "melon",
    "grape",
    "berry",
  ],
  vegetables: [
    "vegetable",
    "tomato",
    "onion",
    "potato",
    "carrot",
    "spinach",
    "cabbage",
    "broccoli",
    "okra",
    "capsicum",
    "chili",
    "beetroot",
    "gourd",
  ],
  grains: ["grain", "wheat", "rice", "millet", "corn", "jowar", "barley"],
  pulses: ["pulse", "dal", "chana", "moong", "urad", "beans", "lentil"],
  seeds: ["seed", "sesame", "sunflower", "soybean", "mustard", "groundnut"],
  herbs: ["herb", "mint", "coriander", "lemongrass", "turmeric", "ginger", "garlic", "moringa"],
};

const normalizeText = (value) => String(value || "").toLowerCase().trim();

export const inferProductCategory = (product) => {
  const haystack = `${normalizeText(product?.title)} ${normalizeText(product?.product_name)}`;
  const matchedCategory = Object.entries(CATEGORY_KEYWORDS).find(([, keywords]) =>
    keywords.some((keyword) => haystack.includes(keyword))
  );
  return matchedCategory?.[0] || "";
};

export const matchesCategory = (product, category) => {
  const normalizedCategory = normalizeText(category);
  if (!normalizedCategory) return true;
  const title = normalizeText(product?.title);
  if (title.includes(normalizedCategory)) return true;
  return inferProductCategory(product) === normalizedCategory;
};
