import React from "react";
import "./CreateProfile.css";
import FileInput from "../components/FileInput/FileInput";
import Input from "../components/Input/Input";
import ThreeInputs from "../components/ThreeInputs/ThreeInputs";
import TextArea from "../components/TextArea/TextArea";
import DropDown from "../components/DropDown/DropDown";

export default function CreateProfile() {
  return (
    <div className="d-flex">
      <div className="full-page-container_createprofile">
        <div className="content_createprofile shadow-lg">
          <div className="row g-0 p-0" style={{ height: "100%" }}>
            <div className="col-md-6 d-flex flex-column">
              <div className="headerForLogoAndGreet_createprofile text-start">
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
              <div
                className="d-flex flex-column justify-content-center mx-5"
                style={{ height: "100%" }}
              >
                <FileInput inputValue={"College Logo"} />
                <FileInput inputValue={"College Banner"} />
                <Input inputValue={"college Name"} />
                <Input inputValue={"Linkedin"} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column justify-content-center mx-5 mt-4">
                <ThreeInputs />
                <Input inputValue={"college Website"} />
                <Input inputValue={"college Location"} />
                <Input inputValue={"college Phone Number"} />
                <TextArea />
                <DropDown />
              </div>
              <div className="d-flex justify-content-center mt-4">
                <button type="submit" className="submitBtnForCreateProfile">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="colorpart_createprofile"></div>
    </div>
  );
}
