const ORDERS_KEY = "orders";

export const getOrders = () => {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Failed to read orders from localStorage:", error);
    return [];
  }
};

export const saveOrders = (orders) => {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error("Failed to save orders to localStorage:", error);
  }
};

export const createOrder = (orderData) => {
  const existingOrders = getOrders();

  const newOrder = {
    id: `ORD-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "paid",
    ...orderData,
  };

  const updatedOrders = [newOrder, ...existingOrders];
  saveOrders(updatedOrders);

  return newOrder;
};

export const getOrderById = (orderId) => {
  const orders = getOrders();
  return orders.find((order) => order.id === orderId) || null;
};

export const updateOrderStatus = (orderId, newStatus) => {
  const orders = getOrders();

  const updatedOrders = orders.map((order) =>
    order.id === orderId ? { ...order, status: newStatus } : order
  );

  saveOrders(updatedOrders);

  return updatedOrders.find((order) => order.id === orderId) || null;
};

export const clearOrders = () => {
  try {
    localStorage.removeItem(ORDERS_KEY);
  } catch (error) {
    console.error("Failed to clear orders from localStorage:", error);
  }
};