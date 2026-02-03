import { IconButton, TextButton, LikeButton } from "../buttons/IconButtons/IconButton";
import backIcon from "../../assets/left.png";
import "./subheader.css";
import { useNavigate } from "react-router-dom";
import userIcon from '../../assets/user.png'
import SearchBar from "../searchBar/SearchBar";
import filterIcon from '../../assets/filters.png';

export const SubHeader = ({ 
  back=false, 
  isWriting, 
  setIsWriting, 
  onSave, 
  actionText="Save", onLike, 
  onClick, 
  onSearch, 
  filter=false, 
  deletedPage ,
  onEdit,
  filterOpen=false,
  onToggleFilter,
  sortValue="updatedAt",
  onSortChange,
  onSelectNotes,
  selectMode=false,
  groupByDate=false,
  onToggleGroupByDate
  }) => {

  const navigate = useNavigate()


  const handleSave = () => {
      if (onSave) onSave()
      if (setIsWriting) setIsWriting(false)
  }

  const goBack = () => { 
    navigate(-1) 
    handleSave()
  }

  return (
    <div className="subheader">

      {/* Left */}
      <div className="subheader-left">
        {back && <IconButton icon={backIcon} onClick={goBack} /> }
      </div>

      {/* Right */}
      <div className="subheader-right">
        {isWriting && <TextButton text={actionText} onClick={handleSave} />}
        {onLike && <LikeButton onClick={onLike} />}
        {onSearch && <SearchBar />}
        {!onLike && !filter && <IconButton onClick={onClick} icon={userIcon}/>}

        {filter && !deletedPage && (
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
        )}
        
        {deletedPage && <TextButton text={"Edit"} onClick={onEdit} />}
      </div>

    </div>
  );
};
