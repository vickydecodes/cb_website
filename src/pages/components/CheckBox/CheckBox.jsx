import React from "react";
import "./CheckBox.css";

export default function CheckBox({handleCheckboxChange}) {
  return (
    <div className="d-flex justify-content-start">
      <input required onChange={handleCheckboxChange} className="input_checkbox" type="checkbox" id="checkbox" />
      <label htmlFor="checkbox">Accept the <a href="#">Terms</a> and <a href="#">Conditions</a> policy</label>
      <span style={{ width: "40px" }}></span>
    </div>
  );
}
