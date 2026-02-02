import { Link } from "react-router-dom";

export default function FolderCard({ title, count, to }) {
  return (
    <Link className="folder-card" to={to}>
      <div>
        <h3>{title}</h3>
        <p className="page-subtitle">Tap to view</p>
      </div>
      <span className="folder-count">{count}</span>
    </Link>
  );
}
