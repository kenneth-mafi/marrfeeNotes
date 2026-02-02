import FolderCard from "../components/FolderCard";
import { notesData } from "../data/notesData";

export default function FoldersPage() {
  const notesCount = notesData.filter((note) => !note.deleted).length;
  const deletedCount = notesData.filter((note) => note.deleted).length;

  return (
    <div className="page">
      <div className="top-row">
        <div>
          <h1 className="page-title">Folders</h1>
          <p className="page-subtitle">Choose a space to open</p>
        </div>
        <span className="chip">Notebook</span>
      </div>

      <div className="folder-grid">
        <FolderCard title="Notes" count={notesCount} to="/notes" />
        <FolderCard title="Recently Deleted" count={deletedCount} to="/deleted" />
      </div>
    </div>
  );
}
