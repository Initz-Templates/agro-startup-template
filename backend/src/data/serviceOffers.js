module.exports = [
  {
    id: 1,
    offerName: "Farm-Fresh Produce",
    title: "Daily-updated fruits, vegetables, and grains listed directly by verified farmers.",
    img1: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80",
    ],
    longDescription:
      "FarmStore connects customers with nearby farmers so produce reaches buyers with less handling time and better freshness. We validate product listings, show transparent details, and keep inventory updated to reduce out-of-stock frustration.",
    highlights: [
      "Daily inventory sync from farmer dashboards",
      "Clear freshness-focused product descriptions",
      "Seasonal and local availability visibility",
    ],
    process: [
      "Farmers publish available produce with quantity and pricing.",
      "Customers browse by category and place orders instantly.",
      "Orders move through secure checkout and are tracked.",
    ],
    icon: "https://img.icons8.com/color/96/leaf.png",
  },
  {
    id: 2,
    offerName: "Farmer Storefronts",
    title: "Each farmer gets a dedicated dashboard to add, edit, and manage inventory in real time.",
    img1: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556740749-40422adbad0b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    ],
    longDescription:
      "Farmer storefronts are built for quick product operations. Farmers can create listings, update stock, adjust discounts, and monitor customer-ready catalog pages without technical setup.",
    highlights: [
      "Role-based farmer access controls",
      "Fast add/edit/delete product flows",
      "Image upload with DB-backed storage",
    ],
    process: [
      "Farmer signs in and accesses dashboard routes.",
      "Products are created with category, stock, and images.",
      "Updates reflect immediately in customer catalog APIs.",
    ],
    icon: "https://img.icons8.com/color/96/shop.png",
  },
  {
    id: 3,
    offerName: "Secure Checkout",
    title: "Customers enjoy smooth cart-to-checkout ordering with role-safe authentication.",
    img1: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=80",
    ],
    longDescription:
      "FarmStore checkout is designed for reliability: validated address fields, pincode handling, order payload checks, and protected order APIs. Customers move from cart to confirmation with fewer form errors.",
    highlights: [
      "Address autofill helpers with location support",
      "Billing + order payload validation",
      "Protected order placement for signed-in users",
    ],
    process: [
      "Customer reviews cart and billing summary.",
      "Shipping details are validated before submit.",
      "Order is persisted and cart state is cleared safely.",
    ],
    icon: "https://img.icons8.com/color/96/shopping-cart-loaded.png",
  },
  {
    id: 4,
    offerName: "Transparent Reviews",
    title: "Product reviews are persisted in backend for genuine buyer feedback and trust.",
    img1: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    ],
    longDescription:
      "Review workflows help buyers make informed decisions. FarmStore stores ratings and comments with user context, so each review contributes to reliable product reputation over time.",
    highlights: [
      "Authenticated review submission flow",
      "Rating + comment validation",
      "Review history retained on product documents",
    ],
    process: [
      "Customer submits rating and written feedback.",
      "Backend validates and stores review securely.",
      "Product review summary is updated for visibility.",
    ],
    icon: "https://img.icons8.com/color/96/star--v1.png",
  },
];
