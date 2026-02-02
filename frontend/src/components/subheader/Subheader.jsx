import { IconButton, TextButton, LikeButton } from "../buttons/IconButtons/IconButton";
import backIcon from "../../assets/left.png";
import "./subheader.css";

export const SubHeader = ({ onBack, onSave, actionText = "Save", onLike }) => {
  return (
    <div className="subheader">

      {/* Left */}
      <div className="subheader-left">
        <IconButton icon={backIcon} onClick={onBack} />
      </div>

      {/* Right */}
      <div className="subheader-right">
        <TextButton text={actionText} onClick={onSave} />
        <LikeButton onClick={onLike} />
      </div>

    </div>
  );
};
