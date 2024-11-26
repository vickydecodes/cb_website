import React from "react";
import './ThreeInputs.css';
import Input from "../Input/Input";

export default function ThreeInputs() {
  return (
    <div className="d-flex row mb-3">
      <div className="col-md-6">
       <Input inputValue={'facebook'}/>
      </div>
      <div className="col-md-6">
       <Input inputValue={'Instagram'}/>
      </div>
    </div>
  );
}
