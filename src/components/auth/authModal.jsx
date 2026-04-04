import { useEffect, useState } from "react";
import { X, User, Lock, Phone, Mail, ShieldCheck } from "lucide-react";
import "./AuthModal.css";

export default function AuthModal({
  isOpen,
  onClose,
  initialTab = "login",
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [agree, setAgree] = useState(false);

  const [loginForm, setLoginForm] = useState({
    phone: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, initialTab]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!agree) {
      alert("请先勾选协议后再继续");
      return;
    }

    console.log("登录表单:", loginForm);
    alert("前端登录弹窗已完成，下一步可接 Supabase / Node.js API");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (!agree) {
      alert("请先勾选协议后再继续");
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      alert("两次输入的密码不一致");
      return;
    }

    console.log("注册表单:", registerForm);
    alert("前端注册弹窗已完成，下一步可接 Supabase / Node.js API");
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div
        className="auth-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="auth-close-btn" onClick={onClose} aria-label="关闭">
          <X size={18} />
        </button>

        <div className="auth-top">
          <div className="auth-logo-box">
            <div className="auth-logo-icon">🎮</div>
          </div>

          <h2 className="auth-brand-title">FuturisticGaming</h2>
          <p className="auth-brand-subtitle">
            未来感游戏租赁平台 · 安全 · 快速 · 高效
          </p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            手机 / 账号登录
          </button>

          <button
            className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            快速注册
          </button>
        </div>

        <div className="auth-form-area">
          {activeTab === "login" ? (
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="auth-input-group">
                <Phone size={16} />
                <input
                  type="text"
                  name="phone"
                  placeholder="请输入手机号或账号"
                  value={loginForm.phone}
                  onChange={handleLoginChange}
                  required
                />
              </div>

              <div className="auth-input-group">
                <Lock size={16} />
                <input
                  type="password"
                  name="password"
                  placeholder="请输入登录密码"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>

              <div className="auth-extra-row">
                <label className="auth-checkbox">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <span>
                    我已阅读并同意 <em>《用户协议》</em> 和 <em>《隐私政策》</em>
                  </span>
                </label>
              </div>

              <button type="submit" className="auth-submit-btn">
                立即登录
              </button>

              <div className="auth-switch-tip">
                还没有账号？
                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                >
                  立即注册
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="auth-form">
              <div className="auth-input-group">
                <User size={16} />
                <input
                  type="text"
                  name="username"
                  placeholder="请输入用户名"
                  value={registerForm.username}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              <div className="auth-input-group">
                <Mail size={16} />
                <input
                  type="email"
                  name="email"
                  placeholder="请输入邮箱地址"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              <div className="auth-input-group">
                <Phone size={16} />
                <input
                  type="text"
                  name="phone"
                  placeholder="请输入手机号"
                  value={registerForm.phone}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              <div className="auth-input-group">
                <Lock size={16} />
                <input
                  type="password"
                  name="password"
                  placeholder="请输入密码"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              <div className="auth-input-group">
                <ShieldCheck size={16} />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="请再次输入密码"
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              <div className="auth-extra-row">
                <label className="auth-checkbox">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <span>
                    我已阅读并同意 <em>《用户协议》</em> 和 <em>《隐私政策》</em>
                  </span>
                </label>
              </div>

              <button type="submit" className="auth-submit-btn">
                立即注册
              </button>

              <div className="auth-switch-tip">
                已有账号？
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                >
                  去登录
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="auth-footer">
          <span>其他方式登录</span>
          <div className="auth-social-row">
            <button type="button" className="auth-social-btn">
              支付宝
            </button>
            <button type="button" className="auth-social-btn">
              微信
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}