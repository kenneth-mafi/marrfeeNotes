import { Link } from "react-router-dom";
import './notecard.css';
import noteIcon from '../../assets/note.png';

export default function NoteCard({ id, title, body, updatedAt }) {
  
  return (
    <Link className="note-card" to={`/note/${id}`}>
      <div className="note-icon-contr">
        <img src={noteIcon} alt="note" className="note-icon" />
      </div>
      <div className="note-details-contr">
        <h4 className="note-title">{title}</h4>
        <p className="note-preview">{body}</p>
        <div className="note-meta">
          <span>{updatedAt}</span>
        </div>
      </div>

    </Link>
  );
}
