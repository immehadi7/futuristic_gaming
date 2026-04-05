import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

export default function PaymentResultPage() {
  const location = useLocation();

  const { status, orderId } = useMemo(() => {
    const params = new URLSearchParams(location.search);

    return {
      status: params.get("status") || "success",
      orderId: params.get("orderId") || "N/A",
    };
  }, [location.search]);

  const contentMap = {
    success: {
      title: "支付成功",
      text: "您的游戏订单已成功提交，我们会尽快为您安排服务。",
      color: "#67f0b1",
      glow: "rgba(103,240,177,0.25)",
      symbol: "✓",
    },
    failed: {
      title: "支付失败",
      text: "支付未完成，请返回结算页面重新尝试。",
      color: "#ff8b9a",
      glow: "rgba(255,139,154,0.25)",
      symbol: "✕",
    },
    pending: {
      title: "支付处理中",
      text: "订单正在确认中，请稍后前往个人中心查看状态。",
      color: "#ffd76a",
      glow: "rgba(255,215,106,0.22)",
      symbol: "•",
    },
  };

  const content = contentMap[status] || contentMap.success;

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

      <div
        className="container py-5"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            borderRadius: "28px",
            padding: "40px 28px",
            background:
              "linear-gradient(180deg, rgba(13,23,44,0.96), rgba(8,14,28,0.96))",
            border: "1px solid rgba(0,234,255,0.12)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "110px",
              height: "110px",
              margin: "0 auto 24px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "42px",
              fontWeight: 900,
              color: content.color,
              border: `2px solid ${content.color}`,
              boxShadow: `0 0 40px ${content.glow}`,
              background: "rgba(255,255,255,0.03)",
            }}
          >
            {content.symbol}
          </div>

          <p
            style={{
              color: "#00eaff",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontSize: "13px",
              marginBottom: "10px",
            }}
          >
            Payment Terminal
          </p>

          <h1 style={{ fontWeight: 900, marginBottom: "12px" }}>
            {content.title}
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: "16px",
              maxWidth: "540px",
              margin: "0 auto 24px",
            }}
          >
            {content.text}
          </p>

          <div
            style={{
              borderRadius: "18px",
              padding: "18px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              marginBottom: "26px",
            }}
          >
            <div className="d-flex justify-content-between flex-wrap gap-2">
              <span style={{ color: "rgba(255,255,255,0.65)" }}>订单编号</span>
              <span style={{ color: "#7df9ff", fontWeight: 800 }}>
                {orderId}
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link
              to="/"
              className="btn"
              style={{
                minWidth: "160px",
                borderRadius: "14px",
                padding: "12px 18px",
                border: "1px solid rgba(0,234,255,0.18)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                fontWeight: 800,
              }}
            >
              返回首页
            </Link>

            <Link
              to="/client-dashboard"
              className="btn"
              style={{
                minWidth: "160px",
                borderRadius: "14px",
                padding: "12px 18px",
                border: "none",
                background: "linear-gradient(135deg, #00eaff, #67e8f9)",
                color: "#081018",
                fontWeight: 900,
                boxShadow: "0 12px 28px rgba(0,234,255,0.24)",
              }}
            >
              查看我的订单
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}