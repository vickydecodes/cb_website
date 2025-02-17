import React, { useEffect} from "react";
import "./VerifyE.css";
import Lottie from "lottie-react";
import { useApi } from "../../context/ApiContext";
import { Helmet } from "react-helmet-async";
import email_animation from "../../assets/animations/email_animation.json";
import { useNavigateOnce } from "../../utils/UseNavigateOnce";
import { useAuth } from "../../context/AuthContext";

export default function VerifyE() {
  const { verifyEmail, loading, userCredentials, isVerifiedUser } = useApi();
  const {currentUser} = useAuth();

  const navigate = useNavigateOnce();


  const handleClick = () => {
    verifyEmail();
  };
  
  console.log(isVerifiedUser)

  useEffect(() => {
    const emailVerified  = userCredentials ? userCredentials.email_verified === 'true' : false

    if(emailVerified){
      return navigate('/verify-admin')
    }

    if(!currentUser){
      return navigate('/login')
    }

    if(isVerifiedUser){
      return navigate('/dashboard')
    }
  }, [navigate])

  return (
    <>
      <Helmet>
        <title>ConnectBeez | Verify Email</title>
      </Helmet>
      <div className="full-page-container_email">
        <div className="content_email shadow-lg d-flex justify-content-center align-items-center flex-column">
          <div className="headerForLogoAndGreet">
            <img
              src="/img/logo with name.png"
              className="headerLogo img-fluid"
              alt=""
            />
            <div>
              <h1 className="mt-2 ">Verify Your Email Address</h1>
            </div>
          </div>
          <div className="d-flex justify-content-center flex-column my-5">
            <Lottie
              animationData={email_animation}
              loop={true}
              style={{ height: '350px', width: "auto" }}
            />
          <div className="d-flex justify-content-center text-muted text-center mb-5 context">
            <div>
            Check your email <span style={{color: '#fecd00'}}>{ currentUser ? currentUser.email : '' }</span> and click the link to{" "}
            <br />
            activate your account, if not in mail kindly check in spam.
            </div>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <button
              className="buttonForVerifyEmail shadow-md"
              disabled={loading}
              onClick={handleClick}
            >
              Click to Send Verification Mail
            </button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
