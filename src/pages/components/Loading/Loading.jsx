import React from 'react';
import loading_animation from '../../../assets/animations/loading_animation.json';
import './Loading.css';
import Lottie  from 'lottie-react';

export default function Loading() {
  return (
    <div className='loading-container'>
       <div className="loading-component">
       <Lottie
        animationData={loading_animation}
        loop={true}
        style={{width: 500, height: 500}}
        />
       </div>
    </div>
  )
}
