import RoundButton from '../buttons/roundButton/RoundButton';
import './bottomNav.css';

const BottomNav = ({ onClick }) => {
    return (
        <div className="buttom-nav-contr">
            <RoundButton onClick={onClick} />
        </div>
    )
}
export default BottomNav;