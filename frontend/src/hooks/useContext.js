import { useContext } from "react";
import { NoteContext } from "./contexts";

export const useNoteContext = () => useContext(NoteContext);