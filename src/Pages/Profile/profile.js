import React, { useEffect, useState } from "react";
import RangeSlider from "react-bootstrap-range-slider";
import { Card } from "react-bootstrap";
import "../Auth/Auth.css";
import "./profile.css";
import { CovidPic, IndiviualPic, ReviewPic, ExperiencePic } from '../../Assets';
import { ReactComponent as ExperienceSvg } from './../../Assets/images/experience.svg';
import { Schedule } from '../../Assets';

import Indiviual from './Tabs/Indiviual';
import { Language, Experience, Covid } from "./Tabs/index"
import { FaVirus } from "react-icons/fa"
import { AiOutlineUser, AiOutlineStar } from "react-icons/ai";
import { RiListCheck2 } from "react-icons/ri"
import ReviewApplicant from "../Applicants/Tabs/reviewApplicant";
import MyReview from "../../Pages/myReview";
import Availability from "./Tabs/availabilityProvider"



const Profile = () => {
  const [select, setSelect] = useState("")
  const [selectAva, setSelectAva] = useState("Salon Information")



  const [height, setHeight] = useState(false);



  const heightAdjustment = (e) => {
    if (e.target.name == "experience") {
      setHeight(true);
    } else {
      setHeight(false);
    }
  };
  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e) {
        let getEle = document.getElementById('mTab');
        getEle.scrollLeft = e.target.offsetLeft - e.target.parentNode.offsetWidth / 2
      }
    })

  })
  return (
    <div className="divSigin">
      {/* <Navigation /> */}
      <div className='contSignIn'>
        <Card className="cardSign" style={height === true ? { width: '55rem', height: "auto " } : { width: '65rem', height: "auto" }}>
          <Card.Title>
            <h1 className="cardJobTitle" style={{ padding: "2% 0% 0% 4%" }}>
              Profile
            </h1>
          </Card.Title>
          <Card.Body>
            <ul className="nav nav-tabs nav-profile scroller" id="mTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link nav-pro nav-color tabsHeading active"
                  id="Information-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Information"
                  type="button"
                  role="tab"
                  aria-controls="Information"
                  aria-selected="true"
                  name="indiviual"
                  onClick={(e) => heightAdjustment(e)}
                >
                  {/* <img src={IndiviualPic} /> */}
                  <AiOutlineUser />
                  &nbsp;Individual Information
                </button>
              </li>
              {/* <li className="nav-item" role="presentation">
                <button
                  className="nav-link nav-color nav-pro tabsHeading"
                  id="Experiences-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Experiences"
                  type="button"
                  role="tab"
                  aria-controls="Experiences"
                  aria-selected="false"
                  name="experience"
                  onClick={(e) => { setSelect('Experiences & Bio'); }} >
                  <ExperiencePic className={`${select == "Experiences & Bio" ? 'iconActive' : 'iconNon'}`} />
                  &nbsp;Experiences &amp; Bio
                </button>
              </li> */}
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link nav-color nav-pro tabsHeading"
                  id="Covid-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Covid"
                  type="button"
                  role="tab"
                  aria-controls="Covid"
                  aria-selected="false"
                  name="covid"
                  onClick={(e) => { setSelect('Covid Compliance'); }}
                >
                  {/* <img src={CovidPic} /> */}
                  <CovidPic className={`${select == "Covid Compliance" ? 'iconActiveInG' : 'iconNonInG'}`} />
                  &nbsp;Covid Compliance
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link nav-pro nav-color tabsHeading" id="Availability-tab" data-bs-toggle="tab" data-bs-target="#Availability" type="button" role="tab" aria-controls="Availability" aria-selected="false" name='Availability'
                  onClick={(e) => { setSelectAva('Availability') }} >

                  <Schedule className={`${select == "Availability" ? 'iconActive' : 'iconNon'}`} />&nbsp;
                  Availability
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link nav-color nav-pro tabsHeading"
                  id="Reviews-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Reviews"
                  type="button"
                  role="tab"
                  aria-controls="Reviews"
                  aria-selected="false"
                  onClick={(e) => heightAdjustment(e)}
                >
                  {/* <img src={ReviewPic} /> */}
                  <AiOutlineStar />
                  &nbsp;Reviews
                </button>
              </li>

            </ul>
            <div className='divSync'></div>

            <div className="tab-content" id="myTabContent">
              <div className="tab-pane tab-pane1 fade show active" id="Information" role="tabpanel" aria-labelledby="Information-tab"><Indiviual /></div>
              {/* <div className="tab-pane tab-pane1 fade" id="Experiences" role="tabpanel" aria-labelledby="Experiences-tab"><Experience /></div> */}
              <div className="tab-pane tab-pane1 fade" id="Covid" role="tabpanel" aria-labelledby="Covid-tab"><Covid /></div>
              <div className="tab-pane tab-pane1 fade" id="Availability" role="tabpanel" aria-labelledby="Availability-tab"><Availability /></div>
              <div className="tab-pane tab-pane1 fade" id="Reviews" role="tabpanel" aria-labelledby="Reviews-tab"><MyReview /> </div>

            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
