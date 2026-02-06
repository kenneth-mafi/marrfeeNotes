import { useEffect, useRef } from "react";
import "./notepad.css";
import CodeEditor from "../sqlQuery/CodeEditor";

const CODE_LANGUAGE_LABELS = {
    sql: "SQL",
    javascript: "JavaScript",
    python: "Python",
};

const Notepad = ({ title, setTitle, body, setBody, setIsWriting, bodyLanguage = "text" }) => {
    const titleRef = useRef(null);
    const isCodeNote = bodyLanguage !== "text";
    const codeLabel = CODE_LANGUAGE_LABELS[bodyLanguage] || "Code";
    const codePlaceholder = `Write your ${codeLabel} here...`;

    const resizeTitle = () => {
        if (!titleRef.current) return;
        titleRef.current.style.height = "auto";
        titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    };

    useEffect(() => {
        resizeTitle();
    }, [title]);

    return (
        <div className="note-pad-contr">
            <textarea
                ref={titleRef}
                className='notepad-title-area'
                rows={1}
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                onInput={(event) => {
                    resizeTitle();
                }}
                onFocus={() => {setIsWriting?.(true);}}
            />
            {isCodeNote ? (
                <CodeEditor
                    value={body}
                    onChange={(nextValue) => {
                        setBody(nextValue);
                        setIsWriting?.(true);
                    }}
                    language={bodyLanguage}
                    placeholder={codePlaceholder}
                    showLabel={false}
                    className="notepad-code-editor"
                    onFocus={() => {setIsWriting?.(true);}}
                />
            ) : (
                <textarea
                    className='notepad-body-area'
                    placeholder="Just start typing…"
                    value={body}
                    onFocus={() => {setIsWriting?.(true);}}
                    onChange={(event) => {
                        setBody(event.target.value);
                        setIsWriting?.(true);
                    }}
                />
            )}
        </div>
    )
}
export default Notepad;
