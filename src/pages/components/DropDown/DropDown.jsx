import React from "react";
import "./DropDown.css";

export default function DropDown({handleDropdownChange}) {
  return (
    <div className="d-flex flex-column">
      <label htmlFor="dropdown" className="input_label_dropdown">
        <h5>College Category</h5>
      </label>
      <select onChange={handleDropdownChange} name="c_category" id="dropdown" className="input_input_dropdown">
        <option value="">College Category</option>
        <option value="artsandscience">Arts & Science</option>
        <option value="engineering">Engineering</option>
        <option value="university">University</option>
      </select>
    </div>
  );
}
