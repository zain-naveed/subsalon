import { lyralog } from "../../Assets/index";
import { BsCircleFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import "./Fake1.css";
import { View } from "../../Assets/index";
import { MdDone } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
// import { Type } from 'react-bootstrap-table2-editor';

// const Fake1=()=>{

const columns = [
  { dataField: "id", text: "#", classes: "demo_row" },
  { dataField: "saloon", text: "Saloon", classes: "demo_row1",searchable: false },
  // { dataField: 'saloon1', text: 'Saloon' },
  { dataField: "roles", text: "Roles", classes: "demo_row2",searchable: false },


  { dataField: "jobType", text: "Job Type", classes: "demo_row3",searchable: false},
  { dataField: "salary", text: "Salary", classes: "demo_row4",searchable: false },
  { dataField: "dateApplied", text: "Date Applied", classes: "demo_row5",searchable: false },
  { dataField: "jobStatus", text: "Job Status", classes: "demo_row6",searchable: false },


  {
    dataField: "action",
    text: "Actions",
    classes:
      "demo_row7                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ",
  },
];
const oneData = [
  {
    id: 1,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button variant="primary btn-sm">View Job</Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
  {
    id: 2,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button variant="primary btn-sm">View Job</Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
  {
    id: 3,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button variant="primary btn-sm">View Job</Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
  {
    id: 4,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button variant="primary btn-sm">View Job</Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
  {
    id: 5,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button variant="primary btn-sm">View Job</Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
  {
    id: 6,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button variant="primary btn-sm">View Job</Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
  {
    id: 7,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button variant="primary btn-sm">View Job</Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
  {
    id: 8,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button variant="primary btn-sm">View Job</Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
  {
    id: 9,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button variant="primary btn-sm">View Job</Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
  {
    id: 10,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button variant="primary btn-sm">View Job</Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
];
const twoData = [
  {
    id: 1,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button
          variant="success btn-sm"
          style={{ background: "#DDF6EC", border: "none" }}
        >
          <MdDone style={{ color: "#29B57A" }} />
        </Button>
        <Button
          variant="danger btn-sm"
          style={{ background: "#FDE6E6", border: "none" }}
        >
          <AiOutlineClose style={{ color: "#FA4949" }} />
        </Button>
        <Button variant="primary btn-sm">
          <img src={View} alt="logo" />
        </Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
  {
    id: 2,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button
          variant="success btn-sm"
          style={{ background: "#DDF6EC", border: "none" }}
        >
          <MdDone style={{ color: "#29B57A" }} />
        </Button>
        <Button
          variant="danger btn-sm"
          style={{ background: "#FDE6E6", border: "none" }}
        >
          <AiOutlineClose style={{ color: "#FA4949" }} />
        </Button>
        <Button variant="primary btn-sm">
          <img src={View} alt="logo" />
        </Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
  {
    id: 3,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button
          variant="success btn-sm"
          style={{ background: "#DDF6EC", border: "none" }}
        >
          <MdDone style={{ color: "#29B57A" }} />
        </Button>
        <Button
          variant="danger btn-sm"
          style={{ background: "#FDE6E6", border: "none" }}
        >
          <AiOutlineClose style={{ color: "#FA4949" }} />
        </Button>
        <Button variant="primary btn-sm">
          <img src={View} alt="logo" />
        </Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
  {
    id: 4,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button
          variant="success btn-sm"
          style={{ background: "#DDF6EC", border: "none" }}
        >
          <MdDone style={{ color: "#29B57A" }} />
        </Button>
        <Button
          variant="danger btn-sm"
          style={{ background: "#FDE6E6", border: "none" }}
        >
          <AiOutlineClose style={{ color: "#FA4949" }} />
        </Button>
        <Button variant="primary btn-sm">
          <img src={View} alt="logo" />
        </Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
  {
    id: 5,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button
          variant="success btn-sm"
          style={{ background: "#DDF6EC", border: "none" }}
        >
          <MdDone style={{ color: "#29B57A" }} />
        </Button>
        <Button
          variant="danger btn-sm"
          style={{ background: "#FDE6E6", border: "none" }}
        >
          <AiOutlineClose style={{ color: "#FA4949" }} />
        </Button>
        <Button variant="primary btn-sm">
          <img src={View} alt="logo" />
        </Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
  {
    id: 6,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button
          variant="success btn-sm"
          style={{ background: "#DDF6EC", border: "none" }}
        >
          <MdDone style={{ color: "#29B57A" }} />
        </Button>
        <Button
          variant="danger btn-sm"
          style={{ background: "#FDE6E6", border: "none" }}
        >
          <AiOutlineClose style={{ color: "#FA4949" }} />
        </Button>
        <Button variant="primary btn-sm">
          <img src={View} alt="logo" />
        </Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
  {
    id: 7,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button
          variant="success btn-sm"
          style={{ background: "#DDF6EC", border: "none" }}
        >
          <MdDone style={{ color: "#29B57A" }} />
        </Button>
        <Button
          variant="danger btn-sm"
          style={{ background: "#FDE6E6", border: "none" }}
        >
          <AiOutlineClose style={{ color: "#FA4949" }} />
        </Button>
        <Button variant="primary btn-sm">
          <img src={View} alt="logo" />
        </Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
  {
    id: 8,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button
          variant="success btn-sm"
          style={{ background: "#DDF6EC", border: "none" }}
        >
          <MdDone style={{ color: "#29B57A" }} />
        </Button>
        <Button
          variant="danger btn-sm"
          style={{ background: "#FDE6E6", border: "none" }}
        >
          <AiOutlineClose style={{ color: "#FA4949" }} />
        </Button>
        <Button variant="primary btn-sm">
          <img src={View} alt="logo" />
        </Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
  {
    id: 9,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button
          variant="success btn-sm"
          style={{ background: "#DDF6EC", border: "none" }}
        >
          <MdDone style={{ color: "#29B57A" }} />
        </Button>
        <Button
          variant="danger btn-sm"
          style={{ background: "#FDE6E6", border: "none" }}
        >
          <AiOutlineClose style={{ color: "#FA4949" }} />
        </Button>
        <Button variant="primary btn-sm">
          <img src={View} alt="logo" />
        </Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
  {
    id: 10,
    saloon: (
      <div className="fake_saloon">
        <img src={lyralog} alt="logo" />
        <span>Lyra's Hair Salon</span>
      </div>
    ),
    roles: "Spa Receptionist - Full Time",
    jobType: "Full Time",
    salary: "$75 / hour",
    dateApplied: "28 Feb, 2022",
    jobStatus: (
      <div className="fake_jobstatus">
        <BsCircleFill style={{ color: "#00800099", width: "8px" }} />
        <span>Open</span>
      </div>
    ),
    action: (
      <div className="fake_btn">
        <Button
          variant="success btn-sm"
          style={{ background: "#DDF6EC", border: "none" }}
        >
          <MdDone style={{ color: "#29B57A" }} />
        </Button>
        <Button
          variant="danger btn-sm"
          style={{ background: "#FDE6E6", border: "none" }}
        >
          <AiOutlineClose style={{ color: "#FA4949" }} />
        </Button>
        <Button variant="primary btn-sm">
          <img src={View} alt="logo" />
        </Button>
        <Button variant="outline-primary btn-sm">Refer Job</Button>
      </div>
    ),
  },
];

export default { columns, oneData, twoData };
