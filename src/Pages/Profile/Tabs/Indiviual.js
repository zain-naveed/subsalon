import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { Dollar } from "../../../Assets";
import ProfileSlider from "./Shared/profileslider";
import { user, Avatar, EmptyDummy } from "../../../Assets/index";
import { ReactComponent as CameraIcon } from "./../../../Assets/images/CameraIcon.svg";
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import AutoComplete from "./autoComplete";
import { jobType } from "../../../Shared";
import { IndiviualInfoServices } from "../../../Shared/Services/EditProfileApi";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { geocodeByLatLng } from "react-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { toastMessage } from "../../../Shared";
import { setUser } from "../../../Shared/Redux/reducers/userSlice";
import { store } from "../../../Shared/Redux/store";
import { ArrMap } from "../../../Shared/util/constant";
import Experience from "./experience";
import Tags from "../../Profile/Tabs/Tags";
import Services from "../../../Pages/autocomplete/Services.json";
import LocationModal from "../../../Shared/Components/LocationsModal";

const Indiviual = () => {
  const [resetFile, setResetFile] = useState(1);
  const { user } = store.getState().root;

  const [servicesTag, setServicesTags] = useState([]);

  // const [selectedFile, setSelectedFile] = useState();
  const [profile, setProfile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [selectedProfileFile, setSelectedProfileFile] = useState(null);
  // const [location, setLocation] = useState("");
  // const [locationState, setLocationState] = useState("");
  const [value, setValue] = useState(
    user?.user?.minMiles && user?.user?.maxMiles
      ? [user?.user?.minMiles, user?.user?.maxMiles]
      : [15, 16]
  );

  // const [value3, setValue3] = useState(user?.user?.minMiles && user?.user?.maxMiles ? [user?.user?.minMiles, user?.user?.maxMiles] : [15, 16]);

  const dispatch = useDispatch();

  const [slider, setSlider] = useState(20);

  const [form, setForm] = useState({
    profilePicture: user?.user?.profilePic
      ? user?.user?.profilePic
      : EmptyDummy,
    name: user?.user?.name ? user?.user?.name : "",
    designat: user?.user?.designation ? user?.user?.designation : "",
    locationName: user?.user?.location?.address,
    location: user?.user?.location?.coordinates,
    // zip: user?.user?.zipCode ? user?.user?.zipCode : "",
    phoneNumber: user?.user?.phoneNumber ? user?.user?.phoneNumber : "",
    minMiles: value[0],
    maxMiles: value[1],
    jobtype: user?.user?.jobType ? user?.user?.jobType : jobType.fullTime,
    rate: user?.user?.hourRate ? user?.user?.hourRate : "",
  });
  const [seeLocation, setSeeLocation] = useState(false);
  const handleLocationClose = () => {
    setSeeLocation(false);
  };
  const handleLocationOpen = () => {
    setSeeLocation(true);
  };

  const handleState = (value, value2) => {
    setForm({
      ...form,
      maxMiles: value2,
      minMiles: value,
    });
  };

  const handleValues = (value) => {
    //
  };

  const onSelectProfileFile = (e) => {
    let file = e.target.files[0];

    let size = file.size / 1024 / 1024;

    if (size > 2) {
      setResetFile(Math.random().toString(36));
      toastMessage("error", "File Size must be less than 2 MB");
    } else {
      let url = URL.createObjectURL(file);
      setProfile(file);
      setForm({
        ...form,
        profilePicture: url,
      });
      setSelectedProfileFile(file);
    }
  };
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    //
    let designat = e.target.name;
    if ((name == "rate" || designat == "designat") && Number(value) > 999999) {
      setForm({
        ...form,
        [name]: 999999,
      });
    } else if ((name == "zip" || name == "rate") && Number(value) > 0) {
      setForm({
        ...form,
        [name]: value,
      });
    } else if (name == "phoneNumber" && Number(value) > 7) {
      setForm({
        ...form,
        [name]: value,
      });
    } else if ((name == "zip" || name == "rate") && Number(value) < 0) {
      setForm({
        ...form,
        [name]: 0,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleState1 = (key, value) => {
    if (key == "Your Services") {
      setServicesTags(value);
    }
  };

  const handleSubmit = (e) => {
    if (form.phoneNumber.length < 7 || form.phoneNumber.length > 15) {
      toastMessage("error", "Phone Number must be min 8 and max 15 digits");
    } else {
      setLoader(true);
      let obj = {
        name: form.name,
        // zipCode: form.zip,
        // designat:form.designat,
        minMiles: form.minMiles,
        maxMiles: form.maxMiles,
        jobType: form.jobtype,
        hourRate: form.rate,
        phoneNumber: form.phoneNumber,
      };

      if (form.location && form.locationName) {
        obj["location"] = JSON.stringify({
          address: form.locationName,
          coordinates: form.location,
        });
      }

      if (profile) {
        obj["profilePic"] = profile;
      }

      IndiviualInfoServices(obj)
        .then(({ data }) => {
          // setProfile(null)
          let userObj = {
            hourRate: data?.hourRate,
            maxJobRate: data?.maxJobRate,
            user: data.user,
            status: user.status,
            tokens: user.tokens,
          };
          dispatch(setUser(userObj));
          toastMessage("success", "Profile Updated Successfully");
        })
        .catch(() => {
          toastMessage("Error", "error");
        })
        .finally(() => setLoader(false));
    }
  };

  let bool = false;
  ArrMap.map((i) => {
    if (
      form.locationName.toLowerCase().includes(i.toLowerCase().concat(", nc"))
    ) {
      bool = bool || true;
    }
  });

  return (
    <div style={{ position: "relative" }}>
      <Container className="containerIndi">
        {/* <ImgPrev /> */}
        <div
          className="saloonPic"
          style={{ position: "inherit", width: "auto", marginTop: "5%" }}
        >
          <div
          // className="ProfilePhoto margPic"
          // style={{ backgroundImage: `url("${form.profilePicture}")`, margin: "0", height: "150px", width: "150px", position: "relative" }}
          >
            <img
              src={`${
                user?.user?.profilePic
                  ? form.profilePicture +
                    (!profile && user?.user?.platform == "facbook"
                      ? "&time" + new Date().getTime()
                      : !profile
                      ? "?" + new Date().getTime()
                      : "")
                  : form.profilePicture
              }`}
              className="ProfilePhoto margPic profileAva"
            />
            <label
              htmlFor={`upload_image1`}
              className="spaace1 proUpload"
              style={{ cursor: "pointer" }}
            >
              <span className="btnupload1">
                <span>
                  <CameraIcon className="svgProfile" />
                </span>
              </span>
            </label>
            <input
              type="file"
              id={`upload_image1`}
              name={`upload_image1`}
              key={resetFile || ""}
              style={{ display: "none" }}
              accept="image/*"
              onChange={onSelectProfileFile}
            />
          </div>
        </div>
        <div className="reeqflex">
          <div className="textpro" style={{ marginTop: "2rem" }}>
            {" "}
            Your name
          </div>
          <span className="reqAsterik">*</span>
        </div>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="inputInd respon"
          style={{ paddingLeft: "2%" }}
          placeholder="John Doe"
        ></input>
        <div className="reeqflex">
          <div className="textpro" style={{ marginTop: "2rem" }}>
            {" "}
            Phone Number
          </div>
          <span className="reqAsterik">*</span>
        </div>
        <input
          name="phoneNumber"
          type="number"
          onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
          value={form.phoneNumber}
          onChange={handleChange}
          className="inputInd respon"
          style={{ paddingLeft: "2%" }}
          placeholder="PhoneNumber"
        ></input>
      </Container>
      <Container className="containerIndi">
        <Row>
          <Col className="colInd">
            <div className="reeqflex">
              <div className="textpro" style={{ marginTop: "2rem" }}>
                Location
              </div>

              <span className="reqAsterik">*</span>
            </div>
            <AutoComplete form={form} setForm={setForm} />
            {/* {!form.locationName.includes("Wilmington") && form.locationName.length > 0 ? <p className='error_location'>We are currently operate only in Wilmington, North Carolina.</p> : ""} */}
            {!bool && form?.locationName?.length > 0 ? (
              <p className="error_location w-48">
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
            {/* <GooglePlacesAutocomplete


              selectProps={{
                placeholder: '1203 S 43rd St, Wilmington',



                onChange: (obj) => {

                  geocodeByAddress(obj.label)
                    .then(results => getLatLng(results[0]))
                    .then(({ lat, lng }) => {
                      let arr = { coordinates: [lng, lat] };
                      let locat = JSON.stringify(arr);
                      setForm({
                        ...form,
                        location: locat
                      })
                    }
                    );


                }
              }}
              className="inputInd w-100" apiKey='AIzaSyD3YCY01PIvIqIQB0nJfrsIUiI2VkCrQqc' /> */}

            {/* <input name="location" className="inputInd w-100" placeholder='1203 S 43rd St, Wilmington'></input> */}
          </Col>

          {/* <div>
            <div className='textpro' style={{ marginTop: "2rem" }}>Job Title
            </div>
            <input placeholder='Your Designation' name="designat" className="inputInd respon" style={{ paddingLeft: "2%" }}
              value={form.designat}
              onChange={handleChange}
            />
          </div> */}

          {/* <Col className='colInd'>
            <div className="textpro" placeholder='28401'>Zip Code</div>
            <input type="number" name="zip" value={form.zip} onChange={handleChange} className="inputInd respon2"></input></Col> */}
        </Row>
      </Container>
      <Container className="containerIndi">
        <div className="reeqflex">
          <div className="textpro" style={{ marginTop: "2rem" }}>
            Mile Range to Travel
          </div>

          <span className="reqAsterik">*</span>
        </div>
        <div className="sliderRange">
          <p
          //  style={{ marginRight: "20px" }}
          >
            {form?.minMiles}
          </p>
          <ProfileSlider
            className="slider"
            handleState={handleState}
            handleValues={value}
          />
          <p style={{ marginLeft: "25px" }}>{form?.maxMiles}</p>

          {/* <RangeSlider
            value={slider}
            onChange={e => setSlider(e.target.value)}
            variant='dark'
            min={15}
            max={30}
          /> */}
        </div>
      </Container>
      <Container className="containerIndi">
        <Row>
          <Col className="colInd">
            {" "}
            <div className="reeqflex">
              <div className="textpro" style={{ marginTop: "2rem" }}>
                Job Type
              </div>

              <span className="reqAsterik">*</span>
            </div>
            <Form.Select
              aria-label="Default select example dropPro"
              name="jobtype"
              onChange={(e) => handleChange(e)}
              value={form.jobtype}
            >
              <option value={jobType.fullTime}>Full Time</option>
              <option value={jobType.partTime}>Part Time</option>
            </Form.Select>
          </Col>
          <Col className="colInd">
            <div className="reeqflex">
              <div className="textpro" style={{ marginTop: "2rem" }}>
                Hourly Rate
              </div>

              <span className="reqAsterik">*</span>
            </div>
            <div className="sticky">
              <img className="stickyImg" src={Dollar} />
              <input
                value={form.rate}
                name="rate"
                className="inputInd stick respon2"
                placeholder="30"
                type="number"
                min={1}
                max={999999}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Col>
        </Row>
        <Experience handleSubmit={handleSubmit} form={form} bool={bool} />
        {/* <Button disabled={form.name && form.location && form.rate && form.locationName && bool ? false : true} className='mt-4 btnPro minWidth135' onClick={handleSubmit}>

          {
            loader ? <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner> : "Save Changes"
          }


        </Button> */}
        <LocationModal show={seeLocation} handleClose={handleLocationClose} />
      </Container>
    </div>
  );
};

export default Indiviual;
