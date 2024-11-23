import React from "react";
import "./CreateProfile.css";
import FileInput from "../components/FileInput/FileInput";
import Input from "../components/Input/Input";

export default function CreateProfile() {
  return (
    <div className="full-page-container_createprofile">
      <div className="content_createprofile">
        <div className="row g-0 p-0" style={{height: '100%'}}>
          <div className="col-md-6 d-flex flex-column">
            <div className="headerForLogoAndGreet_createprofile text-center">
              <img
                src="/img/logo with name.png"
                className="headerLogo img-fluid"
                alt=""
              />
              <div>
                <h1>Create College Profile</h1>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <FileInput inputValue={'College Logo'}/>
                <FileInput inputValue={'College Banner'}/>
<Input inputValue={'college Name'}/>
<Input inputValue={'college Website'} />
            </div>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </div>
  );
}
