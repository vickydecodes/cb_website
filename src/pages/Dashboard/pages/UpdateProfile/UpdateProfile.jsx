import React from "react";
import Input from "../../../components/Input/Input.jsx";
import TextArea from "../../../components/TextArea/TextArea.jsx";
import ThreeInputs from "../../../components/ThreeInputs/ThreeInputs.jsx";
import "./UpdateProfile.css";

export default function UpdateProfile() {
  return (
    <div className="d-flex">
    <div className="updateprofilepage d-flex">
      <div className="content_updateprofile my-4">
      <h3>Edit College Profile</h3>

        <Input inputValue={"College Name"} />
        <Input inputValue={"College Website"} />
        <Input inputValue={"College Address"} />
        <Input inputValue={"College Contact Number"} />
        <TextArea inputValue={"College Description"} />
        <Input inputValue={"College Linkedin"} />
        <ThreeInputs />
        <div className="submitButtons m-4">
          <button className="cancelBtnForUpdateProfile" type="">
            Cancel
          </button>
          <button className="submitBtnForUpdateProfile" type="submit">
            Update
          </button>
        </div>
      </div>
      <div className="emptyspace_updateprofile"></div>

    </div>

  </div>
  

  );
}
