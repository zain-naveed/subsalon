import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./JobListings.css";
import Opened from "./Tabs/Opened";
import Closed from "./Tabs/Closed";

const JobListings = ({ check, start, end }) => {
  const [selectJob, setSelectJob] = useState("Open");
  const [openJobCount, setOpenJobCount] = useState(0);
  const [closeJobCount, setCloseJobCount] = useState(0);



  return (
    <div className="divSigin">
      <div className='contSignIn'>
        <Card className="cardSign " style={check ? { width: '100%', height: "auto" } : { width: '55rem', height: "auto" }}>
          <Card.Title>

            <h1 className="cardJobTitle">
              Job Listings
            </h1>
          </Card.Title>
          <Card.Body className="">
            <ul className="nav nav-tabs nav-profile JobPageCard scroller" id="myTab" role="tablist">
              <li className="nav-item" role="presentation" onClick={() => setSelectJob("Open")}>
                <button
                  className={check ? "nav-link nav-pro nav-color nav-background tabsHeading check-job-list active" : "nav-link nav-pro nav-color tabsHeading active"}

                  id="Opened-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Opened"
                  type="button"
                  role="tab"
                  aria-controls="Opened"
                  aria-selected="true"
                  name="Opened"

                >
                  &nbsp;Opened Jobs ({openJobCount})
                </button>
              </li>
              <li className="nav-item" role="presentation" onClick={() => setSelectJob("Close")}>
                <button
                  className={check ? "nav-link nav-pro nav-color nav-background tabsHeading check-job-list" : "nav-link nav-pro nav-color tabsHeading"}
                  id="Closed-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Closed"
                  type="button"
                  role="tab"
                  aria-controls="Closed"
                  aria-selected="false"
                  name="closed"

                >
                  &nbsp;Closed Jobs ({closeJobCount})
                </button>
              </li>
            </ul>
            <div className={check ? "" : 'divSync'}></div>

            <div className="tab-content" id="myTabContent">
              {
                
              }
              <div className="tab-pane tab-pane1 fade show active" id="Opened" role="tabpanel" aria-labelledby="Opened-tab">{selectJob == "Open" && <Opened setOpenJobCount={setOpenJobCount} />}</div>
              <div className="tab-pane tab-pane1 fade" id="Closed" role="tabpanel" aria-labelledby="Closed-tab"><Closed setCloseJobCount={setCloseJobCount} /></div>
              {/* <div className="tab-pane tab-pane1 fade" id="Covid" role="tabpanel" aria-labelledby="Covid-tab"></div> */}
              {/* <div className="tab-pane tab-pane1 fade" id="Reviews" role="tabpanel" aria-labelledby="Reviews-tab"></div> */}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default JobListings;
