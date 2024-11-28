import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavItem.css";

export default function NavItem({
  nav,
  handleDashboardPage,
  currentPage,
  isLogoutButton = false,
  isCreateButton = false,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };


  const navigate = useNavigate();

  const handleCreateButton = () => {
    navigate('/create-post')
  }

  const isCurrentPage = nav.toLowerCase() === currentPage;

  if (isLogoutButton) {
    return (
      <div
        className={isHovered ? "logoutbutton active" : "logoutbutton"}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {nav.toUpperCase()}
      </div>
    );
  } else if (isCreateButton) {
    return (
      <div
        className={isHovered ? "createbutton active mt-auto" : "createbutton mt-auto"}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleCreateButton}
      >
        {nav.toUpperCase()}
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
        {nav.toUpperCase()}
      </div>
    );
  }
}
