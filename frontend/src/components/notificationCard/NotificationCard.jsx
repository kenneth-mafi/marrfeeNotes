import "./notificationCard.css";

export default function NotificationCard({
  show = false,
  message = "Invalid credentials",
  variant = "error",
  onClose,
}) {
  if (!show) return null;

  return (
    <div className={`notification-card ${variant}`} role="alert" aria-live="polite">
      <span className="notification-text">{message}</span>
      {onClose && (
        <button type="button" className="notification-close" onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  );
}
