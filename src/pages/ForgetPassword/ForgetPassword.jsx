import React, { useState } from "react";
import Input from "../components/Input/Input";
import "./ForgetPassword.css";
import { Helmet } from "react-helmet-async";
import { useApi } from "../../context/ApiContext";
import { toast } from "react-toastify";
import { useAppState } from "../../context/StateContext";

export default function ForgetPassword() {
  const { forgetPassword } = useApi();
 
  const { loading} = useAppState();

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
        errors[key] = `${key} is missing.`;
        checked = false;
      }
    }

    return { checked, errors };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { checked, errors } = checkTheForm(formData);

    if (checked) {
      forgetPassword(formData);
    } else {
            console.log({checked, errors, formData})
            Object.values(errors).forEach((err) => toast.error(capitalize(err)));
    }
  };

  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1).split('_').join(' ');
  };


  return (
    <>
    <Helmet>
        <title>ConnectBeez | Forgot Password</title>
      </Helmet>
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
    </>
  );
}
