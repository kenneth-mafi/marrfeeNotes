import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubHeader } from "../components/subheader/Subheader";
import CodeEditor from "../components/sqlQuery/CodeEditor";
import CodeResultsPanel from "../components/sqlQuery/CodeResultsPanel";
import "./codeWorkbenchPage.css";
import MainPageFrame from "../components/Frames/PageFrames/mainPageFrame/MainPageFrame";
import EditorLanguageSelect from "../components/editorLanguageSelect/EditorLanguageSelect";
import { useNoteContext } from "../hooks/useContext";

const CodeWorkbenchPage = () => {
  const navigate = useNavigate();
  const { createNote, updateNote } = useNoteContext();
  const [code, setCode] = useState("");
  const [isCoding, setIsCoding]  = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [language, setLanguage] = useState("sql");
  const [noteId, setNoteId] = useState(null);
  
  const languageOptions = [
    { value: "sql", label: "SQL" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
  ];
  const languageLabel = useMemo(() => {
    return languageOptions.find((option) => option.value === language)?.label || "Code";
  }, [language, languageOptions]);

  const saveCodeNote = async () => {
    const trimmedCode = code.trim();
    if (!trimmedCode) return;

    const payload = {
      title: `${languageLabel} Snippet`,
      body: trimmedCode,
      is_code: true,
    };

    if (!noteId) {
      const createdId = await createNote(payload);
      if (createdId) setNoteId(createdId);
      return;
    }

    await updateNote({ ...payload, note_id: noteId });
  };

  const handleExit = async () => {
    await saveCodeNote();
    navigate("../notes");
  };

  const pageContent = [
    {
      Component: SubHeader,
      props: {
        isCoding: isCoding,
        exit: true,
        onExit: handleExit,
        play: true,
        onPlay: () => setShowResults(true),
      },
    },
    {
      Component: EditorLanguageSelect,
      props: {
        id: "code-workbench-language",
        label: "Language",
        value: language,
        onChange: (event) => setLanguage(event.target.value),
        options: languageOptions,
      },
    },
    {
      Component: CodeEditor,
      props: { value: code, onChange: setCode, language: language, setIsCoding: setIsCoding },
    },
    {
      Component: CodeResultsPanel,
      props: { open: showResults, onClose: () => setShowResults(false) },
    },
  ];

  return (
    <MainPageFrame
      components={pageContent}
      className="page code-workbench-page"
      effect="slideInRight"
    />
  );
};

export default CodeWorkbenchPage;
