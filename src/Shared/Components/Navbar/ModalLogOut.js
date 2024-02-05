import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { resetUser } from "../../Redux/reducers/userSlice";
import { Navigate, useNavigate } from "react-router-dom";

function ModalLogOut({ show, handleClose, cardDelete, card, cardell }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogout = () => {
    if (cardDelete) {
      
      card(cardell?.resp, cardell?.id);
      handleClose();
    } else {
      dispatch(resetUser());
      navigate("Login");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title className="jobDesc mb-4">
            {cardDelete ? "Card delete" : "Log Out"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="cancelDesc" style={{ fontSize: "16px" }}>
          Are you sure, you want to {cardDelete ? "Card delete" : "Log Out"} ?{" "}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btnReferJob"
            style={{ width: "47%", lineHeight: "inherit", marginTop: "0px" }}
            onClick={handleClose}
          >
            No
          </button>
          <button
            className="btn btnPro"
            style={{ width: "47%", marginTop: "0px" }}
            onClick={handleLogout}
          >
            Yes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalLogOut;
