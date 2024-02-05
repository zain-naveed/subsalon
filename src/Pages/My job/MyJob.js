import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Applied_Jobs from "./Tabs/Applied_Jobs";
import Job_Requests from "./Tabs/Job_Requests";
import { useLocation } from "react-router-dom";

const MyJob = () => {
  let location = useLocation();
  const [jobCheck, setJobCheck] = useState(
    location?.state === "job-offer" ? true : false
  );
  return (
    <div className="divSigin">
      <div className="contSignIn">
        <Card className="cardSign " style={{ width: "65rem", height: "auto" }}>
          <Card.Title>
            <h1 className="cardJobTitle">My Jobs</h1>
          </Card.Title>
          <Card.Body className="">
            <ul
              className="nav nav-tabs nav-profile JobPageCard scroller"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link nav-pro nav-color tabsHeading ${
                    location?.state === "job-offer" ? "" : "active"
                  }`}
                  id={`${
                    location?.state === "job-offer"
                      ? "Closed-tab"
                      : "Opened-tab"
                  }`}
                  data-bs-toggle="tab"
                  data-bs-target={`${
                    location?.state === "job-offer" ? "#Closed" : "#Opened"
                  }`}
                  type="button"
                  role="tab"
                  aria-controls={`${
                    location?.state === "job-offer" ? "Closed" : "Opened"
                  }`}
                  aria-selected={`${
                    location?.state === "job-offer" ? "false" : "true"
                  }`}
                  name={`${
                    location?.state === "job-offer" ? "Closed" : "Opened"
                  }`}
                  onClick={() => setJobCheck(false)}
                >
                  &nbsp;Applied Jobs
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link nav-pro nav-color tabsHeading ${
                    location?.state === "job-offer" ? "active" : ""
                  }`}
                  id={`${
                    location?.state === "job-offer"
                      ? "Opened-tab"
                      : "Closed-tab"
                  }`}
                  data-bs-toggle="tab"
                  data-bs-target={`${
                    location?.state === "job-offer" ? "#Opened" : "#Closed"
                  }`}
                  type="button"
                  role="tab"
                  aria-controls={`${
                    location?.state === "job-offer" ? "Opened" : "Closed"
                  }`}
                  aria-selected={`${
                    location?.state === "job-offer" ? "true" : "false"
                  }`}
                  name={`${
                    location?.state === "job-offer" ? "Opened" : "Closed"
                  }`}
                  onClick={() => setJobCheck(true)}
                >
                  &nbsp;Job Offers
                </button>
              </li>
            </ul>
            <div className="divSync"></div>

            <div className="tab-content" id="myTabContent">
              <div
                className={`tab-pane tab-pane1 fade ${
                  location?.state === "job-offer" ? "" : "show active"
                }`}
                id={`${location?.state === "job-offer" ? "Closed" : "Opened"}`}
                role="tabpanel"
                aria-labelledby={`${
                  location?.state === "job-offer" ? "Closed-tab" : "Opened-tab"
                }`}
              >
                <Applied_Jobs />
              </div>
              <div
                className={`tab-pane tab-pane1 fade ${
                  location?.state === "job-offer" ? "show active" : ""
                }`}
                id={`${location?.state === "job-offer" ? "Opened" : "Closed"}`}
                role="tabpanel"
                aria-labelledby={`${
                  location?.state === "job-offer" ? "Opened-tab" : "Closed-tab"
                }`}
              >
                {jobCheck && <Job_Requests check={jobCheck} />}
              </div>
              {/* <div className="tab-pane tab-pane1 fade" id="Covid" role="tabpanel" aria-labelledby="Covid-tab"></div> */}
              {/* <div className="tab-pane tab-pane1 fade" id="Reviews" role="tabpanel" aria-labelledby="Reviews-tab"></div> */}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default MyJob;
