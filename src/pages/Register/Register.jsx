import React, { useState } from "react";
import Input from "../components/Input/Input";
import "./Register.css";
import FileInput from "../components/FileInput/FileInput";
import LocationDropDown from "../components/LocationDropDown/LocationDropDown";
import CheckBox from "../components/CheckBox/CheckBox";
import PasswordInput from "../components/PasswordInput/PasswordInput";
import { toast } from "react-toastify";
import { useApi } from "../../context/ApiContext";
import { Helmet } from "react-helmet-async";
import { useAppState } from "../../context/StateContext";
import { useNavigateOnce } from "../../utils/UseNavigateOnce";

export default function Register() {
  const detailsInputTabs1 = ["college_name", "admin_name", "designation"];

  const navigate = useNavigateOnce();

  const { register } = useApi();

  const { loading } = useAppState();

  const [formData, setFormData] = useState({
    college_name: "",
    admin_name: "",
    designation: "",
    admin_mail: "",
    password: "",
    confirm_password: "",
    admin_mobile: "",
    id_proof: null,
    country: "",
    state: "",
    city: "",
    acceptedCheckbox: false,
  });

  const handleDropdownChange = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      country: data.country,
      state: data.state,
      city: data.city,
    }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      acceptedCheckbox: e.target.checked,
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

    if (formData.password.length < 6) {
      toast.error("Password length should be above 6 characters.");
      checked = false;
    }

    if (formData.admin_mobile.length != 10) {
      toast.error("Mobile Number should contain 10 numbers.");
      checked = false;
    }

    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords should not matched.");
      checked = false;
    }
    return { checked, errors };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { checked, errors } = checkTheForm(formData);

    if (checked) {
      register(formData);
      // navigate('/verify-email', 'Registered Successfully.', 'success')
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
        <title>ConnectBeez | Register</title>
      </Helmet>
      <div className="d-flex">
        <div className="full-page-container_register">
          <div className="content_register shadow-lg mb-3">
            <form onSubmit={handleSubmit}>
              <div className="row g-0 p-0" style={{ height: "100%" }}>
                <div className="headerForLogoAndGreet mb-3">
                  <img
                    src="/img/logo with name.png"
                    className="headerLogo img-fluid"
                    alt=""
                  />
                  <div>
                    <h1>Register Your Details</h1>
                    <span className="text-muted">
                      Register your details given below to create your admin
                      profile for college
                    </span>
                  </div>
                </div>
                <div className="col-lg-6 d-flex flex-column">
                  <div
                    className="d-flex flex-column columns justify-content-around"
                    style={{ height: "100%" }}
                  >
                    {detailsInputTabs1.map((tab, idx) => {
                      return (
                        <Input
                          inputValue={tab}
                          handleInputChange={handleInputChange}
                          key={idx}
                        />
                      );
                    })}
                    <Input
                      inputValue={"admin_mail"}
                      type={"email"}
                      handleInputChange={handleInputChange}
                    />
                    <PasswordInput
                      inputValue={"password"}
                      handleInputChange={handleInputChange}
                    />
                    <PasswordInput
                      inputValue={"confirm_password"}
                      handleInputChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="d-flex flex-column columns justify-content-around">
                    <Input
                      inputValue={"admin_mobile"}
                      handleInputChange={handleInputChange}
                    />
                    <FileInput
                      inputValue={"id_proof"}
                      handleFileInput={handleFileInput}
                    />
                    <LocationDropDown
                      handleDropdownChange={handleDropdownChange}
                    />
                    <CheckBox handleCheckboxChange={handleCheckboxChange} />
                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-4 mb-2 w-50 submit_button"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="colorpart_register"></div>
      </div>
    </>
  );
}
