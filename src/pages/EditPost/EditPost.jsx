import React, { useState } from "react";
import TableInput from "../components/TableInput/TableInput";
import "./EditPost.css";
import { Helmet } from "react-helmet-async";
import { useApi } from "../../context/ApiContext";
import TableTextArea from "../components/TableTextArea/TableTextArea";
import { useAppState } from "../../context/StateContext";

export default function EditPost({ data, handleShow, handleClose }) {
  const { editPost } = useApi();

  const {loading} = useAppState();

  const [formData, setFormData] = useState({
    poster_id: data.poster_id || "",
    event_name: data.event_name || "",
    department: data.department || "",
    category: data.category || "",
    coordinator_name: data.coordinator_name || "",
    coordinator_number: data.coordinator_number || "",
    registration_link: data.registration_link || "",
    description: data.description || "",
    ended_at: data.ended_at || "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const checkTheForm = (formData) => {
    let checked = true;
    let errors = {};

    for (let key in formData) {
      if (
        formData[key] === "" ||
        formData[key] === null ||
        formData[key] === false
      ) {
        errors[key] = `${key} is missing.`;
        checked = false;
      }
    }
    return { checked, errors };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleShow(false);
    const { checked, errors } = checkTheForm(formData);

    if (checked) {
      editPost(formData);
    } else {
            console.log({checked, errors, formData})
            Object.values(errors).forEach((err) => toast.error(capitalize(err)));
    }
  };

  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1).split('_').join(' ');
  };


  return (
   <>
    <Helmet>
        <title>ConnectBeez | Edit Poster</title>
      </Helmet>
    <div className="modal-body p-3">
      {" "}
      <div className="d-flex justify-content-center">
        <img
          src={
            "https://ghcbapi.connectbeez.com/profile/assets/college_poster/" +
            data.poster
          }
          className=" postcardmodal-img mt-1"
          alt="..."
        />
      </div>
      <div className="modal-texts mt-3">
        <form onSubmit={handleSubmit}>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <th scope="row">Event Name</th>
                <td>
                  <TableInput
                    inputValue={"event_name"}
                    value={formData.event_name}
                    handleInputChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Event Code</th>
                <td>
                  <TableInput
                    inputValue={"category"}
                    value={data.event_code}
                    disabled={true}
                    handleInputChange={handleInputChange}
                  />
                </td>
              </tr>
              
              <tr>
                <th scope="row">Department</th>
                <td>
                  <TableInput
                    inputValue={"department"}
                    value={formData.department}
                    handleInputChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Event Category</th>
                <td>
                  <TableInput
                    inputValue={"category"}
                    value={formData.category}
                    handleInputChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Posted on</th>
                <td>
                  <TableInput
                    inputValue={"created_at"}
                    value={data.created_at.split(" ")[0]}
                    disabled={true}
                    handleInputChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Event Start</th>
                <td>
                  <TableInput
                    inputValue={"ended_at"}
                    value={formData.ended_at}
                    isDateType={true}
                    handleInputChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Event Description</th>
                <td>
                  <TableTextArea
                    inputValue={"description"}
                    value={formData.description}
                    handleInputChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Coordinator Name</th>
                <td>
                  <TableInput
                    inputValue={"coordinator_name"}
                    value={formData.coordinator_name}
                    handleInputChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Coordinator Number</th>
                <td>
                  <TableInput
                    inputValue={"coordinator_number"}
                    value={formData.coordinator_number}
                    handleInputChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Registration Link</th>
                <td>
                  <TableInput
                    inputValue={"registration_link"}
                    value={formData.registration_link}
                    handleInputChange={handleInputChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="submitButtons d-flex justify-content-center">
            <button
              className="cancelBtnForUpdateProfile"
              type="button"
              disabled={loading}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="submitBtnForUpdateProfile"
              disabled={loading}
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
     
      </div>
    </div>
   </>
  );
}
