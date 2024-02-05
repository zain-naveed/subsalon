import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Applied_Jobs from "./Tabs/Applied_Jobs";
import Job_Requests from "./Tabs/Job_Requests";
import { getMyFav } from "../../Shared/Services/myFavouriteServices";

const Index = () => {
  const [jobCheck, setJobCheck] = useState(false);


  return (
    <div className="divSigin">
      <div className='contSignIn'>
        <Card className="cardSign " style={{ width: '65rem', height: "auto" }}>
          <Card.Title>

            <h1 className="cardJobTitle">
              My Favourites
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
                  &nbsp;Favourite Jobs
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link nav-pro nav-color tabsHeading"
                  id="Closed-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Closed"
                  type="button"
                  role="tab"
                  aria-controls="Closed"
                  aria-selected="false"
                  name="closed"
                  onClick={() => setJobCheck(true)}

                >
                  &nbsp;Favourite Salon
                </button>
              </li>
            </ul>
            <div className='divSync'></div>

            <div className="tab-content" id="myTabContent">
              <div className="tab-pane tab-pane1 fade show active" id="Opened" role="tabpanel" aria-labelledby="Opened-tab">
                <Applied_Jobs />
              </div>
              <div className="tab-pane tab-pane1 fade" id="Closed" role="tabpanel" aria-labelledby="Closed-tab">
                {
                  jobCheck && <Job_Requests favSaloonup="favSaloon" check={jobCheck} />
                }

              </div>
            
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Index;
