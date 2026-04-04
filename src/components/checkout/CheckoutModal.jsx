import "./CheckoutModal.css";

export default function CheckoutModal({
  isOpen,
  onClose,
  cart = [],
  total = 0,
  onCheckout,
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-header">
          <div>
            <p className="checkout-eyebrow">订单结算</p>
            <h3 className="checkout-title">确认支付</h3>
          </div>

          <button className="checkout-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="checkout-list">
          {cart.map((item) => (
            <div className="checkout-item" key={item.id}>
              <img src={item.image} alt={item.name} className="checkout-item-img" />
              <div className="checkout-item-info">
                <p className="checkout-item-name">{item.name}</p>
                <p className="checkout-item-meta">
                  ¥{item.price} × {item.qty}
                </p>
              </div>
              <div className="checkout-item-price">¥{item.price * item.qty}</div>
            </div>
          ))}
        </div>

        <div className="checkout-methods">
          <p className="checkout-label">支付方式</p>

          <label className="checkout-method active">
            <input type="radio" checked readOnly />
            <span>支付宝</span>
            <small>推荐 · 安全快捷支付</small>
          </label>
        </div>

        <div className="checkout-summary">
          <span>合计金额</span>
          <strong>¥{total}</strong>
        </div>

        <button
          className="checkout-pay-btn"
          onClick={onCheckout}
          disabled={loading || cart.length === 0}
        >
          {loading ? "跳转支付中..." : "使用支付宝支付"}
        </button>
      </div>
    </div>
  );
}