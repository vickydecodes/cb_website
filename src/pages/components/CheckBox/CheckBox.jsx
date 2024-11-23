import React from "react";
import "./CheckBox.css";

export default function CheckBox() {
  return (
    <div className="d-flex justify-content-start mt-1">
      <input className="input_checkbox" type="checkbox" id="checkbox" />
      <label htmlFor="checkbox">Accept the terms and conditions policy</label>
      <span style={{ width: "40px" }}></span>
    </div>
  );
}
