import "./profileActions.css";

const ProfileActionItem = ({ label, onClick, tone = "default" }) => {
  return (
    <button
      type="button"
      className={`profile-action-item ${tone === "danger" ? "is-danger" : ""}`}
      onClick={onClick}
    >
      <span>{label}</span>
    </button>
  );
};

const ProfileActions = ({ actions = [] }) => {
  return (
    <div className="profile-actions">
      {actions.map((action, index) => (
        <ProfileActionItem
          key={action.id || action.label || index}
          label={action.label}
          onClick={action.onClick}
          tone={action.tone}
        />
      ))}
    </div>
  );
};

export default ProfileActions;
