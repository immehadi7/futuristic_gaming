import { useEffect, useState } from "react";
import { loginUser, registerUser } from "../../services/authService";
import { setAuthData } from "../../utils/auth";
import "./authModal.css";

const AuthModal = ({ show, onClose, mode, setMode, onAuthSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      setError("");
      setForm({
        name: "",
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
  };

  const validateForm = () => {
    if (mode === "register" && !form.name.trim()) {
      return "请输入用户名";
    }

    if (!form.email.trim()) {
      return mode === "login" ? "请输入邮箱或测试账号ID" : "请输入邮箱";
    }

    if (!form.password.trim()) {
      return "请输入密码";
    }

    if (mode === "register" && form.password.trim().length < 6) {
      return "密码至少需要 6 位";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const data =
        mode === "login"
          ? await loginUser({
              email: form.email.trim(),
              password: form.password.trim(),
            })
          : await registerUser({
              name: form.name.trim(),
              email: form.email.trim(),
              password: form.password.trim(),
            });

      setAuthData({
        token: data.token,
        user: data.user,
      });

      if (onAuthSuccess) {
        onAuthSuccess(data.user);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "登录或注册失败");
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
              {mode === "login"
                ? "测试账号：testclient / client@12345"
                : "注册新客户账号"}
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
              name="name"
              type="text"
              placeholder="请输入用户名"
              value={form.name}
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
            type="text"
            placeholder={mode === "login" ? "请输入邮箱或 testclient" : "请输入邮箱"}
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

          {error && (
            <p style={{ color: "#fb7185", marginBottom: "12px" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg, #06b6d4, #22d3ee)",
              color: "#fff",
              fontWeight: 700,
              boxShadow: "0 10px 25px rgba(6,182,212,0.28)",
            }}
          >
            {loading ? "处理中..." : mode === "login" ? "登录" : "注册"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;