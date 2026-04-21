# Backend API Contract (MVP)

This frontend is prepared to call `VITE_API_BASE_URL`.
No static fallback mode is used now; APIs are required in all environments.

## Base URL

- Local: `http://localhost:5000/api`

## Catalog APIs

### GET `/products`

- Returns list of product cards for listing pages.

```json
[
  {
    "id": 1,
    "image": "https://cdn.example.com/products/strawberry.webp",
    "product_name": "Strawberry",
    "title": "Crop, Organic",
    "price": 400,
    "discount": 20,
    "review": 5,
    "description": "Product description",
    "review_name": "User Name",
    "review_date": "2026-04-20",
    "review_image": "https://cdn.example.com/users/u1.webp",
    "quantity": 5
  }
]
```

### GET `/products/:id`

- Returns one product object with same shape as list item.
- Return `404` if not found.

### GET `/services/offers`

- Returns service cards shown in "What We Offer".

```json
[
  {
    "id": 1,
    "offerName": "Organic Products",
    "title": "Service subtitle",
    "img1": "https://cdn.example.com/services/service-1.webp",
    "icon": "https://cdn.example.com/icons/service-1.webp"
  }
]
```

## Common Response Rules

- Content-Type: `application/json`
- Errors:
  - `400` validation error
  - `404` not found
  - `500` internal server error

```json
{
  "message": "Human readable error",
  "code": "ERROR_CODE"
}
```

## Auth APIs

### POST `/auth/register`

### POST `/auth/login`

```json
{
  "token": "jwt-access-token",
  "refreshToken": "jwt-refresh-token",
  "user": {
    "id": "u_123",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### POST `/auth/refresh`

## Order APIs

### POST `/orders`

```json
{
  "items": [
    { "productId": 1, "quantity": 2, "unitPrice": 400 }
  ],
  "billing": {
    "country": "India",
    "state": "Uttar Pradesh",
    "zipCode": "226001",
    "phoneNumber": "9999999999",
    "note": "Deliver quickly"
  },
  "pricing": {
    "subtotal": 800,
    "shippingCost": 50,
    "couponDiscount": 10,
    "total": 840
  },
  "payment": {
    "method": "card",
    "cardLast4": "4242"
  }
}
```

### GET `/orders/:id`

### GET `/orders/me`

## Admin Product Management APIs

### GET `/admin/products`

### POST `/admin/products`

### PUT `/admin/products/:id`

### DELETE `/admin/products/:id`

## Next APIs to add

- Payments: `POST /payments/create-intent`, webhook endpoint
