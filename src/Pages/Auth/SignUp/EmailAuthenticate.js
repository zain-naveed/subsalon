import React, { useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import Foot from "../../../Shared/Components/Foot/Foot"
import { useLocation } from 'react-router';
import NavbarAuth from "./NavbarAuth"
import { EmailIcon } from "../../../Assets/index";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { resendEmailVerified, toastMessage } from '../../../Shared'
import CircularProgress from "@mui/material/CircularProgress";

const EmailAuthentication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loader, setLoader] = useState(false)
  const user = useSelector(state => state.root.user);
  const [email, setEmail] = useState(location?.state?.user?.email ? location?.state?.user?.email : "");

  
  const handleSendEmailAgain = () => {
    const { state: { user } } = location
    
    setLoader(true)
    resendEmailVerified(user?._id).then(() => {
      toastMessage("success", "Email Successfully Send")
    }).catch((err) => {

    }).finally(() => setLoader(false))
  }

  return (
    <div className='divSigin'>
      <NavbarAuth check />
      <div className='contSignIn padCard' >
        <Card className="cardSign" style={{ width: '32rem', height: "26rem" }}>
          <Card.Body>
            <Container className="container-authenticate">
              <img src={EmailIcon} style={{ marginBottom: "5%" }} />
              <h1 className='email-authenticate'>Verify your Email</h1>
              <p className='email-authenticate-p'>Instructions for verifying email has been sent to {email}</p>
              <p className='email-authenticate-p'>You'll receive this email within 5 minutes. Be sure to check your spam folder, too.</p>
              <button onClick={handleSendEmailAgain} className='btn continue'>
                {
                  loader ? <CircularProgress color='inherit' size={20} /> : "Resend Email"
                }

              </button>
            </Container>
          </Card.Body>
        </Card>
      </div>
      <Foot />
    </div >
  )
}

export default EmailAuthentication