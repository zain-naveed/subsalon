import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { EditIcon } from "../../../../Assets";
import { toastMessage } from "../../../../Shared";
import { date } from "yup";

const UpdateModal = ({ handleDates, startingYear, endingYear, id }) => {
  
  const [show, setShow] = useState(false);
  const [startYear, setStartYear] = useState(new Date(String(startingYear)));
  const [endYear, setEndYear] = useState(new Date(String(endingYear)));
  const [expYear, setExpYear] = useState({ start: "", end: "" });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    expYear["start"] = moment(startYear).format("YYYY");
    expYear["end"] = moment(endYear).format("YYYY");
    // handleExp(expYear);
    let checkyear = moment().format("YYYY");
    
    if (expYear["start"] < expYear["end"] && expYear["end"] <= checkyear) {
      handleDates(expYear, id);
      handleClose();
    } else {
      toastMessage("error", "Added experience is not updated");
    }
  };

  return (
    <>
      <button variant="primary" onClick={handleShow} className="btn">
        <img src={EditIcon} />
      </button>

      <Modal className="contentModal" show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ borderBottom: "none" }}>
          <Modal.Title style={{ fontSize: "18px" }}>Add Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body className="calenderDiv">
          <div>
            <h1 className="modalText">Starting Year: </h1>
            <DatePicker
              className="datepick"
              selected={startYear}
              onChange={(date) => setStartYear(date)}
              showYearPicker
              dateFormat="yyyy"
            />
          </div>
          <div>
            <h1 className="modalText">Ending Year: </h1>
            <DatePicker
              className="datepick"
              selected={endYear}
              onChange={(date) => setEndYear(date)}
              showYearPicker
              dateFormat="yyyy"
            />
          </div>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none" }}>
          <Button
            type="submit"
            variant="primary"
            onClick={handleSubmit}
            className="btn btnSection w-100"
          >
            Add Experience
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateModal;
