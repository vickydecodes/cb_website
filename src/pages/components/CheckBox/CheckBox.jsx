import React from "react";
import { Link } from "react-router-dom";
import "./CheckBox.css";

export default function CheckBox({handleCheckboxChange}) {
  return (
    <div className="d-flex justify-content-start">
      <input required onChange={handleCheckboxChange} className="input_checkbox" type="checkbox" id="checkbox" />
      <label className="label_checkbox" htmlFor="checkbox">Accept the 
      <Link to={'/terms-and-conditions'}>Terms & Conditions  </Link> and <Link to="/privacy-policy">Privacy policy</Link></label>
      <span style={{ width: "40px" }}></span>
    </div>
  );
}
