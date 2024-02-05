import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Ownerfavss from "../Tabs/Applied_Jobs"


const FavsOwner = () => {
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
                  &nbsp;Favourite Professionals
                </button>
              </li>
            
            </ul>
            <div className='divSync'></div>

            <div className="tab-content" id="myTabContent">
              <div className="tab-pane tab-pane1 fade show active" id="Opened" role="tabpanel" aria-labelledby="Opened-tab">
               <Ownerfavss owneerFavs="owneerFavs"/>
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

export default FavsOwner;
