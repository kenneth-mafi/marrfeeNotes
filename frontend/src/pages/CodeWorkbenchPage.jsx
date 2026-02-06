import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubHeader } from "../components/subheader/Subheader";
import CodeEditor from "../components/sqlQuery/CodeEditor";
import CodeResultsPanel from "../components/sqlQuery/CodeResultsPanel";
import "./codeWorkbenchPage.css";
import MainPageFrame from "../components/Frames/PageFrames/mainPageFrame/MainPageFrame";
import EditorLanguageSelect from "../components/editorLanguageSelect/EditorLanguageSelect";

const CodeWorkbenchPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isCoding, setIsCoding]  = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [language, setLanguage] = useState("sql");
  
  const languageOptions = [
    { value: "sql", label: "SQL" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
  ];

  const pageContent = [
    {
      Component: SubHeader,
      props: {
        isCoding: isCoding,
        exit: true,
        onExit: () => navigate("../notes"),
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
