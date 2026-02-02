import './roundButton.css';
import plusIcon from '../../../assets/plus.png';


const RoundButton = ({ onClick }) => {
    return (
        <button type="button" className='round-button' onClick={onClick}>
            <img src={plusIcon} alt="button" className='round-button-icon'/>
        </button>
    )
}

export default RoundButton;