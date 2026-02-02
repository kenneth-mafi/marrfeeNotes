import './wideButton.css';
import loadingIcon from '../../../assets/loading.png';
import { useNoteContext } from '../../../hooks/useContext';

export function WideButton({type="submit", text, dark=false, onClick}) {
  const { isVerifying } = useNoteContext();

  const icon = isVerifying ? loadingIcon : ""
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${dark ? "btn-dark" : ""}`}>
      {icon && <img src={icon} alt="" className={`button-img`} /> }
      {!icon && text}
    </button>
  )
}
