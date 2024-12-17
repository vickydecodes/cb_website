import React from 'react'
import './EmptyData.css'
import Lottie  from 'lottie-react';
import empty_animation from '../../../assets/animations/empty_animation.json'

export default function EmptyData() {
  return (
<div className="empty_animation_container">
<Lottie
    animationData={empty_animation}
    loop={true}
    style={{height: 500, width: 500}}
/>
<h2>No Data Found.</h2>

</div>
  )
}
