import React, { useState, useEffect } from "react";
import "./FileInput.css";

export default function FileInput({
  inputValue,
  isCreatePostPage = false,
  setImagePreviewForCreatePost,
  handleFileInput,
}) {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (isCreatePostPage) {
          setImagePreviewForCreatePost(reader.result);
          setImagePreview(reader.result);
        } else {
          setImagePreview(reader.result);
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      if (isCreatePostPage) {
        setImagePreviewForCreatePost(null);
        setImagePreview(null);
      } else {
        setImagePreview(null);
        setImagePreview(null);
      }
    }
  };

  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  };

  useEffect(() => {
    handleFileInput(inputValue.replaceAll(" ", ""), imagePreview);
  }, [imagePreview]);

  return (
    <div
      className={
        isCreatePostPage
          ? "file-input-container_createpost"
          : "file-input-container d-flex align-items-start mb-4"
      }
    >
      <div className="input-wrapper d-flex flex-column">
        <label className="input_label_c" htmlFor={inputValue}>
          <h5>{capitalize(inputValue)}</h5>
        </label>
        <input
          required
          type="file"
          onChange={handleFileInputChange}
          accept="image/*"
          className={
            isCreatePostPage
              ? "input_input_file_createpost"
              : "input_input_file_c"
          }
          placeholder={"Enter " + capitalize(inputValue)}
          id={inputValue}
        />
      </div>

      {!isCreatePostPage && (
        <div className="d-flex justify-content-center align-items-center w-100">
          <div className="preview-container m-3">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="image-preview" />
            ) : (
              <p className="preview-placeholder">No image selected</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
