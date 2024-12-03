import React from "react";
import "./VerifyE.css";
import { useApi } from "../../context/ApiContext";

export default function VerifyE() {
  const { verifyEmail } = useApi();
  const messageSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="150"
      fill="currentColor"
      className="bi bi-envelope-open"
      viewBox="0 0 16 16"
    >
      <path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882zM15 7.383l-4.778 2.867L15 13.117zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765z" />
    </svg>
  );


  const handleClick = () => {
    verifyEmail();
  }
  return (
    <div className="full-page-container">
      <div className="content shadow-lg d-flex justify-content-center align-items-center flex-column">
        <div className="headerForLogoAndGreet">
          <img
            src="/img/logo with name.png"
            className="headerLogo img-fluid"
            alt=""
          />
          <div>
            <h1 className="mt-2">Verify Your Email Address</h1>
          </div>
        </div>
        <div className="d-flex justify-content-center my-5">{messageSvg}</div>
        <div className="d-flex justify-content-center text-muted text-center mb-5 contextForActivation">
          Check your email connectbeezofficial@gmail.com @ click the link to{" "}
          <br />
          activate your account, if not in mail kindly check in spam.
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <button className="buttonForVerifyEmail shadow-md" onClick={handleClick}>
            Click to Confirm
          </button>
          <button className="button2ForVerifyEmail mt-2">
            After Click this Link
          </button>
        </div>
      </div>
    </div>
  );
}
