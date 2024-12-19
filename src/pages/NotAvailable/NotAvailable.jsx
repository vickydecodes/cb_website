import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import "./NotAvailable.css";
import notavailable_animation from "../../assets/animations/notavailable_animation.json";
import { Helmet } from "react-helmet-async";

export default function NotAvailable() {
  return (
    <>
      <Helmet>
        <title>ConnectBeez | Not Available</title>
      </Helmet>
      <div className="notfound_page">
        <Lottie
          animationData={notavailable_animation}
          loop={true}
          className="notfound_animation"
        />
        <h2 className="mx-3">
          ConnectBeez Website is not available for mobile devices.
        </h2>
      </div>
    </>
  );
}
