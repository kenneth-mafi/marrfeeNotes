import './notepad.css'

const Notepad = ({title, setTitle, body, setBody}) => {
    return (
        <div className="note-pad-contr">
            <input
                className='notepad-title-area'
                type="text"
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <textarea
                className='notepad-body-area'
                placeholder="Start writing..."
                value={body}
                onChange={(event) => setBody(event.target.value)}
            />
        </div>
    )
}
export default Notepad;