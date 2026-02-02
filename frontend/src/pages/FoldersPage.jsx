import FolderCard from "../components/folderCard/FolderCard";
import { ColumnGrid } from "../components/GridContainers/ColumnGrid";
import PageTitle from "../components/PageTitle/PageTitle";
import { SubHeader } from "../components/subheader/Subheader";
import { notesData } from "../data/notesData";
import deletedImg from '../assets/rubbish-bin.png';
import notesImg from '../assets/notepad.png';
import MainPageFrame from "../components/Frames/PageFrames/mainPageFrame/MainPageFrame";

export default function FoldersPage() {
  const notesCount = notesData.filter((note) => !note.deleted).length;
  const deletedCount = notesData.filter((note) => note.deleted).length;

  const gridItems = [
    {title: "My Notes", count: notesCount, image: notesImg, to: "/notes"},
    {title: "Recently Deleted", count: deletedCount, image: deletedImg, to: "/deleted"}
  ]
  const pageContent = [
    { Component: SubHeader },
    { Component: PageTitle, props: {
        title: "Folders",
        subtitle: "Catch your ideas before they escape."
    }},
    {Component: ColumnGrid, props: {items: gridItems, Component: FolderCard }}
  ]
  return <MainPageFrame components={pageContent} className="page folders-page" effect="slideInLeft" />

}
