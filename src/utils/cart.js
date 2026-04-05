const CART_KEY = "cart";

export const getCartItems = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveCartItems = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const addToCart = (item) => {
  const cart = getCartItems();

  const existingIndex = cart.findIndex(
    (cartItem) => String(cartItem.id) === String(item.id)
  );

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += item.quantity || 1;
  } else {
    cart.push({
      ...item,
      quantity: item.quantity || 1,
    });
  }

  saveCartItems(cart);
  return cart;
};

export const updateCartItemQuantity = (id, quantity) => {
  let cart = getCartItems()
    .map((item) =>
      String(item.id) === String(id)
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    );

  saveCartItems(cart);
  return cart;
};

export const removeCartItem = (id) => {
  const cart = getCartItems().filter(
    (item) => String(item.id) !== String(id)
  );

  saveCartItems(cart);
  return cart;
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

export const getCartCount = () => {
  return getCartItems().reduce((sum, item) => sum + (item.quantity || 1), 0);
};

export const getCartTotal = () => {
  return getCartItems().reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );
};