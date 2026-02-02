import './notepad.css'

const Notepad = ({title, setTitle, body, setBody, setIsWriting}) => {
    return (
        <div className="note-pad-contr">
            <input
                className='notepad-title-area'
                type="text"
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
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