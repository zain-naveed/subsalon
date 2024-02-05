import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ArrMap } from "../../util/constant";
import "./style.css";

function LocationModal({ show, handleClose }) {
  return (
    <>
      <Modal show={show} className="reviewModal" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h6 className=" mb-0">All Available Locations</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 location-modal-body ">
          <ul className="list-group rounded-0">
            {ArrMap.map((item, ind) => {
              return <li className="list-group-item">{item}</li>;
            })}
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LocationModal;
