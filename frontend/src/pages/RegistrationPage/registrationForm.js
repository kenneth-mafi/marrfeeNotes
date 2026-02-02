import { WideButton } from "../../components/buttons/wideButton/WideButton";
import InputField from "../../components/forms/formFields/InputField";

export function getRegistrationForm(func) {
    const formContent = {
      
      default: [
      { name: "email", value: "" },
      { name: "username", value: "" },
      { name: "password", value: "" },
    ],

    validation: {
      email: { required: true },
      username: { required: true, minLen: 8 },
      password: { required: true, minLen: 8 }
    },

      fields: [
        {
          Component: InputField,
          props: {
            type: "email",
            name: "email",
            label: "Email *",
            placeholder: "Enter email",
            id: "2loh3wqwqpq54"
          }
        },
        {
          Component: InputField,
          props: {
            type: "text",
            name: "username",
            label: "Username *",
            placeholder: "Choose a username",
            id: "2lohew3wqwqpo10982pon2pq54"
          }
        },
        {
          Component: InputField,
          props: {
            type: "password",
            name: "password",
            label: "Password *",
            placeholder: "Choose a password",
            id: "234lkedniqw1"
          }
        }
      ],
      buttonData: {
        Component: WideButton,
        text: "Submit",
        dark: true
      },
      onSubmit: func
    }  

    return formContent;
}