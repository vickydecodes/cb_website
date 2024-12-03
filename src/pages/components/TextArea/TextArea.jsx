import React from "react";
import "./TextArea.css";

export default function TextArea({ inputValue='college Description', handleInputChange }) {
  
  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  };


  const id = (value) => {
    return value.replaceAll(" ", "")
  };
  
  return (
    <div className="d-flex flex-column mb-3">
      <label htmlFor="textarea" id="textarea" className="input_label_textarea">
        <h5>{capitalize(inputValue)}</h5>
      </label>
      <textarea
        onChange={handleInputChange}
        name="description"
        id={id(inputValue)}
        className="input_input_textarea"
        placeholder={'Enter ' + inputValue}
      ></textarea>
    </div>
  );
}
