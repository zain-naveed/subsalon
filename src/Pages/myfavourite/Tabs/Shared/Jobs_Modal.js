import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { vectorMan, CloseIcon } from "./../../../../Assets/index";
import { GiPlainCircle } from "react-icons/gi";
import { AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import "../../MyJob.css";
import { jobStatus } from "../../../../Shared/util/constant";
import { toastMessage } from "../../../../Shared";
const Jobs_Modal = ({ post, check }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
        className="mt-5"
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

            <div style={{ display: "flex" }}>
              <div>
                <img
                  style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                  className="me-4"
                  src={vectorMan}
                />
              </div>
              <div>
                <p className="modalJobtitle">{post.role}</p>
                <p className="JobDetailCardH" style={{ marginTop: "-15px" }}>
                  {post?.saloon?.Saloon_name}
                </p>
              </div>
            </div>
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
              <h1 className="respHeading2">Salary</h1>
              <h1 className="JobRole2">
                {post?.appliedJob?.minRate || post?.offerJob?.minRate}-
                {post?.appliedJob?.maxRate || post?.offerJob?.maxRate} / hour
              </h1>
            </div>
            <div>
              <h1 className="respHeading2">
                {check ? "Date Request" : "Date Applied"}
              </h1>
              <h1 className="JobRole2">
                {" "}
                {check ? post.date_request : post.date_applied}{" "}
              </h1>
            </div>
            <div>
              <h1 className="respHeading2">Job Status</h1>
              <h1 className="JobRole2">
                <GiPlainCircle
                  style={
                    (post?.appliedJob?.jobStatus ||
                      post?.offerJob?.jobStatus) == jobStatus.Open
                      ? { color: "#4CAF50" }
                      : { color: "#F44336" }
                  }
                />{" "}
                &nbsp;{" "}
                {post?.appliedJob?.jobStatus || post?.offerJob?.jobStatus}
              </h1>
            </div>
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
          {check ? (
            <>
              <div>
                <button
                  className="btn btnDone me-2"
                  style={{ color: "#29B57A" }}
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
