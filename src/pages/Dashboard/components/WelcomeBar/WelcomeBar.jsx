import React from "react";
import "./WelcomeBar.css";

export default function WelcomeBar({college_name, college_logo, college_banner}) {



  return (
    <div className="headerbar d-flex justify-content-center align-items-center">
      <div className="card shadow welcomebar">
      <div className="collegeimgbanner">
                <img src={'https://ghcbapi.connectbeez.com/profile/assets/college_logo_banner/'+college_logo} className="imgbannerforcollege" alt="" />
            </div>
        <div className="card-body d-flex flex-column">
           
           <div> Welcome, <span className="ms-2" style={{color: '#fecd00'}}>{college_name}</span></div>
        <div className="card-text">Have a nice day 😊</div>

        </div>
      </div>
      <div className="collegebanner ms-3">
        <img src={'https://ghcbapi.connectbeez.com/profile/assets/college_logo_banner/'+college_banner} className="collegebannerimg" alt="" />
      </div>
    </div>
  );
}
