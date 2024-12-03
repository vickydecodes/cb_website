import React from "react";
import "./VerifyA.css";
import { Link } from "react-router-dom";

export default function VerifyA() {
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
            <h1 className="mt-2">Registered Successfully, Wait for verification from admin</h1>
          </div>
        </div>
        <div className="d-flex justify-content-center my-5">{messageSvg}</div>
        <div className="d-flex justify-content-center text-muted text-center mb-5 contextForActivation">
          Your response sent to the ConnectBeez admin, it take a few minutes to verify{" "}
          <br />
          and activate your account, kindly wait for a while.
        </div>
        <div className="text-center" style={{color: 'gold', fontWeight: '200', marginTop: '15px'}}>
          <h2>You will receive a mail if the account is <br /><span className="mt-2">verified</span></h2>
        </div>
        <Link to='/create-user'>Create User</Link>
      </div>
    </div>
  );
}