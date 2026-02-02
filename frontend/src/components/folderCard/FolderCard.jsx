import { Link } from "react-router-dom";
import notesImg from '../../assets/notepad.png';
import deletedImg from '../../assets/rubbish-bin.png';
import './folderCard.css';

export default function FolderCard({ title, count, image, to }) {
  return (
    <Link className="folder-card" to={to}>
      <div className="folder-details-contr">
        <div>
          <h3 className="folder-card-title">{title}</h3>
          <p className="folder-card-subtitle">Ideas live here.</p>
        </div>
        <div className="folder-count">{count}</div>
      </div>
      <div className="folder-img-contr">
        <img src={image} alt="image" className="folder-img" />
      </div>

    </Link>
  );
}
