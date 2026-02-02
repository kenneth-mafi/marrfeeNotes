import './wideButton.css';

export function WideButton({type="submit", text, icon, dark=false, onClick}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`digId-button ${dark ? "digId-btn-dark" : ""}`}>
      {icon && <img src={icon} alt="" className={`digId-button-img`} /> }
      {text}
    </button>
  )
}