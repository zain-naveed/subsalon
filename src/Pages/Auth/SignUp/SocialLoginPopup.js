import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import { OwnerVector, ProivderVector, ProviderVector } from "../../../Assets/index"
import { Link } from "react-router-dom";
import { roleEnum } from '../../../Shared';
import { socialLoginService, toastMessage } from "../../../Shared";
import { useDispatch } from 'react-redux'
import { setUser } from "../../../Shared/Redux/reducers/userSlice";
function SocialLoginPopup({ show, handleClose, beeefore, respSocialpop,
  setFloader,
  floader,
  gLoader,
  setGLoader
}) {
  const dispatch = useDispatch()
  const handleLogin = (role) => {
    debugger
    if (respSocialpop.platform == "google") {
      const {
        googleId,
        profileObj: { email, imageUrl, name },
      } = respSocialpop;
      let obj = {
        platform: "google",
        profilePic: imageUrl,
        socialId: googleId,
        email: email,
        name: name,
        role: role
      };
      setGLoader(true);
      handleClose()
      socialLoginService(obj)
        .then(({ data }) => {
          

          dispatch(
            setUser({
              user: data.user,
              status: data.status,
              tokens: data.tokens,
            })
          );
        })
        .catch((err) => {
          toastMessage("error", err?.response?.data?.message);
        })
        .finally(() => {
          setGLoader(false)

        });
    } else {
      const { userID, picture, name, email } = respSocialpop;
      let obj = {
        platform: "facbook",
        profilePic: `https://graph.facebook.com/${userID}/picture?type=large`,
        socialId: userID,
        name: name,
        role: role
      };
      if (email) {
        obj["email"] = email;
      }
      setFloader(true);
      handleClose()
      socialLoginService(obj)
        .then(({ data }) => {
          

          dispatch(
            setUser({
              user: data.user,
              status: data.status,
              tokens: data.tokens,
            })
          );
        })
        .catch((err) => {
          toastMessage("error", err?.response?.data?.message);
        })
        .finally(() => setFloader(false));
    }

  }
  return (
    <>

      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title className='jobDesc'>{beeefore ? "Login" : "Sign Up"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='cancelDesc mb-5' style={{ fontSize: "20px" }}>How do you want to {beeefore ? "Login" : "sign up"} as ? </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Link to="/signUpProvider">
              <button className='btn btnModalSignin' onClick={() => handleLogin(roleEnum.professional)}>
                <img src={ProviderVector} style={{ height: "210px" }} />
                <p className='cancelDesc mt-4'>Service Provider</p>
              </button>
            </Link>
            <Link to="/signUpOwner">
              <button className='btn btnModalSignin' onClick={() => handleLogin(roleEnum.owner)}>
                <img src={OwnerVector} style={{ height: "200px" }} />
                <p className='cancelDesc mt-4'>Salon Owner</p>
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


export default SocialLoginPopup