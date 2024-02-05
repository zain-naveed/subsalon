import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { IndiviualPic, Logo, WhiteLogo } from '../../../Assets/index';
import "./navigation.css"
import { FiLogOut } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { resetUser } from "../../Redux/reducers/userSlice";
import { Navigate } from "react-router-dom"


const Navigation = ({ plan }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector(state => state.root);

  

  const location = useLocation();
  let pathName = location.pathname;
  const handleLogout = () => {
    dispatch(resetUser());
    navigate('/Login')
  };

  return (
    <div>
      <Navbar bg="transparent" className={pathName == '/' ? "bgseet coool" : ""} expand="lg">
        <Container>
          {plan ? "" : <Navbar.Brand href="javascript:void(0)" onClick={() => navigate("/")}><img src={pathName == '/' ? WhiteLogo : Logo} alt="logo" /></Navbar.Brand>}
          <Navbar.Toggle className='navbar- toggler' aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className={pathName == '/' ? "ms-auto navi setwhite" : "ms-auto navi"}>
              {plan ? "" : <Nav.Link as={Link} to={user?.user?.role === 'professional' ? "/professionals/findjob" : "/owner/professional"} className='navLink headerAuth' id="activeNav" >Find {user?.user?.role === 'professional' ? "job" : "Service Providers"}</Nav.Link>}
              {
                plan ?
                  <Nav.Link as={Link} className='navLink headerAuth' onClick={handleLogout} to="#">Log Out</Nav.Link>
                  :
                  user?.user?.role == "owner" ?
                    <Nav.Link as={Link} to={user?.user?.isSaloon ? "/post" : "/create-salon"} className='navLink headerAuth' id="activeNav" >Post Job</Nav.Link>
                    :
                    <Nav.Link as={Link} to={"/professionals/findsalon"} className='navLink headerAuth' id="activeNav" >Find Job Postings</Nav.Link>
              }

              <div className='separatorAuth' style={{ marginTop: "8px" }}></div>
              {plan ? <Nav.Link as={Link} to="#" className='navLink headerAuth headerAuthAcc' id="activeNav" ><AiOutlineUser style={{ marginRight: "9px", marginBottom: "2px" }} />{ user?.user && Object.keys(user?.user) == 0 ? "Create An Account" : user?.user?.role === 'professional' ? user?.user?.name : user?.user?.saloon?.Saloon_name}</Nav.Link>
                : <Nav.Link as={Link} to="Login" className='navLink headerAuth headerAuthAcc' id="activeNav" ><AiOutlineUser style={{ marginRight: "9px", marginBottom: "2px" }} />{ user?.user && Object.keys(user?.user) == 0 ? "Create An Account" : user?.user?.role === 'professional' ? user?.user?.name : user?.user?.saloon?.Saloon_name}</Nav.Link>}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div >
  )
}

export default Navigation