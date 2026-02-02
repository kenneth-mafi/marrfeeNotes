import { WideButton } from "../../components/buttons/wideButton/WideButton";
import InputField from "../../components/forms/formFields/InputField";


export function getLogInForm(func) {
    const formContent = {
      
      default: [
      { name: "username", value: "" },
      { name: "password", value: "" },
    ],

    validation: {
      email: { required: true },
      password: { required: true }
    },

      fields: [
        {
          Component: InputField,
          props: {
            type: "text",
            name: "username",
            label: "Username *",
            placeholder: "Enter username",
            id: "2loh3wpppinqwqpq54"
          }
        },
        {
          Component: InputField,
          props: {
            type: "password",
            name: "password",
            label: "Password *",
            placeholder: "Enter your password",
            id: "234lk7ywswxedniqw1"
          }
        }
      ],
      buttonData: {
        Component: WideButton,
        text: "Log In"
      },
      onSubmit: func
    }  

    return formContent;
}