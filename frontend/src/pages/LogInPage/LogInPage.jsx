import './logInPage.css';
import { getLogInForm } from './logInForm';
import { useNavigate } from 'react-router-dom';
import MainPageFrame from '../../components/Frames/PageFrames/mainPageFrame/MainPageFrame';
import Label from '../../components/Labels/Label';
import FormTemplate from '../../components/forms/formTemplate/FormTemplate';
import PageTitle from '../../components/PageTitle/PageTitle';

const LogInPage = () => {
    const navigate = useNavigate();
    const proceed = () => {
        navigate("/homePage");
    };

    const submit = async ( formData ) => {

        console.log(formData);
        console.log("LOGIN USER DATA: ", userData);
        
        formData["userID"] = userData?.userID;
        console.log("LOGIN FORM DATA: ",formData);
        
        const data = await sendRequest( formData, 'login' );
        console.log("LOGIN FROM BACKEND: ", data);
        console.log("LOGIN FROM BACKEND: ", data?.success);
        console.log("LOGIN FROM BACKEND: ", data?.userData);
        if (data?.success){
            proceed()
        }
        else return false; 
    };

    const formContent = getLogInForm(submit);

    const pageContent = [
        { Component: PageTitle, props: {title: "Sign in"}},
        {
            Component: FormTemplate,
            props: { formContent }
        },
        {
            Component: Label,
            props: {
                title: "Don't have an account?",
                link: "Register",
                to: "/registrationPage"
            }
        }
    ]

  return (
    <MainPageFrame components={pageContent} className="digId-log-in-page" />
  );
}

export default LogInPage;