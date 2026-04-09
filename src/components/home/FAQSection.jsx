import React, { useState } from "react";
import "./homeSections.css";

const faqItems = [
  {
    question: "下单后多久会有员工接单？",
    answer: "通常5–30分钟内，加急订单优先处理。",
  },
  {
    question: "支持哪些支付方式？",
    answer: "目前支持支付宝扫码支付，微信支付即将上线。",
  },
  {
    question: "如果服务不满意可以退款吗？",
    answer: "服务未开始全额退款，进行中按比例退款，详见退款政策。",
  },
  {
    question: "员工都是真实认证的吗？",
    answer: "所有员工通过实名认证和游戏段位验证，平台100%担保服务质量。",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="fg-section">
      <div className="container">
        <div className="fg-section-heading">
          <h2>常见问题</h2>
          <div className="fg-underline" />
          <p>FAQ</p>
        </div>

        <div className="fg-faq-wrap">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className={`fg-faq-item ${isOpen ? "active" : ""}`}
              >
                <button
                  type="button"
                  className="fg-faq-question"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <span className={`fg-faq-chevron ${isOpen ? "rotate" : ""}`}>
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>

                <div className={`fg-faq-answer-wrap ${isOpen ? "open" : ""}`}>
                  <div className="fg-faq-answer">{item.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;