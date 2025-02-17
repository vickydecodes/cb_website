import React, {useEffect, useState} from "react";
import "./TextArea.css";

export default function TextArea({ inputValue, handleInputChange, value ='' }) {


  let maxLength = 1500;

 
  const [remaining, setRemaining] = useState(maxLength)

const handleChange = (e) => {
  handleInputChange(e);
  setRemaining(maxLength - e.target.value.length)
}

useEffect(() => {
  setRemaining(maxLength - value.length);
}, [value]);

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
          <div className="character-limit-info">
        <span>{remaining} characters remaining</span>
      </div>
        </label>
        <textarea
          onChange={handleChange}
          name="description"
          value={value}
          id={id(inputValue)}
          maxLength={1500}
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
          <div className="character-limit-info">
        <span>{remaining} characters remaining</span>
      </div>
        </label>
        <textarea
          onChange={handleChange}
          name="description"
          id={id(inputValue)}
          className="input_input_textarea"
          maxLength={1500}
          placeholder={"Enter " + capitalize(inputValue)}
        ></textarea>
      </div>
    );
  }
}
