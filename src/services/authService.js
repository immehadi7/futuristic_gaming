import api from "./api";

const DEMO_USER = {
  id: "demo-client-1",
  name: "testclient",
  username: "testclient",
  email: "testclient",
  role: "client",
};

export const loginUser = async (payload) => {
  const email = String(payload?.email || "").trim();
  const password = String(payload?.password || "").trim();

  const demoAcceptedIds = ["testclient", "testclient@example.com"];

  if (demoAcceptedIds.includes(email) && password === "client@12345") {
    return {
      token: "demo-client-token",
      user: DEMO_USER,
    };
  }

  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (payload) => {
  const name = String(payload?.name || "").trim();
  const email = String(payload?.email || "").trim();
  const password = String(payload?.password || "").trim();

  const response = await api.post("/auth/register", {
    name,
    username: name,
    email,
    password,
    role: "client",
  });

  return response.data;
};