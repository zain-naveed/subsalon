import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  NavLink,
} from "react-bootstrap";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  IndiviualPic,
  Logo,
  Searchicon,
  Salons,
  Message,
  Notifications,
  Dashboard,
  OwnerProfile,
  CollapseArrow,
  NotificationsActive,
  MessageActive,
  CloseIcon,
  EmptyDummy,
  InquiryImg,
} from "../../../Assets/index";
import { toastMessage } from "../Toast/Toast";
import "./searchnavigation.css";
import { FiLogOut } from "react-icons/fi";
import {
  AiOutlineMenu,
  AiOutlineUser,
  AiOutlineStar,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdWorkOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import { resetUser } from "../../Redux/reducers/userSlice";
import { Img, Filtericon } from "../../../Assets/index";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModalLogOut from "./ModalLogOut";
import ModalDeleteAccount from "./ModalDeleteAccount";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function OwnerNavigation() {
  const user = useSelector((state) => state.root.user);
  const notfy = useSelector((state) => state?.root?.notfy);
  //

  const userResp = user;
  //
  //
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nameSalon, setNameSalon] = useState(
    user?.user?.saloon?.Saloon_name ? user?.user?.saloon?.Saloon_name : ""
  );
  const [bool, setBool] = useState(false);
  let chekeed =
    location?.pathname === "/chat"
      ? location.pathname === "/chat"
      : location.pathname === "/notification";

  useEffect(() => {
    window.addEventListener("resize", isMobile);
  }, []);
  const isMobile = () => {
    let widdthh = window.innerWidth;
    setscreenWidth(widdthh);
  };
  const switchType = () => {
    dispatch(resetUser());
    navigate("/login");
  };
  const [accountpIC, setAccountpIC] = useState(
    user?.user?.saloon?.avatar ? user?.user?.saloon?.avatar : EmptyDummy
  );

  const [screenWidth, setscreenWidth] = useState(window.innerWidth);
  const handleLogout = () => {
    dispatch(resetUser());
  };
  const [okay, setokay] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleModalClose = () => setShow(false);
  const closeDeleteModal = () => setShowDeleteModal(false);

  const closeNav = () => {
    setokay(false);
  };
  const openNav = () => {
    setokay(true);
  };
  useEffect(() => {
    if (user?.user?.trial == "Ended") {
      navigate("/plan");
    }
    setAccountpIC(
      user?.user?.saloon?.avatar ? user?.user?.saloon?.avatar : EmptyDummy
    );
  }, [user?.user?.saloon?.avatar]);
  const handleCheck = () => {
    if (user?.user?.subType) {
      // if (user?.user?.subType == "basic" ) {
      //     toastMessage(
      //       "error",
      //       "Please upgrade your subscription to Professional or Premium in order to send or recieve messages"
      //     );

      // }
      // else {
      navigate("/chat");
      // }
    } else {
      toastMessage("error", "Please buy a subscription");
    }
  };

  const handleModal = () => {
    setExpanded(false);
    setShow(true);
  };
  const handleDeleteAccountModal = () => {
    setExpanded(false);
    setShowDeleteModal(true);
  };

  return (
    <div className="mainNav">
      <Navbar
        expanded={expanded ? true : false}
        collapseOnSelect={okay}
        bg="transparent"
        className="navMain"
        expand="lg"
      >
        <Container className="custom_container">
          <Navbar.Brand>
            <Link to="/">
              <img src={Logo} />
              <span className="span11"></span>

              {/* <span className="dashname">Saloon Owner</span> */}
            </Link>
          </Navbar.Brand>
          {screenWidth < 993 ? (
            <>
              {expanded ? (
                <img
                  src={CloseIcon}
                  className="navbar-toggler new toggleCross"
                  onClick={() => setExpanded(!expanded)}
                  aria-controls="responsive-navbar-nav"
                />
              ) : (
                <Navbar.Toggle
                  className="navbar-toggler new"
                  onClick={() => setExpanded(!expanded)}
                  aria-controls="responsive-navbar-nav"
                />
              )}
              <Navbar.Collapse navbar-toggler={openNav} id="basic-navbar-nav">
                <div className="menuuwrap">
                  <div className="iteems">
                    <Link to="/profile" onClick={() => setExpanded(false)}>
                      <div className="accountpicMob">
                        <div className="mobProfile">
                          <div className="mobProfileoNE">
                            {accountpIC ? (
                              <span className="accouuntImage">
                                <img src={accountpIC} />
                              </span>
                            ) : (
                              <span className="textaccountone">JL</span>
                            )}
                          </div>
                          <div className="mobProfileoNE">
                            <p className="textProfile">{nameSalon}</p>
                            <p className="textProfile categoriesName">
                              Salon Owner
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  {/* <div className="iteems">
                    <Link to="/profile">
                      <AiOutlineUser />
                      &nbsp; Profile
                    </Link>
                  </div> */}
                  <div className="iteems">
                    <Link
                      to="/salon-settings"
                      onClick={() => setExpanded(false)}
                    >
                      <AiOutlineSetting />
                      &nbsp; Salon Settings
                    </Link>
                  </div>
                  <div className="iteems">
                    <Link to="/Listings" onClick={() => setExpanded(false)}>
                      <MdWorkOutline />
                      &nbsp; Job Listings
                    </Link>
                  </div>
                  <div className="iteems">
                    <Link to="/post" onClick={() => setExpanded(false)}>
                      <MdWorkOutline />
                      &nbsp; Post a Job
                    </Link>
                  </div>
                  <div className="iteems">
                    <Link
                      to="/allApplicants"
                      onClick={() => setExpanded(false)}
                    >
                      <img src={Salons} />
                      &nbsp; Applicants
                    </Link>
                  </div>

                  <div className="iteems">
                    <Link to="/setting" onClick={() => setExpanded(false)}>
                      <AiOutlineSetting />
                      &nbsp; My Settings
                    </Link>
                  </div>
                  {/* <div className="iteems">
                    <Link to="#" onClick={handleDeleteAccountModal}>
                      <DeleteOutlineIcon fontSize="16" />
                      &nbsp; Delete Account
                    </Link>
                  </div> */}

                  <div className="iteems">
                    <Link
                      to="#"
                      // onClick={handleLogout}
                      onClick={handleModal}
                      className="redd"
                    >
                      <FiLogOut className="redd" />
                      &nbsp;Logout
                    </Link>
                  </div>
                  {/* <div className="iteems">
                    <Link to="/">
                      <FlipCameraAndroidIcon onClick={() => {
                        switchType();
                      }} />
                      &nbsp; Go to Service Provider Profile
                    </Link>
                  </div> */}
                </div>
              </Navbar.Collapse>
            </>
          ) : (
            ""
          )}
          <div className={chekeed ? "barfilter displayepadding" : "barfilter"}>
            <Nav
              className={
                chekeed
                  ? "ms-auto navi filter displaynoonee uyu1"
                  : "ms-auto navi filter uyu1"
              }
            >
              <ul
                className="nav nav-tabs scroller filterbar"
                id="myTab"
                role="tablist"
              >
                <li
                  className={
                    location.pathname == "/owner/dashboard"
                      ? "nav-item mainnavitem hoveron"
                      : "nav-item mainnavitem dull"
                  }
                >
                  <Link to="/owner/dashboard">
                    <img src={Dashboard} />
                    &nbsp;Dashboard
                  </Link>
                </li>
                <li
                  className={
                    location.pathname == "/owner/professional"
                      ? "nav-item mainnavitem hoveron"
                      : "nav-item mainnavitem dull "
                  }
                >
                  <Link to="/owner/professional">
                    <img src={Searchicon} />
                    &nbsp;Find Service Providers
                  </Link>
                </li>
              </ul>
            </Nav>
          </div>
          <div className={chekeed ? "barfilter displayepadding" : "barfilter"}>
            <Nav className="ms-auto navi notify">
              <div
                style={{ cursor: "pointer" }}
                as={Link}
                to="javascript:void(0)"
                onClick={() => handleCheck()}
                state={{ check: "check" }}
                className={"navLink"}
              >
                <img
                  src={location.pathname == "/chat" ? MessageActive : Message}
                />
              </div>
              <Nav.Link
                as={Link}
                to="/notification"
                className={"navLink dotss"}
              >
                <img
                  src={
                    location.pathname == "/notification"
                      ? NotificationsActive
                      : Notifications
                  }
                />
                {/* {notfy.notify ? (
                  <FiberManualRecordRoundedIcon className="notActive" />
                ) : (
                  ""
                )} */}
                {notfy?.notify ? (
                  // <FiberManualRecordRoundedIcon className="notActive" />
                  <span className="bluenoty"></span>
                ) : (
                  ""
                )}
              </Nav.Link>

              <Link to="/post">
                <Button className="ownerPost"> + Post a Job</Button>
              </Link>

              <div className="account">
                <span className="span11"></span>
                <div className="accountpi">
                  {accountpIC ? (
                    <span className="accouuntImage">
                      <img className="imgProfilePic" src={accountpIC} />
                    </span>
                  ) : (
                    <span className="textaccountone">JL</span>
                  )}
                </div>
                <Navbar.Toggle
                  className="navbar-toggler"
                  aria-controls="basic-navbar-nav"
                />
                <Navbar.Collapse id="basic-navbar-nav">
                  <span className="Catas1">
                    <p className="categoriesName" style={{ marginTop: "5px" }}>
                      Salon Owner
                    </p>
                  </span>
                  <NavDropdown
                    title={nameSalon}
                    id="basic-nav-dropdown"
                    style={{ minWidth: "61px" }}
                    className="navLink shoowwing"
                  >
                    <span className="arraow">
                      <img src={CollapseArrow}></img>
                    </span>

                    {/* <NavDropdown.Item as={Link} to="/profile">
                      <AiOutlineUser />
                      &nbsp; Profile
                    </NavDropdown.Item> */}
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/salon-settings">
                      <AiOutlineSetting />
                      &nbsp; Salon Settings
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/Listings">
                      <MdWorkOutline />
                      &nbsp; Job Listings
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/professionalfavourite">
                      <FavoriteBorderIcon className="fav" />
                      &nbsp; My Favourite
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/allApplicants">
                      <img src={Salons} />
                      &nbsp; Applicants
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/inquiry">
                      <InquiryImg />
                      {/* <img src={Salons} /> */}
                      &nbsp; Inquiry & Feedback
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/setting">
                      <AiOutlineSetting />
                      &nbsp; My Settings
                    </NavDropdown.Item>

                    {/* <NavDropdown.Divider />
                    <NavDropdown.Item
                      href="javascript:void(0)"
                      onClick={handleDeleteAccountModal}
                    >
                      <DeleteOutlineIcon fontSize="16" />
                      &nbsp;Delete Account
                    </NavDropdown.Item> */}
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      href="javascript:void(0)"
                      onClick={handleModal}
                      className="redd"
                    >
                      <FiLogOut className="redd" />
                      &nbsp;Logout
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    {/* <NavDropdown.Item
                      onClick={() => {
                        switchType();
                      }}
                    >
                      <FlipCameraAndroidIcon />
                      &nbsp; Go to Service Provider Profile
                    </NavDropdown.Item> */}
                  </NavDropdown>
                </Navbar.Collapse>
              </div>
            </Nav>
          </div>
        </Container>
      </Navbar>
      <ModalLogOut show={show} handleClose={handleModalClose} />
      <ModalDeleteAccount
        show={showDeleteModal}
        handleClose={closeDeleteModal}
      />
    </div>
  );
}

export default OwnerNavigation;
