import { Link } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import { notesData } from "../data/notesData";

export default function NotesPage({ deleted = false }) {
  const filteredNotes = notesData.filter((note) =>
    deleted ? note.deleted : !note.deleted
  );

  return (
    <div className="page notebook-surface">
      <div className="top-row">
        <div>
          <h1 className="page-title">{deleted ? "Recently Deleted" : "Notes"}</h1>
          <p className="page-subtitle">
            {deleted ? "Notes removed in the last 30 days" : "All of your notes"}
          </p>
        </div>
        <Link className="chip" to="/folders">
          Back
        </Link>
      </div>

      <div className="notes-header">
        <span className="page-subtitle">
          {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"}
        </span>
        <Link className="chip" to="/note/new">
          New
        </Link>
      </div>

      <div className="notes-grid">
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
