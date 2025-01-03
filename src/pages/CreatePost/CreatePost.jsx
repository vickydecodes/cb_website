import React, { useEffect, useState } from "react";
import Input from "../components/Input/Input.jsx";
import TextArea from "../components/TextArea/TextArea.jsx";
import FileInput from "../components/FileInput/FileInput";
import { toast } from "react-toastify";
import "./CreatePost.css";
import { Helmet } from "react-helmet-async";
import { useApi } from "../../context/ApiContext.jsx";
import CategoryDropDown from "../components/CategoryDropDown/CategoryDropDown.jsx";

export default function CreatePost() {
  const [imagePreviewForCreatePost, setImagePreviewForCreatePost] =
    useState(null);

  const { createPost, getCategories, categories } = useApi();


  useEffect(() => {
getCategories();
  }, [])




  const [formData, setFormData] = useState({
    event_name: "",
    department: "",
    category: "",
    registration_link: "",
    poster: null,
    coordinator_name: "",
    coordinator_number: "",
    description: "",
    ended_at: "",
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

  const handleDropdownChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      category: e.target.value,
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

    if (formData.ended_at) {
      const today = new Date();
      const enteredDate = new Date(formData.ended_at);
      today.setHours(0, 0, 0, 0);
  
      if (enteredDate <= today) {
        errors.ended_at = "Event end date must be in the future";
        checked = false;
      }
    }

    return { checked, errors };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { checked, errors } = checkTheForm(formData);

    if (checked) {
      createPost(formData);
    } else {
      let errs = [];
      for (let key in errors) {
        errs.push(capitalize(key));
      }
      toast.error(`${errs.join(', ')} ${errs.length > 1 ? "are": "is"  } missing.`);
    }
  };

  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1).split('_').join(' ');
  };


  return (
    <>
    <Helmet>
        <title>ConnectBeez | Create Post</title>
      </Helmet>
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
              <div className="col-md-4 columns order-1 d-flex flex-column justify-content-around">
                <Input
                  inputValue={"event_name"}
                  handleInputChange={handleInputChange}
                />
                <Input
                  inputValue={"department"}
                  optionalText={' Eg. B.Tech IT, Bsc CS'}
                  handleInputChange={handleInputChange}
                />
                <CategoryDropDown handleDropdownChange={handleDropdownChange} options={categories}/>
                <Input
                  inputValue={"registration_link"}
                  handleInputChange={handleInputChange}
                />

                <FileInput
                  inputValue={"poster"}
                  isCreatePostPage={true}
                  handleFileInput={handleFileInput}
                  setImagePreviewForCreatePost={setImagePreviewForCreatePost}
                />
              </div>
              <div className="col-md-4 columns  order-sm-3 order-md-2 d-flex flex-column justify-content-around">
                <Input
                  inputValue={"coordinator_name"}
                  handleInputChange={handleInputChange}
                />
                <Input
                  inputValue={"coordinator_number"}
                  handleInputChange={handleInputChange}
                />
                <TextArea
                  inputValue={"description"}
                  handleInputChange={handleInputChange}
                />
                <Input
                  inputValue={"ended_at"}
                  isDateType={true}
                  handleInputChange={handleInputChange}
                />
                <button className="submitButtonForCreatePost">
                  Post Event
                </button>
              </div>
              <div className="col-md-4 columns order-md-3 order-sm-2 d-flex justify-content-center align-items-center">
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
    </>
  );
}
