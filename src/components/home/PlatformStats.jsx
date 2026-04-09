import React, { useEffect, useRef, useState } from "react";
import "./homeSections.css";

const stats = [
  { value: 50000, suffix: "+", label: "注册用户", subtitle: "Registered Users" },
  { value: 120000, suffix: "+", label: "完成订单", subtitle: "Completed Orders" },
  { value: 98.6, suffix: "%", label: "满意率", subtitle: "Satisfaction Rate" },
  { value: 200, suffix: "+", label: "认证员工", subtitle: "Verified Employees" },
];

const trustBadges = [
  {
    label: "支付宝认证商家",
    subtitle: "Alipay Verified",
    className: "badge-alipay",
  },
  {
    label: "30分钟响应保证",
    subtitle: "Fast Response",
    className: "badge-green",
  },
  {
    label: "24/7 在线客服",
    subtitle: "Online Support",
    className: "badge-outline",
  },
  {
    label: "100% 安全保障",
    subtitle: "Security Guarantee",
    className: "badge-outline",
  },
];

const formatValue = (value, current) => {
  if (typeof value === "number" && !Number.isInteger(value)) {
    return current.toFixed(1);
  }
  return Math.floor(current).toLocaleString("en-US");
};

const CounterCard = ({ value, suffix, label, subtitle, startAnimation }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    const duration = 1600;
    const startTime = performance.now();

    let frameId;

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = value * eased;

      setCount(currentValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [startAnimation, value]);

  return (
    <div className="fg-card fg-stat-card">
      <div className="fg-stat-number">
        {formatValue(value, count)}
        {suffix}
      </div>
      <div className="fg-stat-label">{label}</div>
      <div className="fg-stat-subtitle">{subtitle}</div>
    </div>
  );
};

const PlatformStats = () => {
  const sectionRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="fg-section" ref={sectionRef}>
      <div className="container">
        <div className="fg-section-heading">
          <h2>平台数据</h2>
          <div className="fg-underline" />
          <p>Platform Stats</p>
        </div>

        <div className="row g-4">
          {stats.map((item) => (
            <div className="col-12 col-sm-6 col-xl-3" key={item.label}>
              <CounterCard {...item} startAnimation={hasStarted} />
            </div>
          ))}
        </div>

        <div className="fg-trust-badges">
          {trustBadges.map((badge) => (
            <div key={badge.label} className={`fg-pill ${badge.className}`}>
              <span className="fg-pill-main">{badge.label}</span>
              <span className="fg-pill-sub">{badge.subtitle}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;