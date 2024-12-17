import React from "react";
import { Link } from "react-router-dom";
import Lottie  from 'lottie-react';
import './NotFound.css'
import notfound_animation from '../../assets/animations/notfound_animation.json'
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <>
    <Helmet>
        <title>ConnectBeez | 404 Not Found</title>
        </Helmet>
        <div className="notfound_page" >
          <h2>The page you are looking for is not found.</h2>
          <Lottie
            animationData={notfound_animation}
            loop={true}
    className="notfound_animation"
    />
    
    <div className="d-flex">
    <Link to="/" className="btns">Go back to Home</Link>
    <Link to="/login" className="btns">Go back to Login</Link>
    
    </div>
    
        </div>
    </>
  );
}
