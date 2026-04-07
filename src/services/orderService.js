import api from "./api";

export const createOrder = async (payload) => {
  const response = await api.post("/orders", payload);
  return response.data;
};

export const fetchMyOrders = async () => {
  const response = await api.get("/orders/my");
  return response.data;
};

export const fetchOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};