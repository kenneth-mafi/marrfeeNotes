import { useEffect, useRef } from "react";
import './notepad.css'

const Notepad = ({title, setTitle, body, setBody, setIsWriting}) => {
    const titleRef = useRef(null);

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
            <textarea
                className='notepad-body-area'
                placeholder="Just start typing…"
                value={body}
                onFocus={() => {setIsWriting?.(true);}}
                onChange={(event) => setBody(event.target.value)}
            />
        </div>
    )
}
export default Notepad;
