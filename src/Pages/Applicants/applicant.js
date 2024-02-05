import React, { useState, useEffect } from "react";
import { Card, Col, Row, Carousel } from "react-bootstrap";
import {
  CovidPic,
  ReviewPic,
  ExperiencePic,
  goBack,
  ProfileApplicant,
  msgJob,
  Certificate_1,
  Certificate_2,
} from "../../Assets";
import { Link } from "react-router-dom";
import "./applicant.css";
import { AiFillStar } from "react-icons/ai";
import About from "./Tabs/about";
import CovidApplicant from "./Tabs/covidApplicant";
import ReviewApplicant from "./Tabs/reviewApplicant";
import { useLocation } from "react-router";
import { useParams, useNavigate } from "react-router-dom";
import {
  allApplicants,
  getApplicantProfile,
} from "../../Shared/Services/applicantsApis";
import { toastMessage } from "../../../src/Shared";
import { setChatUser } from "../../Shared/Redux/reducers/chatReducer";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const Applicant = () => {
  let params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chat, user } = useSelector((state) => state.root);

  const [select, setSelect] = useState("About");
  const [Candidate, setCandidate] = useState("");
  const [candidateCovid, setCandidateCovid] = useState(null);
  const [avail, setAvail] = useState([]);

  const jobid = location?.state?.post?.appliedJob?._id;

  const [loader, setLoader] = useState(false);
  const [totalreviews, settotalreviews] = useState();

  useEffect(() => {
    getApplicantProfileApi();
  }, []);

  const getApplicantProfileApi = () => {
    getApplicantProfile(params.id)
      .then(({ data: { data } }) => {
        let tempData = { ...data?.candidate?.salonAvail };

        delete tempData._id;
        delete tempData.createdAt;
        delete tempData.updatedAt;
        delete tempData.__v;
        let DataFromApi = { ...tempData };
        let temp = [];
        let days = Object.keys(DataFromApi);
        let arrayofObjs = [];
        Object.keys(DataFromApi).forEach((key) => {
          arrayofObjs.push({ [key]: DataFromApi[key] });
        });
        for (let i = 0; i < Object.keys(DataFromApi).length; i++) {
          temp.push({
            day: days[i],
            id: i,
            STUTC: arrayofObjs[i][days[i]].startTime,
            ETUTC: arrayofObjs[i][days[i]].endTime,
            flag: arrayofObjs[i][days[i]].isAvail,
            startTime: arrayofObjs[i][days[i]]?.startTime
              ? moment(arrayofObjs[i][days[i]].startTime).format("h:mm a")
              : "",
            endTime: arrayofObjs[i][days[i]]?.endTime
              ? moment(arrayofObjs[i][days[i]].endTime).format("h:mm a")
              : "",
          });
        }

        setAvail(temp);

        setCandidate(data);
        setCandidateCovid(data?.candidate?.covidDetails);
      })
      .catch((err) => {
        toastMessage("error", err?.response?.data?.message);
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    // window.addEventListener('click', (e) => {
    //   if (e) {
    //     let getEle = document.getElementById('mTab');
    //     getEle.scrollLeft = e.target.offsetLeft - e.target.parentNode.offsetWidth / 2
    //   }
    // })
  });
  const reviewss = (value) => {
    settotalreviews(value);
  };
  const handleChat = () => {
    if (user?.user?.subType) {
      // if (user?.user?.subType == "basic") {
      //    toastMessage(
      //       "error",
      //       "Please change your subscription to Professional or Premium"
      //     );

      // } else if (
      //   user?.user?.subType == "professional" ||
      //   user?.user?.subType == "premium" ||
      //   user?.user?.subType == "free"
      // ) {
      let Sender = {
        _id: user?.user?._id,
        name: user?.user.name,
        email: user?.user.email,
        profilePic: user?.user.profilePic,
        createdAt: new Date(),
      };

      let obj = Candidate?.candidate;
      let cloneChat = { ...chat.receiver };

      if (!(cloneChat._id == obj._id)) {
        let reciver = {
          _id: obj._id,
          name: obj.name,
          email: obj.email,
          profilePic: obj.profilePic,
          createdAt: new Date(),
        };

        cloneChat = reciver;

        dispatch(setChatUser(cloneChat));
        navigate("/chat");
      } else {
        navigate("/chat");
      }
      // }
    } else {
      toastMessage("error", "You have no subscription");
    }
  };

  return (
    <div className="divSigin">
      <div className="contSignIn">
        <Card
          className="cardSign card-body-app"
          style={{ width: "55rem", height: "auto " }}
        >
          <Card.Title>
            <div className="JobBtnDiv">
              <div className="jobDetailDiv">
                <div onClick={() => navigate(-1)}>
                  {/* <Link to="/allApplicants"> */}
                  <img src={goBack} className="me-4" />
                  {/* </Link> */}
                </div>

                <div>
                  <h1 className="jobDetailHeading">Applicant Profile</h1>
                </div>
              </div>
            </div>
          </Card.Title>
          <Card.Body>
            <Row>
              <Col className="colApplicant" xs={3}>
                <div className="applicantInfoDiv">
                  <div className="info-application">
                    <img
                      src={
                        Candidate?.candidate?.profilePic
                          ? Candidate.candidate.profilePic
                          : ProfileApplicant
                      }
                      className="applicantPic"
                    />
                    <div>
                      <h1 className="aplicant-name">
                        {Candidate?.candidate?.name
                          ? Candidate?.candidate?.name
                          : Candidate?.candidate?.email?.slice(
                              0,
                              Candidate?.candidate?.email?.indexOf("@")
                            )}
                      </h1>
                      <div style={{ display: "flex" }}>
                        <AiFillStar
                          style={{ color: "#EF9D21", margin: "0 6px" }}
                        />
                        <h1 className="ratings-h1">
                          {totalreviews == "NaN" ? "0" : totalreviews}{" "}
                          <span className="ratResp">Ratings</span>
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="div-sec-applicant respJobDiv">
                    <h1 className="h1-applicant">Location</h1>
                    <p className="p-applicant">
                      {Candidate?.saloon
                        ? Candidate?.saloon?.location?.address
                        : Candidate?.candidate?.location?.address}
                    </p>

                    <h1 className="h1-applicant">Mile Range to Travel</h1>
                    <p className="p-applicant">
                      {Candidate?.candidate?.minMiles} -{" "}
                      {Candidate?.candidate?.maxMiles} miles
                    </p>

                    <h1 className="h1-applicant">Hourly Rate</h1>
                    <p className="p-applicant">
                      ${Candidate?.candidate?.hourRate} •{" "}
                      {Candidate?.candidate?.jobType}
                    </p>
                  </div>

                  <div
                    style={{
                      padding: "0% 0% 5% 1%",
                      borderBottom: "5px solid #F8F9FB ",
                      marginBottom: "4%",
                    }}
                  >
                    {/* <button className='btn btnJobOffer'>Offer Job</button> */}
                    {/* <Link to="/chat"> */}
                    <button className="btn btnMsg" onClick={() => handleChat()}>
                      <img src={msgJob} />
                      <span className="msgTxt">Message</span>
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
                {Candidate?.candidate?.experience?.certificationImgs.length >
                0 ? (
                  <div className="carousel-div">
                    <h1 className="cov ms-3 pt-3">Certifications</h1>
                    <Carousel
                      variant="dark"
                      style={{ paddingTop: "10%" }}
                      controls={
                        Candidate?.candidate?.experience?.certificationImgs
                          .length > 1
                          ? true
                          : false
                      }
                    >
                      {Candidate?.candidate?.experience?.certificationImgs.map(
                        (item, inx) => {
                          return (
                            <Carousel.Item
                              className="carou-item"
                              style={{ padding: "0" }}
                              key={inx}
                            >
                              <img
                                className="d-block carousel_id "
                                src={item}
                                loading="lazy"
                                alt="First slide"
                              />
                              <div className="caroNumbeer">
                                {inx + 1} of{" "}
                                {
                                  Candidate?.candidate?.experience
                                    ?.certificationImgs.length
                                }
                              </div>
                            </Carousel.Item>
                          );
                        }
                      )}

                      {/* {Candidate?.candidate?.experience?.certificationImgs.map(
                      (iiteem) => {
                        return (
                          <>
                          {
                            
                          }
                            <Carousel.Item
                              className="carou-item"
                              style={{ padding: "0" }}
                            >
                              <img
                                className="d-block carousel_id "
                                src={Certificate_1}
                                loading="lazy"
                                alt="First slide"
                              />
                            </Carousel.Item>
                          </>
                        );
                      }
                    )} */}
                    </Carousel>
                  </div>
                ) : (
                  ""
                )}
              </Col>
              <Col className="colApplicant">
                <ul className="nav nav-tabs scroller" id="mTab" role="tablist">
                  {/* <li className="nav-item about-page" role="presentation">
                    <button className="nav-link nav-pro nav-color tabsHeading active" id="About-tab" data-bs-toggle="tab" data-bs-target="#About" type="button" role="tab" aria-controls="About" aria-selected="true" name='About' onClick={(e) => { setSelect('About'); }} >
                      <ExperiencePic className={`${select == "About" ? 'iconActive' : 'iconNon'}`} />
                      &nbsp;About</button>
                  </li> */}
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link nav-pro nav-color absHeading"
                      id="About-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#About"
                      type="button"
                      role="tab"
                      aria-controls="About"
                      aria-selected="false"
                      name="About"
                      onClick={(e) => {
                        setSelect("About");
                      }}
                    >
                      <ExperiencePic
                        className={`${
                          select == "About" ? "iconActive" : "iconNon"
                        }`}
                      />
                      &nbsp;About
                    </button>
                  </li>

                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link nav-pro nav-color absHeading"
                      id="Covid-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#Covid"
                      type="button"
                      role="tab"
                      aria-controls="Covid"
                      aria-selected="false"
                      name="Availability"
                      onClick={(e) => {
                        setSelect("Covid");
                      }}
                    >
                      <CovidPic
                        className={`${
                          select == "Covid" ? "iconActiveInG" : "iconNonInG"
                        }`}
                      />
                      &nbsp;Covid Compliance
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link nav-pro nav-color absHeading"
                      id="Reviews-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#Reviews"
                      type="button"
                      role="tab"
                      aria-controls="Reviews"
                      aria-selected="false"
                      name="Reviews"
                      onClick={(e) => {
                        setSelect("Reviews");
                      }}
                    >
                      <ReviewPic
                        className={`${
                          select == "Reviews" ? "iconActive" : "iconNon"
                        }`}
                      />
                      &nbsp;Reviews
                    </button>
                  </li>
                  {/* <li className="nav-item" role="presentation">
                <button className="nav-link nav-pro tabsHeading" id="Reviews-tab" data-bs-toggle="tab" data-bs-target="#Reviews" type="button" role="tab" aria-controls="Reviews" aria-selected="false" onClick={(e) => heightAdjustment(e)}><img src={ReviewPic} />&nbsp;Reviews</button>
              </li> */}
                </ul>

                <div className="divSync"></div>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane tab-pane1 fade show active"
                    id="About"
                    role="tabpanel"
                    aria-labelledby="About-tab"
                  >
                    {select == "About" ? (
                      <About data={Candidate} avail={avail} />
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className="tab-pane tab-pane1 fade"
                    id="Covid"
                    role="tabpanel"
                    aria-labelledby="Covid-tab"
                  >
                    {select == "Covid" ? (
                      <CovidApplicant data={candidateCovid} />
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className="tab-pane tab-pane1 fade"
                    id="Reviews"
                    role="tabpanel"
                    aria-labelledby="Reviews-tab"
                  >
                    {select == "Reviews" ? (
                      <ReviewApplicant reevu={reviewss} />
                    ) : (
                      ""
                    )}
                  </div>
                  {/* <div className="tab-pane tab-pane1 fade" id="Reviews" role="tabpanel" aria-labelledby="Reviews-tab"></div> */}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Applicant;
