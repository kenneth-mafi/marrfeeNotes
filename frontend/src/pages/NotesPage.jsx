import { Link, useNavigate } from "react-router-dom";
import NoteCard from "../components/notecard/NoteCard";
import { notesData } from "../data/notesData";
import { SubHeader } from "../components/subheader/Subheader";
import { ColumnGrid } from "../components/GridContainers/ColumnGrid";
import PageTitle from "../components/PageTitle/PageTitle";
import MainPageFrame from "../components/Frames/PageFrames/mainPageFrame/MainPageFrame";
import BottomNav from "../components/BottomNav/BottomNav";
import ScrollArea from "../components/ScrollArea/ScrollArea";

export default function NotesPage({ deleted = false }) {

  const filteredNotes = notesData.filter((note) =>
    deleted ? note.deleted : !note.deleted
  );
  
  const deletedPageSubtitle = filteredNotes.length === 0 ? "No notes here" : "Not gone forever… yet.";
  const notesPageSubtitle = filteredNotes.length === 0 ? "No notes here" : "Ideas live here.";

  const showBottomNav = deleted ? false : true;

  const pageContent = [
    { Component: SubHeader, props: {back: true, onSearch: "s", filter: true } },
    { Component: PageTitle, 
      props: { 
        title: deleted ? "Recently Deleted" : "Notes",
        subtitle: deleted ? deletedPageSubtitle : notesPageSubtitle
      }
    },
    {
      Component: () => (
        <ScrollArea>
          <ColumnGrid items={filteredNotes} Component={NoteCard} />
        </ScrollArea>
      )
    },
    { Component: BottomNav, props: {show: showBottomNav} }
  ]
  return <MainPageFrame components={pageContent} className="page notes-page" effect="slideInLeft"/>
}
