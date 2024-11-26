import React, { useState } from "react";
import "./FileInput.css";

export default function FileInput({ inputValue }) {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Update state with the image URL
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
      setImagePreview(null); // Clear preview if no file is selected
    }
  };

  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  };
  return (
    <div className="file-input-container d-flex align-items-start mb-4">
      <div className="input-wrapper d-flex flex-column">
        <label className="input_label_c" htmlFor={inputValue}>
          <h5>{capitalize(inputValue)}</h5>
        </label>
        <input
          type="file"
          onChange={handleFileInputChange}
          accept="image/*"
          className="input_input_file_c"
          placeholder={"Enter " + capitalize(inputValue)}
          id={inputValue}
        />
      </div>
      <div className="preview-container ms-3">
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className="image-preview" />
        ) : (
          <p className="preview-placeholder">No image selected</p>
        )}
      </div>
    </div>
  );
}
