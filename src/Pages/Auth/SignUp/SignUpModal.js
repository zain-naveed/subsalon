import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import { OwnerVector, ProivderVector, ProviderVector } from "../../../Assets/index"
import { Link } from "react-router-dom";


function SignUpModal({ show, handleClose }) {


  return (
    <>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className='jobDesc'>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='cancelDesc mb-5' style={{ fontSize: "20px" }}>How do you want to sign up as ? </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Link to="/signUpProvider">
              <button className='btn btnModalSignin' onClick={handleClose}>
                <img src={ProviderVector} style={{ height: "210px" }} />
                <p className='cancelDesc mt-4'>Service Provider</p>
              </button>
            </Link>
            <Link to="/signUpOwner">
              <button className='btn btnModalSignin' onClick={handleClose}>
                <img src={OwnerVector} style={{ height: "200px" }} />
                <p className='cancelDesc mt-4'>Business Owner</p>
              </button>
            </Link>
          </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default SignUpModal