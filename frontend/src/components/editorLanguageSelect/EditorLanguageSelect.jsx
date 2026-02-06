import "./editorLanguageSelect.css";

const EditorLanguageSelect = ({
  id = "editor-language",
  label = "Language",
  value,
  onChange,
  options = [],
}) => {
  return (
    <div className="editor-language-select">
      <label className="editor-language-label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="editor-language-dropdown"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EditorLanguageSelect;
