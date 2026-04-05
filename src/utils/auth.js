export const getStoredToken = () => {
  return localStorage.getItem("token");
};

export const getStoredUser = () => {
  const user = localStorage.getItem("user");

  try {
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const setAuthData = ({ token, user }) => {
  if (token) {
    localStorage.setItem("token", token);
  }

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  return !!getStoredToken();
};