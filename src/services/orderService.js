import apiClient from "./apiClient";

export const createOrder = async (payload) => {
  const response = await apiClient.post("/orders", payload);
  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await apiClient.get(`/orders/${orderId}`);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await apiClient.get("/orders/me");
  return response.data;
};
