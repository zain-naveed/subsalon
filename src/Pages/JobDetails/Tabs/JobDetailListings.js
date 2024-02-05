import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaCircle } from "react-icons/fa";
import { OnlineIndicator } from "../../../Assets/index";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import { BsFillCircleFill } from "react-icons/bs";

function JobDetailListings({ state }) {
  // 
  
  const [jobDetail, setJobDetail] = useState(state ? state : "");
  const [loader, setLoader] = useState(true);

  const [descripton, setDescription] = useState(
    state?.jobDescription ? state?.jobDescription : ""
  );
  const [status, setStatus] = useState(
    state?.jobStatus ? state?.jobStatus : ""
  );
  const [apply, setApply] = useState(
    state?.jobAvailabilityDate ? state?.jobAvailabilityDate : ""
  );
  const [created, setCreated] = useState(
    state?.createdAt ? state?.createdAt : ""
  );
  const [jobType, setJobType] = useState(state?.jobType ? state?.jobType : "");
  const [maxRate, setMaxRate] = useState(state?.maxRate ? state?.maxRate : "");
  const [minRate, setMinRate] = useState(state?.minRate ? state?.minRate : "");
  const [reqEquip, setReqEquip] = useState(
    state?.reqEquip ? state?.reqEquip : ""
  );

  const [covidCertificate, setCovidCertificate] = useState(
    state?.covidCertificate ? state?.covidCertificate : ""
  );
  useEffect(() => {
    setLoader(true);
    setDescription(state?.jobDescription ? state?.jobDescription : "");
    setStatus(state?.jobStatus ? state?.jobStatus : "");
    setApply(state?.jobAvailabilityDate ? state?.jobAvailabilityDate : "");
    setCreated(state?.createdAt ? state?.createdAt : "");
    setJobType(state?.jobType ? state?.jobType : "");
    setMaxRate(state?.maxRate ? state?.maxRate : "");
    setMinRate(state?.minRate ? state?.minRate : "");
    setReqEquip(state?.reqEquip ? state?.reqEquip : "");
    setCovidCertificate(state?.covidCertificate ? state?.covidCertificate : "");
  }, [state?.jobDescription]);

  return (
    <div>
      {state ? (
        <Container className="jobDetailCont">
          <Row>
            <Col className="respColJob">
              <h1 className="JobInfoHead mt-3">Required Equipment</h1>
              <p className="JobInfo">{reqEquip}</p>

              <h1 className="JobInfoHead">Job Description</h1>
              <p className="JobInfo">{descripton}</p>
            </Col>
            <Col xs={3} className="colJobDetail">
              <h1 className="JobDetailCard">About this role</h1>
              <div className="respDivJob">
                <ul className="ulJobList">
                  <div className="colMargin">
                    <p className="JobDetailCardH">Status</p>
                    <p className="JobDetailCardP">
                      {status == "Closed" ? (
                        <BsFillCircleFill style={{ color: "red" }} />
                      ) : (
                        <img src={OnlineIndicator} />
                      )}
                      <span style={{ marginLeft: "5px" }}>{status}</span>
                    </p>
                  </div>
                  {/* <div className='colMargin'>
                    <p className='JobDetailCardH'>
                      Application deadline                    
                      </p>
                    <p className='JobDetailCardP'>
                      {state?.jobAvailabilityDate ? moment(apply).format("D MMM, YYYY") : "N/A"}
                    </p>
                  </div> */}
                  {jobType === "Part-time" ? (
                    <>
                      <div className="colMargin">
                        <p className="JobDetailCardH">Start date</p>
                        <p className="JobDetailCardP">
                          {moment(state?.startDate).format("D MMM, YYYY")}
                        </p>
                      </div>
                      <div className="colMargin">
                        <p className="JobDetailCardH">End date</p>
                        <p className="JobDetailCardP">
                          {moment(state?.endDate).format("D MMM, YYYY")}
                        </p>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <div className="colMargin respJob">
                    <p className="JobDetailCardH">Job Posted On</p>
                    <p className="JobDetailCardP">
                      {state?.createdAt
                        ? moment(created).format("D MMM, YYYY")
                        : "N/A"}
                    </p>
                  </div>
                  <div className="colMargin">
                    <p className="JobDetailCardH">Job Type</p>
                    <p className="JobDetailCardP">{jobType}</p>
                  </div>
                  <div className="colMargin">
                    <p className="JobDetailCardH">
                      {state?.rateType === "Commission"
                        ? "Commission"
                        : "Salary"}
                    </p>
                    {state?.rateType === "Commission" ? (
                      <p className="JobDetailCardP">{state?.commisionRate} %</p>
                    ) : (
                      <p className="JobDetailCardP">
                        ${minRate} - {maxRate} / hour
                      </p>
                    )}
                  </div>
                  {jobType === "Part-time" && state?.NumberOfHours ? (
                    <div className="colMargin">
                      <p className="JobDetailCardH">Working Hours</p>
                      <p className="JobDetailCardP">
                        {`${state?.NumberOfHours} Hours`}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* <div className='colMargin'>
                    <p className='JobDetailCardH'>
                      Covid Certificate
                    </p>
                    <p className='JobDetailCardP'>
                      {covidCertificate ? "Required" : "Not Required"}
                    </p>
                  </div> */}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <Spinner
          style={{ display: "flex", margin: "0 auto" }}
          animation="border"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}

export default JobDetailListings;
