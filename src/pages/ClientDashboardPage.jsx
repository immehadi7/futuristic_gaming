import { useMemo } from "react";
import { getStoredUser } from "../utils/auth";
import { getOrders } from "../utils/orders";

export default function ClientDashboardPage() {
  const user = getStoredUser();
  const orders = getOrders();

  const totalSpent = useMemo(() => {
    return orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  }, [orders]);

  const totalItems = useMemo(() => {
    return orders.reduce((sum, order) => {
      return (
        sum +
        order.items.reduce(
          (itemSum, item) => itemSum + Number(item.quantity || 1),
          0
        )
      );
    }, 0);
  }, [orders]);

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
        <div className="mb-4">
          <p
            style={{
              color: "#00eaff",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontSize: "13px",
              marginBottom: "8px",
            }}
          >
            Client Command Center
          </p>

          <h1 style={{ fontWeight: 900, marginBottom: "10px" }}>客户中心</h1>

          <p style={{ color: "rgba(255,255,255,0.72)", marginBottom: 0 }}>
            欢迎回来，{user?.username || user?.name || user?.email || "用户"}
          </p>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div
              style={{
                borderRadius: "22px",
                padding: "22px",
                background:
                  "linear-gradient(180deg, rgba(13,23,44,0.96), rgba(8,14,28,0.96))",
                border: "1px solid rgba(0,234,255,0.12)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
              }}
            >
              <p style={{ color: "rgba(255,255,255,0.66)", marginBottom: "8px" }}>
                订单总数
              </p>
              <h2 style={{ fontWeight: 900, color: "#7df9ff", margin: 0 }}>
                {orders.length}
              </h2>
            </div>
          </div>

          <div className="col-md-4">
            <div
              style={{
                borderRadius: "22px",
                padding: "22px",
                background:
                  "linear-gradient(180deg, rgba(13,23,44,0.96), rgba(8,14,28,0.96))",
                border: "1px solid rgba(0,234,255,0.12)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
              }}
            >
              <p style={{ color: "rgba(255,255,255,0.66)", marginBottom: "8px" }}>
                商品数量
              </p>
              <h2 style={{ fontWeight: 900, color: "#7df9ff", margin: 0 }}>
                {totalItems}
              </h2>
            </div>
          </div>

          <div className="col-md-4">
            <div
              style={{
                borderRadius: "22px",
                padding: "22px",
                background:
                  "linear-gradient(180deg, rgba(13,23,44,0.96), rgba(8,14,28,0.96))",
                border: "1px solid rgba(0,234,255,0.12)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
              }}
            >
              <p style={{ color: "rgba(255,255,255,0.66)", marginBottom: "8px" }}>
                累计消费
              </p>
              <h2 style={{ fontWeight: 900, color: "#7df9ff", margin: 0 }}>
                ¥{totalSpent}
              </h2>
            </div>
          </div>
        </div>

        <div
          style={{
            borderRadius: "24px",
            padding: "24px",
            background:
              "linear-gradient(180deg, rgba(13,23,44,0.96), rgba(8,14,28,0.96))",
            border: "1px solid rgba(0,234,255,0.12)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <h3 style={{ margin: 0, fontWeight: 900 }}>我的订单</h3>
            <span style={{ color: "#7df9ff" }}>最近订单记录</span>
          </div>

          {orders.length === 0 ? (
            <div
              style={{
                borderRadius: "18px",
                padding: "28px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                textAlign: "center",
                color: "rgba(255,255,255,0.66)",
              }}
            >
              当前没有订单记录
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  style={{
                    borderRadius: "18px",
                    padding: "18px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                    <div>
                      <div style={{ fontWeight: 800, color: "#7df9ff" }}>{order.id}</div>
                      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
                        {new Date(order.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3 flex-wrap">
                      <span
                        style={{
                          padding: "6px 12px",
                          borderRadius: "999px",
                          background: "rgba(103,240,177,0.12)",
                          color: "#67f0b1",
                          fontWeight: 800,
                          fontSize: "13px",
                        }}
                      >
                        已支付
                      </span>

                      <span style={{ fontWeight: 900, fontSize: "18px" }}>
                        ¥{order.total}
                      </span>
                    </div>
                  </div>

                  <div className="d-flex flex-column gap-2">
                    {order.items.map((item, index) => (
                      <div
                        key={`${order.id}-${item.id}-${index}`}
                        className="d-flex justify-content-between align-items-center flex-wrap gap-2"
                        style={{
                          padding: "10px 0",
                          borderTop: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 700 }}>{item.name}</div>
                          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
                            数量：{item.quantity}
                          </div>
                        </div>

                        <div style={{ fontWeight: 800 }}>¥{item.price}</div>
                      </div>
                    ))}
                  </div>

                  <div
                    className="d-flex justify-content-between flex-wrap gap-2 mt-3"
                    style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}
                  >
                    <span>支付方式：{order.paymentMethod || "alipay"}</span>
                    <span>优惠码：{order.couponCode || "无"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}