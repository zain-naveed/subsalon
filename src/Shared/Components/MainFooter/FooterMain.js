import React from "react";
import "./mainfooter.css";
import { CpLogo } from "../../../Assets/index";
import { Link } from "react-router-dom";
function FooterMain() {
  return (
    <div className="upper">
      <div className="mainFooter">
        {/* <div className='items'>
        <div className='innerflex mobile'>
        <p className='design'>Designed by</p>
        <p className='mid'>
        <img src={CpLogo}></img>
        </p>
        <p className='title'>CodingPixel</p>
        </div>
    </div> */}
        <div className="items">
          <div className="mobile">
            <p className="design"></p>
          </div>
        </div>
        <div className="items">
          <div className="mobile">
            <p className="design">© 2022 Salon Substitute</p>
          </div>
        </div>
        <div className="items">
          <div className="innerflex ">
            <p className="title">
              <Link to="/privacypolicy">Privacy Center</Link>
            </p>
            {/* <span className="span11 bloo"></span>
    <p className='title'><Link to='#.'>Cookies</Link></p>
    <span className="span11 bloo"></span>
    <p className='title'><Link to='/privacypolicy'>Privacy</Link></p> */}
            <span className="span11 bloo"></span>
            <p className="title">
              <Link to="/termsconditions">Terms</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterMain;
