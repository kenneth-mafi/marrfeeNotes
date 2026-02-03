import { useEffect, useState } from "react";
import { NoteContext } from "./contexts";
import sendAPIRequest from "../API/NotedAPI";

const NoteProvider = ({ children }) => {

    const [ notes, setNotes ] = useState([]);
    const [ deletedNotes, setDeletedNotes ] = useState([]);
    const [ showAlert, setShowAlert ] = useState(false);
    const [ alertInfo, setAlertInfo ] = useState({error: false, message: ""})
    const [ isVerifying, setIsVerifying ] = useState(false)

    useEffect(() => { 
        fetchNotes()
    }, [])

    const saveToken = (token) => {
        if (!token) return;
        localStorage.setItem("access_token", token);
    };

    const showError = (message) => {
        setAlertInfo({ error: true, message });
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
            setAlertInfo({ error: false, message: "" });
        }, 2000);
    };

    const handleAuthResponse = async (res, fallbackMessage) => {
        if (!res?.success || !res?.access_token) {
            showError(res?.error || fallbackMessage);
            return false;
        }

        saveToken(res.access_token);
        await fetchNotes();
        return true;
    };

    const register = async (userData) => {
        setIsVerifying(true);
        try {
            const res = await sendAPIRequest("register", userData, "POST");
            return await handleAuthResponse(res, "Registration failed");
        } finally {
            setIsVerifying(false);
        }
    };

    const login = async (userData) => {
        setIsVerifying(true);
        try {
            const res = await sendAPIRequest("login", userData, "POST");
            return await handleAuthResponse(res, "Login failed");
        } finally {
            setIsVerifying(false);
        }
    };



    const createNote = async ( noteData ) => {
        const access_token = localStorage.getItem("access_token")
        const res = await sendAPIRequest("notes", noteData, "POST", access_token);
        if (!res?.success) { 
            console.log(res.error);
            await fetchNotes()
            return;
        }
        await fetchNotes()
        return res?.note_id      

    }

    const fetchNotes = async () => {
        const access_token = localStorage.getItem("access_token")
        const res = await sendAPIRequest("active-notes", {}, "GET", access_token);
        if (!res?.success) { 
            console.log(res.error);
            return [];
        }
        setNotes(res.rows)
    }

    const getNoteById = (id) => {
        return notes.find(note => note.noteId === id)
    }

     
    const updateNote = async ( noteData ) => {
        const access_token = localStorage.getItem("access_token")
        const res = await sendAPIRequest("notes", noteData, "PATCH", access_token);
        if (!res?.success) { 
            console.log(res.error);
            await fetchNotes()
            return;
        }
        await fetchNotes()
        return res?.note_id          
    }
    
    
    return(
        <NoteContext.Provider 
            value={{
                showAlert,
                alertInfo,
                register,
                login,
                isVerifying,
                createNote,
                updateNote,
                notes,
                deletedNotes,
                getNoteById
            }}
        >
            {children}
        </NoteContext.Provider>
    )
}
export default NoteProvider;
