import React, { useState } from 'react';
import { Button, Modal, Container, Spinner } from "react-bootstrap";
// import { FiLogOut } from "react-icons/fi"
// import { useDispatch } from "react-redux";
// import { resetUser } from "../../Redux/reducers/userSlice";
// import { Navigate } from "react-router-dom"
import { cancelSubscriptonServices } from "../../../Shared/Services/subscription.service";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../Shared/Redux/reducers/userSlice";
import { toastMessage } from "../../../Shared"


function CancelModal() {
  const user = useSelector((state) => state.root.user);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false)

  

  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseOnLoader = () => {
    handleClose();
    setLoader(false);
  }

  const handleCancellation = () => {
    let CancelObj = {
      subscrptnId: user?.user?.subscriptionId
    }
    setLoader(true)
    cancelSubscriptonServices(CancelObj)
      .then(({ data }) => {
        dispatch(setUser({
          user: data?.data,
          status: user?.status,
          tokens: user?.tokens,
          sub: user?.sub
        }))
        toastMessage("success", "Subcription cancelled successfully")
        
      })
      .catch((e) => {

      }).finally(() => handleCloseOnLoader())


  }

  return (
    <>
      <button className="btn btnCancel" onClick={handleShow}>Cancel Membership</button>


      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className='jobDesc mb-4'>Membership</Modal.Title>
        </Modal.Header>
        <Container style={{ width: "95%", marginBottom: "3%", marginTop: "-5%" }}>
          {user?.user?.subscriptionId.length == 0 ?
            <Modal.Body className='cancelSub'>You currently have no subscription</Modal.Body>
            :
            <>
              <Modal.Body className='cancelSub'>We're sorry to see you go!</Modal.Body>
              <Modal.Body className='cancelDesc'>Your monthly subscription is paid until June 18, 2022. If you would like to proceed with canceling your subscription, please select “Cancel Subscription” below</Modal.Body>
            </>
          }
          {user?.user?.subscriptionId.length == 0 ? "" : <Modal.Footer>
            <button className='btn btnCancellationNo' style={{ width: "47%", marginTop: "0px" }} onClick={handleClose}>
              No, Go Back
            </button>
            <button className='btn btnCancellation' style={{ width: "47%", marginTop: "0px" }} onClick={() => handleCancellation()}>
              {loader ?
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">
                    Loading...
                  </span>
                </Spinner> :
                "Cancel Subscription"
              }
            </button>
          </Modal.Footer>}
        </Container>
      </Modal>
    </>
  );
}

export default CancelModal;