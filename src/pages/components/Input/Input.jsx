import React from "react";
import "./Input.css";

export default function Input({ inputValue }) {
  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  };

  return (
    <div className="input_c d-flex flex-column mb-4 justify-content-center align-items-center" style={{width: '100%'}}>
      <label className="input_label_c" htmlFor={inputValue}>
        <h5>{capitalize(inputValue)}</h5>
      </label>
      <input
        type="text"
        className="input_input_c "
        placeholder={"Enter " + capitalize(inputValue)}
        id={inputValue}
      />
    </div>
  );
}
