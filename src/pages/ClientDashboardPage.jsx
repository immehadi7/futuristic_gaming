import { UserCircle2, Mail, ShieldCheck, ShoppingBag } from "lucide-react";

export default function ClientDashboardPage() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050816",
        color: "white",
        padding: "32px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginBottom: "28px",
          }}
        >
          <p
            style={{
              color: "#7df9ff",
              marginBottom: "8px",
              fontSize: "0.9rem",
            }}
          >
            客户中心
          </p>

          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: 800,
              margin: 0,
            }}
          >
            欢迎回来，{user?.username || "用户"}
          </h1>

          <p
            style={{
              color: "rgba(220,235,255,0.72)",
              marginTop: "10px",
            }}
          >
            在这里你可以查看个人资料、订单、支付记录和账户状态。
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px",
            marginBottom: "24px",
          }}
        >
          <div style={cardStyle}>
            <UserCircle2 size={22} color="#7df9ff" />
            <h3 style={titleStyle}>用户信息</h3>
            <p style={textStyle}>用户名：{user?.username || "-"}</p>
            <p style={textStyle}>角色：{user?.role || "-"}</p>
          </div>

          <div style={cardStyle}>
            <Mail size={22} color="#7df9ff" />
            <h3 style={titleStyle}>账户状态</h3>
            <p style={textStyle}>邮箱：已登录账户可见</p>
            <p style={textStyle}>状态：正常</p>
          </div>

          <div style={cardStyle}>
            <ShoppingBag size={22} color="#7df9ff" />
            <h3 style={titleStyle}>我的订单</h3>
            <p style={textStyle}>订单数量：后续接真实数据</p>
            <p style={textStyle}>最近订单：待接入</p>
          </div>

          <div style={cardStyle}>
            <ShieldCheck size={22} color="#7df9ff" />
            <h3 style={titleStyle}>账户安全</h3>
            <p style={textStyle}>登录方式：邮箱 + 密码</p>
            <p style={textStyle}>安全等级：基础</p>
          </div>
        </div>

        <div style={bigCardStyle}>
          <h2 style={{ marginTop: 0 }}>下一步待接入功能</h2>
          <ul style={{ color: "rgba(230,240,255,0.82)", lineHeight: 1.9, paddingLeft: "18px" }}>
            <li>我的订单列表</li>
            <li>支付记录</li>
            <li>个人资料编辑</li>
            <li>联系表单记录</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(0,234,255,0.12)",
  borderRadius: "20px",
  padding: "22px",
  boxShadow: "0 14px 30px rgba(0,0,0,0.24)",
};

const bigCardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(124,58,237,0.16)",
  borderRadius: "22px",
  padding: "24px",
};

const titleStyle = {
  fontSize: "1.05rem",
  marginTop: "14px",
  marginBottom: "10px",
};

const textStyle = {
  color: "rgba(220,235,255,0.76)",
  margin: "4px 0",
};