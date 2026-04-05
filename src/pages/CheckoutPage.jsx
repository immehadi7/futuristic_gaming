import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
} from "../utils/cart";
import { isAuthenticated } from "../utils/auth";

const COUPONS = {
  SAVE10: { type: "percent", value: 10, label: "9折优惠" },
  GAMER20: { type: "fixed", value: 20, label: "立减 ¥20" },
  PEIPEI50: { type: "fixed", value: 50, label: "立减 ¥50" },
};

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleIncrease = (id) => {
    const item = cartItems.find((x) => String(x.id) === String(id));
    if (!item) return;

    const updated = updateCartItemQuantity(id, Number(item.quantity || 1) + 1);
    setCartItems(updated);
  };

  const handleDecrease = (id) => {
    const item = cartItems.find((x) => String(x.id) === String(id));
    if (!item) return;

    const updated = updateCartItemQuantity(
      id,
      Math.max(1, Number(item.quantity || 1) - 1)
    );
    setCartItems(updated);
  };

  const handleRemove = (id) => {
    const updated = removeCartItem(id);
    setCartItems(updated);
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
      0
    );
  }, [cartItems]);

  const serviceFee = useMemo(() => {
    return cartItems.length > 0 ? 2 : 0;
  }, [cartItems]);

  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;

    if (appliedCoupon.type === "percent") {
      return Math.floor((subtotal * appliedCoupon.value) / 100);
    }

    if (appliedCoupon.type === "fixed") {
      return appliedCoupon.value;
    }

    return 0;
  }, [appliedCoupon, subtotal]);

  const finalDiscount = Math.min(couponDiscount, subtotal + serviceFee);
  const total = Math.max(subtotal + serviceFee - finalDiscount, 0);

  const applyCoupon = () => {
    const normalized = couponInput.trim().toUpperCase();

    if (!normalized) {
      setAppliedCoupon(null);
      setCouponMessage("请输入优惠码");
      return;
    }

    const found = COUPONS[normalized];

    if (!found) {
      setAppliedCoupon(null);
      setCouponMessage("优惠码无效");
      return;
    }

    setAppliedCoupon(found);
    setCouponMessage(`优惠码已应用：${found.label}`);
  };

  const handlePayWithAlipay = async () => {
    if (!cartItems.length) {
      alert("购物车为空");
      return;
    }

    if (!isAuthenticated()) {
      alert("请先登录后再使用支付宝支付");
      navigate("/");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          qty: item.quantity,
          price: item.price,
        })),
        subtotal,
        serviceFee,
        discount: finalDiscount,
        total,
        couponCode: couponInput.trim().toUpperCase() || null,
        paymentMethod: "alipay",
        currency: "CNY",
      };

      console.log("Alipay payload:", payload);

      await new Promise((resolve) => setTimeout(resolve, 2200));

      clearCart();
      navigate("/payment-result?status=success");
    } catch (error) {
      console.error(error);
      alert("支付宝支付发起失败");
    } finally {
      setLoading(false);
    }
  };

  const closeCheckout = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(0,234,255,0.08), transparent 20%), linear-gradient(180deg, #050816 0%, #09111f 45%, #050816 100%)",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(3, 7, 18, 0.86)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              borderRadius: "24px",
              border: "1px solid rgba(0,234,255,0.16)",
              background:
                "linear-gradient(180deg, rgba(10,18,35,0.96), rgba(6,12,24,0.96))",
              boxShadow: "0 20px 80px rgba(0,0,0,0.45)",
              padding: "32px 24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "84px",
                height: "84px",
                margin: "0 auto 18px",
                borderRadius: "50%",
                border: "4px solid rgba(0,234,255,0.16)",
                borderTop: "4px solid #00eaff",
                animation: "spin 1s linear infinite",
              }}
            />

            <h3 style={{ color: "#7df9ff", marginBottom: "12px", fontWeight: 800 }}>
              正在连接支付宝支付网关...
            </h3>

            <p style={{ color: "rgba(255,255,255,0.72)", marginBottom: "18px" }}>
              游戏订单正在加密传输，请稍候。
            </p>

            <div
              style={{
                width: "100%",
                height: "10px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "55%",
                  height: "100%",
                  borderRadius: "999px",
                  background:
                    "linear-gradient(90deg, #00eaff, #67e8f9, #22d3ee)",
                  animation: "pulseBar 1.4s ease-in-out infinite",
                }}
              />
            </div>

            <p style={{ marginTop: "16px", color: "#9bdcff", fontSize: "14px" }}>
              支付引擎初始化中 · 订单校验中 · 跳转支付中
            </p>
          </div>

          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes pulseBar {
                0% { transform: translateX(-30%); opacity: 0.7; }
                50% { transform: translateX(40%); opacity: 1; }
                100% { transform: translateX(90%); opacity: 0.7; }
              }
            `}
          </style>
        </div>
      )}

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
        <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
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
              Checkout Terminal
            </p>
            <h1
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 900,
                marginBottom: "10px",
              }}
            >
              游戏订单结算中心
            </h1>
            <p style={{ color: "rgba(255,255,255,0.72)", marginBottom: 0 }}>
              未来感支付流程 · 支持支付宝下单 · 中国市场优先体验
            </p>
          </div>

          <button
            type="button"
            onClick={closeCheckout}
            title="关闭结算页"
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              fontSize: "22px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 10px 24px rgba(0,0,0,0.25)",
              transition: "0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "rotate(90deg) scale(1.05)";
              e.currentTarget.style.background = "rgba(0,234,255,0.14)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "rotate(0deg) scale(1)";
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }}
          >
            ×
          </button>
        </div>

        {!isAuthenticated() && (
          <div
            style={{
              marginBottom: "24px",
              borderRadius: "16px",
              padding: "14px 16px",
              background: "rgba(255, 193, 7, 0.08)",
              border: "1px solid rgba(255, 193, 7, 0.18)",
              color: "#ffe082",
            }}
          >
            您可以先查看结算页面，但使用支付宝付款前需要先登录账号。
          </div>
        )}

        {cartItems.length === 0 ? (
          <div
            style={{
              borderRadius: "24px",
              padding: "40px 24px",
              background:
                "linear-gradient(180deg, rgba(14,24,45,0.95), rgba(8,14,28,0.95))",
              border: "1px solid rgba(0,234,255,0.12)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
              textAlign: "center",
            }}
          >
            <h3 style={{ marginBottom: "12px", color: "#7df9ff" }}>购物车为空</h3>
            <p style={{ color: "rgba(255,255,255,0.68)", marginBottom: "24px" }}>
              请先返回首页选择您想购买的游戏服务。
            </p>

            <button
              className="btn"
              onClick={() => navigate("/")}
              style={{
                border: "none",
                borderRadius: "14px",
                padding: "12px 20px",
                fontWeight: 800,
                color: "#081018",
                background: "linear-gradient(135deg, #00eaff, #67e8f9)",
                boxShadow: "0 12px 28px rgba(0,234,255,0.22)",
              }}
            >
              返回首页
            </button>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-xl-8">
              <div
                style={{
                  borderRadius: "24px",
                  padding: "22px",
                  background:
                    "linear-gradient(180deg, rgba(13,23,44,0.96), rgba(8,14,28,0.96))",
                  border: "1px solid rgba(0,234,255,0.12)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 style={{ margin: 0, fontWeight: 800 }}>购物车商品</h3>
                  <span style={{ color: "#7df9ff" }}>
                    {cartItems.length} 件商品
                  </span>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between align-items-center flex-wrap gap-3"
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                      padding: "18px 0",
                    }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        style={{
                          width: "76px",
                          height: "76px",
                          borderRadius: "16px",
                          overflow: "hidden",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(0,234,255,0.12)",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      <div>
                        <h5 style={{ marginBottom: "8px", fontWeight: 800 }}>
                          {item.name}
                        </h5>
                        <p
                          style={{
                            marginBottom: "8px",
                            color: "rgba(255,255,255,0.62)",
                          }}
                        >
                          {item.description || "高品质游戏服务订单"}
                        </p>
                        <div style={{ color: "#7df9ff", fontWeight: 700 }}>
                          单价：¥{item.price}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3 flex-wrap">
                      <div
                        className="d-flex align-items-center"
                        style={{
                          borderRadius: "14px",
                          border: "1px solid rgba(0,234,255,0.14)",
                          background: "rgba(255,255,255,0.04)",
                          padding: "6px",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleDecrease(item.id)}
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            border: "none",
                            background: "rgba(255,255,255,0.06)",
                            color: "#fff",
                            fontWeight: 800,
                            cursor: "pointer",
                          }}
                        >
                          -
                        </button>

                        <span
                          style={{
                            minWidth: "44px",
                            textAlign: "center",
                            fontWeight: 800,
                            color: "#fff",
                          }}
                        >
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleIncrease(item.id)}
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            border: "none",
                            background: "rgba(255,255,255,0.06)",
                            color: "#fff",
                            fontWeight: 800,
                            cursor: "pointer",
                          }}
                        >
                          +
                        </button>
                      </div>

                      <div style={{ minWidth: "100px", textAlign: "right" }}>
                        <div
                          style={{
                            fontWeight: 900,
                            fontSize: "18px",
                            color: "#fff",
                            marginBottom: "8px",
                          }}
                        >
                          ¥{Number(item.price) * Number(item.quantity)}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemove(item.id)}
                          style={{
                            border: "none",
                            background: "transparent",
                            color: "#ff7b9c",
                            cursor: "pointer",
                            fontWeight: 700,
                          }}
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-xl-4">
              <div
                style={{
                  borderRadius: "24px",
                  padding: "22px",
                  background:
                    "linear-gradient(180deg, rgba(15,24,48,0.98), rgba(8,13,26,0.98))",
                  border: "1px solid rgba(0,234,255,0.12)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
                  position: "sticky",
                  top: "90px",
                }}
              >
                <h3 style={{ fontWeight: 900, marginBottom: "18px" }}>订单摘要</h3>

                <div
                  style={{
                    borderRadius: "18px",
                    padding: "16px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    marginBottom: "18px",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      fontWeight: 700,
                      color: "#7df9ff",
                    }}
                  >
                    优惠码
                  </label>

                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="输入优惠码，例如 SAVE10"
                      style={{
                        flex: 1,
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: "#111a2f",
                        color: "#fff",
                        padding: "12px 14px",
                        outline: "none",
                      }}
                    />

                    <button
                      type="button"
                      onClick={applyCoupon}
                      style={{
                        border: "none",
                        borderRadius: "12px",
                        padding: "0 16px",
                        fontWeight: 800,
                        color: "#081018",
                        background: "linear-gradient(135deg, #00eaff, #67e8f9)",
                        cursor: "pointer",
                      }}
                    >
                      应用
                    </button>
                  </div>

                  {couponMessage && (
                    <p
                      style={{
                        marginTop: "10px",
                        marginBottom: 0,
                        color: appliedCoupon ? "#67f0b1" : "#ff9aa2",
                        fontSize: "14px",
                      }}
                    >
                      {couponMessage}
                    </p>
                  )}
                </div>

                <div
                  style={{
                    borderRadius: "18px",
                    padding: "16px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    marginBottom: "18px",
                  }}
                >
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ color: "rgba(255,255,255,0.74)" }}>商品小计</span>
                    <span>¥{subtotal}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ color: "rgba(255,255,255,0.74)" }}>服务费</span>
                    <span>¥{serviceFee}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ color: "rgba(255,255,255,0.74)" }}>优惠减免</span>
                    <span style={{ color: "#67f0b1" }}>-¥{finalDiscount}</span>
                  </div>

                  <hr style={{ borderColor: "rgba(255,255,255,0.1)" }} />

                  <div className="d-flex justify-content-between">
                    <span style={{ fontWeight: 900, fontSize: "18px" }}>应付总额</span>
                    <span
                      style={{
                        fontWeight: 900,
                        fontSize: "24px",
                        color: "#7df9ff",
                      }}
                    >
                      ¥{total}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePayWithAlipay}
                  style={{
                    width: "100%",
                    minHeight: "56px",
                    border: "none",
                    borderRadius: "18px",
                    fontWeight: 900,
                    fontSize: "17px",
                    color: "#ffffff",
                    background:
                      "linear-gradient(135deg, #1677ff 0%, #3aa0ff 50%, #69b8ff 100%)",
                    boxShadow:
                      "0 16px 36px rgba(22,119,255,0.32), inset 0 1px 0 rgba(255,255,255,0.25)",
                    cursor: "pointer",
                    transition: "0.25s ease",
                    marginBottom: "16px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px) scale(1.01)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                  }}
                >
                  支付宝支付
                </button>

                <div
                  style={{
                    borderRadius: "20px",
                    padding: "18px",
                    background:
                      "linear-gradient(180deg, rgba(8,18,36,0.9), rgba(6,12,24,0.9))",
                    border: "1px solid rgba(22,119,255,0.22)",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      marginBottom: "12px",
                      color: "#8fc6ff",
                      fontWeight: 700,
                    }}
                  >
                    支付宝扫码支付
                  </p>

                  <div
                    style={{
                      width: "180px",
                      height: "180px",
                      margin: "0 auto 12px",
                      borderRadius: "18px",
                      background:
                        "repeating-linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.02) 8px, rgba(255,255,255,0.02) 16px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: "inset 0 0 30px rgba(22,119,255,0.12)",
                    }}
                  >
                    <div
                      style={{
                        width: "140px",
                        height: "140px",
                        borderRadius: "12px",
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(230,240,255,1))",
                        color: "#1677ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 900,
                        textAlign: "center",
                        padding: "12px",
                        lineHeight: 1.3,
                      }}
                    >
                      Alipay
                      <br />
                      Scanner
                    </div>
                  </div>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.62)",
                    }}
                  >
                    后续接入真实支付宝二维码后，这里可替换为动态扫码图。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}