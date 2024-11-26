import React from "react";
import WelcomeBar from "../../components/WelcomeBar/WelcomeBar";
import "./Admin.css";
import InsightsTab from "../../components/InsightsTab/InsightsTab";
import PostTab from "../../components/PostTab/PostTab";

export default function Admin() {
  return (
    <div className="adminpage">
      <WelcomeBar />
      <div className="insightstabs p-2 mt-5 ">
        <h3>Your Insights</h3>
        <div className="d-flex">
          <InsightsTab />
          <InsightsTab />
          <InsightsTab />
        </div>
      </div>
      <div className="alleventstabs p-2 mt-5">
        <h3>Your Active Events</h3>
        <div className="d-flex row">
          <PostTab />
          <PostTab />
          <PostTab />
          <PostTab />
          <PostTab />
          <PostTab />
          <PostTab />
          <PostTab />
        </div>
      </div>
    </div>
  );
}
