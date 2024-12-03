import React, { useRef, useState } from "react";
import Input from "../components/Input/Input";
import "./Login.css";
import PasswordInput from "../components/PasswordInput/PasswordInput";
import { useApi } from "../../context/ApiContext";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useApi();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      login();
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
            <h1>Welcome Back!</h1>
            <span className="text-muted">
              Glad to see you again! <br />
              Login to your account
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column justify-content-center align-items-center mt-2 mx-3">
            <Input
              inputValue={"email"}
              type="email"
              handleInputChange={handleInputChange}
            />
            <PasswordInput
              inputValue={"password"}
              handleInputChange={handleInputChange}
            />
            <button className="LoginButton">Login</button>
          </div>
        </form>
        <div className="d-flex justify-content-end text-end mb-3">
          <span className="me-4">
            <button className="ForgetPasswordBtn">Forget Password ?</button>
          </span>
        </div>
      </div>
    </div>
  );
}
