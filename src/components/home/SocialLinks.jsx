import React from "react";
import "./homeSections.css";

const socialItems = [
  {
    name: "微信公众号",
    handle: "@凌速平台服务号",
    className: "social-wechat",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M8.5 4C4.36 4 1 6.91 1 10.5c0 2.05 1.07 3.88 2.74 5.07L3 19l3.12-1.56c.45.08.91.12 1.38.12 4.14 0 7.5-2.91 7.5-6.5S12.64 4 8.5 4zm-3 5.5a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2z" />
        <path d="M16.5 9c-3.59 0-6.5 2.46-6.5 5.5 0 1.7.92 3.22 2.35 4.23L12 21l2.56-1.28c.31.05.62.08.94.08 3.59 0 6.5-2.46 6.5-5.5S20.09 9 16.5 9zm-2 4a.9.9 0 110-1.8.9.9 0 010 1.8zm4 0a.9.9 0 110-1.8.9.9 0 010 1.8z" />
      </svg>
    ),
  },
  {
    name: "QQ群",
    handle: "874563210",
    className: "social-qq",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M12 2c2.49 0 4.5 2.58 4.5 5.76 0 .95-.18 1.85-.5 2.64.79.84 1.28 1.97 1.28 3.22 0 1.06-.35 2.04-.95 2.84.15.54.45 1.03.89 1.42.48.42.73.84.54 1.18-.26.47-1.22.35-2.28-.06-.48-.18-.92-.39-1.28-.61-.66.29-1.38.45-2.12.45s-1.46-.16-2.12-.45c-.36.22-.8.43-1.28.61-1.06.41-2.02.53-2.28.06-.19-.34.06-.76.54-1.18.44-.39.74-.88.89-1.42-.6-.8-.95-1.78-.95-2.84 0-1.25.49-2.38 1.28-3.22-.32-.79-.5-1.69-.5-2.64C7.5 4.58 9.51 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "哔哩哔哩",
    handle: "凌速平台官方",
    className: "social-bilibili",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="4" y="6" width="16" height="12" rx="3" />
        <path d="M9 3l2 3M15 3l-2 3M9.5 11.5v1M14.5 11.5v1M8.5 15c1 .8 2.2 1.2 3.5 1.2s2.5-.4 3.5-1.2" />
      </svg>
    ),
  },
  {
    name: "微博",
    handle: "@凌速平台电竞服务",
    className: "social-weibo",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M18.8 9.2c-.35-.11-.59-.2-.4-.64.41-.94.45-1.75.01-2.33-.82-1.08-3.06-.91-5.62.23 0 0-.8.35-.59-.27.4-1.2.33-2.2-.35-2.72-.76-.58-2.04-.22-3.46.8C5.96 5.78 4 8.79 4 11.5 4 15.09 7.62 18 12.08 18c5.37 0 8.92-3.41 8.92-6.53 0-1.47-.84-2.02-2.2-2.27zM12.2 16.2c-2.72.27-5.06-1.17-5.23-3.22-.17-2.05 1.88-3.93 4.6-4.2 2.72-.27 5.06 1.17 5.23 3.22.17 2.05-1.89 3.93-4.6 4.2z" />
        <path d="M16.9 6.3c.95.15 1.72.55 2.29 1.18.57.63.9 1.44 1 2.42" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
];

const SocialLinks = () => {
  return (
    <section className="fg-section">
      <div className="container">
        <div className="fg-section-heading">
          <h2>关注我们</h2>
          <div className="fg-underline" />
          <p>Social Media</p>
        </div>

        <div className="row g-4">
          {socialItems.map((item) => (
            <div className="col-12 col-sm-6 col-xl-3" key={item.name}>
              <div className={`fg-card fg-social-card ${item.className}`}>
                <div className="fg-social-icon">{item.icon}</div>
                <div>
                  <div className="fg-social-name">{item.name}</div>
                  <div className="fg-social-handle">{item.handle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="fg-social-caption">
          加入我们的社区，获取最新游戏资讯和专属优惠
        </p>
      </div>
    </section>
  );
};

export default SocialLinks;