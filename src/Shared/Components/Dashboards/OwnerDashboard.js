import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./ownerdash.css";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import JobListings from "../../../Pages/JobListings/JobListings";
import DatePicker from "react-datepicker";
import { FiCalendar } from "react-icons/fi";
import moment from "moment";
import { ownerDashboard } from "../../Services";
// import {subDays,addDays} from 'react-datepicker'
import subDays from "date-fns/subDays";
import { addDays } from "date-fns";
import { toastMessage } from "../Toast/Toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function OwnerDashboard() {
  // const [date, setdate] = useState("2022-04-20");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.root.user);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button
      className="example-custom-input range-calender"
      onClick={onClick}
      ref={ref}
    >
      {value} &nbsp; <FiCalendar />
    </button>
  ));
  const handleCheck = () => {
    if (user?.user?.subType) {
      // if (user?.user?.subType == "basic") {

      //     toastMessage(
      //       "error",
      //       "Please upgrade your subscription to Professional or Premium in order to send or recieve messages"
      //     );

      // } else {
      navigate("/chat");
      // }
    } else {
      toastMessage("error", "Please buy a subscription");
    }
  };

  const getDetailOwner = () => {
    let query = "";
    if (startDate) {
      let staDate = moment(startDate).format("DD-MM-YYYY");

      query += `?startDate=${staDate}`;
    }
    if (endDate) {
      let enDt = moment(endDate).format("DD-MM-YYYY");
      query += `&endDate=${enDt}`;
    }

    ownerDashboard(query)
      .then(({ data: { data } }) => {
        setDashboardData(data);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getDetailOwner();
  }, [startDate, endDate]);

  return (
    <div className="ownerBody">
      <Container className="ownerdashboard">
        <div className="ownerHeader">
          <div className="lableownerHeader">
            <div className="Itemlable">
              <h3>Dashboard</h3>
              <p>
                Here is your job listings statistic report from{" "}
                {startDate && endDate
                  ? moment(startDate).format("D MMM")
                  : "Select Range"}{" "}
                {endDate ? "-" : ""}{" "}
                {startDate && endDate ? moment(endDate).format("D MMM") : ""}
              </p>
            </div>
            <div className="Itemlable">
              <DatePicker
                dateFormat="d MMMM"
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                maxDate={new Date()}
                selectsRange
                customInput={<ExampleCustomInput />}
              />
            </div>
          </div>
          <div className="dashCards">
            <div
              className="dashcardItems one"
              onClick={() => navigate("/allApplicants")}
            >
              <div className="inercards">
                <span className="inercardItems">
                  <p className="count">
                    {dashboardData ? dashboardData?.applicant : 0}
                  </p>
                </span>
                <span className="inercardItems">
                  <p className="titlee">New Applicants</p>
                </span>
                <span className="inercardItems">
                  <p className="aarrow">
                    <ChevronRightIcon />
                  </p>
                </span>
              </div>
            </div>
            <div
              className="dashcardItems two"
              onClick={() => navigate("/Listings")}
            >
              <div className="inercards">
                <span className="inercardItems">
                  <p className="count">
                    {dashboardData ? dashboardData?.job : "0"}
                  </p>
                </span>
                <span className="inercardItems">
                  <p className="titlee">Open Jobs</p>
                </span>
                <span className="inercardItems">
                  <p className="aarrow">
                    <ChevronRightIcon />
                  </p>
                </span>
              </div>
            </div>
            <div className="dashcardItems three" onClick={() => handleCheck()}>
              <div className="inercards">
                <span className="inercardItems">
                  <p className="count">
                    {dashboardData ? dashboardData?.msg : "0"}
                  </p>
                </span>
                <span className="inercardItems">
                  <p className="titlee">New Messages</p>
                </span>
                <span className="inercardItems">
                  <p className="aarrow">
                    <ChevronRightIcon style={{ color: "white" }} />
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
        <JobListings
          check
          start={moment(startDate).format("D MMM")}
          end={moment(endDate).format("D MMM")}
        />
      </Container>
    </div>
  );
}

export default OwnerDashboard;
