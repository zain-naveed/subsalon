import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./JobDetailMain.css";
import { goBack, JobPic, vectorMan, EditList, user } from "../../Assets/index";
import { RiEditLine } from "react-icons/ri";
import JobDetailListings from "./Tabs/JobDetailListings";
import AplicantsListings from "./Tabs/ApplicantsListing";
import { useLocation } from "react-router";
import { getSingleJob } from "../../Shared/Services/allJobs";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { toastMessage } from "../../Shared";
import { useNavigate } from "react-router-dom";

const JobListings = () => {
  const navigate = useNavigate();

  let params = useParams();
  const [applicantCheck, setApplicantList] = useState(true);
  const location = useLocation();
  const [state, setState] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [salonName, setSalonName] = useState("");
  const [picture, setPicture] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [post, setPost] = useState("");

  const handleClipboard = () => {
    let text = `${window.location.href}`;

    var copyText = text;

    navigator.clipboard.writeText(copyText);
    toastMessage("success", "Invite link suscessfully copied to clipboard");
  };

  useEffect(() => {
    getSingleJob(params.id)
      .then(({ data }) => {
        setSalonName(data?.data?.saloon?.Saloon_name);
        setState(data?.data);
        setPost(data?.data);
        setJobTitle(data?.data?.jobTitle);
        setPicture(
          data?.data?.saloon?.avatar ? data?.data?.saloon?.avatar : user
        );
      })
      .catch((e) => {})
      .finally(() => {});
  }, []);

  return (
    <div className="divSigin">
      <div className="contSignIn">
        <Card className="cardSign " style={{ width: "55rem", height: "auto" }}>
          <Card.Title>
            <div className="JobBtnDiv">
              <div className="jobDetailDiv">
                <div>
                  <Link to="/Listings">
                    <img src={goBack} className="me-4" />
                  </Link>
                </div>
                <div>
                  <div>
                    <h1 className="JobMobileDesc">Job Description</h1>
                  </div>

                  <div style={{ display: "flex", marginLeft: "-16px" }}>
                    <div>
                      <img
                        src={picture ? picture : vectorMan}
                        className="imgJob me-4"
                      />
                    </div>

                    <div>
                      <h1 className="jobDetailHeading">{jobTitle}</h1>
                      <p className="jobDetailPara">{salonName}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="respBtn">
                <button
                  className="btn jobDetailBtn1"
                  onClick={() => handleClipboard()}
                >
                  Refer Job
                </button>
                <button
                  className="btn jobDetailBtn"
                  onClick={() => navigate("/post", { state: { post } })}
                >
                  <RiEditLine style={{ color: "white" }} />
                  &nbsp;Edit Job
                </button>
              </div>
            </div>
          </Card.Title>
          <Card.Body style={{ paddingLeft: "0", paddingRight: "0" }}>
            <ul
              className="nav nav-tabs nav-profile ulTabs  scroller"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link nav-pro nav-color tabsHeading active"
                  id="Detail-tab"
                  style={{ color: "#212121 !important" }}
                  data-bs-toggle="tab"
                  data-bs-target="#Detail"
                  type="button"
                  role="tab"
                  aria-controls="Detail"
                  aria-selected="true"
                  name="Detail"
                  onClick={() => setApplicantList(true)}
                >
                  &nbsp;Job Detail
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link nav-pro nav-color tabsHeading"
                  id="Applicants-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Applicants"
                  type="button"
                  role="tab"
                  aria-controls="Applicants"
                  aria-selected="false"
                  name="Applicants"
                  onClick={() => setApplicantList(false)}
                >
                  &nbsp;Applicants ({totalCount})
                </button>
              </li>
            </ul>
            <div className="divSync"></div>

            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane tab-pane1 fade show active"
                id="Detail"
                role="tabpanel"
                aria-labelledby="Detail-tab"
              >
                <JobDetailListings state={state} />
              </div>
              <div
                className="tab-pane tab-pane1 fade"
                id="Applicants"
                role="tabpanel"
                aria-labelledby="Applicants-tab"
              >
                <AplicantsListings
                  state={state}
                  setTotalCount={setTotalCount}
                />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default JobListings;
