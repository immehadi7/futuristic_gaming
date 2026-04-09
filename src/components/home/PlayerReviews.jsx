import React from "react";
import "./homeSections.css";

const reviews = [
  {
    username: "liang***88",
    game: "王者荣耀",
    text: "下单后很快就有员工接单，沟通顺畅，效率非常高，整体体验很稳定。",
  },
  {
    username: "chen***21",
    game: "原神",
    text: "服务过程专业，进度透明，账号安全做得很好，下次还会继续使用。",
  },
  {
    username: "wang***66",
    game: "英雄联盟",
    text: "客服响应很快，价格清晰，没有隐形收费，确实比自己找人更放心。",
  },
];

const StarRow = () => {
  return (
    <div className="fg-stars" aria-label="5 star rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2.5l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.55 6.09 20.66l1.13-6.57L2.45 9.44l6.6-.96L12 2.5z" />
        </svg>
      ))}
    </div>
  );
};

const PlayerReviews = () => {
  return (
    <section className="fg-section">
      <div className="container">
        <div className="fg-section-heading">
          <h2>玩家评价</h2>
          <div className="fg-underline" />
          <p>真实玩家 · 真实体验 Real players, real results</p>
        </div>

        <div className="row g-4">
          {reviews.map((review) => (
            <div className="col-12 col-lg-4" key={review.username}>
              <div className="fg-card fg-review-card">
                <StarRow />
                <p className="fg-review-text">{review.text}</p>
                <div className="fg-review-footer">
                  <span className="fg-review-user">{review.username}</span>
                  <span className="fg-game-badge">{review.game}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fg-review-summary">
          平均评分 4.9/5 · 好评率 98.6% · 本月评价 1,240+
        </div>
      </div>
    </section>
  );
};

export default PlayerReviews;