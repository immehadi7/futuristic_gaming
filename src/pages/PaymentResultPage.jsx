import { useEffect, useState } from "react";

export default function PaymentResultPage() {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("正在查询支付状态...");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const paymentRequestId = query.get("paymentRequestId");

    if (!paymentRequestId) {
      setStatus("error");
      setMessage("缺少支付单号");
      return;
    }

    fetch(`http://localhost:5000/api/payments/alipay/result/${paymentRequestId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "SUCCESS") {
          setStatus("success");
          setMessage("支付成功，订单已完成");
        } else if (data.status === "FAILED") {
          setStatus("failed");
          setMessage("支付失败，请重试");
        } else {
          setStatus("pending");
          setMessage("支付处理中，请稍后刷新");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("支付结果查询失败");
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#050816",
        color: "white",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "480px",
          width: "100%",
          borderRadius: "24px",
          padding: "32px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(0,234,255,0.12)",
          textAlign: "center",
          boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
        }}
      >
        <h1 style={{ marginBottom: "12px" }}>
          {status === "success"
            ? "支付成功"
            : status === "failed"
            ? "支付失败"
            : status === "pending"
            ? "支付处理中"
            : "支付状态"}
        </h1>

        <p style={{ color: "rgba(230,240,255,0.78)", marginBottom: "24px" }}>
          {message}
        </p>

        <a
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 20px",
            borderRadius: "14px",
            textDecoration: "none",
            color: "white",
            background: "linear-gradient(90deg, #00cfff, #7c3aed)",
            fontWeight: "700",
          }}
        >
          返回首页
        </a>
      </div>
    </div>
  );
}