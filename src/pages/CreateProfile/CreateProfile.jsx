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
              <div
                className="d-flex flex-column columns justify-content-center"
              >
                <FileInput inputValue={"College Logo"} />
                <FileInput inputValue={"College Banner"} />
                <Input inputValue={"college Name"} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column columns justify-content-center mt-4">
              <Input inputValue={"Linkedin"} />

                <ThreeInputs />
                <Input inputValue={"college Website"} />
                <Input inputValue={"college Location"} />
                <Input inputValue={"college Phone Number"} />
                <TextArea />
                <DropDown />
                <button type="submit" className="submitBtnForCreateProfile my-3">
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
