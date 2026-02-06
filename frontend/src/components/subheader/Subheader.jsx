import { IconButton, TextButton, LikeButton } from "../buttons/IconButtons/IconButton";
import backIcon from "../../assets/left.png";
import "./subheader.css";
import { useNavigate } from "react-router-dom";
import userIcon from '../../assets/user.png'
import SearchBar from "../searchBar/SearchBar";
import FilterMenu from "./FilterMenu";


const ExitIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M6 6l12 12M18 6l-12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const PlayIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M8 5l12 7-12 7z" fill="currentColor" />
  </svg>
);


export const SubHeader = ({ 
  back=false, 
  exit=false,
  onExit,
  play=false,
  onPlay,
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
  onToggleGroupByDate,
  searchContent,
  onSearchChange,
  isCoding
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
        {exit && (
          <IconButton onClick={onExit} ariaLabel="Exit">
            <ExitIcon className="icon-button-icon" />
          </IconButton>
        )}
      </div>

      {/* Right */}
      <div className="subheader-right">
        {play && (
          <IconButton onClick={onPlay} ariaLabel="Run query">
            <PlayIcon className="icon-button-icon" />
          </IconButton>
        )}
        {isWriting || isCoding && <TextButton text={actionText} onClick={handleSave} />}
        {onLike && <LikeButton onClick={onLike} />}
        {onSearch && <SearchBar searchContent={searchContent}  onSearchChange={onSearchChange}/>}
        {!onLike && !filter &&  <IconButton onClick={onClick} icon={userIcon}/>}

        {filter && !deletedPage && (
          <FilterMenu
            filterOpen={filterOpen}
            onToggleFilter={onToggleFilter}
            onClick={onClick}
            sortValue={sortValue}
            onSortChange={onSortChange}
            onSelectNotes={onSelectNotes}
            selectMode={selectMode}
            groupByDate={groupByDate}
            onToggleGroupByDate={onToggleGroupByDate}
          />
        )}

        {deletedPage && <TextButton text={"Edit"} onClick={onEdit} />}
      </div>

    </div>
  );
};
