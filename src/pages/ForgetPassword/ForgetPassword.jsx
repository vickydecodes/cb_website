import React, { useState } from "react";
import Input from "../components/Input/Input";
import "./ForgetPassword.css";
import { useApi } from "../../context/ApiContext";
import { toast } from "react-toastify";

export default function ForgetPassword() {
  const { forgetPassword, loading } = useApi();

  const [formData, setFormData] = useState({
    email: "",
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

    return { checked, errors };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { checked, errors } = checkTheForm(formData);

    if (checked) {
      console.log("Registration Data Submitted", formData);
      forgetPassword(formData);
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
    <div className="full-page-container_login">
      <div className="content_login shadow-lg mx-3">
        <div className="headerForLogoAndGreet">
          <img
            src="/img/logo with border.png"
            className="headerLogo img-fluid"
            alt=""
          />{" "}
          <br />
          <img
            src="/img/app_name.png"
            className="headerLogoText img-fluid mt-2"
            alt=""
          />
          <div className="mt-5">
            <h1>Forgot password?</h1>
            <span className="text-muted">
              Please enter your mail to receive the reset link  <br />
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column justify-content-center align-items-center mt-5 mx-3">
            <Input
              inputValue={"email"}
              type="email"
              handleInputChange={handleInputChange}
            />
            
            <button disabled={loading} className="ForgetPasswordButton">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}
