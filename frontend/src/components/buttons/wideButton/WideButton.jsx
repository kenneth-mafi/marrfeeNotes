import './wideButton.css';

export function WideButton({type="submit", text, icon, dark=false, onClick}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${dark ? "btn-dark" : ""}`}>
      {icon && <img src={icon} alt="" className={`button-img`} /> }
      {text}
    </button>
  )
}
