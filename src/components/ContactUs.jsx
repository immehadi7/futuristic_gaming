import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./ContactUs.css";

import robotImg from "../assets/robot.png";
import logoImg from "../assets/mailbox.png";

const CHAT_RESPONSES = [
  "你好，玩家！今天有什么可以帮到你的吗？🎮",
  "好问题！让我来为您查找一下...",
  "我们的客服团队将在24小时内与您联系。还有其他问题吗？",
  "您也可以查看我们的常见问题页面获取快速解答！",
  "明白了！还有什么我可以帮到您的吗？",
  "正在为您接通客服团队，请稍候...",
];

export default function ContactUs() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 你好！我是 NEXUS，您的 AI 助手。有任何问题请随时提问！" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", question: "" });
  const [submitted, setSubmitted] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (!inputVal.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: inputVal }]);
    setInputVal("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: CHAT_RESPONSES[Math.floor(Math.random() * CHAT_RESPONSES.length)] }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
    setFormData({ firstName: "", lastName: "", email: "", question: "" });
  };

  return (
    <div className="ctu-wrapper">
      <div className="ctu-scanlines" />
      <div className="ctu-grid-bg" />
      <Container className="ctu-container" fluid="xl">
        <div className="ctu-heading-wrap">
          <p className="ctu-eyebrow">// 支持终端</p>
          <h1 className={`ctu-title ${glitch ? "glitch" : ""}`} data-text="联系我们">联系我们</h1>
          <div className="ctu-title-bar" />
        </div>
        <Row className="ctu-main-row g-4 align-items-start">
          <Col lg={7}>
            <div className="ctu-form-card">
              <div className="ctu-form-card-header">
                <span className="ctu-dot red" /><span className="ctu-dot yellow" /><span className="ctu-dot green" />
                <span className="ctu-terminal-label">联系表单.exe</span>
              </div>
              {submitted ? (
                <div className="ctu-success">
                  <div className="ctu-success-icon">✓</div>
                  <p className="ctu-success-title">消息已发送</p>
                  <p className="ctu-success-sub">我们将在24小时内回复您，请耐心等待。</p>
                </div>
              ) : (
                <Form onSubmit={handleSubmit} className="ctu-form">
                  <Row className="g-3">
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label className="ctu-label">名</Form.Label>
                        <Form.Control className="ctu-input" type="text" name="firstName" placeholder="例如：影武者" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} required />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label className="ctu-label">姓</Form.Label>
                        <Form.Control className="ctu-input" type="text" name="lastName" placeholder="例如：龙" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} required />
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Form.Group>
                        <Form.Label className="ctu-label">电子邮箱</Form.Label>
                        <Form.Control className="ctu-input" type="email" name="email" placeholder="玩家@游戏竞技场.cn" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Form.Group>
                        <Form.Label className="ctu-label">您的问题</Form.Label>
                        <Form.Control className="ctu-input ctu-textarea" as="textarea" rows={5} placeholder="请描述您的问题或需求..." value={formData.question} onChange={e => setFormData({...formData, question: e.target.value})} required />
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Button type="submit" className="ctu-submit-btn w-100">
                        <span>发送消息</span><span className="ctu-btn-arrow">⟶</span>
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </div>
          </Col>
          <Col lg={5}>
            <div className="ctu-bot-card">
              <div className="ctu-bot-illustration">
                <div className="ctu-bot-glow" />
                <img src={robotImg} alt="AI 助手" className="ctu-bot-img" />
                <div className="ctu-bot-badge"><img src={logoImg} alt="Logo" className="ctu-bot-logo" /></div>
              </div>
              <div className="ctu-bot-info">
                <h3 className="ctu-bot-name">NEXUS <span className="ctu-online-dot" /></h3>
                <p className="ctu-bot-role">AI 客服助手 · 全天24小时在线</p>
              </div>
              <div className="ctu-bot-features">
                {["即时响应", "游戏支持", "账户帮助", "问题反馈"].map(f => (
                  <span key={f} className="ctu-feature-tag">{f}</span>
                ))}
              </div>
              <button className="ctu-open-chat-btn" onClick={() => { setChatOpen(true); setChatMinimized(false); }}>
                <span>⚡</span> 开启在线客服
              </button>
            </div>
          </Col>
        </Row>
      </Container>

      {!chatOpen && (
        <button className="ctu-chat-trigger" onClick={() => setChatOpen(true)}>
          <img src={logoImg} alt="客服" className="ctu-trigger-logo" />
          <span className="ctu-trigger-ping" />
        </button>
      )}

      {chatOpen && (
        <div className={`ctu-chat-widget ${chatMinimized ? "minimized" : ""}`}>
          <div className="ctu-chat-header">
            <div className="ctu-chat-header-info">
              <img src={logoImg} alt="Logo" className="ctu-chat-avatar" />
              <div>
                <p className="ctu-chat-name">NEXUS</p>
                <p className="ctu-chat-status"><span className="ctu-online-dot sm" /> 在线</p>
              </div>
            </div>
            <div className="ctu-chat-controls">
              <button onClick={() => setChatMinimized(!chatMinimized)}>{chatMinimized ? "▲" : "▼"}</button>
              <button onClick={() => setChatOpen(false)}>✕</button>
            </div>
          </div>
          {!chatMinimized && (
            <>
              <div className="ctu-chat-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`ctu-msg ${msg.from}`}>
                    {msg.from === "bot" && <img src={robotImg} alt="bot" className="ctu-msg-avatar" />}
                    <div className="ctu-msg-bubble">{msg.text}</div>
                  </div>
                ))}
                {isTyping && (
                  <div className="ctu-msg bot">
                    <img src={robotImg} alt="bot" className="ctu-msg-avatar" />
                    <div className="ctu-msg-bubble ctu-typing"><span /><span /><span /></div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="ctu-chat-input-row">
                <input className="ctu-chat-input" placeholder="输入消息..." value={inputVal}
                  onChange={e => setInputVal(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} />
                <button className="ctu-chat-send" onClick={sendMessage}>⟶</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
