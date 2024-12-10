import React from "react";
import "./TextArea.css";

export default function TextArea({ inputValue, handleInputChange, value }) {
  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1).split("_").join(" ");
  };

  const id = (value) => {
    return value.replaceAll(" ", "");
  };
  if (value) {
    return (
      <div className="d-flex flex-column mb-3">
        <label
          htmlFor="textarea"
          id="textarea"
          className="input_label_textarea"
        >
          <h5>{capitalize(inputValue)}</h5>
        </label>
        <textarea
          onChange={handleInputChange}
          name="description"
          value={value}
          id={id(inputValue)}
          className="input_input_textarea"
          placeholder={"Enter " + capitalize(inputValue)}
        ></textarea>
      </div>
    );
  } else {
    return (
      <div className="d-flex flex-column mb-3">
        <label
          htmlFor="textarea"
          id="textarea"
          className="input_label_textarea"
        >
          <h5>{capitalize(inputValue)}</h5>
        </label>
        <textarea
          onChange={handleInputChange}
          name="description"
          id={id(inputValue)}
          className="input_input_textarea"
          placeholder={"Enter " + capitalize(inputValue)}
        ></textarea>
      </div>
    );
  }
}
