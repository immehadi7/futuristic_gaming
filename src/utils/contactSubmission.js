const trimValue = (value) => (typeof value === "string" ? value.trim() : "");

const buildName = (firstName, lastName) => {
  const first = trimValue(firstName);
  const last = trimValue(lastName);
  return `${last}${first}`.trim();
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimValue(email));

export const validateContactForm = (formData = {}) => {
  const name = buildName(formData.firstName, formData.lastName);
  const email = trimValue(formData.email).toLowerCase();
  const message = trimValue(formData.question);

  const errors = {
    name: "",
    email: "",
    message: "",
  };

  if (!name) {
    errors.name = "请输入姓名";
  }

  if (!email) {
    errors.email = "请输入电子邮箱";
  } else if (!isValidEmail(email)) {
    errors.email = "请输入有效的电子邮箱地址";
  }

  if (!message) {
    errors.message = "请输入留言内容";
  }

  return {
    isValid: !errors.name && !errors.email && !errors.message,
    errors,
    data: {
      name,
      email,
      message,
      status: "new",
      source: "contact_form",
    },
  };
};

export const createContactSubmission = (formData = {}) => {
  const validated = validateContactForm(formData);

  return {
    name: validated.data.name,
    email: validated.data.email,
    message: validated.data.message,
    status: "new",
    source: "contact_form",
  };
};

export const getContactStatusLabel = (status) => {
  const map = {
    new: "新消息",
    read: "已查看",
    replied: "已回复",
  };

  return map[status] || "未知状态";
};