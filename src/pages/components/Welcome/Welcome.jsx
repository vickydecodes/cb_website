import React, { useEffect } from "react";
import Lottie from "lottie-react";
import welcome_animation from "../../../assets/animations/welcome_animation.json";
import "./Welcome.css";
import { useApi } from "../../../context/ApiContext";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigateOnce } from "../../../utils/UseNavigateOnce";

export default function Welcome() {
  const navigate = useNavigateOnce();
  const { userCredentials, fetchUserData } = useApi();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (!userCredentials && currentUser) {
      fetchUserData(currentUser.uid);
    }

  }, [currentUser, userCredentials, fetchUserData, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard",  "Login Successful.", 'success');
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="welcome_container">
      <div className="loading-component">
        <Lottie
          animationData={welcome_animation}
          loop={true}
          style={{ width: 500, height: 500 }}
        />
      </div>
    </div>
  );
}
