import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import { useSelector } from 'react-redux'
import "./alerts.css"



function Alert({ response, show, handleClose, Alerts, loader, action }) {
  const [resp, setResp] = useState();
  const userResp = useSelector((state) => state.root.user);
  useEffect(() => {
    setResp(response);
  });
  
  const handleCloses = () => {
    handleClose();
  };
  const handleApply = () => {
    Alerts("", response);
    handleCloses()


  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className="mt-5"
        style={{ paddingBottom: "20%" }}
      >
        <Modal.Header className="closeIcons">
          <Modal.Title>
            <h4 className="jobDesc"> {action == "delete" ? "Job Delete" : "Job Detail"}</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="descJobModal">
          {action == "delete" ? "Are you sure to delete ? " : ""}
          {action == "showjOB" ?
            <div className="detailss">
              <h5>
                Title

              </h5>
              <p>
                {resp?.jobTitle}
              </p>
              <h5>
                Availabilty

              </h5>
              <p>
                {moment(resp?.jobAvailabilityDate).format("DD,MM,YYYY")}
              </p>
              <h5>
                Description

              </h5>
              <p>
                {resp?.jobDescription}
              </p>
              <h5>
                Job type

              </h5>
              <p>
                {resp?.jobType}
              </p>

            </div>
            :
            ""}
        </Modal.Body>
        <Modal.Footer style={{ flexWrap: "inherit" }}>
          {action == "delete" ?
            <div className="conffirms w-100" style={{ display: "flex", justifyContent: "center" }}>
              <button className="btn btnReferJob " style={{ marginTop: "0px", width: "48%", marginRight: "5px" }} onClick={handleCloses}>No</button>
              <button className="btn btnPro" style={{ width: "48%" }} onClick={handleApply}>Yes</button>

            </div>
            :
            ""
          }
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Alert;
