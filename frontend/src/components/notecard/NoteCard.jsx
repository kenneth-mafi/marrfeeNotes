import { Link } from "react-router-dom";
import './notecard.css';
import noteIcon from '../../assets/note.png';
import { getHighlightedParts } from "../../utils";

export default function NoteCard({ noteId, title, body, updatedAt, searchContent }) {
  const query = searchContent.trim();
  const parts = getHighlightedParts(body, query)
  const titleParts = getHighlightedParts(title, query)

  return (
    <Link className="note-card" to={`/note/${noteId}`}>
      <div className="note-icon-contr">
        <img src={noteIcon} alt="note" className="note-icon" />
      </div>
      <div className="note-details-contr">

        <h4 className="note-title">{titleParts.map((part, i) =>
            query && part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i}>{part}</mark>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </h4>

        <p className="note-preview">{parts.map((part, i) => 
            query && part.toLowerCase() === query.toLowerCase() ? (
              <mark key={i}>{part}</mark>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </p>

        <div className="note-meta">
          <span>{updatedAt}</span>
        </div>
      </div>

    </Link>
  );
}
