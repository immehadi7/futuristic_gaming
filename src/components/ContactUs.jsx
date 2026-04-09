import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { io } from "socket.io-client";
import "./ContactUs.css";

import robotImg from "../assets/robot.png";
import logoImg from "../assets/mailbox.png";
import {
  createContactSubmission,
  validateContactForm,
} from "../utils/contactSubmission";
import { submitContactForm } from "../services/contactService";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  question: "",
};

const INITIAL_ERRORS = {
  name: "",
  email: "",
  message: "",
};

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export default function ContactUs() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 你好！我是 NEXUS，您的 AI 助手。有任何问题请随时提问！",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState(INITIAL_ERRORS);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [glitch, setGlitch] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
      autoConnect: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsSocketConnected(true);
    });

    socket.on("disconnect", () => {
      setIsSocketConnected(false);
    });

    socket.on("ai_typing", () => {
      setIsTyping(true);
    });

    socket.on("ai_reply", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: data?.message || "系统暂时无法响应，请稍后再试。",
        },
      ]);
      setIsTyping(false);
    });

    socket.on("connect_error", () => {
      setIsSocketConnected(false);
      setIsTyping(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("ai_typing");
      socket.off("ai_reply");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setInputVal("");

    if (!socketRef.current || !socketRef.current.connected) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "⚠️ 当前客服连接中断，请稍后再试。",
        },
      ]);
      return;
    }

    socketRef.current.emit("user_message", { message: trimmed });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }

    if (submitError) {
      setSubmitError("");
    }

    if (formErrors.name || formErrors.email || formErrors.message) {
      setFormErrors((prev) => {
        const next = { ...prev };

        if (name === "firstName" || name === "lastName") {
          next.name = "";
        }

        if (name === "email") {
          next.email = "";
        }

        if (name === "question") {
          next.message = "";
        }

        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      setSubmitted(false);
      return;
    }

    try {
      setIsSaving(true);

      const submission = createContactSubmission(formData);
      await submitContactForm(submission);

      setSubmitted(true);
      setFormErrors(INITIAL_ERRORS);
      setFormData(INITIAL_FORM);

      setTimeout(() => {
        setSubmitted(false);
      }, 3500);
    } catch (error) {
      const apiErrors = error?.response?.data?.errors;

      if (apiErrors) {
        setFormErrors((prev) => ({
          ...prev,
          ...apiErrors,
        }));
      }

      setSubmitError(
        error?.response?.data?.message || "消息提交失败，请稍后再试"
      );
      setSubmitted(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="ctu-wrapper">
      <div className="ctu-scanlines" />
      <div className="ctu-grid-bg" />

      <Container className="ctu-container" fluid="xl">
        <div className="ctu-heading-wrap">
          <p className="ctu-eyebrow">// 支持终端</p>
          <h1 className={`ctu-title ${glitch ? "glitch" : ""}`} data-text="联系我们">
            联系我们
          </h1>
          <div className="ctu-title-bar" />
        </div>

        <Row className="ctu-main-row g-4 align-items-start">
          <Col lg={7}>
            <div className="ctu-form-card">
              <div className="ctu-form-card-header">
                <span className="ctu-dot red" />
                <span className="ctu-dot yellow" />
                <span className="ctu-dot green" />
                <span className="ctu-terminal-label">联系表单.exe</span>
              </div>

              {submitted ? (
                <div className="ctu-success">
                  <div className="ctu-success-icon">✓</div>
                  <p className="ctu-success-title">消息已发送</p>
                  <p className="ctu-success-sub">
                    您的留言已成功提交，我们将在24小时内回复您，请耐心等待。
                  </p>
                </div>
              ) : (
                <Form onSubmit={handleSubmit} className="ctu-form" noValidate>
                  <Row className="g-3">
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label className="ctu-label">名</Form.Label>
                        <Form.Control
                          className={`ctu-input ${formErrors.name ? "ctu-input-error" : ""}`}
                          type="text"
                          name="firstName"
                          placeholder="例如：影武者"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label className="ctu-label">姓</Form.Label>
                        <Form.Control
                          className={`ctu-input ${formErrors.name ? "ctu-input-error" : ""}`}
                          type="text"
                          name="lastName"
                          placeholder="例如：龙"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>

                    {formErrors.name ? (
                      <Col sm={12}>
                        <p className="ctu-error-text">{formErrors.name}</p>
                      </Col>
                    ) : null}

                    <Col sm={12}>
                      <Form.Group>
                        <Form.Label className="ctu-label">电子邮箱</Form.Label>
                        <Form.Control
                          className={`ctu-input ${formErrors.email ? "ctu-input-error" : ""}`}
                          type="email"
                          name="email"
                          placeholder="玩家@游戏竞技场.cn"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        {formErrors.email ? (
                          <p className="ctu-error-text">{formErrors.email}</p>
                        ) : null}
                      </Form.Group>
                    </Col>

                    <Col sm={12}>
                      <Form.Group>
                        <Form.Label className="ctu-label">您的问题</Form.Label>
                        <Form.Control
                          className={`ctu-input ctu-textarea ${formErrors.message ? "ctu-input-error" : ""}`}
                          as="textarea"
                          rows={5}
                          name="question"
                          placeholder="请描述您的问题或需求..."
                          value={formData.question}
                          onChange={handleInputChange}
                        />
                        {formErrors.message ? (
                          <p className="ctu-error-text">{formErrors.message}</p>
                        ) : null}
                      </Form.Group>
                    </Col>

                    {submitError ? (
                      <Col sm={12}>
                        <p className="ctu-error-text">{submitError}</p>
                      </Col>
                    ) : null}

                    <Col sm={12}>
                      <Button
                        type="submit"
                        className="ctu-submit-btn w-100"
                        disabled={isSaving}
                      >
                        <span>{isSaving ? "提交中..." : "发送消息"}</span>
                        <span className="ctu-btn-arrow">⟶</span>
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
                <div className="ctu-bot-badge">
                  <img src={logoImg} alt="Logo" className="ctu-bot-logo" />
                </div>
              </div>

              <div className="ctu-bot-info">
                <h3 className="ctu-bot-name">
                  NEXUS <span className="ctu-online-dot" />
                </h3>
                <p className="ctu-bot-role">
                  AI 客服助手 · {isSocketConnected ? "全天24小时在线" : "连接中..."}
                </p>
              </div>

              <div className="ctu-bot-features">
                {["即时响应", "游戏支持", "账户帮助", "问题反馈"].map((feature) => (
                  <span key={feature} className="ctu-feature-tag">
                    {feature}
                  </span>
                ))}
              </div>

              <button
                className="ctu-open-chat-btn"
                onClick={() => {
                  setChatOpen(true);
                  setChatMinimized(false);
                }}
              >
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
                <p className="ctu-chat-status">
                  <span className="ctu-online-dot sm" />
                  {isSocketConnected ? " 在线" : " 连接中"}
                </p>
              </div>
            </div>

            <div className="ctu-chat-controls">
              <button onClick={() => setChatMinimized(!chatMinimized)}>
                {chatMinimized ? "▲" : "▼"}
              </button>
              <button onClick={() => setChatOpen(false)}>✕</button>
            </div>
          </div>

          {!chatMinimized && (
            <>
              <div className="ctu-chat-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`ctu-msg ${msg.from}`}>
                    {msg.from === "bot" && (
                      <img src={robotImg} alt="bot" className="ctu-msg-avatar" />
                    )}
                    <div className="ctu-msg-bubble">{msg.text}</div>
                  </div>
                ))}

                {isTyping && (
                  <div className="ctu-msg bot">
                    <img src={robotImg} alt="bot" className="ctu-msg-avatar" />
                    <div className="ctu-msg-bubble ctu-typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="ctu-chat-input-row">
                <input
                  className="ctu-chat-input"
                  placeholder="输入消息..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button className="ctu-chat-send" onClick={sendMessage}>
                  ⟶
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}