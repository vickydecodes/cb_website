import React, {useEffect, useState} from "react";
import "./TableTextArea.css";

export default function TableTextArea({
  inputValue,
  handleInputChange,
  value,
}) {

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
      <div className="d-flex flex-column">
         <div className="character-limit-info">
        <span>{remaining} characters remaining</span>
      </div>
        <textarea
          onChange={handleInputChange}
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
      <div className="d-flex flex-column">
         <div className="character-limit-info">
        <span>{remaining} characters remaining</span>
      </div>
        <textarea
          onChange={handleInputChange}
          name="description"
          id={id(inputValue)}
          maxLength={1500}
          className="input_input_textarea"
          placeholder={"Enter " + capitalize(inputValue)}
        ></textarea>
      </div>
    );
  }
}
