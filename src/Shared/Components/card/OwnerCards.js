import React, { useState, useEffect, useLayoutEffect } from "react";
import { Container } from "react-bootstrap";
import "./JobCards.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Img, Filtericon } from "../../../Assets/index";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import JobSearchDrawer from "../Drawers/JobSearchDrawer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import JobCardsData from "./JobCardsData";
import OwnerJobDeatils from "./OwnerJobDetails";
import { useSelector, useDispatch } from "react-redux";
import { AllGetApiApplicants } from "../../Services/applicantsApis";
import { toastMessage } from "../../../Shared";

function OwnerCards(props) {
  const user = useSelector((state) => state.root.user);

  useEffect(() => {
    window.addEventListener("resize", isMobile);
  }, []);
  const isMobile = () => {
    let widdthh = window.innerWidth;
    setscreenWidth(widdthh);
  };
  const [Appllicants, setAppllicants] = useState();
  const [fav, setFav] = useState(false);
  const [totlatRecord, settotalENGHT] = useState(0);
  const favFunction = () => {
    setFav((prev) => !prev);
  };
  const totals = (total) => {
    settotalENGHT(total);
  };
  const [screenWidth, setscreenWidth] = useState(window.innerWidth);

  const ReturnDrawerTypes = (currency, jobtype, zipCode, datevalue, value) => {
    
    props.ReturnDrawersData(currency, jobtype, zipCode, value);
  };
 
  // }
  
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
    <div
      className={
        user?.user?.subType && user?.user?.subType == "free"
          ? "mainjobcard"
          : user?.user?.subscriptionId.length != 0 || user?.user?.trial == "Started_Basic" || user?.user?.trial == "Started_Pro" 
          ||  user?.user?.trial == "Started_Prem"
          ? "mainjobcard"
          : user?.user?.subscriptionId.length == 0 ?  "mainjobcard blurReviews"
          :
          "mainjobcard"
      }
    >
      <Container>
        <div className="picInfo">
          <h2>
            Search Result <span className="greytext"> {totlatRecord}</span>
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
                          isProfessional={false}
                          services={true}
                          jobtype={false}
                          map={false}
                          date={false}
                          rangeSlider={true}
                          searchData={props.search}
                          mapData={props.map}
                          servicesData={props.services}
                          rangeSliderData={props.rangeSlider}
                          rangeSliderData2={props.rangeSlider2}
                          ReturnDrawer={ReturnDrawerTypes}
                          closii={toggleDrawer(anchor, false)}
                        />{" "}
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

        <OwnerJobDeatils totals={totals} filters={props} />
      </Container>
    </div>
  );
}

export default OwnerCards;
