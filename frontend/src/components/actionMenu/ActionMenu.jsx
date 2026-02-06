import "./actionMenu.css";

const ActionMenuItem = ({ label, onClick }) => {
  return (
    <button type="button" className="action-menu-item" onClick={onClick}>
      <span>{label}</span>
    </button>
  );
};

const ActionMenu = ({ open = false, actions = [] }) => {
  if (!open) return null;

  return (
    <div className="action-menu" role="menu">
      {actions.map((action, index) => (
        <ActionMenuItem
          key={action.id || action.label || index}
          label={action.label}
          onClick={action.onClick}
        />
      ))}
    </div>
  );
};

export default ActionMenu;
