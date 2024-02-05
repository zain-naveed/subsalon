import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { store } from "../../../Shared/Redux/store";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { EmptyProfilePicture, InquiryImg } from "../../../Assets/index";
import ModalLogOut from "./ModalLogOut";
import { toastMessage } from "../../../Shared";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
// import { getToken } from '../../../firebase-auth'
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModalDeleteAccount from "./ModalDeleteAccount";
import {
  IndiviualPic,
  Logo,
  Searchicon,
  Salons,
  Message,
  Notifications,
  CollapseArrow,
  MyJob,
  NotificationsActive,
  MessageActive,
  CloseIcon,
} from "../../../Assets/index";
import "./searchnavigation.css";
import { FiLogOut } from "react-icons/fi";
import {
  AiOutlineMenu,
  AiOutlineUser,
  AiOutlineStar,
  AiOutlineSetting,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdWorkOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { resetUser } from "../../Redux/reducers/userSlice";

function SearchNavigation() {
  const { user, notfy } = store.getState().root;

  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [close, setClose] = useState(false);
  const [name, setName] = useState(
    user?.user?.name ? user?.user?.name : "John Doe"
  );
  const [activeNotifcation, setactiveNotifcation] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    user?.user?.profile ? user?.user?.profile : ""
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const closeDeleteModal = () => setShowDeleteModal(false);

  let chekeed =
    location?.pathname === "/chat"
      ? location.pathname === "/chat"
      : location.pathname === "/notification";
  //
  const handleModalClose = () => setShow(false);

  useEffect(() => {
    window.addEventListener("resize", isMobile);
  }, []);
  useEffect(() => {
    if (user?.user?.trial == "Ended") {
      navigate("/plan");
    }
    setProfilePicture(
      user?.user?.profilePic
        ? user?.user?.profilePic
        : user?.user?.saloon?.avatar
    );
  }, [user?.user?.profilePic]);
  useEffect(() => {
    setName(user?.user?.name);
  }, [user?.user?.name, user?.user?.profilePic]);
  const isMobile = () => {
    let widdthh = window.innerWidth;
    setscreenWidth(widdthh);
    //
  };
  const [screenWidth, setscreenWidth] = useState(window.innerWidth);
  const handleLogout = () => {
    dispatch(resetUser());
    Navigate("/Login");
  };
  const [okay, setokay] = useState(false);

  const closeNav = () => {
    setokay(false);
  };
  const openNav = () => {
    setokay(true);
  };
  //

  const handleCheck = () => {
    if (user?.user?.subType) {
      // if (user?.user?.subType == "basic" ) {

      //     toastMessage(
      //       "error",
      //       "Please upgrade your subscription to Professional or Premium in order to send or recieve messages"
      //     );

      // } else {
      navigate("/chat");
      // }
    } else {
      toastMessage("error", "Please buy a subscription");
    }
  };

  const handleModal = () => {
    setExpanded(false);
    setShow(true);
    setClose(false);
  };
  const handleDeleteAccountModal = () => {
    setExpanded(false);
    setShowDeleteModal(true);
  };

  //
  // useEffect(()=>,[navigator])
  // navigator.serviceWorker.addEventListener("message", (message) =>
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

              <Navbar.Collapse
                navbar-toggler={openNav}
                id="responsive-navbar-nav"
              >
                <div className="menuuwrap">
                  <div className="iteems">
                    <Link to="/profile" onClick={() => setExpanded(false)}>
                      <div className="accountpicMob">
                        <div className="mobProfile">
                          <div className="mobProfileoNE">
                            <div className="">
                              {user?.user?.profilePic ? (
                                <img
                                  className="imgProfilePic"
                                  src={
                                    user?.user?.platform == "facbook"
                                      ? user?.user?.profilePic +
                                      "&time=" +
                                      new Date().getTime()
                                      : user?.user?.profilePic +
                                      "?" +
                                      new Date().getTime()
                                  }
                                />
                              ) : (
                                <img
                                  className="imgProfilePic"
                                  src={EmptyProfilePicture}
                                />
                              )}
                              {/* <img src=''/> */}
                            </div>
                            {/* <img src=''/> */}
                          </div>
                          <div className="mobProfileoNE">
                            <p className="textProfile">{name}</p>
                            <p className="textProfile categoriesName">
                              Service Provider
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <Link to="/profile" onClick={() => setExpanded(false)}>
                    <div className="iteems">
                      <AiOutlineUser />
                      &nbsp; Profile
                    </div>
                  </Link>

                  <Link to="/my-jobs" onClick={() => setExpanded(false)}>
                    <div className="iteems">
                      <img src={MyJob} />
                      &nbsp; My Jobs
                    </div>
                  </Link>

                  <Link to="/myReview" onClick={() => setExpanded(false)}>
                    <div className={"iteems"}>
                      <AiOutlineStar />
                      &nbsp; My Reviews
                    </div>
                  </Link>
                  <Link to="/myfavourite" onClick={() => setExpanded(false)}>
                    <div className="iteems">
                      <FavoriteBorderIcon className="fav" />
                      &nbsp; My Favourite
                    </div>
                  </Link>

                  {/* <Link to="/create-salon" onClick={() => setExpanded(false)}>
                    <div className="iteems">
                      <img src={Salons} />
                      &nbsp; Salon: Post a job
                    </div>
                  </Link> */}

                  <Link to="/setting" onClick={() => setExpanded(false)}>
                    <div className="iteems">
                      <AiOutlineSetting />
                      &nbsp; Settings
                    </div>
                  </Link>

                  {/* <Link to="#" onClick={() => setExpanded(false)}>
                    <div className="iteems">
                    <DeleteOutlineIcon fontSize="16" />
                      &nbsp; Delete Account
                    </div>
                  </Link> */}

                  <div className="iteems redd">
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
                    location.pathname == "/findjob"
                      ? "nav-item mainnavitem hoveron"
                      : "nav-item mainnavitem dull"
                  }
                >
                  <Link to="/findjob">
                    <img src={Searchicon} />
                    &nbsp;Find Jobs
                  </Link>
                </li>
                <li
                  className={
                    location.pathname == "/professionals/findsalon"
                      ? "nav-item mainnavitem hoveron"
                      : "nav-item mainnavitem dull "
                  }
                >
                  <Link to="/professionals/findsalon">
                    <img src={Salons} />
                    &nbsp;Find Job Postings
                  </Link>
                </li>
              </ul>
            </Nav>
          </div>

          <div
            className={
              chekeed ? "barfilter displayepadding" : "barfilter levee"
            }
          >
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
                {notfy.notify ? (
                  // <FiberManualRecordRoundedIcon className="notActive" />
                  <span className="bluenoty"></span>
                ) : (
                  ""
                )}
              </Nav.Link>

              <div className="account">
                <span className="span11"></span>
                <Link to="/profile">
                  <div className="">
                    {user?.user?.profilePic ? (
                      <img
                        className="imgProfilePic"
                        src={
                          user?.user?.platform == "facbook"
                            ? user?.user?.profilePic +
                            "&time=" +
                            new Date().getTime()
                            : user?.user?.profilePic +
                            "?" +
                            new Date().getTime()
                        }
                      />
                    ) : (
                      <img
                        className="imgProfilePic"
                        src={EmptyProfilePicture}
                      />
                    )}
                    {/* <img src=''/> */}
                  </div>
                </Link>
                <Navbar.Toggle
                  className="navbar-toggler shoowwing "
                  aria-controls="basic-navbar-nav"
                />
                <Navbar.Collapse id="basic-navbar-nav">
                  <span className="Catas">
                    <p className="categoriesName" style={{ marginTop: "5px" }}>
                      Service Provider
                    </p>
                  </span>
                  <NavDropdown
                    title={
                      name
                        ? name
                        : user?.user?.email.slice(
                          0,
                          user?.user?.email.indexOf("@")
                        )
                    }
                    id="basic-nav-dropdown"
                    className="navLink shoowwing minWidth100 paddingName"
                  >
                    <span className="arraow">
                      <img src={CollapseArrow}></img>
                    </span>

                    <NavDropdown.Item as={Link} to="/profile">
                      <AiOutlineUser />
                      &nbsp; Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/my-jobs">
                      <img src={MyJob} />
                      &nbsp; My Jobs
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/myReview">
                      <AiOutlineStar />
                      &nbsp; My Reviews
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/myfavourite">
                      <FavoriteBorderIcon className="fav" />
                      &nbsp; My Favourite
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
                      &nbsp; Settings
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      href="javascript:void(0)"
                      onClick={handleModal}
                      className="redd"
                    >
                      <FiLogOut className="redd" />
                      &nbsp;Logout
                    </NavDropdown.Item>
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

export default SearchNavigation;
