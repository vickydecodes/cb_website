import React from "react";
import "./TableInput.css";

export default function TableInput({
  inputValue,
  isDateType = false,
  type = "text",
  value,
  disabled = false,
  handleInputChange,
}) {
  const id = (value) => {
    return value.replaceAll(" ", "");
  };

  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1).split("_").join(" ");
  };

  if (isDateType) {
    value = new Date(value).toISOString().split("T")[0];
  }

  if (value) {
    return (
      <div
        className="input_c d-flex flex-column justify-content-center align-items-center"
        style={{ width: "100%" }}
      >
        <input
          onChange={handleInputChange}
          value={value || ""}
          disabled={disabled}
          type={isDateType ? "date" : type}
          className="input_input_c "
          placeholder={"Enter " + capitalize(inputValue)}
          id={id(inputValue)}
        />
      </div>
    );
  } else {
    return (
      <div
        className="input_c d-flex flex-column mb-4 justify-content-center align-items-center"
        style={{ width: "100%" }}
      >
        <input
          onChange={handleInputChange}
          disabled={disabled}
          type={isDateType ? "date" : type}
          className="input_input_c "
          placeholder={"Enter " + capitalize(inputValue)}
          id={id(inputValue)}
        />
      </div>
    );
  }
}
