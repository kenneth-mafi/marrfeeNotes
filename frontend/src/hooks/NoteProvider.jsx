import { useEffect, useState } from "react";
import { NoteContext } from "./contexts";
import sendAPIRequest from "../API/NotedAPI";

const NoteProvider = ({ children }) => {

    const [ notes, setNotes ] = useState([]);
    const [ deletedNotes, setDeletedNotes ] = useState([]);
    const [ showAlert, setShowAlert ] = useState(false);
    const [ alertInfo, setAlertInfo ] = useState({error: false, message: ""})
    const [ isVerifying, setIsVerifying ] = useState(false)
    // const getHealth = async () => {
    //     const res = await sendAPIRequest("health")
    //     console.log(res);
    // }

    // const getTime = async () => {
    //     const res = await sendAPIRequest("time")
    //     console.log(res);
        
    // }
    
    // useEffect(() => {
    //     getHealth()
    //     getTime()
    // }, [])

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

    
    return(
        <NoteContext.Provider 
            value={{
                showAlert,
                alertInfo,
                register,
                login,
                isVerifying
            }}
        >
            {children}
        </NoteContext.Provider>
    )
}
export default NoteProvider;
