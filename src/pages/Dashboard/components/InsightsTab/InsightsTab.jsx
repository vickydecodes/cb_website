import React from "react";
import tinycolor from "tinycolor2";
import CountUp from 'react-countup'
import "./InsightsTab.css";

export default function InsightsTab({active, inActive}) {
  const insightDatas = [
    {
      title: "Active Posts",
      number: active,
      description: "Active Events",
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
    },
    {
      title: "InActive Posts",
      number: inActive,
      description: "In Active Events",
      background: "#F8D7DA",
      circle: "#E57373",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
      ),
    },
    {
      title: "Total Events",
      number: active + inActive,
      description: "No of Posts that you have posted so far",
      background: "#D9EAF9",
      circle: " #76A9EA",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-journal-text"
          viewBox="0 0 16 16"
        >
          <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="col-10 d-md-flex">
    {insightDatas.map((data, index) => (
      <div className="col-md-3 m-3" key={index}>
        <div
          className="card m-1"
          style={{
            height: '100%',
            borderRadius: "20px",
            border: "0px",
          }}
        >
          <div
            className="card-body p-4 row"
            style={{
              backgroundColor: tinycolor(data.circle)
                .lighten(20)
                .toString(),
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
            <div className="col-9 d-flex flex-column justify-content-center text-start">
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
    ))}
    </div>
  );
}
