import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { resetUser } from "../../Redux/reducers/userSlice";
import { Navigate } from "react-router-dom";
import { DeleteAccountService } from "../../Services/profileService";
import { toastMessage } from "../../../Shared";
import { useSelector } from "react-redux";

function ModalDeleteAccount({ show, handleClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.root.user);

  const handleDelete = () => {
    DeleteAccountService(user?.user?._id)
      .then(({ data }) => {
        if (data) {
          toastMessage("success", "Account Deleted");
          dispatch(resetUser());
          Navigate("/Login");
        }
      })
      .catch((e) => {
        toastMessage("error", e.response.data.message);
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title className="jobDesc mb-4">Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body className="cancelDesc" style={{ fontSize: "16px" }}>
          Are you sure, you want to delete the account ?{" "}
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
            onClick={handleDelete}
          >
            Yes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteAccount;
