import React from "react";
import "./Admin.css";
import { Helmet } from "react-helmet-async";
import InsightsTab from "../../components/InsightsTab/InsightsTab";
import PostTab from "../../components/PostTab/PostTab";
import BannerBoard from "../../components/BannerBoard/BannerBoard";
import Loading from "../../../components/Loading/Loading";
import EmptyData from "../../../components/EmptyData/EmptyData";

export default function Admin({
  handleDashboardPage,
  posters,
  user,
  loading,
  inActivePosters,
}) {

  if(loading || !user || !posters){
    return <Loading/>
  }


  return (
    <>
      <Helmet>
        <title>ConnectBeez | Dashboard</title>
      </Helmet>
      <div className="adminpage">
        <BannerBoard
          college_name={user.college_name}
          college_banner={user.college_banner}
          college_logo={user.college_logo}
        />
        <div className="insightstabs p-2 mt-5 ">
          <h3>Your Insights</h3>
          <div className="d-flex flex-column">
            <InsightsTab
              active={posters.length}
              inActive={inActivePosters.length}
            />
          </div>
        </div>
        <div className=" p-2 pe-0 mt-5">
          <h3>Your Active Events</h3>
          {posters.length === 0 ? (
            <EmptyData/>
          ) : (
          <div className="d-flex row ">
            {posters.map((p, idx) => {
              return (
                <PostTab
                  key={idx}
                  handleDashboardPage={handleDashboardPage}
                  data={p}
                />
              );
            })}
          </div>
          )}
        </div>
      </div>
    </>
  );
}
