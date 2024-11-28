import React from "react";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import "./DetailsTab.css";

export default function DetailsTab({
  heading,
  content,
  isSocialMedia = false,
}) {
  if (isSocialMedia) {
    return (
      <div className="detailstab">
        <div className="instagram">
          <h5><FaInstagram /></h5> <h6>{content.instagram || "Not available"}</h6>
        </div>
        <div className="facebook">
          <h5><FaFacebook /></h5> <h6> {content.facebook || "Not available"}</h6>
        </div>
        <div className="linkedin">
         <h5> <FaLinkedin /></h5> <h6>{content.linkedin || "Not available"}</h6>
        </div>
      </div>
    );
  } else {
    return (
      <div className="detailstab">
        <h5 className="">{heading} </h5>
        <h6>{content}</h6>
      </div>
    );
  }
}
