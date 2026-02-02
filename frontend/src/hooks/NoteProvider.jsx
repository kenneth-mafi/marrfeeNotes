import { useEffect, useState } from "react";
import { NoteContext } from "./contexts";
import sendAPIRequest from "../API/NotedAPI";

const NoteProvider = ({ children }) => {

    const [ notes, setNotes ] = useState([]);
    const [ deletedNotes, setDeletedNotes ] = useState([]);

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
    
    return(
        <NoteContext.Provider 
            value={{}}
        >
            {children}
        </NoteContext.Provider>
    )
}
export default NoteProvider;