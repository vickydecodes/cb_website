import React, { useState } from "react";
import { useApi } from "../../../../context/ApiContext";
import { toast } from "react-toastify";
import "./PostTab.css";
import EditEvent from "../../../EditPost/EditPost";
import { Modal } from "react-bootstrap";

export default function PostTab({ handleDashboardPage, data }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { deletePost, loading } = useApi();

  const [formData, setFormData] = useState({
    event_name: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      event_name: e.target.value,
    });
  };

  const checkTheForm = (formData) => {
    let checked = true;
    if (data.event_name != formData.event_name) {
      checked = false;
    }
    return { checked };
  };

  const handleSubmitForDeletePost = (e) => {
    const { checked } = checkTheForm(formData);
    e.preventDefault();
    if (checked) {
      deletePost(data.poster_id);
      handleDashboardPage("dashboard");
      setFormData({ event_name: "" });
    } else {
      toast.error("You mistyped the event name. Please try again!");
    }
  };

  return (
    <div className="col-md-4 p-1 mb-2">
      <div className="card postcard shadow p-3">
        <div className="card-body p-0">
          <h5 className="card-title d-flex align-items-center">
            {data.event_name}
            <span className="ms-auto ">
              <div className="dropdown">
                <button
                  className="btn togglebutton"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="black"
                    className="bi bi-three-dots-vertical"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                  </svg>
                </button>
                <ul className="dropdown-menu text-start p-0">
                  <button
                    className="editbtn"
                    onClick={handleShow}
>
                    Edit
                  </button>
                  <button
                    className="deletebtn"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteToast"
                  >
                    Delete{" "}
                  </button>
                </ul>
                <div
                  className="modal fade"
                  id="deleteToast"
                  tabIndex="-1"
                  aria-labelledby="deleteToast"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title ">Confirm Delete</h5>
                        <button
                          type="button"
                          className="btn-close border-none shadow-none"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body text-center">
                        <form onSubmit={handleSubmitForDeletePost}>
                          <p>Are you sure to delete the post?</p>
                          <p>
                            Type{" "}
                            <span className="event_nameToDelete">
                              {data.event_name}
                            </span>{" "}
                            to delete the post
                          </p>
                          <p>
                            <input
                              type="text"
                              onChange={handleInputChange}
                              className="eventInput"
                            />
                          </p>
                          <div className="d-flex justify-content-center">
                            <button
                              type="reset"
                              className="btn btn-secondary m-2"
                              data-bs-dismiss="modal"
                              disabled={loading}

                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary m-2"
                              data-bs-dismiss="modal"
                              disabled={loading}
                            >
                              Delete
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </span>
          </h5>
          <h6 className="eventcode">Event code: #9991</h6>
          <p className="card-text departmenttab">{data.department}</p>
        </div>
        <p className="card-text postdates m-0 mt-3">
          <small className="text-body-secondary d-flex">
            <span>Posted on : {data.created_at.split(" ")[0]}</span> <br />
            <span className="ms-auto">
              Event Start : {data.ended_at.split(" ")[0]}
            </span>
          </small>
        </p>
        <img
          src={
            "https://ghcbapi.connectbeez.com/profile/assets/college_poster/" +
            data.poster
          }
          data-bs-toggle="modal"
          data-bs-target={"#exampleModal" + data.poster_id}
          className=" postcard-img mt-1"
          alt="..."
        />
      </div>

      <div
        className="modal fade"
        id={"exampleModal" + data.poster_id}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title card-title fs-5"
                id="exampleModalLabel"
              >
                {data.event_name}
              </h1>
              <button
                type="button"
                className="btn-close  border-none shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
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
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th scope="row">Event Name</th>
                      <td>{data.event_name}</td>
                    </tr>
                    <tr>
                      <th scope="row">Event Code</th>
                      <td>#9111</td>
                    </tr>
                    <tr>
                      <th scope="row">isActive</th>
                      <td>True</td>
                    </tr>
                    <tr>
                      <th scope="row">Department</th>
                      <td>{data.department}</td>
                    </tr>
                    <tr>
                      <th scope="row">Event Category</th>
                      <td>{data.category}</td>
                    </tr>
                    <tr>
                      <th scope="row">Posted on</th>
                      <td> 12-12-2024</td>
                    </tr>
                    <tr>
                      <th scope="row">Event Start</th>
                      <td> 30-12-2024</td>
                    </tr>
                    <tr>
                      <th scope="row">Event Description</th>
                      <td>{data.description}</td>
                    </tr>
                    <tr>
                      <th scope="row">Coordinator</th>
                      <td>{data.coordinator_name}</td>
                    </tr>
                    <tr>
                      <th scope="row">Coordinator Number</th>
                      <td>{data.coordinator_number}</td>
                    </tr>
                    <tr>
                      <th scope="row">Registration Link</th>
                      <td>{data.registration_link}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> <h1
                className="modal-title card-title fs-5"
              >
                {data.event_name}
              </h1></Modal.Title>
              <button
                type="button"
                onClick={handleClose}
              ></button>
        </Modal.Header>
        <Modal.Body>
        <div className="p-3">
              <EditEvent data={data} handleShow={handleShow}/>
            </div>
        </Modal.Body>
        </Modal>
      
    </div>
  );
}
