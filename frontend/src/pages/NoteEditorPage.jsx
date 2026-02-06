import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SubHeader } from "../components/subheader/Subheader";
import Notepad from "../components/Notepad/Notepad";
import MainPageFrame from "../components/Frames/PageFrames/mainPageFrame/MainPageFrame";
import { useNoteContext } from "../hooks/useContext";
import EditorLanguageSelect from "../components/editorLanguageSelect/EditorLanguageSelect";
import "./noteEditorPage.css";

export default function NoteEditorPage() {
  const { id } = useParams();
  const { createNote, getNoteById, updateNote } = useNoteContext();

  const note = useMemo(() => {
    if (id === "new") return null;
    return getNoteById(id);
  }, [id]);


  const [title, setTitle] = useState(note?.title || "");
  const [body, setBody] = useState(note?.body || "");
  const [isWriting, setIsWriting] = useState(false)
  const [noteId, setNoteId] = useState(id === "new" ? null : id);
  const [language, setLanguage] = useState("text");

  useEffect(() => {
    if (note?.isCode) {
      setLanguage((prev) => (prev === "text" ? "sql" : prev));
    }
  }, [note?.isCode]);

  const languageOptions = [
    { value: "text", label: "Text" },
    { value: "sql", label: "SQL" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
  ];

  const saveNote = async () => {
      const trimmedTitle = title.trim();
      const trimmedBody = body.trim();
      const isCodeNote = language !== "text";

      if (isCodeNote && !trimmedBody) return;
      if (!isCodeNote && !(trimmedTitle || trimmedBody)) return;

      const payload = {
        title: trimmedTitle || "No Title",
        body: trimmedBody || "No additional text",
        is_code: isCodeNote,
      };

      // CREATE (first save)
      if (!noteId) {
        const createdId = await createNote(payload); // make it return note_id
        if (createdId) setNoteId(createdId);
        return;
      }

      // UPDATE (all later saves)
      const updatePayload = {
        ...payload,
        "note_id": noteId
      }
      await updateNote(updatePayload);
  }

  const pageContent = [
    { Component: SubHeader, props: {back: true, isWriting: isWriting, setIsWriting: setIsWriting, onLike: "s", onSave: saveNote} },
    {
      Component: EditorLanguageSelect,
      props: {
        id: "note-language",
        label: "Note type",
        value: language,
        onChange: (event) => setLanguage(event.target.value),
        options: languageOptions,
      },
    },
    { Component: Notepad, 
      props: {
        title: title,
        setTitle: setTitle,
        body: body,
        setBody: setBody,
        setIsWriting: setIsWriting,
        bodyLanguage: language,
      }
    }
  ]

  return <MainPageFrame components={pageContent} className="page note-editor-page" effect="slideInRight"/>
}
