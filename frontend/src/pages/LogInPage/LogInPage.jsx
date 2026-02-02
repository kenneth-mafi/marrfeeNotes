import './logInPage.css';
import { getLogInForm } from './logInForm';
import { useNavigate } from 'react-router-dom';
import MainPageFrame from '../../components/Frames/PageFrames/mainPageFrame/MainPageFrame';
import Label from '../../components/Labels/Label';
import FormTemplate from '../../components/forms/formTemplate/FormTemplate';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useNoteContext } from '../../hooks/useContext';

const LogInPage = () => {
    const navigate = useNavigate();
    const { login } = useNoteContext();
    
    const submit = async ( formData ) => {
        const ok = await login( formData )
        if (ok) { navigate("/folders")}
    };

    const formContent = getLogInForm(submit);

    const pageContent = [
        { Component: PageTitle, props: {title: "Sign in", subtitle: "Welcome back to your notebook."}},
        {
            Component: FormTemplate,
            props: { formContent }
        },
        {
            Component: Label,
            props: {
                title: "Don't have an account?",
                link: "Register",
                to: "/register"
            }
        }
    ]

  return (
    <MainPageFrame components={pageContent} className="log-in-page" effect='slideInLeft'/>
  );
}

export default LogInPage;

