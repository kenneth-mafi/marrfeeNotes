import './formFields.css';

function InputField({ type, label, name, placeholder, id, value, onChange, error, readOnly=false }) {
    
    if (!["text", "email", "password", "date", "number"].includes(type)) return null

    const inputId = id || name

    return (
      <div className={`input-wrapper`}>
        <label htmlFor={inputId} className={`form-label`}>
          {label}
        </label>
        <input 
            type={type}
            name={name}
            placeholder={placeholder}
            id={inputId}
            className={`input-field ${error ? "error-field" : ""}`} 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            readOnly={readOnly}
        />    
        {error && <p className='error-text'>{error}</p>}
      </div>

    )
}

export default InputField;
