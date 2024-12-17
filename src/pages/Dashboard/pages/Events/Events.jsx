import React from "react";
import PostTab from "../../components/PostTab/PostTab";
import { Helmet } from "react-helmet-async";
import "./Events.css";
import Loading from "../../../components/Loading/Loading";
import EmptyData from "../../../components/EmptyData/EmptyData";

export default function Events({ posterDatas, loading }) {
  if (loading || !posterDatas) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>ConnectBeez | Events</title>
      </Helmet>
      <div className="eventspage">
        <h3>All Events</h3>
        <div className="">
          {posterDatas.length === 0 ? (
            <EmptyData/>
          ) : (
            <div className="d-flex row mt-4">
              {posterDatas.map((p, idx) => {
                return <PostTab key={idx} data={p} />;
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
