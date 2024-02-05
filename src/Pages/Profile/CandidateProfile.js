import React, { useState, useEffect } from "react";
import { Card, Col, Row, Carousel } from "react-bootstrap";
import {
  CovidPic,
  ReviewPic,
  ExperiencePic,
  goBack,
  ProfileApplicant,
  msgJob,
  Anyfile
} from "../../Assets/index";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "../../Pages/Applicants/applicant.css";
import { AiFillStar } from "react-icons/ai";
import About from "../../Pages/Applicants/Tabs/about";
import CovidApplicant from "../../Pages/Applicants/Tabs/covidApplicant";
import ReviewApplicant from "../../Pages/Applicants/Tabs/reviewApplicant";
import { useLocation } from "react-router";
import OfferJobModal from "../../Shared/Components/card/offerJobModal";
import { toastMessage,s3Expereience } from "../../../src/Shared";
import { professionProfile } from "../../Shared/Services/all_proffessional";
import { setChatUser } from "../../Shared/Redux/reducers/chatReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";

const CandidateProfile = (props) => {
  const { chat, user } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let params = useParams();
  const [select, setSelect] = useState("About");
  const [Candidate, setCandidate] = useState("");
  const [candidateCovid, setCandidateCovid] = useState(null);
  const handleShow = () => setOfferModal(true);
  const [avail, setAvail] = useState([]);
  const location = useLocation();

  const [offerModal, setOfferModal] = useState(false);
  const jobid = location?.state?.post?.appliedJob?._id;

  const handleClose = () => setOfferModal(false);
  const [loader, setLoader] = useState(false);
  const [canResp, setcandResp] = useState(null);
  const [totalreviews, settotalreviews] = useState();

  useEffect(() => {
    getApplicantProfileApi();
  }, []);

  const getApplicantProfileApi = () => {
    professionProfile(params.id)
      .then(({ data: { data } }) => {
        let tempData = { ...data?.salonAvail };

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
        setCandidateCovid(data?.covidDetails);
      })
      .catch((err) => {
        toastMessage("error", err?.response?.data?.message);
      })
      .finally(() => setLoader(false));
  };

  const reviewss = (value) => {
    settotalreviews(value);
  };

  const handleChat = () => {
    if (user?.user?.subType) {
      // if (user?.user?.subType == "basic") {

      //     toastMessage("error", "Please upgrade your subscription to Professional or Premium in order to send or recieve messages")

      // }
      // else if (user?.user?.subType == "professional" || user?.user?.subType == "premium") {
      let Sender = {
        _id: user?.user?._id,
        name: user?.user.name,
        email: user?.user.email,
        profilePic: user?.user.profilePic,
        createdAt: new Date(),
      };

      let obj = Candidate;
      let cloneChat = { ...chat.receiver };

      if (!(cloneChat._id == obj._id)) {
        let reciver = {
          _id: obj._id,
          name: obj.name,
          email: obj.email,
          profilePic: obj.profilePic,
          createdAt: new Date(),
        };

        cloneChat = { ...reciver, ...cloneChat };

        dispatch(setChatUser(cloneChat));
        navigate("/chat");
      } else {
        navigate("/chat");
      }
      // }
    } else {
      toastMessage("error", "Please buy a subscription");
    }
  };

  const offerJobforCandidate = (obj) => {
    //
    // setOfferLaoder(obj?._id)
    setcandResp(obj);
    handleShow();
    // offerJobService
    // setTimeout(() => {
    //   setOfferLaoder(null);
    //
    // }, 3000);
  };
  const downloadPdf = (item)=>{
    if(item.indexOf(".pdf") > -1 || item.indexOf(".docx") > -1){
      let pdfName = item.split(s3Expereience).pop()
      var link = document.createElement('a');
  link.href = item;
  link.download = pdfName;
  link.dispatchEvent(new MouseEvent('click'));
    }
   
  }
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
                <div>
                  <Link to="/owner/professional" state="reverse">
                    <img src={goBack} className="me-4" />
                  </Link>
                </div>

                <div>
                  <h1 className="jobDetailHeading">Professional Profile</h1>
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
                        Candidate?.profilePic
                          ? Candidate.profilePic
                          : ProfileApplicant
                      }
                      className="applicantPic"
                    />
                    <div>
                      <h1 className="aplicant-name">
                        {Candidate?.name
                          ? Candidate?.name
                          : Candidate?.email?.slice(
                              0,
                              Candidate?.email?.indexOf("@")
                            )}
                      </h1>
                      <div style={{ display: "flex" }}>
                        <AiFillStar style={{ color: "#EF9D21" }} />
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
                      {Candidate?.location?.address}{" "}
                    </p>

                    <h1 className="h1-applicant">Mile Range to Travel</h1>
                    <p className="p-applicant">
                      {Candidate?.minMiles} - {Candidate?.maxMiles} miles
                    </p>

                    <h1 className="h1-applicant">Hourly Rate</h1>
                    <p className="p-applicant">
                      ${Candidate?.hourRate} • {Candidate?.jobType}
                    </p>
                  </div>

                  <div
                    style={{
                      padding: "0% 0% 5% 1%",
                      borderBottom: "5px solid #F8F9FB ",
                      marginBottom: "4%",
                    }}
                    className="cchatsoch"
                  >
                    {/* <button className='btn btnJobOffer'>Offer Job</button> */}
                    {/* <Link to="/chat"> */}
                    <button className="btn btnMsg" onClick={() => handleChat()}>
                      <img src={msgJob} />
                      <span className="msgTxt">Message</span>
                    </button>
                    {/* </Link> */}
                    <Button
                      className="apllyy candidate"
                      onClick={() => offerJobforCandidate(Candidate)}
                      variant="outlined"
                    >
                      Offer a Job
                    </Button>
                  </div>
                </div>
                {Candidate?.experience?.certificationImgs.length > 0 ? (
                  <div className="carousel-div">
                    <h1 className="cov ms-3 pt-3">Certifications</h1>
                    <Carousel
                      indicators={false}
                      variant="dark"
                      style={{ paddingTop: "10%" }}
                      controls={
                        Candidate?.experience?.certificationImgs.length > 1
                          ? true
                          : false
                      }
                    >
                      {Candidate?.experience?.certificationImgs.map(
                        (item, inx) => {
                          return (
                            <Carousel.Item
                              className="carou-item"
                              style={{ padding: "0",minHeight:"173px" }}
                              key={inx}
                            >
                              <img
                                className="d-block carousel_id "
                                onClick={()=>downloadPdf(item)}
                                src={item.indexOf(".pdf") > -1 ? Anyfile: item.indexOf(".docx") > -1 ? Anyfile :  item}
                                loading="lazy"
                                alt="First slide"
                              />
                              <div className="caroNumbeer">
                                {inx + 1} of{" "}
                                {
                                  Candidate?.experience?.certificationImgs
                                    .length
                                }
                              </div>
                            </Carousel.Item>
                          );
                        }
                      )}
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
                      <CovidApplicant data={candidateCovid} checkCondidate />
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
                      <ReviewApplicant candidate="candidate" reevu={reviewss} />
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
        <OfferJobModal
          offerModal={offerModal}
          handleClose={handleClose}
          canResp={canResp}
        />
      </div>
    </div>
  );
};

export default CandidateProfile;
