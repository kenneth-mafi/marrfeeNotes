import './notepad.css'

const Notepad = ({title, setTitle, body, setBody, setIsWriting}) => {
    return (
        <div className="note-pad-contr">
            <textarea
                className='notepad-title-area'
                rows={1}
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                onInput={(event) => {
                    event.currentTarget.style.height = "auto";
                    event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
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
