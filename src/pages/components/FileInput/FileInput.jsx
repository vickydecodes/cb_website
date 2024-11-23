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
    <div className="input_c d-flex flex-column mb-4">
      <div className="d-flex flex-column text-start">
      <label className="input_label_c" htmlFor={inputValue}>
        <h5>{capitalize(inputValue)}</h5>
      </label>
      <input
        type="file"
        onChange={handleFileInputChange}
        accept="image/*"
        className="input_input_file_c "
        placeholder={"Enter " + capitalize(inputValue)}
        id={inputValue}
      />
      </div>
      <div className="preview-container d-flex justify-content-center align-items-center" style={{width: imagePreview ? '150px' : '100px'}}>
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className="image-preview mx-3 mt-3" />
        ) : (
      ""
        )}
      </div>
    </div>
  );
}
