import React from "react";
import Input from "../components/Input/Input";
import "./Register.css";
import FileInput from "../components/FileInput/FileInput";
import LocationDropDown from "../components/LocationDropDown/LocationDropDown";
import CheckBox from "../components/CheckBox/CheckBox";
import PasswordInput from "../components/PasswordInput/PasswordInput";

export default function Register() {
  const detailsInputTabs1 = [
    "college Name",
    "name",
    "designation",
    "email",
  ];

  return (
    <div className="d-flex">
      <div className="full-page-container_register">
        <div className="content_register shadow-lg mb-3">
          <div className="row g-0 p-0" style={{ height: "100%" }}>
            <div className="headerForLogoAndGreet">
              <img
                src="/img/logo with name.png"
                className="headerLogo img-fluid"
                alt=""
              />
              <div>
                <h1>Register Your Details</h1>
                <span className="text-muted">
                  Register your details given below to create your admin profile
                  for college
                </span>
              </div>
            </div>
            <div className="col-lg-6 d-flex flex-column">
              <div
                className="d-flex flex-column columns justify-content-around"
                style={{ height: "100%" }}
              >
                {detailsInputTabs1.map((tab, idx) => {
                  return <Input inputValue={tab} key={idx} />;
                })}
                <PasswordInput inputValue={'Password'}/>
                <PasswordInput inputValue={'Confirm Password'}/>

              </div>
            </div>
            <div className="col-lg-6 mb-3">
              <div className="d-flex flex-column columns justify-content-center mt-4">
                <Input inputValue={"Mobile Number"} />
                <FileInput inputValue={"ID Proof"} />
                <LocationDropDown inputValue={"Location dropdown"} />
                <CheckBox />
                <button type="submit" className="mt-3 w-50 submit_button">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="colorpart_register"></div>
    </div>
  );
}
