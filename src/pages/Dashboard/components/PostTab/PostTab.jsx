import React from "react";
import "./PostTab.css";

export default function PostTab() {
  const randNum = Math.floor(Math.random() * 2);

  const imgs = [
    "https://marketplace.canva.com/EAFwnokZJcw/1/0/1600w/canva-pink-black-photocentric-neon-tech-talk-podcast-instagram-post--eJUHJY0eIw.jpg",
    "https://pbs.twimg.com/profile_images/842804567180017666/Q4D7ZzUp_400x400.jpg",
  ];

  const names = [
    "Bachelors of technology Artificial Intelligence & Data Science",
    "Bachelors of computer applications",
  ];

  return (
    <div className="col-md-4 p-1">
      <div
        className="card postcard shadow p-3">
        <div className="card-body p-0">
          <h5 className="card-title d-flex align-items-center">
            Event title '23
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
                <ul className="dropdown-menu text-start">
                  <a className="editbtn" href="#">
                    Edit
                  </a>
                  <hr />
                  <a className="deletebtn" href="#">
                    Delete{" "}
                  </a>
                </ul>
              </div>
            </span>
          </h5>
          <h6 className="eventcode">Event code: #9991</h6>
          <p className="card-text departmenttab">{names[randNum]}</p>
        </div>
        <p className="card-text postdates d-flex flex-column m-0 mt-3">
          <small className="text-body-secondary d-flex">
            <span>Posted on : 12-12-2024</span>
            <span className="ms-auto">Event Start : 30-12-2024</span>
          </small>
        </p>
        <img src={imgs[randNum]}  data-bs-toggle="modal"
        data-bs-target="#exampleModal" className=" postcard-img mt-1" alt="..." />
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
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
                {"Event '23"}{" "}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-3">
              {" "}
              <div className="d-flex justify-content-center">
              <img
                src={imgs[randNum]}
                className=" postcardmodal-img mt-1"
                alt="..."
              />
              </div>
              <div className="modal-texts mt-2">
                <table className="table table-borderless">
                  <tbody> 
                  <tr>
                      <th scope="row">Event Name</th>
                      <td>Event '23</td>
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
                      <td>{names[randNum]}</td>
                    </tr>
                    <tr>
                      <th scope="row">Event Category</th>
                      <td>Seminar</td>
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
                      <td>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Doloribus dolor pariatur accusantium quaerat
                        impedit adipisci itaque explicabo. Perspiciatis itaque
                        debitis distinctio laboriosam provident deleniti,
                        exercitationem ut incidunt ratione quia quam!
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Coordinator</th>
                      <td>Gokul K</td>
                    </tr>
                    <tr>
                      <th scope="row">Coordinator Number</th>
                      <td>6385138282</td>
                    </tr>
                    <tr>
                      <th scope="row">Registration Link</th>
                      <td>https://google.com</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
