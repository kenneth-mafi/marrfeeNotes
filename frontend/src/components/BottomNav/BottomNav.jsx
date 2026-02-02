import RoundButton from '../buttons/roundButton/RoundButton';
import './bottomNav.css';

const BottomNav = ({ onClick, show }) => {
    return (
        <div className="buttom-nav-contr">
            {show && <RoundButton onClick={onClick} />}
        </div>
    )
}
export default BottomNav;