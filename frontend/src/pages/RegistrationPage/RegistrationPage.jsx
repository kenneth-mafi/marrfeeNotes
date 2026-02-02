import './registrationPage.css';
import { getRegistrationForm } from './registrationForm';
import FormTemplate from '../../components/forms/formTemplate/FormTemplate';
import Label from '../../components/Labels/Label';
import { useNavigate } from 'react-router-dom';
import MainPageFrame from '../../components/Frames/PageFrames/mainPageFrame/MainPageFrame';
import PageTitle from '../../components/PageTitle/PageTitle';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const proceed = () => {
        navigate("/logInPage");
    };

    const submit = async ( formData ) => {
        console.log(formData);
        
        let personNum = formData.personNummer;
        const index = 8

        if (String( personNum ).length === 12 && !String( personNum ).includes("-") ) {
           personNum = personNum.slice( 0, index ) + "-" + personNum.slice( index );
        }

        formData.personNummer = personNum;
        formData["userID"] = generateId();
        
        const ok = await sendRequest( formData, 'register' );
        console.log(ok);
        console.log(ok.success);
        console.log(ok.userData);
        if (ok?.success){
            proceed()
            return true;
        }
        else return false;
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

