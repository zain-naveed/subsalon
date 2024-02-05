import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Img, user as userr } from "../../../Assets/index";
import { toastMessage } from "../../../Shared";
import { getSingleforNotifyJob } from "../../Services/allJobs";
import { GiConsoleController } from "react-icons/gi";
import "./modal.css";

function Example({
  response,
  show,
  handleClose,
  jobApply,
  loader,
  getjobid,
  checkJobCard,
  announcement,
}) {
  const userResp = useSelector((state) => state.root.user);

  const [resp, setResp] = useState(null);

  useEffect(() => {
    getjob(getjobid);
  }, [getjobid]);

  
  const handleApply = () => {
    jobApply(resp);
  };

  const getjob = (id) => {
    if(id){
      getSingleforNotifyJob(id)
      .then(({ data: { data } }) => {
        // 
        
        setResp(data);
      })
      .catch((e) => {});
    }
    
  };

  const handleClick = () => {
    let text = `${window.location.href}`;
    var copyText = text;
    navigator.clipboard.writeText(copyText);
    toastMessage("success", "Invite link suscessfully copied to clipboard");
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className="mt-5 modal-main-cont"
        style={{ paddingBottom: "20%" }}
        centered
      >
        <Modal.Header className="closeIcons" closeButton>
          {/* <img
            closeButton
              className="closeSymbol "
            /> */}
          {announcement ? (
            <div className="Ann-title-cont">
              <h1 className="Ann-title">Announcement Details</h1>
            </div>
          ) : (
            <Modal.Title>
              <p className="jobDesc mb-4">Job Description</p>

              <div style={{ display: "flex" }}>
                <div>
                  <img
                    src={
                      resp?.saloon?.avatar
                        ? resp?.saloon?.avatar
                        : resp?.saloon?.avatar
                        ? resp?.saloon?.avatar
                        : userr
                    }
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                    }}
                    className="me-4 jobAvatar"
                    // src={vectorMan}
                  />
                </div>
                <div>
                  <p className="modalJobtitle">
                    {resp?.jobTitle ? resp?.jobTitle : resp?.jobTitle}
                  </p>
                  <p className="JobDetailCardH" style={{ marginTop: "-15px" }}>
                    {/* {post?.saloon?.Saloon_name} */}
                    {resp?.saloon?.Saloon_name
                      ? resp?.saloon?.Saloon_name
                      : resp?.saloon?.Saloon_name}
                  </p>
                </div>
              </div>
            </Modal.Title>
          )}
        </Modal.Header>
        {announcement ? (
          <div className="Ann-msg-cont">
            <p className="Ann-msg">{response}</p>
          </div>
        ) : (
          <>
            {" "}
            <Modal.Body>
              <div className="jobModalHead">
                <div>
                  <h1 className="respHeading2">Job Type</h1>
                  <h1 className="JobRole2">
                    {/* {post?.appliedJob?.jobType || post?.offerJob?.jobType} */}
                    {resp?.jobType ? resp?.jobType : resp?.jobType}
                  </h1>
                </div>
                <div>
                  <h1 className="respHeading2">
                    {resp?.rateType != "Commission" ? `Salary` : `Commission`}
                  </h1>
                  {resp?.rateType != "Commission" ? (
                    <h1 className="JobRole2">
                      {/* {response?.minRate || response?.minRate}-{response?.maxRate || response?.maxRate}   / hour */}
                      {resp?.minRate}-{resp?.maxRate} / hour
                    </h1>
                  ) : (
                    <h1 className="JobRole2">
                      {/* {response?.appliedJob?.minRate || response?.offerJob?.minRate}-{response?.appliedJob?.maxRate || response?.offerJob?.maxRate}   / hour */}
                      {resp?.commisionRate}%
                    </h1>
                  )}
                </div>
                {resp?.jobType === "Part-time" ? (
                  <>
                    <div>
                      <h1 className="respHeading2">
                        {/* {check ? "Date Request" : "Date Applied"} */}Start
                        Date
                      </h1>
                      <h1 className="JobRole2">
                        {/* {check ? post.date_request : post.date_applied}  */}
                        {moment(resp?.startDate).format("DD MMM, YYYY")}
                      </h1>
                    </div>
                    <div>
                      <h1 className="respHeading2">
                        {/* {check ? "Date Request" : "Date Applied"} */}End
                        Date
                      </h1>
                      <h1 className="JobRole2">
                        {/* {check ? post.date_request : post.date_applied}  */}
                        {moment(resp?.endDate).format("DD MMM, YYYY")}
                      </h1>
                    </div>
                    {resp?.NumberOfHours && resp?.jobType === "Part-time" &&
                    <div>
                      <h1 className="respHeading2">
                        Working hours
                      </h1>
                      <h1 className="JobRole2">
                      {`${resp?.NumberOfHours} Hours`}
                      </h1>
                    </div>
}
                  </>
                ) : (
                  <div>
                    <h1 className="respHeading2">
                      {/* {check ? "Date Request" : "Date Applied"} */}Posted
                      Date
                    </h1>
                    <h1 className="JobRole2">
                      {/* {check ? post.date_request : post.date_applied}  */}
                      {moment(resp?.createdAt).format("DD MMM, YYYY")}
                    </h1>
                  </div>
                )}

                {/* <div> */}
                {/* <h1 className="respHeading2"> */}
                {/* {check ? "Date Request" : "Date Applied"} */}
                {/* Covid
                Certificate */}
                {/* </h1> */}
                {/* <h1 className="JobRole2"> */}
                {/* {check ? post.date_request : post.date_applied}  */}
                {/* {resp?.covidCertificate ? "Required" : "Not Required"} */}
                {/* </h1> */}
                {/* </div> */}
                <div>
                  <h1 className="respHeading2">Job Status</h1>
                  <h1 className="JobRole2">
                    {/* <GiPlainCircle style={(post?.appliedJob?.jobStatus  || post?.offerJob?.jobStatus) == jobStatus.Open  ? { color: "#4CAF50" } : { color: "#F44336" }} /> &nbsp; {post?.appliedJob?.jobStatus || post?.offerJob?.jobStatus} */}
                    {resp?.jobStatus ? resp?.jobStatus : resp?.jobStatus}
                  </h1>
                </div>
              </div>
              <div>
                <h1 className="JobDetailCardH mt-4">Required equipment</h1>
                <p className="descJobModal">
                  {/* {post?.appliedJob?.jobDescription || post?.offerJob?.jobDescription} */}
                  {resp?.reqEquip ? resp?.reqEquip : resp?.reqEquip}
                </p>
              </div>
              <div>
                <h1 className="JobDetailCardH mt-4">Job Description</h1>
                <p className="descJobModal">
                  {/* {post?.appliedJob?.jobDescription || post?.offerJob?.jobDescription} */}
                  {resp?.jobDescription
                    ? resp?.jobDescription
                    : resp?.jobDescription}
                </p>
              </div>
            </Modal.Body>
            {checkJobCard ? (
              <Modal.Footer style={{ flexWrap: "inherit" }}>
                {/* {
            check ? */}
                <>
                  {/* <div>
                  <button className='btn btnDone me-2' style={{ color: "#29B57A" }}>
                    <span style={{ display: "flex" }}>
                       
                         <p className='buttonTxting'>Accept</p></span>
                  </button>
                </div>
                <div>
                  <button className='btn btnClose me-2' style={{ color: "#FA4949" }}>
                    <span style={{ display: "flex" }}>
                       
                        <p className='buttonTxting'>Reject</p></span>
                  </button>
                </div> */}
                </>
                {/* : ""
          } */}
                {resp?.userApply?.includes(userResp?.user?._id) ? (
                  <button
                    className="btn btnPro  w-50"
                    style={{ fontSize: "14px", height: "45px" }}
                    disabled={true}
                  >
                    Applied
                  </button>
                ) : (
                  <button
                    disabled={loader}
                    className="btn btnPro  w-50"
                    onClick={handleApply}
                    style={{ fontSize: "14px", height: "42px" }}
                  >
                    {loader ? (
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : (
                      "Apply Now"
                    )}
                  </button>
                )}

                <button
                  onClick={handleClick}
                  className="btn btnReferJob w-50"
                  style={{ height: "42px" }}
                >
                  Refer Job
                </button>
              </Modal.Footer>
            ) : (
              ""
            )}
          </>
        )}
      </Modal>
    </>
  );
}

export default Example;
