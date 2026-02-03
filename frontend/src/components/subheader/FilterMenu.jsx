import { IconButton } from "../buttons/IconButtons/IconButton";
import filterIcon from "../../assets/filters.png";

export default function FilterMenu({
  filterOpen = false,
  onToggleFilter,
  onClick,
  sortValue = "updatedAt",
  onSortChange,
  onSelectNotes,
  selectMode = false,
  groupByDate = false,
  onToggleGroupByDate,
}) {
  return (
    <div className="filter-menu-wrapper">
      <IconButton icon={filterIcon} onClick={onToggleFilter || onClick} />
      <div className={`filter-menu ${filterOpen ? "open" : ""}`}>
        <button type="button" className="filter-menu-btn" onClick={onSelectNotes}>
          {selectMode ? "Cancel selection" : "Select notes"}
        </button>
        <div className="filter-menu-row">
          <span className="filter-menu-label">Sort by</span>
          <select
            className="filter-menu-select"
            value={sortValue}
            onChange={onSortChange}
          >
            <option value="updatedAt">Date Edited</option>
            <option value="createdAt">Date Created</option>
            <option value="title">Title</option>
          </select>
        </div>
        <button type="button" className="filter-menu-btn" onClick={onToggleGroupByDate}>
          {groupByDate ? "Ungroup by date" : "Group by date"}
        </button>
      </div>
    </div>
  );
}
