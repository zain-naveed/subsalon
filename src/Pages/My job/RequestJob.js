import React from "react";
import "./RequestJob.css";
import datas from "./Fake1";
import { Row, Card, Pagination, Button } from "react-bootstrap";
import { View } from "../../Assets/index";
import { MdDone } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const RequestJob = () => {
  return (
    <div className="request">
      <Row>
        <div className="request_row">
          <span className="request_rowspan1">#</span>
          <span className="request_rowspan">Saloon</span>
          <span className="request_rowspan3">Roles</span>
          <span className="request_rowspan">Job Type</span>
          <span className="request_rowspan">Salary</span>
          <span className="request_rowspan">Date Applied</span>
          <span className="request_rowspan">Job Status</span>
          <span className="request_rowspan">Action</span>
        </div>
        {datas.map((val) => {
          
          return (
            <>
              <Card className="request_cad">
                <Card.Body>
                  <div className="request_incard">
                    <span className="requestcard_span">1</span>
                    <div className="requestcard_logoside">
                      <img src={val.logo} alt="logo" />
                      <span className="requestcard_span">
                        Lyra's Hair Salon
                      </span>
                    </div>
                    <span className="requestcard_span1">
                      Spa Receptionist - Full Time
                    </span>
                    <span className="requestcard_span">Full Time</span>
                    <span className="requestcard_span">$75 / hour</span>
                    <span className="requestcard_span">28 Feb, 2022</span>
                    <div className="requestcard_open">
                      <span>{val.open}</span>
                      <span className="requestcard_span">Open</span>
                    </div>
                    <div className="requestcard_button">
                      <Button
                        variant="success btn-sm"
                        style={{ background: "#DDF6EC", border: "none" }}
                      >
                        <MdDone style={{color:'#29B57A'}}/>
                      </Button>
                      <Button variant="danger btn-sm" style={{background:'#FDE6E6',border:'none'}}>
                        <AiOutlineClose style={{color:'#FA4949'}}/>
                      </Button>
                      <Button variant="primary btn-sm">
                        <img src={View} alt="logo" />
                      </Button>
                      <Button variant="outline-primary btn-sm">
                        Refer Job
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </>
          );
        })}
        <div className="request_rowpaginat">
          {/* <div className="requestpaginat_text">
            <Card.Text>1-30 of 150 Results</Card.Text>
          </div> */}
          {/* <div> */}
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item active>{1}</Pagination.Item>
              {/* <Pagination.Ellipsis /> */}

              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Item>{4}</Pagination.Item>
              <Pagination.Item>{5}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          {/* </div> */}
        </div>
      </Row>
    </div>
  );
};

export default RequestJob;
