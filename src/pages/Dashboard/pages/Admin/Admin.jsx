import React from "react";
import WelcomeBar from "../../components/WelcomeBar/WelcomeBar";
import "./Admin.css";
import InsightsTab from "../../components/InsightsTab/InsightsTab";
import PostTab from "../../components/PostTab/PostTab";
import BannerBoard from "../../components/BannerBoard/BannerBoard";


export default function Admin({handleDashboardPage, posters, user, inActivePosters}) {


  console.log({user, posters})

  if(!user || !posters){
    return <h1>Not found</h1>
  }

  return (
    <div className="adminpage">
      <BannerBoard college_name={user.college_name} college_banner={user.college_banner} college_logo={user.college_logo}/>
      <div className="insightstabs p-2 mt-5 ">
        <h3>Your Insights</h3>
        <div className="d-flex flex-column">
          <InsightsTab active={posters.length} inActive={inActivePosters.length}/>
        </div>
      </div>
      <div className="alleventstabs p-2 mt-5">
        <h3>Your Active Events</h3>
        <div className="d-flex row">
          {posters.map((p, idx) => {
            return <PostTab key={idx} handleDashboardPage={handleDashboardPage} data={p}/>
          })}
        </div>
      </div>
    </div>
  );
}
