import './formFields.css';

function InputField({ type, label, name, placeholder, id, value, onChange, error, readOnly=false }) {
    
    if (!["text", "email", "password", "date", "number"].includes(type)) return null

    const inputId = id || name

    return (
      <div className={`digId-input-wrapper`}>
        <label htmlFor={inputId} className={`digId-form-label`}>
          {label}
        </label>
        <input 
            type={type}
            name={name}
            placeholder={placeholder}
            id={inputId}
            className={`digId-input-field ${error ? "digId-error-field" : ""}`} 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            readOnly={readOnly}
        />    
        {error && <p className='digId-error-text'>{error}</p>}
      </div>

    )
}

export default InputField;