import React, { useState, useEffect, useLayoutEffect } from "react";
import { Container } from "react-bootstrap";
import "./JobCards.css";
import "./salonCards.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Img, Filtericon, Banner, Profile } from "../../../Assets/index";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import JobSearchDrawer from "../Drawers/JobSearchDrawer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SalonCardsData from "./SalonCardsData";
import { useSelector, useDispatch } from "react-redux";


function SalonCards(props) {
  const user = useSelector((state) => state.root.user);

  useEffect(() => {
    window.addEventListener("resize", isMobile);
  }, []);
  const totals = (total) => {
    settotalENGHT(total)

  }
  const isMobile = () => {
    let widdthh = window.innerWidth;
    setscreenWidth(widdthh);
    
  };
  const ReturnDrawerTypes = (currency, jobtype, zipCode, datevalue, value) => {
    
    props.ReturnDrawersData(currency, jobtype, zipCode, datevalue, value);
  };
  // const ReurnWebtypes =  ( )=>{
  
  // }

  const [fav, setFav] = useState(false);
  const favFunction = () => {
    setFav((prev) => !prev);
    
  };
  const [screenWidth, setscreenWidth] = useState(window.innerWidth);
  const [totalENGHT, settotalENGHT] = useState();


  
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div className={
        user?.user?.subType && user?.user?.subType == "free"
          ? "mainjobcard"
          : user?.user?.subscriptionId.length != 0 || user?.user?.trial == "Started_Basic" || user?.user?.trial == "Started_Pro" ||
          user?.user?.trial == "Started_Prem"
          ? "mainjobcard"
          : user?.user?.subscriptionId.length == 0 ?  "mainjobcard blurReviews"
          :
          "mainjobcard"
      }
      >
      <Container>
        <div className="picInfo">
          <h2>
            Search Result <span className="greytext"> {totalENGHT}</span>
          </h2>
          {screenWidth < 993 ? (
            <div>
              <div className="home">
                <div className="inner">
                  {["left"].map((anchor) => (
                    <React.Fragment key={anchor}>
                      <Button
                        className="filtermob"
                        variant="outlined"
                        onClick={toggleDrawer(anchor, true)}
                        startIcon={<img src={Filtericon} />}
                      >
                        Filter
                      </Button>
                      <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                      >
                        <span className="closiest">
                          <span
                            className="closebtn"
                            onClick={toggleDrawer(anchor, false)}
                          >
                            <ArrowBackIcon /> Back
                          </span>
                        </span>
                        <JobSearchDrawer
                          services={true}
                          jobtype={false}
                          map={true}
                          date={false}
                          rangeSlider={false}
                          searchData={props.search}
                          mapData={props.map}
                          servicesData={props.services}
                          ReturnDrawer={ReturnDrawerTypes}
                        />
                      </SwipeableDrawer>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <SalonCardsData props={props} totals={totals} />
      </Container>
    </div>
  );
}

export default SalonCards;
