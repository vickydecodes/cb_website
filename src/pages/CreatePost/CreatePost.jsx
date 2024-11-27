import React, { useState } from "react";
import Input from "../components/Input/Input.jsx";
import TextArea from "../components/TextArea/TextArea.jsx";
import FileInput from "../components/FileInput/FileInput";
import "./CreatePost.css";

export default function CreatePost() {
  const [imagePreviewForCreatePost, setImagePreviewForCreatePost] =
    useState(null);

  return (
    <div className="d-flex">
      <div className="full-page-container_createpost">
        <div className="content_createpost shadow-lg">
          <div className="headers_createpost">
            <div>
              <h1>Create College Event</h1>
              <span className="text-muted">
                Enter your college Event details below to create a invitation to
                all the student!
              </span>
            </div>
          </div>
          <div className="row g-0 p-0 row_createpost">
            <div className="col-md-4 px-5 d-flex flex-column justify-content-between">
              <Input inputValue={"Event Name"} />
              <Input inputValue={"Department"} />
              <Input inputValue={"Event Category"} />
              <Input inputValue={"Registration Link"} />

              <FileInput
                inputValue={"Event Poster"}
                isCreatePostPage={true}
                setImagePreviewForCreatePost={setImagePreviewForCreatePost}
              />
              
            </div>
            <div className="col-md-4 px-5 d-flex flex-column justify-content-between">
            <Input inputValue={"Coordinator Name"} />
              <Input inputValue={"Coordinator Number"} />
              <TextArea inputValue={"Event Description"} />
              <Input inputValue={"Event Date"} isDateType={true}/>
              <button className="submitButtonForCreatePost">
                Post Event
              </button>
            </div>
            <div className="col-md-4 px-5 d-flex justify-content-center align-items-center">
              <div className="preview-container_createpost">
                {imagePreviewForCreatePost ? (
                  <img
                    src={imagePreviewForCreatePost}
                    alt="Preview"
                    className="image-preview_createpost"
                  />
                ) : (
                  <p className="preview-placeholder_createpost">
                    No image selected
                  </p>
                )}
              </div>
            </div>
           
            
          </div>
        </div>
      </div>
    </div>
  );
}
