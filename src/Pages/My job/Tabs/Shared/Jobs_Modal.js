import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { vectorMan, CloseIcon } from "./../../../../Assets/index";
import { GiPlainCircle } from "react-icons/gi";
import { AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import "../../MyJob.css";
import { jobStatus } from "../../../../Shared/util/constant";
import { toastMessage } from "../../../../Shared";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

const Jobs_Modal = ({ actions, post, check, inx, postId, check2 }) => {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const action = (value) => {
    handleClose();
    actions(inx, value, postId);
  };
  const handleClick = () => {
    let text = `Hey you might wanna check this job out on SubSalon.\n${window.location.href}`;

    var copyText = text.substr(52, 200);

    navigator.clipboard.writeText(copyText);
    toastMessage("success", "Copied to Clipboard");
  };
  
  return (
    <>
      {check ? (
        <Button
          variant="primary"
          onClick={handleShow}
          className="btn btnEye me-2"
        >
          <AiOutlineEye style={{ color: "white", marginBottom: "9px" }} />
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={handleShow}
          className="btn btnViewJob me-2"
        >
          View Job
        </Button>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        className="mt-5 controlModalWidth"
        style={{ paddingBottom: "20%" }}
      >
        <Modal.Header className="closeIcons">
          <Modal.Title>
            <img
              src={CloseIcon}
              onClick={handleClose}
              className="closeSymbol"
            />
            <p className="jobDesc mb-4">Job Description</p>

            <Link to={`/salonDetail/${post.saloon._id}`}>
              <div style={{ display: "flex" }}>
                <div>
                  <img
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                    }}
                    className="me-4"
                    src={
                      post?.saloon?.avatar ? post?.saloon?.avatar : vectorMan
                    }
                  />
                </div>
                <div>
                  <p className="modalJobtitle">
                    {post?.appliedJob?.jobTitle || post?.offerJob?.jobTitle}
                  </p>
                  <p className="JobDetailCardH" style={{ marginTop: "-15px" }}>
                    {post?.saloon?.Saloon_name}
                  </p>
                  <p className="JobDetailCardH" style={{ marginTop: "-15px" }}>
                    {post?.saloon?.location?.address}
                  </p>
                </div>
              </div>
            </Link>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="divSecond2">
            <div>
              <h1 className="respHeading2">Job Type</h1>
              <h1 className="JobRole2">
                {post?.appliedJob?.jobType || post?.offerJob?.jobType}
              </h1>
            </div>
            <div>
              <h1 className="respHeading2">
                {(post?.appliedJob?.rateType || post?.offerJob?.rateType) ===
                "Commission"
                  ? "Commission"
                  : "Salary"}
              </h1>
              {(post?.appliedJob?.rateType || post?.offerJob?.rateType) ===
              "Commission" ? (
                <h1 className="JobRole2">
                  {post?.appliedJob?.commisionRate ||
                    post?.offerJob?.commisionRate}{" "}
                  %
                </h1>
              ) : (
                <h1 className="JobRole2">
                  {post?.appliedJob?.minRate || post?.offerJob?.minRate}-
                  {post?.appliedJob?.maxRate || post?.offerJob?.maxRate} / hour
                </h1>
              )}
            </div>
            {/* <div>
              <h1 className="respHeading2">Covid Certificate</h1>
              <h1 className="JobRole2">
                {post?.appliedJob?.covidCertificate ||
                  post?.offerJob?.covidCertificate
                  ? "Required"
                  : "Not Required"}
              </h1>
            </div> */}

            {check ? (
              ""
            ) : post?.appliedJob?.jobType == "Part-time" ? (
              <>
                {post?.appliedJob?.startDate && (
                  <div>
                    <h1 className="respHeading2">Start Date</h1>

                    <h1 className="JobRole2">
                      {moment(post?.appliedJob?.startDate).format(
                        "D MMMM YYYY"
                      )}
                    </h1>
                  </div>
                )}
                {post?.appliedJob?.endDate && (
                  <div>
                    <h1 className="respHeading2">End Date</h1>

                    <h1 className="JobRole2">
                      {moment(post?.appliedJob?.endDate).format("D MMMM YYYY")}
                    </h1>
                  </div>
                )}
                {post?.appliedJob?.NumberOfHours && (
                  <div>
                    <h1 className="respHeading2">Working Hours</h1>

                    <h1 className="JobRole2">
                      {`${post?.appliedJob?.NumberOfHours} Hours`}
                    </h1>
                  </div>
                )}
              </>
            ) : (
              <div>
                <h1 className="respHeading2">{check ? "" : "Date Applied"}</h1>
                <h1 className="JobRole2">
                  {" "}
                  {check
                    ? post?.date_request
                    : moment(post?.createdAt).format("D MMMM YYYY")}{" "}
                </h1>
              </div>
            )}
            {post && post?.offerJob?.jobType == "Full-time" ? (
              <>
                <div>
                  <h1 className="respHeading2">{post ? "Posted Date" : ""}</h1>

                  <h1 className="JobRole2">
                    {post
                      ? moment(post?.createdAt).format("D MMMM YYYY")
                      : post?.createdAt}
                  </h1>
                </div>
              </>
            ) : post?.offerJob?.jobType == "Part-time" ? (
              <>
                <div>
                  <h1 className="respHeading2">Start Date</h1>

                  <h1 className="JobRole2">
                    {moment(post?.offerJob?.startDate).format("D MMMM YYYY")}
                  </h1>
                </div>
                <div>
                  <h1 className="respHeading2">End Date</h1>

                  <h1 className="JobRole2">
                    {moment(post?.offerJob?.endDate).format("D MMMM YYYY")}
                  </h1>
                </div>
              </>
            ) : (
              ""
            )}
            <div style={{ marginRight: "25px" }}>
              <h1 className="respHeading2">
                {check ? "Offer Status" : "Job Status"}{" "}
              </h1>
              <h1 className="JobRole2">
                <GiPlainCircle
                  style={
                    post?.requestAction == "Accept"
                      ? { color: "#4CAF50" }
                      : post?.requestAction == "Reject"
                      ? { color: "#F44336" }
                      : { color: "darkorange" }
                  }
                />{" "}
                &nbsp;{" "}
                {post?.requestAction == "Accept"
                  ? "Accepted"
                  : post?.requestAction == "Reject"
                  ? "Rejected"
                  : "Pending"}
              </h1>
            </div>
          </div>
          <div>
            <h1 className="JobDetailCardH mt-4">Required equipment</h1>
            <p className="descJobModal">
              {post?.appliedJob?.reqEquip || post?.offerJob?.reqEquip
                ? post?.appliedJob?.reqEquip || post?.offerJob?.reqEquip
                : "Not Added"}
            </p>
          </div>
          <div>
            <h1 className="JobDetailCardH mt-4">Job Description</h1>
            <p className="descJobModal">
              {post?.appliedJob?.jobDescription ||
                post?.offerJob?.jobDescription}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ flexWrap: "inherit" }}>
          {check && post?.requestAction === "" ? (
            <>
              <div>
                <button
                  className="btn btnDone me-2"
                  style={{ color: "#29B57A" }}
                  onClick={() => {
                    action("Accept");
                  }}
                >
                  <span style={{ display: "flex" }}>
                    <MdOutlineDone style={{ color: "#29B57A" }} />{" "}
                    <p className="buttonTxting">Accept</p>
                  </span>
                </button>
              </div>
              <div>
                <button
                  className="btn btnClose me-2"
                  style={{ color: "#FA4949" }}
                  onClick={() => {
                    action("Reject");
                  }}
                >
                  <span style={{ display: "flex" }}>
                    <AiOutlineClose style={{ color: "#FA4949" }} />
                    <p className="buttonTxting">Reject</p>
                  </span>
                </button>
              </div>
            </>
          ) : (
            ""
          )}
          <button
            onClick={handleClick}
            className="btn btnReferJob w-50"
            style={{ margin: "0 auto" }}
          >
            Refer Job
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Jobs_Modal;
