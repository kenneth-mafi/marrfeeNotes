import './registrationPage.css';
import { getRegistrationForm } from './registrationForm';
import FormTemplate from '../../components/forms/formTemplate/FormTemplate';
import Label from '../../components/Labels/Label';
import { useNavigate } from 'react-router-dom';
import MainPageFrame from '../../components/Frames/PageFrames/mainPageFrame/MainPageFrame';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useNoteContext } from '../../hooks/useContext';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const {register} = useNoteContext();

    const submit = async ( formData ) => {
        const ok = await register(formData)
        if (ok) { navigate("/folders") }
    };

    const formContent = getRegistrationForm(submit);

    const pageContent = [
        { Component: PageTitle, props: { title: "Register", subtitle: "Create your notebook in seconds." }},
        {
            Component: FormTemplate,
            props: { formContent }
        },
        {
            Component: Label,
            props: { title: "Already have an account?", link: "Log In", to: "/logIn" }
        }
    ]

  return (
    <MainPageFrame components={pageContent} className="registration-page" effect='slideInRight'/>
  );
}

export default RegistrationPage;

