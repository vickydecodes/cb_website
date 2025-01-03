import React from "react";
import "./CheckBox.css";

export default function CheckBox({ handleCheckboxChange }) {
  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="d-flex justify-content-start">
      <input
        required
        onChange={handleCheckboxChange}
        className="input_checkbox"
        type="checkbox"
        id="checkbox"
      />
      <label className="label_checkbox" htmlFor="checkbox">
        Accept the{" "}
        <span
          onClick={() => openInNewTab("/terms-and-conditions")}
          className="link"
        >
          Terms & Conditions
        </span>{" "}
        and{" "}
        <span className="link" onClick={() => openInNewTab("/privacy-policy")}>
          Privacy Policy
        </span>
      </label>
      <span style={{ width: "40px" }}></span>
    </div>
  );
}
