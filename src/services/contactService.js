import api from "./api";

export const submitContactForm = async (payload) => {
  const response = await api.post("/contact", payload);
  return response.data;
};

export const fetchContactSubmissions = async () => {
  const response = await api.get("/contact");
  return response.data;
};

export const updateContactSubmissionStatus = async (id, status) => {
  const response = await api.patch(`/contact/${id}/status`, { status });
  return response.data;
};

export const deleteContactSubmission = async (id) => {
  const response = await api.delete(`/contact/${id}`);
  return response.data;
};

export const getContactStatusLabel = (status) => {
  switch (status) {
    case "new":
      return "新消息";
    case "read":
      return "已查看";
    case "replied":
      return "已回复";
    default:
      return "未知状态";
  }
};