import React, { useState } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import Navigation from "../../../Shared/Components/Navbar/navigation";
import { FaGreaterThan } from "react-icons/fa";
import Foot from "../../../Shared/Components/Foot/Foot";
import "../Auth.css";
import AutoComplete from "../../Profile/Tabs/autoComplete";
import ProfileSlider from "../../Profile/Tabs/Shared/profileslider";
import { jobType } from "../../../Shared";
import { useLocation } from "react-router";
import { resetUser } from "../../../Shared/Redux/reducers/userSlice";
import {
  Dollar,
  user,
  Banner,
  Avatar,
  Dummmy,
  EmptyProfilePicture,
  EmptyDummy,
} from "../../../Assets";
import { ReactComponent as CameraIcon } from "../../../Assets/images/CameraIcon.svg";
import NavbarAuth from "./NavbarAuth";
import { IndiviualInfoServices } from "../../../Shared/Services/EditProfileApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Shared/Redux/reducers/userSlice";
import { toastMessage } from "../../../Shared/Components/Toast/Toast";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { EditProfileScheme } from "../../../Shared/Formik/formik";
import { Formik, Form as Forms, Field } from "formik";
import { ArrMap } from "../../../Shared/util/constant";
import MySelection from "./MySelection";
import LocationModal from "../../../Shared/Components/LocationsModal";

const ProfileSetUp = () => {
  const { user } = useSelector((state) => state.root);
  const locationState = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.user?.name ? user?.user?.name : "");
  const [location, setLocation] = useState({
    locationName: "",
    coordinates: [],
  });
  const [value, setValue] = useState([15, 16]);
  const [minMile, setMinMile] = useState(15);
  const [maxMile, setMaxMile] = useState(16);
  const [rate, setRate] = useState(0);
  const [job, setJob] = useState(jobType.fullTime);
  const [zip, setZip] = useState(null);
  const [jobsty, setJobsty] = useState(jobType.fullTime);
  const [loader, setLoader] = useState(false);

  const [profile, setProfile] = useState(EmptyDummy);
  const [Picture, setPicture] = useState();
  const [seeLocation, setSeeLocation] = useState(false);

  const handleState = (value, value2) => {
    setMinMile(value);
    setMaxMile(value2);
  };

  const handleLocationClose = () => {
    setSeeLocation(false);
  };
  const handleLocationOpen = () => {
    setSeeLocation(true);
  };

  const handleChange = (e) => {
    if (e.target.name == "jobtype") {
      setJob(e.target.value);
    } else if (e.target.name == "zip") {
      setZip(parseInt(e.target.value));
    } else if (e.target.name == "rate") {
      setRate(e.target.value);
    }
  };

  const handSubmit = (values) => {
    if (!bool && location.locationName.length > 0) {
      toastMessage("error", "Please enter location within said area");
    } else {
      setLoader(true);
      let obj = {
        name: name,
        // zipCode: values.zip,
        minMiles: minMile,
        maxMiles: maxMile,
        jobType: jobsty,
        hourRate: values.rate,
      };
      if (Picture) {
        obj["profilePic"] = Picture;
      }

      if (location) {
        obj["location"] = JSON.stringify({
          address: location.locationName,
          coordinates: location.location,
        });
      }
      IndiviualInfoServices(obj)
        .then(({ data }) => {
          let userObj = {
            hourRate: data?.hourRate,
            maxJobRate: data?.maxJobRate,
            user: data.user,
            status: user.status,
            tokens: user.tokens,
          };
          dispatch(setUser(userObj));
          toastMessage("success", "Profile Updated Successfully");
          if (user?.user?.isSubscription) {
            navigate("/profile");
          } else {
            navigate("/plan", {
              state: { routePath: "/profile" },
            });
          }
          // navigate("/email-authentication", { state: { user } });
        })
        .catch((err) => {
          // if(err.response.data.code == 401){
          //   toastMessage("error", err.response.data.message);
          //   dispatch(resetUser());
          //   navigate("Login");
          // }
        })
        .finally(() => setLoader(false));
    }
  };

  const onSelectProfileFile = (e) => {
    let file = e.target.files[0];
    let url = URL.createObjectURL(file);
    setProfile(url);
    setPicture(file);
  };

  // const colourStyles = {
  //   control: styles => ({ ...styles, backgroundColor: 'white' }),
  //   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
  //     const color = chroma(data.color);
  //     return {
  //       ...styles,
  //       backgroundColor: isDisabled ? 'red' : blue,
  //       color: '#FFF',
  //       cursor: isDisabled ? 'not-allowed' : 'default',
  //       ...
  //     };
  //   },
  //   ...
  // };
  const CustomStyle = {
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "white" : "",
      // color:state.isSelected ?
    }),
  };

  let bool = false;
  ArrMap.map((i) => {
    if (
      location.locationName
        .toLowerCase()
        .includes(i.toLowerCase().concat(", nc"))
    ) {
      bool = bool || true;
    }
  });
  //   const options = [
  //     { value: jobType.fullTime, label: 'Full Time' },
  //     { value: jobType.partTime, label: 'Part Time' },
  //   ];
  //   const [selectedOption, setSelectedOption] = useState();

  // const dropSelect=(e,setFieldValue)=>{
  //   setSelectedOption(e.value)
  //   // setFieldValue(e.value)
  //   // setFieldValue("jobType", e.value);
  //
  // }

  return (
    <div className="divSigin">
      <NavbarAuth check />
      <div className="contSignIn">
        <Card className="cardSign" style={{ width: "30rem", height: "auto" }}>
          <Card.Body>
            <Container className="pChange">
              <Card.Title className="titleSign1 titleDiv1">
                Setup your profile
              </Card.Title>
              <Card.Title className="titleSign2 titleSignUp width1">
                Complete your profile &amp; finish
              </Card.Title>
            </Container>
            <Container className="containerAuth">
              <div className="mt-4 mb-2" style={{ position: "relative" }}>
                <div
                  className="ProfilePhoto"
                  style={{ backgroundImage: `url("${profile}")` }}
                >
                  <label
                    htmlFor={`upload_image1`}
                    className="spaace1"
                    style={{ cursor: "pointer" }}
                  >
                    <span className="btnupload1">
                      <span>
                        <CameraIcon
                          className="svgProfile"
                          style={{ right: "0px" }}
                        />
                      </span>
                    </span>
                  </label>
                  <input
                    type="file"
                    id={`upload_image1`}
                    name={`upload_image1`}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={onSelectProfileFile}
                  />
                </div>
              </div>
              <Formik
                initialValues={{
                  location: "",
                  rate: "",
                  // jobType: jobsty ? jobsty : jobType.fullTime,
                  // jobType:jobsty
                }}
                validationSchema={EditProfileScheme}
                onSubmit={(values) => {
                  handSubmit({
                    location: values.location,
                    rate: values.rate,
                    jobType: values.jobType,
                    // jobType:jobsty
                  });
                }}
              >
                {({ errors, touched, setFieldValue, handleSubmit }) => (
                  <>
                    <Forms>
                      <div className="reeqflex">
                        {" "}
                        <Card.Text className=" marginNone emailAuth mb-1 mt-4">
                          Location
                        </Card.Text>{" "}
                        <span className="reqAsterik">*</span>
                      </div>

                      <AutoComplete
                        formikField={setFieldValue}
                        form={location}
                        setForm={setLocation}
                        check
                      />
                      {/* {!location?.locationName.includes("Wilmington") &&
                        location?.locationName?.length > 0 ? (
                        <p
                          className="error_location"
                          style={{ marginBottom: "-10px" }}
                        >
                          We are currently operate only in Wilmington, North
                          Carolina.
                        </p>
                      ) : (
                        ""
                      )} */}

                      {!bool && location?.locationName?.length > 0 ? (
                        <p className="error_location mt-2">
                          We are currently operating in North Carolina only for{" "}
                          {ArrMap?.map((i, ind) => {
                            return (
                              <>
                                {ind < 7 && (
                                  <span>
                                    {i.charAt(0).toUpperCase() + i.slice(1)}
                                    {", "}
                                  </span>
                                )}
                                {ind == 7 && (
                                  <span>
                                    {i.charAt(0).toUpperCase() + i.slice(1)}
                                    <span
                                      className="see-more-btn"
                                      onClick={handleLocationOpen}
                                    >
                                      ...See more
                                    </span>
                                  </span>
                                )}
                              </>
                            );
                          })}
                        </p>
                      ) : (
                        ""
                      )}

                      {errors.location && touched.location ? (
                        <div className="formikerror1">{errors.location}</div>
                      ) : (
                        <div style={{ height: "2px" }}></div>
                      )}

                      {/* 
                      <div className="reeqflex"> <Card.Text className=' marginNone emailAuth mb-1 mt-3'>
                        Zip Code
                      </Card.Text><span className="reqAsterik">*</span>
                      </div>
                      <Field name="zip" type="number" className='iptAuth w-100' Placeholder="Enter your zip code" />
                      {errors.zip && touched.zip ? (
                        <div className='formikerror1' >{errors.zip}</div>
                      ) : <div style={{ height: "2px" }}></div>
                      } */}
                      <Row>
                        <Col>
                          <div className="reeqflex">
                            {" "}
                            <Card.Text className=" marginNone emailAuth mb-1 mt-3 mt-4">
                              Job Type
                            </Card.Text>{" "}
                            <span className="reqAsterik">*</span>
                          </div>
                          <MySelection
                            formikField={setFieldValue}
                            form={job}
                            value={jobType}
                            setForm={setJob}
                            error={errors.jobType}
                            touched={touched.jobType}
                            jobsty={jobsty}
                            setJobsty={setJobsty}
                          />
                          {errors.jobType && touched.jobType ? (
                            <div className="formikerror1">{errors.jobType}</div>
                          ) : (
                            <div style={{ height: "2px" }}></div>
                          )}
                          {/* <option value={jobType.fullTime}>Full Time</option>
                            <option alue={jobType.partTime}>Part Time</option> */}
                        </Col>
                        <Col>
                          <div className="reeqflex">
                            {" "}
                            <Card.Text className=" marginNone emailAuth mb-1 mt-3 mt-4">
                              Hourly Rate
                            </Card.Text>
                            <span className="reqAsterik">*</span>
                          </div>
                          <div style={{ position: "relative" }}>
                            <Field
                              name="rate"
                              type="number"
                              className="iptAuth w-100 ps-4"
                              Placeholder="30"
                              min={1}
                              max={999999}
                            />
                            <img
                              src={Dollar}
                              style={{
                                position: "absolute",
                                top: "35%",
                                left: "7%",
                              }}
                            />
                          </div>
                          {errors.rate && touched.rate ? (
                            <div className="formikerror1">{errors.rate}</div>
                          ) : (
                            <div style={{ height: "2px" }}></div>
                          )}
                        </Col>

                        <Card.Text className=" marginNone emailAuth mb-1 mt-4">
                          Mile Range to Travel
                        </Card.Text>
                        <div className="sliderRange">
                          <Card.Text
                          // style={{ marginRight: "20px" }}
                          >
                            15
                          </Card.Text>
                          <ProfileSlider
                            className="slider"
                            handleState={handleState}
                            handleValues={value}
                          />
                          <Card.Text style={{ marginLeft: "25px" }}>
                            30
                          </Card.Text>
                        </div>
                      </Row>

                      <button
                        // disabled={location.locationName && zip && rate && Picture ? false : true}
                        className="btn continue w-100 mt-3 mb-3"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        {loader ? (
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        ) : (
                          <span
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            Sign Up{" "}
                            <FaGreaterThan
                              style={{ opacity: "0.9", paddingLeft: "5px" }}
                            />
                          </span>
                        )}
                      </button>
                    </Forms>
                  </>
                )}
              </Formik>
            </Container>
          </Card.Body>
        </Card>
      </div>
      <Foot />
      <LocationModal show={seeLocation} handleClose={handleLocationClose} />
    </div>
  );
};

export default ProfileSetUp;
