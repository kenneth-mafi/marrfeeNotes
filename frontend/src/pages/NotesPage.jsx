import { Link } from "react-router-dom";
import NoteCard from "../components/notecard/NoteCard";
import { notesData } from "../data/notesData";
import { SubHeader } from "../components/subheader/Subheader";
import { ColumnGrid } from "../components/GridContainers/ColumnGrid";
import PageTitle from "../components/PageTitle/PageTitle";
import MainPageFrame from "../components/Frames/PageFrames/mainPageFrame/MainPageFrame";

export default function NotesPage({ deleted = false }) {
  const filteredNotes = notesData.filter((note) =>
    deleted ? note.deleted : !note.deleted
  );
  const pageContent = [
    { Component: SubHeader },
    { Component: PageTitle, 
      props: { 
        title: deleted ? "Recently Deleted" : "Notes",
        subtitle: deleted ? "Not gone forever… yet." : "Ideas live here."
      }
    },
    { Component: ColumnGrid, props: { items: filteredNotes, Component: NoteCard} }
  ]
  return <MainPageFrame components={pageContent} className="page" effect="slideInLeft"/>
}
