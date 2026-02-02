import { useEffect, useState } from "react";
import { NoteContext } from "./contexts";
import sendAPIRequest from "../API/NotedAPI";

const NoteProvider = ({ children }) => {

    const [ notes, setNotes ] = useState([]);
    const [ deletedNotes, setDeletedNotes ] = useState([]);
    const [ showAlert, setShowAlert ] = useState(false);
    const [ alertInfo, setAlertInfo ] = useState({error: false, message: ""})
    const [ isVerifying, setIsVerifying ] = useState(false)


    const saveToken = (token) => {
        if (!token) return;
        localStorage.setItem("access_token", token);
    };

    const register = async ( userData ) => {
        setIsVerifying(true)
        const res = await sendAPIRequest("register", userData, "POST")

        if (!res?.success || !res?.access_token) {
            setAlertInfo({
                error: true,
                message: res.error || "Registration failed"
            })

            setShowAlert(true)

            // auto-hide after 2s
            setTimeout(() => {
                setShowAlert(false)
                setAlertInfo({ error: false, message: "" })
            }, 2000)
            setIsVerifying(false)
            return false
        }
        saveToken(res.access_token)
        console.log("✅");
        setIsVerifying(false)
        return true;
    }

    const login = async ( userData ) => {
        setIsVerifying(true)
        const res = await sendAPIRequest("login", userData, "POST")
        if (!res?.success || !res?.access_token) {
            setAlertInfo({
                error: true,
                message: res.error || "Login failed"
            })

            setShowAlert(true)

            // auto-hide after 2s
            setTimeout(() => {
                setShowAlert(false)
                setAlertInfo({ error: false, message: "" })
            }, 2000)
            setIsVerifying(false)
            return false;
        }
        saveToken(res.access_token)
        console.log("✅");
        setIsVerifying(false)
        return true;

    }

    const fetchNotes = async () => {
        const access_token = localStorage.getItem("access_token")
        const res = await sendAPIRequest("active-notes", {}, "GET", access_token);
        if (!res?.success) { 
            console.log(res.error);
            return [];
        }
        // return res?.rows
        console.log(res.rows);
    }

    const createNote = async ( noteData ) => {
        const access_token = localStorage.getItem("access_token")
        const res = await sendAPIRequest("notes", noteData, "POST", access_token);
        if (!res?.success) { 
            console.log(res.error);
            return;
        }
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
                createNote
            }}
        >
            {children}
        </NoteContext.Provider>
    )
}
export default NoteProvider;
