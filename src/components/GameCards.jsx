import React, { useState, useRef } from "react";
import { Container } from "react-bootstrap";
import "./GameCards.css";

// Chinese translations map by game id
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

// Discount prices
const getDiscount = (price) => Math.round(price * 0.7);

export default function GameCards({ games = [], searchTerm = "" }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const [notification, setNotification] = useState(null);
  const audioRef = useRef(null);

  const addToCart = (game) => {
    setCart((prev) => {
      const exists = prev.find((c) => c.id === game.id);

      if (exists) {
        return prev.map((c) =>
          c.id === game.id ? { ...c, qty: c.qty + 1 } : c
        );
      }

      return [...prev, { ...game, qty: 1 }];
    });

    setNotification(`"${ZH[game.id]?.name || game.name}" 已加入购物车`);
    setTimeout(() => setNotification(null), 2200);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleAudio = (game) => {
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

  // Build sections from prop data
  const discountGames = games.slice(0, 4);
  const allGames = games;
  const popularGames = games.filter((_, i) => [0, 1, 2, 3, 4, 5, 9, 10, 11].includes(i)).slice(0, 4);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const renderCard = (game, variant = "normal") => {
    const zh = ZH[game.id] || {};
    const isPlaying = playingId === game.id;
    const discountPrice = getDiscount(game.price);

    return (
      <div key={game.id} className={`gc-card gc-card--${variant}`}>
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
              className={`gc-audio-btn ${isPlaying ? "playing" : ""}`}
              onClick={() => toggleAudio(game)}
              title="收听描述"
            >
              {isPlaying ? (
                <span className="gc-audio-bars">
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                </svg>
              )}
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

          <button className="gc-add-btn" onClick={() => addToCart(game)}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ marginRight: 6 }}
            >
              <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 19 4H5.21L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63z" />
            </svg>
            加入购物车
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="gc-wrapper">
      <div className="gc-grid-bg" />
      <div className="gc-scanlines" />

      {notification && <div className="gc-toast">{notification}</div>}

      <button className="gc-cart-btn" onClick={() => setCartOpen(true)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 19 4H5.21L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63z" />
        </svg>
        购物车
        {cartCount > 0 && <span className="gc-cart-count">{cartCount}</span>}
      </button>

      {cartOpen && (
        <div className="gc-cart-overlay" onClick={() => setCartOpen(false)}>
          <div className="gc-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="gc-cart-header">
              <h3>购物车 🛒</h3>
              <button onClick={() => setCartOpen(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <p className="gc-cart-empty">购物车为空</p>
            ) : (
              <>
                {cart.map((c) => (
                  <div key={c.id} className="gc-cart-item">
                    <img
                      src={c.image}
                      alt={ZH[c.id]?.name || c.name}
                      className="gc-cart-item-img"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/48/0a0f1e/00f5ff?text=G";
                      }}
                    />
                    <div className="gc-cart-item-info">
                      <p className="gc-cart-item-name">{ZH[c.id]?.name || c.name}</p>
                      <p className="gc-cart-item-price">
                        ¥{c.price} × {c.qty}
                      </p>
                    </div>
                    <button
                      className="gc-cart-remove"
                      onClick={() => removeFromCart(c.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <div className="gc-cart-total">
                  <span>合计</span>
                  <span className="gc-total-price">¥{cartTotal}</span>
                </div>

                <button className="gc-checkout-btn">立即结算</button>
              </>
            )}
          </div>
        </div>
      )}

      <Container fluid="xl" className="gc-container">
        <div className="gc-page-head">
          <p className="gc-eyebrow">// 游戏商城</p>
          <h1 className="gc-page-title" data-text="折扣游戏产品">
            折扣游戏产品
          </h1>
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