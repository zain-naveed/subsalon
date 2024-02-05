import React from "react";
import "./MyJobs.css";
import { Card, Navbar, Container } from "react-bootstrap";
import { Tabs, Tab } from 'react-bootstrap'
import { BiSearch } from 'react-icons/bi';
// import Jobdata from '../My job/Jobdata';
// import RequestJob from '../My job/RequestJob';
import Paginat from "./Paginat";
import RequestSide from "./RequestSide";

const MyJobs = () => {
  return (
    <div className='myjobs'>
      <Card style={{ width: "1283px", height: '950px' }}>
        <Card.Body>
          <Navbar expand="lg" variant="light" bg="white">
            <Container>
              <Navbar.Brand>My Jobs</Navbar.Brand>
              <nav>
                {/* <form className="container-fluid job_form">
    <div className="input-group">
      <span className="input-group-text" id="basic-addon1"><BiSearch/></span>
      <input type="search" className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
  </form> */}
              </nav>
            </Container>
          </Navbar>
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="home" title="Applied Jobs">
              <div>
                <Paginat />
              </div>
            </Tab>
            <Tab eventKey="profile" title="Job Requests">
              <RequestSide />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyJobs;
