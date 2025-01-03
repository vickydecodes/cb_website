import React, { useState, useEffect } from "react";
import "./CreateProfile.css";
import FileInput from "../components/FileInput/FileInput";
import Input from "../components/Input/Input";
import ThreeInputs from "../components/ThreeInputs/ThreeInputs";
import TextArea from "../components/TextArea/TextArea";
import DropDown from "../components/DropDown/DropDown";
import { useApi } from "../../context/ApiContext";
import { Helmet } from "react-helmet-async";
import { useNavigateOnce } from "../../utils/UseNavigateOnce";
import { useAuth } from "../../context/AuthContext";


export default function CreateProfile() {
  const { createUser, userCredentials, apiUser } = useApi();
  const {currentUser} = useAuth();

  const navigate = useNavigateOnce();

  const [formData, setFormData] = useState({
    college_logo: null,
    college_banner: null,
    college_name: apiUser?.college_name,
    linkedin: "",
    facebook: "",
    instagram: "",
    college_website: "",
    college_address: "",
    phone_number: "",
    college_about: "",
    college_category: "",
  });

  useEffect(() => {
    if(!userCredentials || userCredentials === null){
      return navigate('/login')
    }

    if(!currentUser){
      return navigate('/login')
    }

    if(isVerifiedUser){
      return navigate('/dashboard')
    }
  }, [navigate])

  const handleDropdownChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      college_category: e.target.value,
    }));
  };

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

    if (
      formData.instagram === "" ||
      formData.linkedin === "" ||
      formData.facebook === ""
    ) {
      checked = true;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirm_password = "Passwords do not match";
      checked = false;
    }

    if(formData.phone_number.length === 10 || 12){
      errors.phone_number = 'Phone number should be 10 or 12 characters only.'
      checked = false;
    }

    return { checked, errors };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { checked, errors } = checkTheForm(formData);

    if (checked) {
      createUser(formData);
    } else {
      let errs = [];
      for (let key in errors) {
        errs.push(capitalize(key));
      }
      toast.error(
        `${errs.join(", ")} ${errs.length > 1 ? "are" : "is"} missing.`
      );
    }
  };

  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1).split('_').join(' ');
  };


  return (
    <>
    <Helmet>
        <title>ConnectBeez | Create Account</title>
      </Helmet>
    <div className="d-flex">
      <div className="full-page-container_createprofile">
        <div className="content_createprofile shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="row g-0 p-0" style={{ height: "100%" }}>
              <div className="col-md-6 d-flex flex-column">
                <div className="headerForLogoAndGreet_createprofile">
                  <img
                    src="/img/logo with name.png"
                    className="headerLogo img-fluid"
                    alt=""
                  />
                  <div>
                    <h1>Create College Profile</h1>
                    <span className="text-muted">
                      Enter your college details below to create your college
                      account and get started
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column columns justify-content-center">
                  <FileInput
                    inputValue={"college_logo"}
                    handleFileInput={handleFileInput}
                  />
                  <FileInput
                    inputValue={"college_banner"}
                    handleFileInput={handleFileInput}
                  />
                  <Input
                    inputValue={"college_name"}
                    value={apiUser ? apiUser.college_name : ''}
                    disabled={true}
                    handleInputChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex flex-column columns justify-content-around mt-4">
                  <Input
                    inputValue={"linkedin"}
                    handleInputChange={handleInputChange}
                  />

                  <ThreeInputs handleInputChange={handleInputChange} />
                  <Input
                    inputValue={"college_website"}
                    handleInputChange={handleInputChange}
                  />
                  <Input
                    inputValue={"college_address"}
                    handleInputChange={handleInputChange}
                  />
                  <Input
                    inputValue={"phone_number"}
                    handleInputChange={handleInputChange}
                  />
                  <TextArea
                    inputValue={"college_about"}
                    handleInputChange={handleInputChange}
                  />
                  <DropDown
                    inputValue={"college_category"}
                    handleDropdownChange={handleDropdownChange}
                  />
                  <button
                    type="submit"
                    className="submitBtnForCreateProfile my-3 mb-5"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="colorpart_createprofile"></div>
    </div>
    </>
  );
}
