import React from 'react'
import { Card, Button, Container } from 'react-bootstrap'
import Navigation from "../../../Shared/Components/Navbar/navigation";
import Foot from "../../../Shared/Components/Foot/Foot"
import "../Auth.css";
import { EmailIcon } from '../../../Assets';
import { useLocation } from "react-router-dom";



const EmailReset = () => {
  const location = useLocation();
  return (
    <div className='divSigin'>
      <Navigation />
      <div className='contSignIn'>
        <Card className="cardSign" style={{ width: '33rem', height: "25rem " }}>
          <Card.Body>
            <Container className='pReset'>
              <img src={EmailIcon} />
              <Card.Title className="titleSign1 titleDiv1">Password reset link sent!</Card.Title>
              <div className='divEmail'>
                <Card.Text className="textEmail">Instructions for resetting your password have been sent to <span className='spanWelcome1'>{location.state.email}</span></Card.Text>
                <Card.Text className="textEmail">You'll receive this email within 5 minutes. Be sure to check your spam folder, too.</Card.Text>
              </div>
            </Container>
          </Card.Body>
        </Card>
      </div>
      <Foot />
    </div >
  )
}

export default EmailReset