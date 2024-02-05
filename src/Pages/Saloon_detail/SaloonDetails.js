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
  salonAvatar,
  salonBack,
  BannersEdiit,
  user,
} from "../../Assets";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import { AiFillStar } from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import "./SaloonDetails.css";
import SaloonAbout from "./SaloonAbout";
import SaloonList from "./SaloonList";
import {
  getallJobFromSingleSaloon,
  getSaloonbyId,
} from "../../Shared/Services/allSalons";
import { useParams } from "react-router-dom";
import { toastMessage } from "../../Shared";

export const SaloonDetails = () => {
  let params = useParams();
  
  const [datas, setData] = useState([]);
  const [select, setSelect] = useState("About");
  const loacation = useLocation();
  

  useEffect(() => {
    getsaloon();

    window.addEventListener("click", (e) => {
      if (e) {
        let getEle = document.getElementById("mTab");
        getEle.scrollLeft =
          e.target.offsetLeft - e.target.parentNode.offsetWidth / 2;
      }
    });
  }, []);

  const data = loacation?.state?.state?.saloon
    ? loacation?.state?.state?.saloon
    : params.id
      ? datas
      : loacation?.state?.state;
  

  const getsaloon = () => {
    
    if (params.id) {
      getSaloonbyId(params?.id)
        .then(({ data: { data } }) => {
          setData(data);
        })
        .catch((e) => {
          toastMessage("error", e?.response?.data?.message);
        });
    }
  };

  
  return (
    <div className="salonDetail">
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
                    <Link
                      to={
                        loacation?.state?.state?.saloon
                          ? "/my-jobs"
                          :loacation?.state==="checkNotify" ? "/notification" : "/professionals/findsalon"
                      }
                      state="reverse"
                    >
                      <img src={goBack} className="me-4" />
                    </Link>
                  </div>

                  <div>
                    <h1 className="jobDetailHeading">Salon Detail</h1>
                  </div>
                </div>
              </div>
            </Card.Title>
            <Card.Body>
              <Row>
                <Col className="colSalon" xs={3}>
                  <div className="applicantInfoDiv">
                    <div
                      className="info-salon"
                      style={{
                        backgroundImage: `url(${data?.coverImage ? data?.coverImage : BannersEdiit
                          })`,
                      }}
                    >
                      <div className="salonPic">
                        <img
                          src={data?.avatar ? data.avatar : user}
                          className="salonAvat"
                        />
                        <div>
                          <h1 className="salon-name">{data?.Saloon_name}</h1>
                          {/* <div style={{ display: "flex" }}>
                        <AiFillStar style={{ color: "#EF9D21" }} /><h1 className='ratings-h1'>4.3 <span className='ratResp'>Ratings</span></h1>
                      </div> */}
                        </div>
                      </div>
                    </div>

                    <div className="div-sec-applicant respJobDiv">
                      <h1 className="h1-applicant">Location</h1>
                      <p className="p-applicant">{data?.location?.address}</p>
                      {/* 
                      <h1 className="h1-applicant">Phone Number</h1>
                      <p className="p-applicant">Tel:{data?.phoneNumber}</p> */}

                      {/* <h1 className="h1-applicant">Mile Range to Travel </h1>
                      <p className="p-applicant">
                        {data?.job?.minRate} - {data?.job?.maxRate}  miles
                      </p> */}
                      <h1 className="h1-applicant">phone Number</h1>
                      <p className="p-applicant">+{+data?.phoneNumber}</p>
                      {/* <h1 className="h1-applicant">Employees</h1>
                      <p className="p-applicant">
                        {data?.Salon_Service_Provider}
                      </p> */}
                    </div>

                    {/* <div style={{ padding: "0% 0% 5% 1%", borderBottom: "5px solid #F8F9FB ", marginBottom: "4%" }}>
                    <button className='btn btnJobOffer'>Offer Job</button>
                    <button className='btn btnMsg'><img src={msgJob} />{"     "}<span className='msgTxt'>Message</span></button>
                  </div> */}
                  </div>
                  {data?.certification?.length > 0 ? (
                    <div className="carousel-div">
                      <h1 className="cov ms-3 pt-3">Certifications</h1>

                      <Carousel
                        controls={data?.certification.length > 1 ? true : false}
                        variant="dark"
                        style={{ paddingTop: "10%" }}
                      >
                        {data?.certification?.map((item, inx) => {
                          return (
                            <Carousel.Item
                              className="carou-item"
                              style={{ padding: "0" }}
                            >
                              <img
                                className="d-block carousel_id "
                                src={item}
                                alt="First slide"
                              />
                              <div className="caroNumbeer">
                                {inx + 1} of {data?.certification.length}
                              </div>
                            </Carousel.Item>
                          );
                        })}
                      </Carousel>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
                <Col className="colApplicant">
                  <ul
                    className="nav nav-tabs scroller"
                    id="mTab"
                    role="tablist"
                  >
                    {/* <li className="nav-item about-page" role="presentation">
                    <button className="nav-link nav-pro nav-color tabsHeading active" id="About-tab" data-bs-toggle="tab" data-bs-target="#About" type="button" role="tab" aria-controls="About" aria-selected="true" name='About' onClick={(e) => { setSelect('Open'); }} >
                      <CovidPic className={`${select == "Covid" ? 'iconActiveInG' : 'iconNonInG'}`} />
                      <BsBriefcase className={`${select == "Open" ? 'iconActiveInG' : 'iconNon'}`}/>
                      &nbsp;Open Jobs</button>
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
                          setSelect("Covid");
                        }}
                      >
                        <BsBriefcase
                          className={`${select == "Open" ? "iconActiveInG" : "iconNon"
                            }`}
                        />
                        &nbsp;Open Jobs
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
                        <ExperiencePic
                          className={`${select == "About" ? "iconActive" : "iconNoning"
                            }`}
                        />
                        &nbsp;About
                      </button>
                    </li>
                    {/* <li className="nav-item" role="presentation">
                    <button className="nav-link nav-pro nav-color absHeading" id="Reviews-tab" data-bs-toggle="tab" data-bs-target="#Reviews" type="button" role="tab" aria-controls="Reviews" aria-selected="false" name='Reviews' onClick={(e) => { setSelect('Reviews'); }}>
                      <ReviewPic className={`${select == "Reviews" ? 'iconActive' : 'iconNon'}`} />&nbsp;Reviews</button>
                  </li> */}
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
                      <SaloonList saloon={datas} />
                    </div>
                    <div
                      className="tab-pane tab-pane1 fade"
                      id="Covid"
                      role="tabpanel"
                      aria-labelledby="Covid-tab"
                    >
                      <SaloonAbout about={datas} />
                    </div>
                    {/* <div className="tab-pane tab-pane1 fade" id="Reviews" role="tabpanel" aria-labelledby="Reviews-tab"><ReviewApplicant /></div> */}
                    {/* <div className="tab-pane tab-pane1 fade" id="Reviews" role="tabpanel" aria-labelledby="Reviews-tab"></div> */}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
