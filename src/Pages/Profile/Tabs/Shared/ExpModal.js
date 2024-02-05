import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { toastMessage } from "../../../../Shared";
import { EditIcon } from "../../../../Assets";

const ExpModal = ({ handleExp, check, experienceArray }) => {
  const [show, setShow] = useState(false);
  const [startYear, setStartYear] = useState(new Date());
  const [endYear, setEndYear] = useState(new Date());
  const [expYear, setExpYear] = useState({ start: "", end: "" });


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    expYear["start"] = moment(startYear).format('YYYY');
    expYear["end"] = moment(endYear).format('YYYY');
    let checkyear = moment().format("YYYY");
    
    if (expYear["start"] < expYear["end"] && expYear["end"] <= checkyear) {
    handleExp(expYear);
    handleClose();
    
    setEndYear(new Date());
    setStartYear(new Date());
    }
    else {
      toastMessage("error", "Experience not add");
    }
  };

  return (
    <>

      < button variant="primary" onClick={handleShow} className="btn btnSection mb-4">
        + Add
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
          <Button type="submit" variant="primary" onClick={handleSubmit} className="btn btnSection w-100">
            Add Experience
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ExpModal;