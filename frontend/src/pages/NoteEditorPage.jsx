import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SubHeader } from "../components/subheader/Subheader";
import Notepad from "../components/Notepad/Notepad";
import MainPageFrame from "../components/Frames/PageFrames/mainPageFrame/MainPageFrame";
import { useNoteContext } from "../hooks/useContext";

export default function NoteEditorPage() {
  const { id } = useParams();
  const { createNote, getNoteById } = useNoteContext();

  const note = useMemo(() => {
    if (id === "new") return null;
    return getNoteById(id);
  }, [id]);


  const [title, setTitle] = useState(note?.title || "");
  const [body, setBody] = useState(note?.body || "");
  const [isWriting, setIsWriting] = useState(false)
  const [noteId, setNoteId] = useState(id === "new" ? null : id);

  const saveNote = async () => {
     if (!(title.trim() || body.trim())) return;


      const payload = {
        title: title.trim() || "No Title",
        body: body.trim() || "No additional text",
      };

      // CREATE (first save)
      if (!noteId) {
        const createdId = await createNote(payload); // make it return note_id
        if (createdId) setNoteId(createdId);
        return;
      }

      // UPDATE (all later saves)
      // await updateNote(noteId, payload);
  }

  const pageContent = [
    { Component: SubHeader, props: {back: true, isWriting: isWriting, onLike: "s", onSave: saveNote} },
    { Component: Notepad, 
      props: { title: title, setTitle: setTitle, body: body, setBody: setBody, setIsWriting: setIsWriting }
    }
  ]

  return <MainPageFrame components={pageContent} className="page" effect="slideInRight"/>
}
