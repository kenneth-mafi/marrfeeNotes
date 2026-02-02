import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getNoteById } from "../data/notesData";

export default function NoteEditorPage() {
  const { id } = useParams();

  const note = useMemo(() => {
    if (id === "new") return null;
    return getNoteById(id);
  }, [id]);

  const [title, setTitle] = useState(note?.title || "");
  const [body, setBody] = useState(note?.body || "");

  return (
    <div className="page notebook-surface">
      <div className="editor-topbar">
        <Link className="chip" to="/notes">
          Back
        </Link>
        <div className="icon-row">
          <button className="icon-btn" type="button" aria-label="Checklist">
            ✓
          </button>
          <button className="icon-btn" type="button" aria-label="Favorite">
            ♡
          </button>
          <button className="icon-btn" type="button" aria-label="Share">
            ↗
          </button>
        </div>
      </div>

      <div className="note-editor">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          placeholder="Start writing..."
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </div>
    </div>
  );
}
