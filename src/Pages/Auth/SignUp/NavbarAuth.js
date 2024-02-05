import React, { useState } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { IndiviualPic, Logo, SalonLady, WhiteLogo } from '../../../Assets/index';
import "../../../Shared/Components/Navbar/navigation.css"
import { FiLogOut } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SignUpModal from './SignUpModal';

const NavbarAuth = ({ check }) => {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.root);
  const location = useLocation();
  let pathName = location.pathname

  const [show, setShow] = useState(false);

  const handleModalShow = () => {
    setShow(true)
  }
  const handleModalClose = () => {
    setShow(false)
  }


  return (
    <div>
      <Navbar bg="transparent" className={pathName == '/' ? "bgseet coool" : ""} expand="lg">
        <Container>
          <Navbar.Brand href="javascript:void(0)" onClick={() => navigate("/")}><img src={pathName == '/' ? WhiteLogo : Logo} alt="logo" /></Navbar.Brand>
          <Navbar.Toggle className='navbar- toggler' aria-controls="basic-navbar-nav" />
          <Navbar.Collapse style={{ width: "80%" }} id="basic-navbar-nav ">
            <Nav className="ms-auto navi">
              {check ? "" : <Nav.Link as={Link} to="/Login" className='navLink headerAuth' id="activeNav" style={{ marginRight: "25px" }} >Log In</Nav.Link>}
              {/* <Nav.Link href="#link" className='navLink' id="activeNav" >Salon / Post Jobs</Nav.Link> */}
              {/* <span className='span1'>|</span> */}
              {check ? "" : <div className='separatorAuth' style={{ marginTop: "8px" }}></div>}
              {check ? "" : <AiOutlineUser className='authNavbar' />}
              {check ? "" : <NavDropdown title="Create An Account" id="basic-nav-dropdown" className=' headerAuthAcc checkNav navLink headerAuth '
                onClick={handleModalShow}
              >
                <NavDropdown.Item className="dropNavAuth"  href="javascript:void(0)" onClick={() => navigate("/signUpProvider")}>
                  <AiOutlineUser style={{ marginRight: "10px", marginTop: "-3px" }} />
                  Service Provider
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className="dropNavAuth" href="javascript:void(0)" onClick={() => navigate("/signUpOwner")}>
                  <SalonLady className='iconNonNonInG' style={{ marginRight: "10px", marginTop: "-3px" }} />
                  Salon Owner
                </NavDropdown.Item>
              </NavDropdown>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SignUpModal show={show} handleClose={handleModalClose} />
    </div >
  )
}

export default NavbarAuth