import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";
import { setAuthData } from "../utils/auth";

export default function EmployeeLoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "employee_test",
    email: "employee.test@example.com",
    password: "12345678",
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccessMessage("");
  };

  const handleCreateTestEmployee = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const data = await registerUser({
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password.trim(),
        role: "employee",
      });

      if (data?.token && data?.user) {
        setAuthData({
          token: data.token,
          user: data.user,
        });
        navigate("/employee-dashboard");
        return;
      }

      setSuccessMessage(
        data?.message || "测试员工账号已创建，现在请直接登录"
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "创建测试员工账号失败"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const data = await loginUser({
        email: form.email.trim().toLowerCase(),
        password: form.password.trim(),
      });

      if (!data?.token || !data?.user) {
        setError("员工登录失败");
        return;
      }

      if (data.user.role !== "employee") {
        setError("当前账号不是员工账号");
        return;
      }

      setAuthData({
        token: data.token,
        user: data.user,
      });

      if (!rememberMe) {
        sessionStorage.setItem("temp_employee_login", "1");
      }

      navigate("/employee-dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "员工登录失败"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(0,234,255,0.08), transparent 20%), linear-gradient(180deg, #050816 0%, #09111f 45%, #050816 100%)",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,234,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,234,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      <div className="container py-5" style={{ position: "relative", zIndex: 2 }}>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div
              style={{
                borderRadius: "26px",
                padding: "28px",
                background:
                  "linear-gradient(180deg, rgba(13,23,44,0.96), rgba(8,14,28,0.96))",
                border: "1px solid rgba(0,234,255,0.16)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
              }}
            >
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
                <div>
                  <p
                    style={{
                      color: "#00eaff",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      fontSize: "13px",
                      marginBottom: "8px",
                    }}
                  >
                    Employee Access Terminal
                  </p>
                  <h1 style={{ fontWeight: 900, marginBottom: "10px" }}>
                    员工登录
                  </h1>
                  <p style={{ color: "rgba(255,255,255,0.68)", marginBottom: 0 }}>
                    员工控制面板安全入口
                  </p>
                </div>

                <span
                  style={{
                    padding: "8px 14px",
                    borderRadius: "999px",
                    background: "rgba(0,234,255,0.12)",
                    border: "1px solid rgba(0,234,255,0.24)",
                    color: "#7df9ff",
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                  }}
                >
                  员工 Employee
                </span>
              </div>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label style={{ display: "block", marginBottom: "8px", color: "#7df9ff" }}>
                    员工 ID
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="employee_test"
                    style={{
                      width: "100%",
                      borderRadius: "14px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "#111a2f",
                      color: "#fff",
                      padding: "13px 14px",
                      outline: "none",
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label style={{ display: "block", marginBottom: "8px", color: "#7df9ff" }}>
                    邮箱
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="employee.test@example.com"
                    style={{
                      width: "100%",
                      borderRadius: "14px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "#111a2f",
                      color: "#fff",
                      padding: "13px 14px",
                      outline: "none",
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label style={{ display: "block", marginBottom: "8px", color: "#7df9ff" }}>
                    密码
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="12345678"
                    style={{
                      width: "100%",
                      borderRadius: "14px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "#111a2f",
                      color: "#fff",
                      padding: "13px 14px",
                      outline: "none",
                    }}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "rgba(255,255,255,0.72)",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    记住我 Remember me
                  </label>

                  <span style={{ color: "#7df9ff", fontSize: "14px" }}>
                    测试账号可直接创建
                  </span>
                </div>

                {error ? (
                  <div
                    style={{
                      marginBottom: "12px",
                      color: "#ff9aa2",
                      fontSize: "14px",
                    }}
                  >
                    {error}
                  </div>
                ) : null}

                {successMessage ? (
                  <div
                    style={{
                      marginBottom: "12px",
                      color: "#67f0b1",
                      fontSize: "14px",
                    }}
                  >
                    {successMessage}
                  </div>
                ) : null}

                <div className="d-flex flex-column gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: "100%",
                      minHeight: "54px",
                      border: "none",
                      borderRadius: "16px",
                      fontWeight: 900,
                      color: "#081018",
                      background: "linear-gradient(135deg, #00eaff, #67e8f9)",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    {loading ? "处理中..." : "员工登录"}
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleCreateTestEmployee}
                    style={{
                      width: "100%",
                      minHeight: "54px",
                      borderRadius: "16px",
                      border: "1px solid rgba(0,234,255,0.24)",
                      fontWeight: 800,
                      color: "#7df9ff",
                      background: "rgba(255,255,255,0.04)",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    创建测试员工账号
                  </button>
                </div>
              </form>

              <div
                style={{
                  marginTop: "18px",
                  padding: "14px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.68)",
                  fontSize: "14px",
                }}
              >
                默认测试邮箱：employee.test@example.com
                <br />
                默认测试密码：12345678
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}