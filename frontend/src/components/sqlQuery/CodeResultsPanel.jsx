import "./codeResultsPanel.css";

const CodeResultsPanel = ({ open = false, onClose, value = "" }) => {
  return (
    <div className={`code-results-panel ${open ? "is-open" : ""}`}>
      <div className="code-results-header">
        <span>Results</span>
        <button type="button" className="code-results-close" onClick={onClose}>
          Close
        </button>
      </div>
      <textarea
        className="code-results-output"
        readOnly
        value={value || "Query results will appear here."}
      />
    </div>
  );
};

export default CodeResultsPanel;
