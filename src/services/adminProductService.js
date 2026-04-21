import apiClient from "./apiClient";

export const getAdminProducts = async () => {
  const response = await apiClient.get("/admin/products");
  return response.data;
};

export const getAdminProductCategories = async () => {
  const response = await apiClient.get("/admin/products/categories");
  return response.data;
};

export const getAdminProductById = async (productId) => {
  const response = await apiClient.get(`/admin/products/${productId}`);
  return response.data;
};

export const createAdminProduct = async (payload) => {
  const response = await apiClient.post("/admin/products", payload);
  return response.data;
};

export const updateAdminProduct = async (productId, payload) => {
  const response = await apiClient.put(`/admin/products/${productId}`, payload);
  return response.data;
};

export const deleteAdminProduct = async (productId) => {
  const response = await apiClient.delete(`/admin/products/${productId}`);
  return response.data;
};
