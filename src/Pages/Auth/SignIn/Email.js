import React from 'react';
import { Nav, Card, Button, Container } from 'react-bootstrap'
import { logo1 } from '../../../Assets/index';
import { locks, Facebook, Instagram, LinkedIn, Twitter } from '../../../Assets/index';

function Email() {
  return (
    <div className='email'>
      <Container>
        <div className="cards">
          <div className="nav_div">
            <img src={logo1} alt="" />
          </div>

          <Card style={{ width: '563px', height: '362px', textAlign: 'center', alignItems: 'center' }}>
            <Card.Img variant="top" src={locks} className='card_img' />
            <Card.Body>
              <Card.Title className='card_title'>Forget password request</Card.Title>
              <Card.Text className='card_text'>
                It seems you forgot the password for your Saloon Subtitute account. You can change your password by clicking the button below:
              </Card.Text>
              <Button variant="primary" className='card_butn'>Reset Password</Button>
              <Card.Text className='card_text2'>You can also click here: <span className='card_text2span'>https://www.saloonsubtitute.io/emails? utm_source=demo/users/password/edit? reset_password_token=H3nJUgGx8pYtkjoFFSAB.</span> If you didn't mean to reset your password, then you can just ignore this email - your password will not change.</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="botom_side">
          <div>

            <div className="logos">
              <div className="logos1">
                <img src={Facebook} alt="" />
              </div>
              <div className="logos2">
                <img src={Instagram} alt="" />
              </div>
              <div className="logos3">
                <img src={LinkedIn} alt="" />
              </div>
              <div className="logos4">
                <img src={Twitter} alt="" />
              </div>
            </div>
            <div className="last_txt">

              If you have any questions, feel free to message us at <span className='last_txtspan'>support@saloonsubtitute.com.</span>
              You are receiving this email because you have bought or downloaded one of the Tabler products.
              <span className='last_txtspan'>Unsubscribe</span>
            </div>
          </div>

        </div>
      </Container>
    </div>
  )
}

export default Email