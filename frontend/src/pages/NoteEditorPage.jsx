import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getNoteById } from "../data/notesData";
import { SubHeader } from "../components/subheader/Subheader";
import Notepad from "../components/Notepad/Notepad";
import MainPageFrame from "../components/Frames/PageFrames/mainPageFrame/MainPageFrame";

export default function NoteEditorPage() {
  const { id } = useParams();
  

  const note = useMemo(() => {
    if (id === "new") return null;
    return getNoteById(id);
  }, [id]);

  const [title, setTitle] = useState(note?.title || "");
  const [body, setBody] = useState(note?.body || "");

  const pageContent = [
    { Component: SubHeader, props: {back: true} },
    { Component: Notepad, 
      props: { title: title, setTitle: setTitle, body: body, setBody: setBody }
    }
  ]

  return <MainPageFrame components={pageContent} className="page" effect="slideInRight"/>
}
