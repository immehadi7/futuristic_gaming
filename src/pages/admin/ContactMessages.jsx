import React, { useEffect, useMemo, useState } from "react";
import {
  fetchContactSubmissions,
  updateContactSubmissionStatus,
  deleteContactSubmission,
  getContactStatusLabel,
} from "../../services/contactService";
import "./ContactMessages.css";

function formatDateTime(value) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [activeStatus, setActiveStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState("");

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      setPageError("");

      const result = await fetchContactSubmissions();
      const rows = Array.isArray(result?.data) ? result.data : [];

      setMessages(rows);
    } catch (error) {
      setPageError(
        error?.response?.data?.message || "获取联系消息失败，请稍后重试"
      );
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const filteredMessages = useMemo(() => {
    if (activeStatus === "all") return messages;
    return messages.filter((item) => item.status === activeStatus);
  }, [messages, activeStatus]);

  const counts = useMemo(() => {
    return {
      all: messages.length,
      new: messages.filter((item) => item.status === "new").length,
      read: messages.filter((item) => item.status === "read").length,
      replied: messages.filter((item) => item.status === "replied").length,
    };
  }, [messages]);

  const handleStatusChange = async (id, status) => {
    try {
      setActionLoadingId(id);

      const result = await updateContactSubmissionStatus(id, status);
      const updatedItem = result?.data;

      setMessages((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
      );
    } catch (error) {
      setPageError(
        error?.response?.data?.message || "更新消息状态失败，请稍后重试"
      );
    } finally {
      setActionLoadingId("");
    }
  };

  const handleDelete = async (id) => {
    try {
      setActionLoadingId(id);

      await deleteContactSubmission(id);
      setMessages((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setPageError(
        error?.response?.data?.message || "删除消息失败，请稍后重试"
      );
    } finally {
      setActionLoadingId("");
    }
  };

  return (
    <div className="cm-wrapper">
      <div className="cm-grid-bg" />
      <div className="container py-5">
        <div className="cm-header">
          <p className="cm-eyebrow">// 客服消息中心</p>
          <h1 className="cm-title">联系表单消息</h1>
          <p className="cm-subtitle">当前消息数据已接入后端 API 与 Supabase。</p>
        </div>

        <div className="cm-stats">
          <button
            className={`cm-filter-btn ${activeStatus === "all" ? "active" : ""}`}
            onClick={() => setActiveStatus("all")}
          >
            全部 ({counts.all})
          </button>
          <button
            className={`cm-filter-btn ${activeStatus === "new" ? "active" : ""}`}
            onClick={() => setActiveStatus("new")}
          >
            新消息 ({counts.new})
          </button>
          <button
            className={`cm-filter-btn ${activeStatus === "read" ? "active" : ""}`}
            onClick={() => setActiveStatus("read")}
          >
            已查看 ({counts.read})
          </button>
          <button
            className={`cm-filter-btn ${
              activeStatus === "replied" ? "active" : ""
            }`}
            onClick={() => setActiveStatus("replied")}
          >
            已回复 ({counts.replied})
          </button>
        </div>

        {pageError ? (
          <div className="cm-empty-card">
            <div className="cm-empty-icon">⚠</div>
            <p className="cm-empty-title">加载失败</p>
            <p className="cm-empty-sub">{pageError}</p>
            <button className="cm-action-btn" onClick={loadMessages}>
              重新加载
            </button>
          </div>
        ) : isLoading ? (
          <div className="cm-empty-card">
            <div className="cm-empty-icon">⋯</div>
            <p className="cm-empty-title">正在加载</p>
            <p className="cm-empty-sub">正在获取联系表单消息，请稍候。</p>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="cm-empty-card">
            <div className="cm-empty-icon">✦</div>
            <p className="cm-empty-title">暂无消息</p>
            <p className="cm-empty-sub">当前筛选条件下没有可显示的联系表单记录。</p>
          </div>
        ) : (
          <div className="cm-list">
            {filteredMessages.map((item) => {
              const createdTime = item.createdAt || item.created_at;
              const isBusy = actionLoadingId === item.id;

              return (
                <div key={item.id} className="cm-card">
                  <div className="cm-card-top">
                    <div>
                      <h3 className="cm-name">{item.name || "未命名用户"}</h3>
                      <p className="cm-email">{item.email}</p>
                    </div>

                    <div className={`cm-status cm-status-${item.status}`}>
                      {getContactStatusLabel(item.status)}
                    </div>
                  </div>

                  <div className="cm-meta">
                    <span>来源：{item.source || "contact_form"}</span>
                    <span>提交时间：{formatDateTime(createdTime)}</span>
                  </div>

                  <div className="cm-message-box">{item.message}</div>

                  <div className="cm-actions">
                    <button
                      className="cm-action-btn"
                      onClick={() => handleStatusChange(item.id, "new")}
                      disabled={isBusy}
                    >
                      设为新消息
                    </button>
                    <button
                      className="cm-action-btn"
                      onClick={() => handleStatusChange(item.id, "read")}
                      disabled={isBusy}
                    >
                      标记已查看
                    </button>
                    <button
                      className="cm-action-btn"
                      onClick={() => handleStatusChange(item.id, "replied")}
                      disabled={isBusy}
                    >
                      标记已回复
                    </button>
                    <button
                      className="cm-action-btn danger"
                      onClick={() => handleDelete(item.id)}
                      disabled={isBusy}
                    >
                      删除
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}