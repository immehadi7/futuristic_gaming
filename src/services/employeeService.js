import api from "./api";

export const fetchAvailableOrders = async () => {
  const response = await api.get("/employee/orders");
  return response.data;
};

export const fetchMyEmployeeOrders = async () => {
  const response = await api.get("/employee/my-orders");
  return response.data;
};

export const acceptEmployeeOrder = async (id) => {
  const response = await api.patch(`/employee/orders/${id}/accept`);
  return response.data;
};

export const updateEmployeeOrderStatus = async (id, payload) => {
  const response = await api.patch(`/employee/orders/${id}/status`, payload);
  return response.data;
};