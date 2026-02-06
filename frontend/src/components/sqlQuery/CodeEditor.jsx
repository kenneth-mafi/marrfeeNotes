import "./codeEditor.css";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";

const LANGUAGE_CONFIG = {
  sql: {
    label: "SQL Query",
    placeholder: "Write your SQL query here...",
    extension: sql(),
  },
  javascript: {
    label: "JavaScript",
    placeholder: "Write your JavaScript here...",
    extension: javascript({ jsx: true }),
  },
  python: {
    label: "Python",
    placeholder: "Write your Python here...",
    extension: python(),
  },
};

const CodeEditor = ({
  value = "",
  onChange,
  language = "sql",
  label,
  placeholder,
  showLabel = true,
  className = "",
  setIsCoding
}) => {
  const config = LANGUAGE_CONFIG[language] || LANGUAGE_CONFIG.sql;
  const resolvedLabel = label ?? config.label;
  const resolvedPlaceholder = placeholder ?? config.placeholder;
  const rootClassName = ["code-editor", className].filter(Boolean).join(" ");

  return (
    <div className={rootClassName}>
      {showLabel && <label className="code-editor-label">{resolvedLabel}</label>}
      <CodeMirror
        className="code-editor-input"
        placeholder={resolvedPlaceholder}
        value={value}
        extensions={[config.extension]}
        onChange={(nextValue) => onChange?.(nextValue)}
        onFocus={() => { setIsCoding(true) }}
      />
    </div>
  );
};

export default CodeEditor;
