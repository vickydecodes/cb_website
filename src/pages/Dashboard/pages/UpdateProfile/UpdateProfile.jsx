import React, { useState } from "react";
import Input from "../../../components/Input/Input.jsx";
import TextArea from "../../../components/TextArea/TextArea.jsx";
import ThreeInputs from "../../../components/ThreeInputs/ThreeInputs.jsx";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "react-toastify";
import { useApi } from "../../../../context/ApiContext.jsx";
import "./UpdateProfile.css";

export default function UpdateProfile({ handleBackButton, handleDashboardPage, user }) {
  
  const {updateProfile} = useApi();
  
  
  const [formData, setFormData] = useState({
    collegeName: '',
    collegeWebsite: '',
    collegeAddress:'',
    collegeContactNumber: '',
    collegeDescription: '',
    linkedin: '',
    facebook: '',
    instagram: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
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
      handleDashboardPage('dashboard')
      updateProfile();
    } else {
      let errs = [];
      for (let key in errors) {
        errs.push(key.toUpperCase());
      }
      console.log({ errs: errs, errors: errors });
      toast.error(
        `${errs.join(", ")} ${errs.length > 1 ? "are" : "is"} missing.`
      );
      console.log(formData);
    }
  };

  return (
    <div className="d-flex">
      <div className="updateprofilepage d-flex">
        <div className="content_updateprofile my-4">
          <h3>
            <span
              className="me-3"
              style={{ cursor: "pointer" }}
              onClick={handleBackButton}
            >
              <IoArrowBack />
            </span>
            Edit College Profile
          </h3>

          <form onSubmit={handleSubmit}>
          <div>
            <Input
              inputValue={"college_name"}
              value={user.college_name}
              handleInputChange={handleInputChange}
            />
            <Input
              inputValue={"college_website"}
              value={user.college_website}
              handleInputChange={handleInputChange}
            />
            <Input
              inputValue={"college_address"}
              value={user.college_address}
              handleInputChange={handleInputChange}
            />
            <Input
              inputValue={"college_contact_number"}
              value={user.contact_number}
              handleInputChange={handleInputChange}
            />
            <TextArea
              inputValue={"college_description"}
              value={user.college_about}
              handleInputChange={handleInputChange}
            />
            <Input
              inputValue={"linkedin"}
              value={user.linkedin}
              handleInputChange={handleInputChange}
            />
            <ThreeInputs handleInputChange={handleInputChange} values={{instagram: user.instagram, facebook: user.facebook}}/>
            <div className="submitButtons m-4">
              <button className="cancelBtnForUpdateProfile" type="reset">
                Cancel
              </button>
              <button className="submitBtnForUpdateProfile" type="submit">
                Update
              </button>
            </div>
          </div>
          </form>
        </div>
        <div className="emptyspace_updateprofile"></div>
      </div>
    </div>
  );
}
