import './formTemplate.css';
import { useState } from "react";

function FormTemplate({ formContent = {}, comparePin=false }) {
  
  const defaultState = {};

  (formContent.default || []).forEach(def => {
    defaultState[def.name] = def.value;
  });

  const [formData, setFormData] = useState(defaultState);

  const [errors, setErrors] = useState({});
  const [invalidCount, setInvalidCount] = useState(0);

  const clearError = (field) => {
    setErrors(prev => {
      if (!prev[field]) return prev;

      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const validateRegistration = () => {
    const rules = formContent.validation || {};
    const newErrors = {};

    if (comparePin) {
      const pin = String(formData.newPin ?? "");
      const confirmPin = String(formData.confirmNewPin ?? "");

      if (pin && confirmPin && pin !== confirmPin) {
        newErrors.confirmNewPin = "Pins do not match";
      }
    }


    Object.keys(rules).forEach(field => {
      const value = formData[field];
      const rule = rules[field];
      
      if (rule.required && !value) {
        newErrors[field] = "This field is required";
      }

      if (rule.minLen !== undefined && String(value).length < rule.minLen && field !== "password" ||
         (rule.maxLen !== undefined && String(value).length < rule.minLen) ) {
        newErrors[field] = `Minimum length is ${rule.minLen}`;
      }

      if (field === "password" && value && rule.minLen !== undefined && String(value).length < rule.minLen) {
        newErrors[field] = `Password must be at least ${rule.minLen} characters long.`;
      }

      if (field === "dateOfBirth" && value) {
        const today = new Date();
        const dob = new Date(value);
        const age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();

        if (age < 18 || (age === 18 && monthDiff < 0)) {
          newErrors[field] = "You must be at least 18 years old";
        }
      }

      if (field === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
          newErrors[field] = "Invalid email address";
        }

      }

      if (field === "personNummer" && value && String(value).length < rule.minLen ||
          (String(value).length > rule.maxLen) || 
          (String(value).length === rule.maxLen && !String(value).includes("-")) ||
          (String(value).length === rule.minLen && String(value).includes("-")) ) {

        newErrors[field] = "Invalid personnummer";
      }
      
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
      date: formData.date || new Date().toISOString().slice(0, 10)
    }));

    clearError(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!validateRegistration()) return;

    formContent.onSubmit(formData);

    setFormData(defaultState);
    setErrors({});
  };


  // ================= RENDER =================
  const ButtonComponent = formContent.buttonData.Component;

  return (
    <form onSubmit={handleSubmit} className="form">

      {(formContent.fields || []).map(field => {
        const Component = field.Component;
        const { name, id } = field.props;

        return (
          <Component
              key={id || name}
              {...field.props}
              value={formData[name] ?? ""}
              onChange={(val) => handleChange(name, val)}
              checked={formData[name] ?? false}
              error={errors[name]}
          />
        );
      })}
  
      {formContent.buttonData.Component && <ButtonComponent
        className={`form-submit-btn`}
        {...formContent.buttonData}
        disabled={Object.keys(errors).length > 0 || invalidCount >=3}
      />}

      
    </form>
  );
}

export default FormTemplate;

