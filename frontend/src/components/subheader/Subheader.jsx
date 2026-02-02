import { IconButton, TextButton, LikeButton } from "../buttons/IconButtons/IconButton";
import backIcon from "../../assets/left.png";
import "./subheader.css";
import { useNavigate } from "react-router-dom";
import userIcon from '../../assets/user.png'
import SearchBar from "../searchBar/SearchBar";
export const SubHeader = ({ back=false, isWriting, onSave, actionText="Save", onLike, onClick, onSearch }) => {
  const navigate = useNavigate()
  const goBack = () => { navigate(-1) }
  return (
    <div className="subheader">

      {/* Left */}
      <div className="subheader-left">
        {back && <IconButton icon={backIcon} onClick={goBack} /> }
      </div>

      {/* Right */}
      <div className="subheader-right">
        {isWriting && <TextButton text={actionText} onClick={onSave} />}
        {onLike && <LikeButton onClick={onLike} />}
        {onSearch && <SearchBar />}
        {!onLike && <IconButton onClick={onClick} icon={userIcon}/>}
      </div>

    </div>
  );
};
