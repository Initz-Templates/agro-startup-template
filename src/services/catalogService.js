import apiClient from "./apiClient";

export const getProducts = async () => {
  const response = await apiClient.get("/products");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const addProductReview = async (productId, payload) => {
  const response = await apiClient.post(`/products/${productId}/reviews`, payload);
  return response.data;
};

export const getServiceOffers = async () => {
  const response = await apiClient.get("/services/offers");
  return response.data;
};

export const getNewsArticles = async () => {
  const response = await apiClient.get("/news");
  return response.data;
};

export const getNewsArticleById = async (id) => {
  const response = await apiClient.get(`/news/${id}`);
  return response.data;
};
