import React from "react";
import "./CheckBox.css";

export default function CheckBox({handleCheckboxChange}) {
  return (
    <div className="d-flex justify-content-start">
      <input required onChange={handleCheckboxChange} className="input_checkbox" type="checkbox" id="checkbox" />
      <label className="label_checkbox" htmlFor="checkbox">Accept the <a href="#">Terms & Conditions</a> and <a href="#">Privacy policy</a></label>
      <span style={{ width: "40px" }}></span>
    </div>
  );
}
