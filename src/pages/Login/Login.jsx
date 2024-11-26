import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input/Input";
import "./Login.css";

export default function Login() {
  return (
    <div className="full-page-container_login">
      <div className="content_login shadow-lg">
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
        <div className="d-flex flex-column justify-content-center align-items-center mt-2">
          <Input inputValue={"email"} />
          <Input inputValue={"password"} />
          <button className="LoginButton">Login</button>
        </div>
        <div className="d-flex justify-content-end text-end mb-3">
           <span className="me-4"><button className="ForgetPasswordBtn">Forget Password ?</button></span>
          </div>
      </div>
    </div>
  );
}
