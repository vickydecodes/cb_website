import React, { useEffect } from "react";
import "./VerifyA.css";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import admin_animation from "../../assets/animations/admin_animation.json";
import { Helmet } from "react-helmet-async";
import { useApi } from "../../context/ApiContext";
import { useNavigateOnce } from "../../utils/UseNavigateOnce";
import { useAuth } from "../../context/AuthContext";

export default function VerifyA() {
  const { userCredentials, isVerifiedUser } = useApi();

  const { currentUser } = useAuth();

  const navigate = useNavigateOnce();

  useEffect(() => {
    if (!userCredentials || userCredentials === null) {
      return navigate("/login");
    }

    if(userCredentials.email_verified === 'true' && userCredentials.proof_verified === 'true'){
      return navigate('/create-user')
    }

    if (!currentUser) {
      return navigate("/login");
    }

    if (isVerifiedUser) {
      return navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>ConnectBeez | Verify Admin</title>
      </Helmet>
      <div className="full-page-container_admin">
        <div className="content_admin shadow-lg d-flex justify-content-center align-items-center flex-column">
          <div className="headerForLogoAndGreet">
            <img
              src="/img/logo with name.png"
              className="headerLogo img-fluid"
              alt=""
            />
            <div>
              <h1 className="mt-2">
                Registered Successfully, Wait for verification from admin
              </h1>
            </div>
          </div>
          <div
            className="text-center context"
            style={{ color: "#fecd00", fontWeight: "200", marginTop: "15px" }}
          >
            <h2>
              You will receive a mail if the account is <br />
              <span className="mt-2">verified</span>
            </h2>
          </div>
          <div className="d-flex justify-content-center my-5">
            <Lottie
              animationData={admin_animation}
              loop={true}
              style={{ height: 320, width: 500 }}
            />
          </div>
          <div className="d-flex justify-content-center text-muted text-center mb-5 context">
            Your response sent to the ConnectBeez admin, it take a few minutes
            to verify <br />
            and activate your account, kindly wait for a while.
          </div>

          <Link to="/login" className="btns">
            Go back to Login
          </Link>
        </div>
      </div>
    </>
  );
}
