import React, { useEffect, useState } from "react";
import Input from "../components/Input/Input";
import "./Login.css";
import PasswordInput from "../components/PasswordInput/PasswordInput";
import { useApi } from "../../context/ApiContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../context/StateContext";
import { useNavigateOnce } from "../../utils/UseNavigateOnce";

export default function Login() {
  const { login, isVerifiedUser } = useApi();
  const { loading } = useAppState();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigateOnce();

  useEffect(() => {
    if(isVerifiedUser){
      return navigate('/dashboard')
    }
  }, [])

  const handleClick = () => {
    navigate("/forget-password");
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { checked, errors } = checkTheForm(formData);

    if (checked) {
      login(formData);
      navigate('/welcome')
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
        <title>ConnectBeez | Login</title>
      </Helmet>
      <div className="full-page-container_login">
      <div className="content_login shadow-lg">
          <div className="headerForLogoAndGreet">
            <img
              src="/img/logo with border.png"
              className="headerLogo img-fluid"
              alt="ConnectBeez Logo"
            />
            <br />
            <img
              src="/img/app_name.png"
              className="headerLogoText img-fluid mt-2"
              alt="ConnectBeez App Name"
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
              <button className="LoginButton" disabled={loading}>
                Login
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-end text-end mb-3">
            <span className="me-4">
              <button
                className="ForgetPasswordBtn"
                onClick={handleClick}
              >
                Forget Password ?
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
