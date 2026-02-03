import { IconButton, TextButton, LikeButton } from "../buttons/IconButtons/IconButton";
import backIcon from "../../assets/left.png";
import "./subheader.css";
import { useNavigate } from "react-router-dom";
import userIcon from '../../assets/user.png'
import SearchBar from "../searchBar/SearchBar";
import filterIcon from '../../assets/filters.png';

export const SubHeader = ({ back=false, isWriting, setIsWriting, onSave, actionText="Save", onLike, onClick, onSearch, filter=false }) => {
  const navigate = useNavigate()


  const handleSave = () => {
      if (onSave) onSave()
      setIsWriting(false)
  }

  const goBack = () => { 
    navigate(-1) 
    handleSave()
  }

  return (
    <div className="subheader">

      {/* Left */}
      <div className="subheader-left">
        {back && <IconButton icon={backIcon} onClick={goBack} /> }
      </div>

      {/* Right */}
      <div className="subheader-right">
        {isWriting && <TextButton text={actionText} onClick={handleSave} />}
        {onLike && <LikeButton onClick={onLike} />}
        {onSearch && <SearchBar />}
        {!onLike && !filter && <IconButton onClick={onClick} icon={userIcon}/>}
        {filter && <IconButton icon={filterIcon} onClick={onClick} />}
      </div>

    </div>
  );
};
