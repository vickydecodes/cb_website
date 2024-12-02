import React from "react";
import "./Input.css";

export default function Input({
  inputValue,
  isDateType = false,
  type='text',
  handleInputChange,
}) {
  const id = (value) => {
    return value.replaceAll(" ", "")
  };

  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  };

  return (
    <div
      className="input_c d-flex flex-column mb-4 justify-content-center align-items-center"
      style={{ width: "100%" }}
    >     
      <label className="input_label_c" htmlFor={inputValue}>
        <h5>{capitalize(inputValue)}</h5>
      </label>
      <input
        onChange={handleInputChange}
        type={isDateType ? "date" : type}
        className="input_input_c "
        placeholder={"Enter " + capitalize(inputValue)}
        id={id(inputValue)}
      />
    </div>
  );
}
