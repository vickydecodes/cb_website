import React, { useState } from "react";
import NavItem from "./components/NavItem/NavItem";
import "./Dashboard.css";
import Admin from "./pages/Admin/Admin";
import Events from "./pages/Events/Events";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import Support from "./pages/Support/Support";
import { render } from "react-dom";
import { Nav } from "react-bootstrap";

export default function Dashboard() {
  const navItems = ["Dashboard", "Events", "Update Profile", "Support"];

  const [page, setPage] = useState("dashboard");

  const handleDashboardPage = (page) => {
    setPage(page);
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Admin />;
      case "events":
        return <Events />;
      case "update profile":
        return <UpdateProfile />;
      case "support":
        return <Support />;
      default:
        return <Admin />;
    }
  };

  return (
    <div className="row g-0 full-page-container_dashboard">
      <div className="col-2 shadow-lg sidebar_dashboard">
        <div className="logospace mt-3">
          <img src="/img/logo with name.png" className="logospace_img" alt="" />
        </div>
        <div className="navlinks mt-5 d-flex flex-column">
          {navItems.map((nav, idx) => {
            return <NavItem nav={nav} key={idx} handleDashboardPage={handleDashboardPage} currentPage={page} />;
          })}
          <NavItem nav={'Logout'} isLogoutButton={true}/>
          <NavItem nav={'Create'} isCreateButton={true}/>
        </div>
      </div>
      <div className="col-10 dashboard_pages">{renderPage()}</div>
    </div>
  );
}
