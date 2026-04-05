import React, { useMemo, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./GameCards.css";
import {
  addToCart as addItemToCart,
  getCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from "../utils/cart";

const ZH = {
  1: { name: "王者荣耀", genre: "多人在线竞技", badge: "热门" },
  2: { name: "和平精英", genre: "大逃杀射击", badge: "精选" },
  3: { name: "原神", genre: "开放世界RPG", badge: "热门" },
  4: { name: "英雄联盟", genre: "多人在线竞技", badge: "经典" },
  5: { name: "穿越火线", genre: "第一人称射击", badge: "经典" },
  6: { name: "永劫无间", genre: "武侠大逃杀", badge: "新品" },
  7: { name: "地下城与勇士：起源", genre: "动作RPG", badge: "新品" },
  8: { name: "QQ飞车手游", genre: "竞速赛车", badge: "休闲" },
  9: { name: "第五人格", genre: "恐怖生存", badge: "精选" },
  10: { name: "云顶之弈", genre: "自走棋策略", badge: "热门" },
  11: { name: "使命召唤手游", genre: "第一人称射击", badge: "精选" },
  12: { name: "崩坏：星穹铁道", genre: "回合制RPG", badge: "新品" },
};

const getDiscount = (price) => Math.round(price * 0.7);

export default function GameCards({ games = [], searchTerm = "" }) {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const [cart, setCart] = useState(getCartItems());
  const [cartOpen, setCartOpen] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const [notification, setNotification] = useState(null);

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2200);
  };

  const syncCart = () => {
    setCart(getCartItems());
  };

  const handleAddToCart = (game) => {
    addItemToCart({
      id: game.id,
      name: ZH[game.id]?.name || game.name,
      description: game.description || "",
      price: Number(game.price) || 0,
      image: game.image || "",
      quantity: 1,
    });

    syncCart();
    showToast(`"${ZH[game.id]?.name || game.name}" 已加入购物车`);
  };

  const handleBuyNow = (game) => {
    addItemToCart({
      id: game.id,
      name: ZH[game.id]?.name || game.name,
      description: game.description || "",
      price: Number(game.price) || 0,
      image: game.image || "",
      quantity: 1,
    });

    syncCart();
    navigate("/checkout");
  };

  const handleRemoveFromCart = (id) => {
    removeCartItem(id);
    syncCart();
  };

  const handleIncreaseQty = (id) => {
    const item = cart.find((c) => String(c.id) === String(id));
    if (!item) return;

    updateCartItemQuantity(id, Number(item.quantity || 1) + 1);
    syncCart();
  };

  const handleDecreaseQty = (id) => {
    const item = cart.find((c) => String(c.id) === String(id));
    if (!item) return;

    const nextQty = Math.max(1, Number(item.quantity || 1) - 1);
    updateCartItemQuantity(id, nextQty);
    syncCart();
  };

  const toggleAudio = (game) => {
    if (!game.audio) {
      showToast("当前游戏没有语音介绍");
      return;
    }

    if (playingId === game.id) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(game.audio);
    audioRef.current = audio;
    audio.play();
    setPlayingId(game.id);

    audio.onended = () => setPlayingId(null);
  };

  const discountGames = useMemo(() => games.slice(0, 4), [games]);
  const allGames = games;
  const popularGames = useMemo(
    () => games.filter((_, i) => [0, 1, 2, 3, 4, 5, 9, 10, 11].includes(i)).slice(0, 4),
    [games]
  );

  const cartTotal = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const cartCount = cart.reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0
  );

  const renderCard = (game, variant = "normal") => {
    const zh = ZH[game.id] || {};
    const isPlaying = playingId === game.id;
    const discountPrice = getDiscount(Number(game.price) || 0);

    return (
      <div key={`${variant}-${game.id}`} className={`gc-card gc-card--${variant}`}>
        <div className="gc-card-img-wrap">
          <img
            src={game.image}
            alt={zh.name || game.name}
            className="gc-card-img"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x180/0a0f1e/00f5ff?text=游戏";
            }}
          />
          <span className={`gc-badge gc-badge--${game.id % 4}`}>
            {zh.badge || "游戏"}
          </span>
          <div className="gc-card-overlay" />
        </div>

        <div className="gc-card-body">
          <p className="gc-genre">{zh.genre || "游戏分类"}</p>
          <h3 className="gc-game-name">{zh.name || game.name}</h3>

          <div className="gc-desc-row">
            <button
              type="button"
              className={`gc-audio-btn ${isPlaying ? "playing" : ""}`}
              onClick={() => toggleAudio(game)}
              title="收听描述"
            >
              <span>{isPlaying ? "播放中" : "语音"}</span>
            </button>
          </div>

          <div className="gc-price-row">
            {variant === "discount" ? (
              <>
                <span className="gc-price-original">¥{game.price}</span>
                <span className="gc-price-discount">¥{discountPrice}</span>
                <span className="gc-discount-tag">7折</span>
              </>
            ) : (
              <span className="gc-price-main">¥{game.price}</span>
            )}
          </div>

          <div className="gc-action-row">
            <button
              type="button"
              className="gc-add-btn"
              onClick={() => handleAddToCart(game)}
            >
              加入购物车
            </button>

            <button
              type="button"
              className="gc-buy-btn"
              onClick={() => handleBuyNow(game)}
            >
              立即购买
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="gc-wrapper">
      <div className="gc-grid-bg" />
      <div className="gc-scanlines" />

      {notification && <div className="gc-toast">{notification}</div>}

      <button
        type="button"
        className="gc-cart-btn"
        onClick={() => setCartOpen(true)}
      >
        购物车
        {cartCount > 0 && <span className="gc-cart-count">{cartCount}</span>}
      </button>

      {cartOpen && (
        <div className="gc-cart-overlay" onClick={() => setCartOpen(false)}>
          <div className="gc-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="gc-cart-header">
              <h3>购物车 🛒</h3>
              <button type="button" onClick={() => setCartOpen(false)}>
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="gc-cart-empty">购物车为空</p>
            ) : (
              <>
                {cart.map((c) => (
                  <div key={c.id} className="gc-cart-item">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="gc-cart-item-img"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/80x80/0a0f1e/00f5ff?text=游戏";
                      }}
                    />

                    <div className="gc-cart-item-info">
                      <p className="gc-cart-item-name">{c.name}</p>
                      <p className="gc-cart-item-price">单价：¥{c.price}</p>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginTop: "8px",
                        }}
                      >
                        <button
                          type="button"
                          className="gc-qty-btn"
                          onClick={() => handleDecreaseQty(c.id)}
                        >
                          -
                        </button>

                        <span
                          style={{
                            minWidth: "28px",
                            textAlign: "center",
                            fontWeight: 700,
                          }}
                        >
                          {c.quantity}
                        </span>

                        <button
                          type="button"
                          className="gc-qty-btn"
                          onClick={() => handleIncreaseQty(c.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: "8px",
                      }}
                    >
                      <span className="gc-total-price">
                        ¥{Number(c.price) * Number(c.quantity)}
                      </span>

                      <button
                        type="button"
                        className="gc-cart-remove"
                        onClick={() => handleRemoveFromCart(c.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}

                <div className="gc-cart-total">
                  <span>合计</span>
                  <span className="gc-total-price">¥{cartTotal}</span>
                </div>

                <button
                  type="button"
                  className="gc-checkout-btn"
                  onClick={() => {
                    setCartOpen(false);
                    navigate("/checkout");
                  }}
                >
                  去结算
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <Container fluid="xl" className="gc-container">
        <div className="gc-page-head">
          <p className="gc-eyebrow">// 游戏商城</p>
          <h1 className="gc-page-title">折扣游戏产品</h1>
          <div className="gc-title-bar" />
        </div>

        {searchTerm && (
          <p style={{ color: "#00eaff", marginBottom: "20px" }}>
            Showing results for: <strong>{searchTerm}</strong>
          </p>
        )}

        <section className="gc-section">
          <div className="gc-section-header">
            <span className="gc-section-tag">限时优惠</span>
            <h2 className="gc-section-title">折扣游戏产品</h2>
            <p className="gc-section-sub">精选游戏大促销，限时7折优惠</p>
          </div>
          <div className="gc-grid gc-grid--4">
            {discountGames.map((game) => renderCard(game, "discount"))}
          </div>
        </section>

        <section className="gc-section">
          <div className="gc-section-header">
            <span className="gc-section-tag gc-section-tag--blue">全部商品</span>
            <h2 className="gc-section-title">所有游戏产品</h2>
            <p className="gc-section-sub">浏览我们完整的游戏目录</p>
          </div>
          <div className="gc-grid gc-grid--4">
            {allGames.map((game) => renderCard(game, "normal"))}
          </div>
        </section>

        <section className="gc-section">
          <div className="gc-section-header">
            <span className="gc-section-tag gc-section-tag--gold">排行榜</span>
            <h2 className="gc-section-title">最热门游戏</h2>
            <p className="gc-section-sub">玩家最爱，口碑之选</p>
          </div>
          <div className="gc-grid gc-grid--4">
            {popularGames.map((game) => renderCard(game, "popular"))}
          </div>
        </section>
      </Container>
    </div>
  );
}