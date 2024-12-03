import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons
import "./PasswordInput.css";

export default function PasswordInput({ inputValue, handleInputChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const id = (value) => {
    return value.replaceAll(" ", "");
  };

  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  };

  return (
    <div
      className="input_password d-flex flex-row mb-4 justify-content-center align-items-center"
      style={{ width: "100%" }}
    >
      <div style={{ width: "100%" }}>
        <label className="input_label_password" htmlFor={inputValue}>
          <h5>{capitalize(inputValue)}</h5>
        </label>
        <div className="d-flex justify-content-center align-items-center">
          {" "}
          <input
          required
            type={showPassword ? "text" : "password"}
            className="input_input_password "
            placeholder={"Enter " + capitalize(inputValue)}
            id={id(inputValue)}
            onChange={handleInputChange}
          />
          <span>
            <button onClick={handlePassword} className="passwordBtn">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
