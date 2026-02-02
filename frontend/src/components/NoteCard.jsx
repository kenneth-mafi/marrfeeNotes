import { Link } from "react-router-dom";

export default function NoteCard({ note }) {
  return (
    <Link className="note-card" to={`/note/${note.id}`}>
      <h4 className="note-title">{note.title}</h4>
      <p className="note-preview">{note.body}</p>
      <div className="note-meta">
        <span>{note.updatedAt}</span>
        <span>{note.deleted ? "Deleted" : "Note"}</span>
      </div>
    </Link>
  );
}
