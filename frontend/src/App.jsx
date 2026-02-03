import { BrowserRouter, Route, Routes } from "react-router-dom";
import DeviceFrame from "./components/Frames/deviceFrame/DeviceFrame";
import LaunchPage from "./pages/LaunchPage";
import FoldersPage from "./pages/FoldersPage";
import NotesPage from "./pages/NotesPage";
import NoteEditorPage from "./pages/NoteEditorPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import "./styles/app.css";
import LogInPage from "./pages/LogInPage/LogInPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

function App() {
  return (
    <BrowserRouter>
        <DeviceFrame>
            <Routes>
              <Route path="/" element={<LaunchPage />} />
              <Route path="/login" element={<LogInPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/folders" element={<FoldersPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/deleted" element={<NotesPage deleted />} />
              <Route path="/note/:id" element={<NoteEditorPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
        </DeviceFrame>
    </BrowserRouter>
  );
}

export default App;
