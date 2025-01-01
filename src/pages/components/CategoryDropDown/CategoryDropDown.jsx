import React from 'react';
import './CategoryDropDown.css'

export default function CategoryDropDown({options, handleDropdownChange}) {
    return (
        <div className="d-flex flex-column">
          <label htmlFor="dropdown" className="input_label_dropdown">
            <h5>Category</h5>
          </label>
          <select onChange={handleDropdownChange} name="c_category" id="dropdown" className="input_input_dropdown mb-3">
            <option value="">Category</option>
            {options.map((opt, idx) => (
            <option value={opt.category} key={idx}>{opt.category}</option>
            ))}
          </select>
        </div>
      );
}
