import React from 'react';
import './BannerBoard.css'

export default function BannerBoard({college_name, college_banner, college_logo}) {

    return (
      <div className="headerbar d-flex justify-content-center align-items-center">
        <div className="card shadow welcomebar_bannerboard" style={{ backgroundImage: `url(${'https://ghcbapi.connectbeez.com/profile/assets/college_logo_banner/'+college_banner})`,objectFit: 'cover', backgroundRepeat: 'no-repeat' }}>
        <div className="collegeimgbanner">
                  <img src={'https://ghcbapi.connectbeez.com/profile/assets/college_logo_banner/'+college_logo} className="imgbannerforcollege" alt="" />
              </div>
          <div className="card-body bannerboard_cardbody d-flex flex-column">
             
             <div> Welcome, <span className="ms-2" style={{color: '#fecd00'}}>{college_name}</span></div>
          <div className="card-text">Have a nice day 😊</div>
  
          </div>
        </div>
      
      </div>
    );
}
