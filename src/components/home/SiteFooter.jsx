import React from "react";
import "./homeSections.css";

const SiteFooter = () => {
  return (
    <footer className="fg-footer">
      <div className="container">
        <div className="row g-4 fg-footer-top">
          <div className="col-12 col-lg-4">
            <div className="fg-footer-brand">
              <div className="fg-footer-logo">凌</div>
              <div>
                <h3>凌速平台</h3>
                <p>LingSu Platform · FuturisticGaming</p>
              </div>
            </div>

            <p className="fg-footer-text">
              专注中国市场的高品质游戏服务平台，提供安全、快速、专业的一站式电竞服务体验。
            </p>

            <div className="fg-footer-badges">
              <span className="fg-pill badge-alipay">支付宝认证商家</span>
              <span className="fg-pill badge-outline">沪ICP备 XXXXXXXX号</span>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <h4 className="fg-footer-title">服务</h4>
            <ul className="fg-footer-links">
              <li><a href="/services/boosting">游戏代练</a></li>
              <li><a href="/services/duo">游戏陪玩</a></li>
              <li><a href="/services/coaching">技术教学</a></li>
              <li><a href="/services/events">赛事报名</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-4 col-lg-3">
            <h4 className="fg-footer-title">平台</h4>
            <ul className="fg-footer-links">
              <li><a href="/about">关于我们</a></li>
              <li><a href="/employee/apply">招募员工</a></li>
              <li><a href="/partners">合作伙伴</a></li>
              <li><a href="/media">媒体资源</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-4 col-lg-3">
            <h4 className="fg-footer-title">支持</h4>
            <ul className="fg-footer-links">
              <li><a href="/help">帮助中心</a></li>
              <li><a href="/refund-policy">退款政策</a></li>
              <li><a href="/privacy-policy">隐私政策</a></li>
              <li><a href="/terms">用户协议</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="fg-footer-bottom">
        <div className="container fg-footer-bottom-inner">
          <span>© 2026 凌速平台 LingSu Platform. 保留所有权利.</span>
          <span>沪ICP备 XXXXXXXX号</span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;