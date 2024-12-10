import React, { useState, useEffect } from "react";
import Input from "../../../components/Input/Input.jsx";
import TextArea from "../../../components/TextArea/TextArea.jsx";
import ThreeInputs from "../../../components/ThreeInputs/ThreeInputs.jsx";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "react-toastify";
import { useApi } from "../../../../context/ApiContext.jsx";
import "./UpdateProfile.css";

export default function UpdateProfile({
  handleBackButton,
  handleDashboardPage,
  user,
}) {
  const { updateProfile, loading } = useApi();

  const [formData, setFormData] = useState({
    college_name: user.college_name || "",
    college_website: user.college_website || "",
    college_address: user.college_address || "",
    contact_number: user.contact_number || "",
    college_about: user.college_about || "",
    linkedin: user.linkedin || "",
    facebook: user.facebook || "",
    instagram: user.instagram || "",
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

    if (
      formData.instagram === "" ||
      formData.facebook === "" ||
      formData.linkedin === ""
    ) {
      checked = true;
    }

    return { checked, errors };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { checked, errors } = checkTheForm(formData);

    if (checked) {
      console.log("update Data Submitted", formData);
      handleDashboardPage("dashboard");
      updateProfile(formData);
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
                value={formData.college_name}
                handleInputChange={handleInputChange}
              />
              <Input
                inputValue={"college_website"}
                value={formData.college_website}
                handleInputChange={handleInputChange}
              />
              <Input
                inputValue={"college_address"}
                value={formData.college_address}
                handleInputChange={handleInputChange}
              />
              <Input
                inputValue={"contact_number"}
                value={formData.contact_number}
                handleInputChange={handleInputChange}
              />
              <TextArea
                inputValue={"college_about"}
                value={formData.college_about}
                handleInputChange={handleInputChange}
              />
              <Input
                inputValue={"linkedin"}
                value={formData.linkedin}
                handleInputChange={handleInputChange}
              />
              <ThreeInputs
                handleInputChange={handleInputChange}
                values={{
                  instagram: formData.instagram,
                  facebook: formData.facebook,
                }}
              />
              <div className="submitButtons m-4">
                
                  <button className="cancelBtnForUpdateProfile" disabled={loading} type="reset">
                    Cancel
                  </button>
                
                  <button className="submitBtnForUpdateProfile" disabled={loading} type="submit">
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
