import React, { useState, useEffect } from "react";
import NavItem from "./components/NavItem/NavItem";
import "./Dashboard.css";
import Admin from "./pages/Admin/Admin";
import Events from "./pages/Events/Events";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import CollegeProfile from "./pages/CollegeProfile/CollegeProfile.jsx";
import Support from "./pages/Support/Support";
import { useApi } from "../../context/ApiContext.jsx";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading.jsx";
import { useAppState } from "../../context/StateContext.jsx";

export default function Dashboard() {
  const navItems = ["Dashboard", "Events", "College Profile", "Support"];

  const [page, setPage] = useState("dashboard");



  const { activePosters, inActivePosters, apiUser, userCredentials, loading,handleLogout } = useApi();

  const navigate = useNavigate();

  const handleDashboardPage = (page) => {
    setPage(page);
  };

  const handleEditButtonForCollegeProfile = () => {
    setPage("update profile");
  };

  const handleBackButton = () => {
    let backbutton;
    if (page === "update profile") {
      backbutton = "college profile";
    } else {
      backbutton = "dashboard";
    }
    setPage(backbutton);
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return (
          <Admin
            loading={loading}
            handleDashboardPage={handleDashboardPage}
            inActivePosters={inActivePosters}
            posters={activePosters}
            user={apiUser}
          />
        );
      case "events":
        return <Events loading={loading} posterDatas={inActivePosters} />;
      case "college profile":
        return (
          <CollegeProfile
            loading={loading}
            user={apiUser}
            handleEditButtonForCollegeProfile={
              handleEditButtonForCollegeProfile
            }
          />
        );
      case "update profile":
        return (
          <UpdateProfile
            loading={loading}
            user={apiUser}
            handleBackButton={handleBackButton}
            handleDashboardPage={handleDashboardPage}
          />
        );
      case "support":
        return (
          <Support
            loading={loading}
            user={apiUser}
            handleDashboardPage={handleDashboardPage}
          />
        );
      default:
        return (
          <Admin
            loading={loading}
            handleDashboardPage={handleDashboardPage}
            posters={activePosters}
            user={apiUser}
          />
        );
    }
  };
  return (
    <div className="row g-0 full-page-container_dashboard loading">
      <div className="col-md-2 shadow-lg sidebar_dashboard">
        <div className="logospace mt-3 d-lg-flex justify-content-center">
          <span className="d-xl-block d-lg-none d-md-none d-sm-none d-none">
            <img
              src="/img/logo with name.png"
              className="logospace_img"
              alt=""
            />
          </span>
          <span className="d-xl-none d-lg-block d-md-block d-sm-block d-block svgChange">
            <img
              src="/img/logo with border.png"
              className="logospace_img_svg"
              alt=""
            />
          </span>
        </div>
        <div className="navlinks mt-5 d-flex flex-column">
          {navItems.map((nav, idx) => {
            return (
              <NavItem
                nav={nav}
                key={idx}
                handleDashboardPage={handleDashboardPage}
                currentPage={page}
              />
            );
          })}
          <NavItem
            nav={"Logout"}
            isLogoutButton={true}
            handleLogout={handleLogout}
          />
          <NavItem nav={"Create"} isCreateButton={true} />
        </div>
      </div>
      <div className="col-md-10  dashboard_pages">{renderPage()}</div>
    </div>
  );
}
