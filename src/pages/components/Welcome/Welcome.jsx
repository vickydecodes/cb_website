import React, { useEffect } from "react";
import Lottie from "lottie-react";
import welcome_animation from "../../../assets/animations/welcome_animation.json";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../../context/ApiContext";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

export default function Welcome() {
  const navigate = useNavigate();
  const {userCredentials, fetchUserData} = useApi();
  const { currentUser } = useAuth();

  if(!userCredentials){
fetchUserData(currentUser.uid)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.success("Login Successfully.");
      navigate("/dashboard");
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
