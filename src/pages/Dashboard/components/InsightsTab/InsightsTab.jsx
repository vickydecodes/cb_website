import React from "react";
import tinycolor from "tinycolor2";
import CountUp from 'react-countup'
import "./InsightsTab.css";

export default function InsightsTab() {
  const data = {
    title: "Active Posts",
    number: 2,
    description: "No of Posts that are active",
    background: "#E0F4D5",
    circle: "#A8D08D",

    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        className="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
      </svg>
    ),
  };

  return (
    <div className="col-md-3 m-3" style={{ height: "auto" }}>
      <div
        className="card m-1"
        style={{
          borderRadius: "20px",
          border: "0px",
        }}
      >
        <div
          className="card-body p-4 row"
          style={{
            backgroundColor: tinycolor(data.circle).lighten(20).toString(),
            borderRadius: "10px",
          }}
        >
          <div className="col-3 d-flex flex-column justify-content-center align-items-center">
            <div
              className="p-2"
              style={{
                backgroundColor: data.circle,
                borderRadius: "10px",
              }}
            >
              {data.svg}
            </div>
          </div>
          <div className="col-9 d-flex flex-column justify-content-center text-md-start text-sm-center">
            <b
              style={{
                fontWeight: "700",
                fontSize: "25px",
                color: tinycolor(data.circle).lighten(-10).toString(),
              }}
            >
              <CountUp end={data.number} duration={3} />
            </b>
            <span className="" style={{ fontWeight: "700" }}>
              {data.title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
