import React, { useState, useEffect } from "react";
import NavItem from "./components/NavItem/NavItem";
import "./Dashboard.css";
import Admin from "./pages/Admin/Admin";
import Events from "./pages/Events/Events";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import CollegeProfile from './pages/CollegeProfile/CollegeProfile.jsx'
import Support from "./pages/Support/Support";
import { render } from "react-dom";
import { Nav } from "react-bootstrap";
import { useApi } from "../../context/ApiContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navItems = ["Dashboard", "Events","College Profile", "Support"];

  const [page, setPage] = useState("dashboard");

  let {posters, apiUser, userCredentials, loading} = useApi();

  const navigate = useNavigate()

  const handleDashboardPage = (page) => {
    setPage(page);
  };

  const handleEditButtonForCollegeProfile = () => {
    setPage('update profile')
  }

  const handleBackButton = () => {
    let backbutton; 
    if(page === 'update profile'){
      backbutton = 'college profile';
    }else{
      backbutton = 'dashboard'
    }
    setPage(backbutton)
  }

  if(posters === 'No posters available for this college.'){
    posters = []
  }



  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Admin handleDashboardPage={handleDashboardPage} posters={posters} user={apiUser}/>;
      case "events":
        return <Events posterDatas={posters}/>;
      case "college profile":
        return <CollegeProfile user={apiUser} handleEditButtonForCollegeProfile={handleEditButtonForCollegeProfile}/>;
      case "update profile":
        return <UpdateProfile user={apiUser} handleBackButton={handleBackButton} handleDashboardPage={handleDashboardPage}/>
      case "support":
        return <Support user={apiUser} handleDashboardPage={handleDashboardPage} />;
      default:
        return <Admin handleDashboardPage={handleDashboardPage}/>;
    }
  };

  useEffect(() => {
    if (!userCredentials) {
      console.warn("No userCredentials found. Redirecting to login.");
      navigate("/login");
    }
  }, [userCredentials]);
  
  if(loading){
    return         <SkeletonLoader count={1} height={20} width="100%" />

  }

  return (
    <div className="row g-0 full-page-container_dashboard loading">
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
