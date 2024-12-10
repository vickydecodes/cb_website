import React from "react";
import './ThreeInputs.css';
import Input from "../Input/Input";

export default function ThreeInputs({handleInputChange, values }) {
  if(values){
    return (
      <div className="d-flex row mb-3">
        <div className="col-md-6">
         <Input inputValue={'facebook'} value={values.facebook || ''} handleInputChange={handleInputChange}/>
        </div>
        <div className="col-md-6">
         <Input inputValue={'instagram'} value={values.instagram || ''} handleInputChange={handleInputChange}/>
        </div>
      </div>
    );
  }else{
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
    

}
