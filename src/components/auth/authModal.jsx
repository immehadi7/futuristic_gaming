import { useEffect, useState } from "react";
import { loginUser, registerUser } from "../../services/authService";
import { setAuthData } from "../../utils/auth";
import "./authModal.css";

const AuthModal = ({ show, onClose, mode, setMode, onAuthSuccess }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      setError("");
      setSuccessMessage("");
      setForm({
        username: "",
        email: "",
        password: "",
      });
    }
  }, [show, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
    if (successMessage) setSuccessMessage("");
  };

  const validateForm = () => {
    if (mode === "register" && !form.username.trim()) {
      return "请输入用户名";
    }

    if (!form.email.trim()) {
      return "请输入邮箱";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      return "请输入有效邮箱地址";
    }

    if (!form.password.trim()) {
      return "请输入密码";
    }

    if (form.password.trim().length < 6) {
      return "密码至少需要 6 位";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      let data;

      if (mode === "login") {
        data = await loginUser({
          email: form.email.trim().toLowerCase(),
          password: form.password.trim(),
        });

        if (data?.token && data?.user) {
          setAuthData({
            token: data.token,
            user: data.user,
          });

          if (onAuthSuccess) {
            onAuthSuccess(data.user);
          }

          onClose();
          return;
        }

        setError("登录失败，请重试");
        return;
      }

      data = await registerUser({
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password.trim(),
        role: "client",
      });

      if (data?.token && data?.user) {
        setAuthData({
          token: data.token,
          user: data.user,
        });

        if (onAuthSuccess) {
          onAuthSuccess(data.user);
        }

        onClose();
        return;
      }

      setSuccessMessage(
        data?.message || "注册成功，请返回登录"
      );

      setMode("login");
      setForm((prev) => ({
        ...prev,
        username: "",
        password: "",
      }));
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "登录或注册失败"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "linear-gradient(180deg, #111827, #0b1220)",
          color: "#fff",
          borderRadius: "18px",
          padding: "24px",
          border: "1px solid rgba(0,234,255,0.14)",
          boxShadow: "0 22px 60px rgba(0,0,0,0.45)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 style={{ margin: 0 }}>
              {mode === "login" ? "用户登录" : "创建账号"}
            </h3>
            <small style={{ color: "rgba(255,255,255,0.65)" }}>
              {mode === "login" ? "请输入邮箱和密码登录" : "注册新的客户账号"}
            </small>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        <div className="d-flex gap-2 mb-3">
          <button
            type="button"
            onClick={() => setMode("login")}
            style={{
              flex: 1,
              padding: "11px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
              background: mode === "login" ? "#06b6d4" : "#253041",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            登录
          </button>

          <button
            type="button"
            onClick={() => setMode("register")}
            style={{
              flex: 1,
              padding: "11px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
              background: mode === "register" ? "#06b6d4" : "#253041",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            注册
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <input
              name="username"
              type="text"
              placeholder="请输入用户名"
              value={form.username}
              onChange={handleChange}
              style={{
                width: "100%",
                marginBottom: "12px",
                padding: "13px 14px",
                borderRadius: "12px",
                border: "1px solid #374151",
                background: "#172033",
                color: "#fff",
                outline: "none",
              }}
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="请输入邮箱"
            value={form.email}
            onChange={handleChange}
            style={{
              width: "100%",
              marginBottom: "12px",
              padding: "13px 14px",
              borderRadius: "12px",
              border: "1px solid #374151",
              background: "#172033",
              color: "#fff",
              outline: "none",
            }}
          />

          <input
            name="password"
            type="password"
            placeholder="请输入密码"
            value={form.password}
            onChange={handleChange}
            style={{
              width: "100%",
              marginBottom: "12px",
              padding: "13px 14px",
              borderRadius: "12px",
              border: "1px solid #374151",
              background: "#172033",
              color: "#fff",
              outline: "none",
            }}
          />

          {error ? (
            <div
              style={{
                color: "#ff8ea1",
                marginBottom: "12px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          ) : null}

          {successMessage ? (
            <div
              style={{
                color: "#7df9b6",
                marginBottom: "12px",
                fontSize: "14px",
              }}
            >
              {successMessage}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px 14px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #00eaff, #67e8f9)",
              color: "#081018",
              fontWeight: 800,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "处理中..."
              : mode === "login"
              ? "立即登录"
              : "立即注册"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;