import Carousel from "react-bootstrap/Carousel";
import codBanner from "../assets/cod_banner.jpg";
import narakaBanner from "../assets/naraka_banner.jpg";
import honorBanner from "../assets/honor_banner.jpg";
import "./HeroCarousel.css";

const carouselData = [
  {
    id: 1,
    image: codBanner,
    title: "使命召唤手游",
    subtitle: "高能枪战 · 团队竞技 · 极限压制",
    description:
      "进入高强度战场，感受沉浸式射击体验。无论是多人对战还是战术配合，都能带来紧张刺激的操作快感。节奏更快，火力更猛，每一局都充满挑战与荣耀。",
  },
  {
    id: 2,
    image: narakaBanner,
    title: "永劫无间",
    subtitle: "武侠动作 · 生存对决 · 热血连招",
    description:
      "在刀光剑影之间展开激烈交锋，体验高机动、高操作的战斗魅力。飞索追击、近战博弈、连招反杀，打造充满东方美学与竞技张力的巅峰战场。",
  },
  {
    id: 3,
    image: honorBanner,
    title: "王者荣耀",
    subtitle: "5V5竞技 · 团队协作 · 峡谷称王",
    description:
      "集结英雄，开启快节奏团队对抗。丰富的英雄体系、清晰的战术分工与强烈的竞技氛围，让每一次开团都热血十足。与好友并肩作战，冲击更高段位。",
  },
];

export default function HeroCarousel() {
  return (
    <section id="home" className="hero-carousel-section">
      <Carousel
        fade
        controls
        indicators
        interval={3000}
        pause={false}
        className="hero-carousel"
      >
        {carouselData.map((item) => (
          <Carousel.Item key={item.id}>
            <div className="hero-slide">
              <img
                className="hero-slide-image"
                src={item.image}
                alt={item.title}
              />

              <div className="hero-slide-overlay" />
              <div className="hero-slide-grid" />

              <div className="hero-slide-content">
                <span className="hero-slide-badge">热门推荐</span>

                <h1 className="hero-title-animate">{item.title}</h1>
                <h4 className="hero-subtitle-animate">{item.subtitle}</h4>
                <p className="hero-desc-animate">{item.description}</p>

                <div className="hero-slide-buttons hero-buttons-animate">
                  <button className="hero-btn-primary">立即探索</button>
                  <button className="hero-btn-secondary">查看详情</button>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}