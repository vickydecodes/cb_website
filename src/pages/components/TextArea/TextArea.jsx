import React from "react";
import "./TextArea.css";

export default function TextArea({ inputValue='College Description' }) {
  return (
    <div className="d-flex flex-column mb-3">
      <label htmlFor="textarea" id="textarea" className="input_label_textarea">
        <h5>{inputValue}</h5>
      </label>
      <textarea
        name="description"
        id="textarea"
        className="input_input_textarea"
        placeholder={'Enter ' + inputValue}
      ></textarea>
    </div>
  );
}
