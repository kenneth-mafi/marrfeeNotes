import { Link } from 'react-router-dom';
import './menuLinkItem.css';
import arrowIcon from '../../assets/right-arrow.png'

const MenuLinkItem = ({ to, label, icon, color }) => {
    return(
        <Link to={to} className={`menu-link-item`}>
            <div className={`menu-link-left`}>
                <img src={icon} alt="icon" className={`menu-link-left-icon`} />
                <span className={`menu-link-label`} style={{color: `${color ? "red" : ""}`}} >{label}</span>
            </div>
            <div className={`menu-link-right`} >
                <img src={arrowIcon} alt="icon" className={`menu-link-right-icon`}  />
            </div>
        
        </Link>
    )
}

export default MenuLinkItem;
