import React from 'react';
import './BannerBoard.css'

export default function BannerBoard() {

    const link = 'https://i.pinimg.com/originals/af/ce/3b/afce3b2913b2c584eba7e94751e23e36.png'

    const bannerlink = 'https://www.chennaiproperties.in/blogimg/101/Sathyabama-Institute-Of-Science-And-Technology.jpg'


    return (
      <div className="headerbar d-flex justify-content-center align-items-center">
        <div className="card shadow welcomebar_bannerboard" style={{ backgroundImage: `url(${bannerlink})`,objectFit: 'cover', backgroundRepeat: 'no-repeat' }}>
        <div className="collegeimgbanner">
                  <img src={link} className="imgbannerforcollege" alt="" />
              </div>
          <div className="card-body bannerboard_cardbody d-flex flex-column">
             
             <div> Welcome, <span className="ms-2" style={{color: 'gold'}}>Knowledge Institute of Technology</span></div>
          <div className="card-text">Have a nice day 😊</div>
  
          </div>
        </div>
      
      </div>
    );
}
