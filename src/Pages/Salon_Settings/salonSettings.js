import React, { useState, useEffect } from 'react'
import RangeSlider from 'react-bootstrap-range-slider';
import { Card } from 'react-bootstrap'
import Navigation from "../../Shared/Components/Navbar/navigation";
import Foot from "../../Shared/Components/Foot/Foot"
import "../Auth/Auth.css";
import "../Profile/profile.css";
import { InviteSaloon, Head, Schedule } from '../../Assets';
import SalonInformation from "./Tabs/salonInformation";
import Availability from "./Tabs/availability";
import Invite from './Tabs/invite';

const Profile = () => {
  const [height, setHeight] = useState(false);
  const [select, setSelect] = useState("Salon Information")

  const heightAdjustment = (e) => {
    if (e.target.name == "Information") {
      setHeight(true);
    }
    else {
      setHeight(false);
    }
  }
  

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e) {
        let getEle = document.getElementById('mTab');
        getEle.scrollLeft = e.target.offsetLeft - e.target.parentNode.offsetWidth / 2
      }
    })

  })

  return (
    <div className='divSigin'>
      {/* <Navigation /> */}
      <div className='contSignIn'>
        <Card className="cardSign" style={height === true ? { width: '55rem', height: "auto" } : { width: '55rem', height: "auto " }}>
          <Card.Title>
            <h1 className="cardJobTitle" style={{ padding: "2% 0% 0% 4%" }}>
              Salon Settings
            </h1>
          </Card.Title>
          <Card.Body>
            <ul className="nav nav-tabs scroller" id="mTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link nav-pro nav-color tabsHeading active" id="Information-tab" data-bs-toggle="tab" data-bs-target="#Information" type="button" role="tab" aria-controls="Information" aria-selected="true" name='Information'
                  onClick={(e) => { setSelect('Salon Information'); heightAdjustment(e) }} >
                  {/* <img style={{backgorundColor:"red"}} src={head} /> */}
                  <Head className={`${select == "Salon Information" ? 'iconActive' : 'iconNon'}`} />
                  &nbsp;Salon Information
                </button>
              </li>
              {/* <li className="nav-item" role="presentation">
                <button className="nav-link nav-pro nav-color tabsHeading" id="Availability-tab" data-bs-toggle="tab" data-bs-target="#Availability" type="button" role="tab" aria-controls="Availability" aria-selected="false" name='Availability'
                  onClick={(e) => { setSelect('Availability'); heightAdjustment(e) }} >

                  <Schedule className={`${select == "Availability" ? 'iconActive' : 'iconNon'}`} />&nbsp;
                  Availability
                </button>
              </li> */}
              <li className="nav-item" role="presentation">
                <button className="nav-link nav-pro nav-color tabsHeading" id="Invite-tab" data-bs-toggle="tab" data-bs-target="#Invite" type="button" role="tab" aria-controls="Invite" aria-selected="false" name='Invite' onClick={(e) => { setSelect('Invite'); heightAdjustment(e) }}>

                  <InviteSaloon className={`${select == "Invite" ? 'iconActive' : 'iconNon'}`} />&nbsp;
                  Invite
                </button>
              </li>
              {/* <li className="nav-item" role="presentation">
                <button className="nav-link nav-pro tabsHeading" id="Reviews-tab" data-bs-toggle="tab" data-bs-target="#Reviews" type="button" role="tab" aria-controls="Reviews" aria-selected="false" onClick={(e) => heightAdjustment(e)}><img src={ReviewPic} />&nbsp;Reviews</button>
              </li> */}
            </ul>
            <div className='divSync'></div>
            <div className="tab-content" id="Content">
              <div className="tab-pane tab-pane1 fade show active" id="Information" role="tabpanel" aria-labelledby="Information-tab"><SalonInformation /></div>
              {/* <div className="tab-pane tab-pane1 fade" id="Availability" role="tabpanel" aria-labelledby="Availability-tab"><Availability /></div> */}
              <div className="tab-pane tab-pane1 fade" id="Invite" role="tabpanel" aria-labelledby="Invite-tab"><Invite /></div>
              {/* <div className="tab-pane tab-pane1 fade" id="Reviews" role="tabpanel" aria-labelledby="Reviews-tab"></div> */}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Profile