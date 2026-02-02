import { Link } from 'react-router-dom';
import './menuLinkItem.css';
import arrowIcon from '../../assets/right-arrow.png'

const MenuLinkItem = ({ to, label, icon, color }) => {
    return(
        <Link to={to} className={`digId-menu-link-item`}>
            <div className={`digId-menu-link-left`}>
                <img src={icon} alt="icon" className={`digId-menu-link-left-icon`} />
                <span className={`digId-menu-link-label`} style={{color: `${color ? "red" : ""}`}} >{label}</span>
            </div>
            <div className={`digId-menu-link-right`} >
                <img src={arrowIcon} alt="icon" className={`digId-menu-link-right-icon`}  />
            </div>
        
        </Link>
    )
}

export default MenuLinkItem;