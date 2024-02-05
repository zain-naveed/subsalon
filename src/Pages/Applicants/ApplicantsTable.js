import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import AllApplicants from "./AllApplicants";
import ApplicantPosts from "./ApplicantPosts";


const ApplicantsTable = () => {
  const [jobCheck, setJobCheck] = useState(false);
  return (
    <div className="divSigin">
      <div className='contSignIn'>
        <Card className="cardSign " style={{ width: '65rem', height: "auto" }}>
          <Card.Title>

            <h1 className="cardJobTitle">
              All Applicants
            </h1>
          </Card.Title>
          <Card.Body className="">
            <ul className="nav nav-tabs nav-profile JobPageCard scroller" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link nav-pro nav-color tabsHeading active"
                  id="Opened-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Opened"
                  type="button"
                  role="tab"
                  aria-controls="Opened"
                  aria-selected="true"
                  name="Opened"
                  onClick={() => setJobCheck(false)}
                >
                  &nbsp;Applicants
                </button>
              </li>

            </ul>
            <div className='divSync'></div>

            <div className="tab-content" id="myTabContent">
              <div className="tab-pane tab-pane1 fade show active" id="Opened" role="tabpanel" aria-labelledby="Opened-tab">
                <ApplicantPosts />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ApplicantsTable;
