import React from "react";
import PostTab from "../../components/PostTab/PostTab";
import "./Events.css";

export default function Events({posterDatas}) {
  return (
    <div className="eventspage">
      <h3>All Events</h3>
      <div className="alleventsdiv">
        <div className="d-flex row mt-4">
          {posterDatas.map((p, idx) => {
            return         <PostTab key={idx} data={p}/>

          })}
        </div>
      </div>
    </div>
  );
}
