import React from "react";
import PostTab from "../../components/PostTab/PostTab";
import "./Events.css";

export default function Events() {
  return (
    <div className="eventspage">
      <h3>All Events</h3>
      <div className="alleventsdiv">
        <div className="d-flex row mt-4">
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
