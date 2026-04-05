import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

export default function PaymentResultPage() {
  const location = useLocation();

  const status = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("status") || "success";
  }, [location.search]);

  const contentMap = {
    success: {
      title: "支付成功",
      text: "您的订单已提交成功，我们会尽快为您处理。",
    },
    failed: {
      title: "支付失败",
      text: "支付未完成，请重试。",
    },
    pending: {
      title: "支付处理中",
      text: "您的支付正在确认中，请稍后查看。",
    },
  };

  const content = contentMap[status] || contentMap.success;

  return (
    <div className="container py-5">
      <div className="card p-5 text-center">
        <h2 className="mb-3">{content.title}</h2>
        <p className="text-muted mb-4">{content.text}</p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/" className="btn btn-primary">
            返回首页
          </Link>

          <Link to="/client-dashboard" className="btn btn-outline-secondary">
            查看我的订单
          </Link>
        </div>
      </div>
    </div>
  );
}