import { Link, useNavigate } from "react-router-dom";
import NoteCard from "../components/notecard/NoteCard";
import { SubHeader } from "../components/subheader/Subheader";
import { ColumnGrid } from "../components/GridContainers/ColumnGrid";
import PageTitle from "../components/PageTitle/PageTitle";
import MainPageFrame from "../components/Frames/PageFrames/mainPageFrame/MainPageFrame";
import BottomNav from "../components/BottomNav/BottomNav";
import ScrollArea from "../components/ScrollArea/ScrollArea";
import { useNoteContext } from "../hooks/useContext";
import { useEffect, useState } from "react";
import { filterNotesBy } from "../utils";
import ActionMenu from "../components/actionMenu/ActionMenu";

export default function NotesPage({ deleted = false }) {
    const navigate = useNavigate();
    const currentFilter = localStorage.getItem("filter") || "updatedAt";
    const currentTypeFilter = localStorage.getItem("typeFilter") || "all";

    const [filter, setFilter] = useState(currentFilter);
    const [typeFilter, setTypeFilter] = useState(currentTypeFilter);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [groupByDate, setGroupByDate] = useState(false);
    const [selectMode, setSelectMode] = useState(false);
    const [searchContent, setSearchContent] = useState("");
    const [showActionMenu, setShowActionMenu] = useState(false);

    const { notes, deletedNotes} = useNoteContext();
    
    const noteData = !deleted
      ? filterNotesBy(notes, filter, searchContent, typeFilter)
      : deletedNotes;
    
    const deletedPageSubtitle = deletedNotes.length === 0 ? "No notes here" : "Not gone forever… yet.";
    const notesPageSubtitle = notes.length === 0 ? "No notes here" : "Ideas live here.";

    const showBottomNav = deleted ? false : true;



    useEffect(() => {
      localStorage.setItem("filter", filter);
    }, [filter]);

    useEffect(() => {
      localStorage.setItem("typeFilter", typeFilter);
    }, [typeFilter]);


    const handleNewNote = () => {
      setShowActionMenu(false);
      navigate("/note/new")
    };

    const handleCodeWorkbench = () => {
      setShowActionMenu(false);
      navigate("../workbench");
    };

    const toggleActionMenu = () => {
      setShowActionMenu((prev) => !prev);
    };

    const toggleFilterMenu = () => {
      setIsFilterOpen((prev) => !prev);
    };

    const handleSortChange = (event) => {
      setFilter(event.target.value);
    };

    const handleTypeChange = (event) => {
      setTypeFilter(event.target.value);
    };

    const handleSearchChange = (event) => {
      setFilter("search")
      setSearchContent(event.target.value);
    };

    const toggleGroupByDate = () => {
      setGroupByDate((prev) => !prev);
    };

    const toggleSelectMode = () => {
      setSelectMode((prev) => !prev);
    };

    const actionMenuItems = [
      { id: "new-note", label: "New Note", onClick: handleNewNote },
      { id: "code-workbench", label: "Code Workbench", onClick: handleCodeWorkbench },
    ];

    const pageContent = [
      { 
        Component: SubHeader, 
        props: { 
          back: true,
          onBack: () => navigate("/folders"),
          onSearch: "s", 
          filter: true, 
          deletedPage: deleted,
          filterOpen: isFilterOpen,
          onToggleFilter: toggleFilterMenu,
          sortValue: filter,
          onSortChange: handleSortChange,
          typeValue: typeFilter,
          onTypeChange: handleTypeChange,
          onSelectNotes: toggleSelectMode,
          selectMode: selectMode,
          groupByDate: groupByDate,
          onToggleGroupByDate: toggleGroupByDate,
          onSearchChange: handleSearchChange,
          searchContent: searchContent
        } 
      },
      { Component: PageTitle, 
        props: { 
          title: deleted ? "Recently Deleted" : "Notes",
          subtitle: deleted ? deletedPageSubtitle : notesPageSubtitle
        }
      },
      {
        Component: () => (
          <ScrollArea>
            <ColumnGrid items={noteData} searchContent={searchContent} deleted={deleted} Component={NoteCard} />
          </ScrollArea>
        )
      },
      { Component: ActionMenu, props: { open: showActionMenu && showBottomNav, actions: actionMenuItems } },
      { Component: BottomNav, props: {onClick: toggleActionMenu, show: showBottomNav} }
    ]
    return <MainPageFrame components={pageContent} className="page notes-page" effect="slideInLeft"/>
}
