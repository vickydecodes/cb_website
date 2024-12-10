import React from 'react';
import './TableTextArea.css'

export default function TableTextArea({ inputValue, handleInputChange, value }) {
    const capitalize = (s) => {
        return s[0].toUpperCase() + s.slice(1).split("_").join(" ");
      };
    
      const id = (value) => {
        return value.replaceAll(" ", "");
      };
      if (value) {
        return (
          <div className="d-flex flex-column">
            
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
          <div className="d-flex flex-column">
           
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
