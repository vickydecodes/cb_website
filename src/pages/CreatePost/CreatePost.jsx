import React, { useState } from "react";
import Input from "../components/Input/Input.jsx";
import TextArea from "../components/TextArea/TextArea.jsx";
import FileInput from "../components/FileInput/FileInput";
import { toast } from "react-toastify";
import "./CreatePost.css";
import { useApi } from "../../context/ApiContext.jsx";

export default function CreatePost() {
  const [imagePreviewForCreatePost, setImagePreviewForCreatePost] =
    useState(null);

  const { createPost } = useApi();

  const [formData, setFormData] = useState({
    eventName: "",
    department: "",
    eventCategory: "",
    registrationLink: "",
    eventPoster: null,
    coordinatorName: "",
    coordinatorNumber: "",
    eventDescription: "",
    eventDate: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileInput = (value, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [value]: data,
    }));
  };

  const checkTheForm = (formData) => {
    let checked = true;
    let errors = {};

    for (let key in formData) {
      if (
        formData[key] === "" ||
        formData[key] === null ||
        formData[key] === false
      ) {
        errors[key] = `${key} cannot be empty`;
        checked = false;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      checked = false;
    }

    return { checked, errors };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { checked, errors } = checkTheForm(formData);

    if (checked) {
      console.log("Registration Data Submitted", formData);
      createPost();
    } else {
      let errs = [];
      for (let key in errors) {
        errs.push(key.toUpperCase());
      }
      console.log({errs: errs, errors: errors})
      toast.error(`${errs.join(', ')} ${errs.length > 1 ? "are": "is"  } missing.`);
      console.log(formData);
    }
  };

  return (
    <div className="d-flex">
      <div className="full-page-container_createpost">
        <div className="content_createpost shadow-lg mb-3">
          <div className="headers_createpost">
            <div>
              <img
                src="/img/logo with name.png"
                className="headerLogo img-fluid"
                alt=""
              />
              <h1>Create College Event</h1>
              <span className="text-muted">
                Enter your college Event details below to create a invitation to
                all the student!
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row g-0 p-0 row_createpost">
              <div className="col-md-4 columns order-1 d-flex flex-column justify-content-between">
                <Input
                  inputValue={"event Name"}
                  handleInputChange={handleInputChange}
                />
                <Input
                  inputValue={"department"}
                  handleInputChange={handleInputChange}
                />
                <Input
                  inputValue={"event Category"}
                  handleInputChange={handleInputChange}
                />
                <Input
                  inputValue={"registration Link"}
                  handleInputChange={handleInputChange}
                />

                <FileInput
                  inputValue={"event Poster"}
                  isCreatePostPage={true}
                  handleFileInput={handleFileInput}
                  setImagePreviewForCreatePost={setImagePreviewForCreatePost}
                />
              </div>
              <div className="col-md-4 columns  order-sm-3 order-md-2 d-flex flex-column justify-content-between">
                <Input
                  inputValue={"coordinator Name"}
                  handleInputChange={handleInputChange}
                />
                <Input
                  inputValue={"coordinator Number"}
                  handleInputChange={handleInputChange}
                />
                <TextArea
                  inputValue={"event Description"}
                  handleInputChange={handleInputChange}
                />
                <Input
                  inputValue={"event Date"}
                  isDateType={true}
                  handleInputChange={handleInputChange}
                />
                <button className="submitButtonForCreatePost">
                  Post Event
                </button>
              </div>
              <div className="col-md-4 columns order-md-3 order-sm-2 d-flex justify-content-center align-items-center my-4">
                <div className="preview-container_createpost">
                  {imagePreviewForCreatePost ? (
                    <img
                      src={imagePreviewForCreatePost}
                      alt="Preview"
                      className="image-preview_createpost"
                    />
                  ) : (
                    <p className="preview-placeholder_createpost">
                      No image selected
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
