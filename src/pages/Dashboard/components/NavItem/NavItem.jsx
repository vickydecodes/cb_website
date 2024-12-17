import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavItem.css";
import { MdDashboard } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { MdCreateNewFolder } from "react-icons/md";
import { LuFolders } from "react-icons/lu";
import { Modal } from "react-bootstrap";


export default function NavItem({
  nav,
  handleDashboardPage,
  currentPage,
  isLogoutButton = false,
  isCreateButton = false,
  handleLogout,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const handleLogoutModal = () => {
    handleShow()
  }

  const handleLogoutButton = () => {
    handleClose();
    handleLogout();
  }

  const navigate = useNavigate();

  const handleCreateButton = () => {
    navigate("/create-post");
  };

  if (currentPage === "update profile") {
    currentPage = "college profile";
  }

  const isCurrentPage = nav.toLowerCase() === currentPage;

  let svg;

  if (nav.toLowerCase() === "dashboard") {
    svg = <MdDashboard size={25} />;
  } else if (nav.toLowerCase() === "events") {
    svg = <LuFolders size={25} />;
  } else if (nav.toLowerCase() === "college profile") {
    svg = <CgProfile size={25} />;
  } else if (nav.toLowerCase() === "support") {
    svg = <BiSupport size={25} />;
  } else if (isLogoutButton) {
    svg = <IoMdLogOut size={25} />;
  } else {
    svg = <MdCreateNewFolder size={25} />;
  }

  if (isLogoutButton) {
    return (
      <>
        <div
          className={isHovered ? "logoutbutton active" : "logoutbutton"}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={handleLogoutModal}
        >
          <span className="d-xl-block d-lg-none d-md-none d-sm-none d-none">
            {nav.toUpperCase()}
          </span>
          <span className="d-xl-none d-lg-block d-md-block d-sm-block d-block svgChange">
            {svg}
          </span>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> <h1
                className="modal-title card-title fs-5"
              >
Logout
              </h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="text-center" style={{fontWeight: 600}}><h4>Are you sure to logout ?</h4></div>
              <div className="p-3 d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-secondary m-1"
                onClick={handleClose}
              >
                NO
              </button>
              <button
                type="button"
                className="btn  m-1 logoutBtn"
                onClick={handleLogoutButton}
              >
                YES
              </button>
            </div>
        </Modal.Body>
        </Modal>
      </>
    );
  } else if (isCreateButton) {
    return (
      <div
        className={
          isHovered ? "createbutton active mt-auto" : "createbutton mt-auto"
        }
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleCreateButton}
      >
        <span className="d-xl-block d-lg-none d-md-none d-sm-none d-none">
          {nav.toUpperCase()}
        </span>
        <span className="d-xl-none d-lg-block d-md-block d-sm-block d-block svgChange">
          {svg}
        </span>
      </div>
    );
  } else {
    return (
      <div
        className={isHovered || isCurrentPage ? "navitem active" : "navitem"}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={() => handleDashboardPage(nav.toLowerCase())}
      >
        <span className="d-xl-block d-lg-none d-md-none d-sm-none d-none">
          {nav.toUpperCase()}
        </span>
        <span className="d-xl-none d-lg-block d-md-block d-sm-block d-block svgChange">
          {svg}
        </span>
      </div>
    );
  }
}
