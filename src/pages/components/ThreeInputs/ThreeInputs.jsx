import React from "react";
import './ThreeInputs.css';
import Input from "../Input/Input";

export default function ThreeInputs({handleInputChange}) {
  return (
    <div className="d-flex row mb-3">
      <div className="col-md-6">
       <Input inputValue={'facebook'} handleInputChange={handleInputChange}/>
      </div>
      <div className="col-md-6">
       <Input inputValue={'instagram'} handleInputChange={handleInputChange}/>
      </div>
    </div>
  );
}
