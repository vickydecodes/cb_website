import React from "react";
import Input from "../components/Input/Input";
import "./Register.css";
import FileInput from "../components/FileInput/FileInput";
import LocationDropDown from "../components/LocationDropDown/LocationDropDown";
import CheckBox from "../components/CheckBox/CheckBox";

export default function Register() {
  const detailsInputTabs1 = [
    "college Name",
    "name",
    "email",
    "password",
    "designation",
  ];

  return (
    <div className="full-page-container">
      <div className="content">
        <div className="headerForLogoAndGreet">
          <img
            src="/img/logo with name.png"
            className="headerLogo img-fluid"
            alt=""
          />
          <div>
            <h1>Register Your Details</h1>
            <span className="text-muted">
              Register your details given below to create your admin profile for
              college
            </span>
          </div>
        </div>
        <div className="inputTabs" style={{ height: "73%" }}>
          <form action="#" style={{ height: "100%" }}>
            <div className="row g-0" style={{ height: "100%" }}>
              <div className="col-md-6 columnForInputs p-0">
                {detailsInputTabs1.map((tab, idx) => {
                  return <Input inputValue={tab} key={idx} />;
                })}
              </div>
              <div className="col-md-6 columnForInputs p-0">
                <Input inputValue={"Mobile Number"} />
                <FileInput inputValue={"ID Proof"} />
                <LocationDropDown inputValue={"Location dropdown"} />
                <CheckBox />
                <button type="submit" className="mt-3 w-50 submit_button">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
