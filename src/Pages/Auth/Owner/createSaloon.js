import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import ImageUploading from "react-images-uploading";
import { RiDeleteBin7Line } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../Shared/Redux/reducers/userSlice";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { resetUser } from "../../../Shared/Redux/reducers/userSlice";
import {
  user,
  Banner,
  CpLogo,
  BannersEdiit,
  Delete,
} from "../../../Assets/index";
import { createSalonServices } from "../../../Shared/Services/CreateSalon";
import AutoComplete from "../../Profile/Tabs/autoComplete";
import "../Auth.css";
import MediaUpload from "../../../Shared/Components/MediaUploader/MediaUpload";
import { toastMessage, roleEnum } from "../../../Shared";
import { Spinner, Dropdown } from "react-bootstrap";
import { store } from "../../../Shared/Redux/store";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import Captcha from "../../recaptcha/Captcha";
import { ArrMap } from "../../../Shared/util/constant";
import LocationModal from "../../../Shared/Components/LocationsModal";

const CreateSalon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userResp = useSelector((state) => state.root.user);

  const createOwner = () => {
    const { access_token, user } = userResp;

    let mutateUser = {
      ...user,
      role: "owner",
    };

    let clonResep = {
      access_token,
      user: mutateUser,
    };

    dispatch(setUser(clonResep));
    navigate("/owner/dashboard");
  };

  const [removeArrImg, setRemoveArrImg] = useState([]);
  const [coverFile, setCoverFile] = useState(null);
  const [coverUrl, setcoverUrl] = useState(BannersEdiit);
  const [AvatarUrl, setAvatarUrl] = useState(user);
  const [AvatarFile, setAvatareFile] = useState(null);
  const [images, setImages] = useState([]);
  const [filesArr, setFilesArr] = useState([]);
  const [salonName, setSalonName] = useState("");
  const [phone, setPhone] = useState(Number);
  const [hiringProces, setHiringProces] = useState({
    owner: "Owner",
    provider: "Provider",
  });
  const [numService, setNumService] = useState("");
  const [abouts, setAbouts] = useState("");
  const [location, setLocation] = useState({
    locationName: "",
    coordinates: [],
  });
  const [checkBox, setCheckBox] = useState(false);
  const [coverBool, setCoverBool] = useState(false);
  const [avatarBool, setAvatarBool] = useState(false);
  const [avatarBools, setAvatarBools] = useState(false);

  const [role, setRole] = useState(roleEnum.owner);
  const [load, setLoad] = useState(false);
  const [capSide, setCapSide] = useState(false);
  const [seeLocation, setSeeLocation] = useState(false);
  const handleLocationClose = () => {
    setSeeLocation(false);
  };
  const handleLocationOpen = () => {
    setSeeLocation(true);
  };

  const onSelectFile = (e) => {
    if (e.target.files[0].size < 2097152) {
      let file = e.target.files[0];
      let url = URL.createObjectURL(file);
      setCoverFile(file);
      setcoverUrl(url);
    } else {
      toastMessage("error", "Add image max 2mb");
    }
  };

  const handlePhoto = () => {
    setAvatarUrl(user);
    setAvatarBools(false);
    setAvatarBool(true);
  };

  const onSelectProfileFile = (e) => {
    let file = e.target.files[0];
    let url = URL.createObjectURL(file);
    setAvatarUrl(url);
    setAvatareFile(file);
    setAvatarBools(true);
    setAvatarBool(false);
  };
  const handleOwner = (e) => {
    setRole(e.target.value);
  };

  const handleServices = (e) => {
    setNumService(e.target.value);
    // setNumService(e.target.value)
  };

  const handleImages = (images, URLs) => {
    setFilesArr(images);
  };

  const handleSubmit = () => {
    setLoad(true);
    // createOwner();

    if (
      salonName == " " &&
      phone == "" &&
      role == "" &&
      numService == "" &&
      abouts == "" &&
      coverFile == "" &&
      AvatarFile == ""
    ) {
      toastMessage("error", "error");
    }

    let RespObj = {
      Saloon_name: userResp?.user?.saloon?.Saloon_name,
      phoneNumber: userResp?.user?.saloon?.phoneNumber,
      saloonRole: role,
      // Salon_Service_Provider: numService,
      about: abouts,
      certifImg: filesArr,
      salonId: userResp?.user?.saloon?._id,
      removeAvaBool: avatarBool,
      removeCoverBool: coverBool,
      // location: JSON.stringify(location)
    };
    if (removeArrImg) {
      RespObj["removeImg"] = JSON.stringify(removeArrImg);
    }
    if (AvatarFile) {
      RespObj["avatar"] = AvatarFile;
    }

    if (coverFile) {
      RespObj["coverImage"] = coverFile;
    }

    if (location) {
      RespObj["location"] = JSON.stringify({
        address: location.locationName,
        coordinates: location.location,
      });
    }

    createSalonServices(RespObj)
      .then(({ data }) => {
        dispatch(
          setUser({
            hourRate: data?.hourRate,
            maxJobRate: data?.maxJobRate,
            user: data.data,
            status: userResp.status,
            tokens: userResp.tokens,
          })
        );

        if (userResp?.user?.isSubscription) {
          navigate("/owner/dashboard");
        } else {
          navigate("/plan");
        }
        toastMessage("success", "Salon created successfully");

        // createOwner()
      })
      .catch((err) => {
        if (err.response.data.code == 401) {
          // toastMessage("error", err.response.data.message);
          // dispatch(resetUser());
          // navigate("Login");
        } else {
          toastMessage("error", err.response.data.message);
        }
      })
      .finally(() => setLoad(false));
  };
  //

  let bool = false;
  ArrMap.map((i) => {
    if (
      location?.locationName
        .toLowerCase()
        .includes(i.toLowerCase().concat(", nc"))
    ) {
      bool = bool || true;
    }
  });

  return (
    <div className="divSigin">
      <div
        className="contSignIn"
        style={{ background: "white", marginBottom: "0px" }}
      >
        <Card
          className="saloonCard"
          style={{ width: "45rem", height: "100rem ", background: "white" }}
        >
          <Card.Title style={{ background: "white", marginBottom: "0px" }}>
            <h1 className="saloonCardTitle">Create Salon Account</h1>
            <p className="saloonCardp">
              You haven't posted a job before, so you'll need to create an Salon
              account.
            </p>
          </Card.Title>
          <Card.Body style={{ background: "white" }}>
            <div>
              <div className="saloonCover">
                <div
                  className="coverPhoto"
                  style={{ backgroundImage: `url("${coverUrl}")` }}
                >
                  <label
                    htmlFor={`upload_image11`}
                    className="spaace"
                    style={{ cursor: "pointer" }}
                  >
                    <span className="btnupload">
                      <span>
                        <FileUploadOutlinedIcon />
                      </span>
                      Upload
                    </span>
                  </label>
                  <input
                    type="file"
                    id={`upload_image11`}
                    name={`upload_image11`}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={onSelectFile}
                  />

                  <div className="saloonPic">
                    <div
                      className="ProfilePhoto"
                      style={{ backgroundImage: `url("${AvatarUrl}")` }}
                    >
                      <Dropdown className="dropMenuSalon">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          <AddAPhotoOutlinedIcon />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropMenus">
                          <Dropdown.Item href="#/action-1">
                            <label
                              htmlFor={`upload_image1`}
                              className="spaace1"
                              style={{ cursor: "pointer" }}
                            >
                              <span
                                className="btnupload1"
                                style={{ position: "inherit" }}
                              >
                                <span
                                  style={{
                                    color: "black",
                                    padding: "24px 17px 15px 0px",
                                  }}
                                >
                                  <FileUploadOutlinedIcon
                                    style={{ marginRight: "10px" }}
                                  />
                                  {userResp?.user?.saloon?.avatar
                                    ? "Change Photo"
                                    : "Upload"}
                                  {/* <AddAPhotoOutlinedIcon/> */}
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
                          </Dropdown.Item>
                          {/* <Dropdown.Item onClick={() => handlePhoto()}> */}
                          {avatarBools ? (
                            <Dropdown.Item onClick={() => handlePhoto()}>
                              {" "}
                              <img
                                src={Delete}
                                style={{ marginRight: "10px" }}
                              />
                              <span style={{ color: "red" }}>Remove</span>
                            </Dropdown.Item>
                          ) : (
                            ""
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <h1 className="saloonHeadings mt-5">Salon Name</h1>
            <input className="saloonCardIpt" placeholder="Lyras Hair Salon" value={salonName} onChange={(e) => setSalonName(e.target.value)} /> */}
            {/* <h1 className="saloonHeadings mt-5">Phone number</h1>
            <input
              className="saloonCardIpt"
              placeholder="+19107631216"
              type="phone"

              min={0}
              maxLength={15}
              onChange={(e) => setPhone(e.target.value)}
            /> */}
            <div className="mt-5">
              <div className="reeqflex">
                <h1 className="saloonHeadings mt-4">Location</h1>
                <span className="reqAsterik">*</span>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              {/* <HiOutlineLocationMarker className="locationTag" /> */}
              {/* <input
                className="saloonCardIpt  ps-4"
                placeholder="1201 S 16th St, Wilmington"
                onChange={(e)=>{handleChange(e)}}
                value={location.locationName}
              /> */}
              <AutoComplete form={location} setForm={setLocation} check3 />
              {!bool && location?.locationName?.length > 0 ? (
                <p className="error_location">
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
            </div>
            {/* <h1 className="saloonHeadings mt-5">
              Your role in the hiring process
            </h1> */}
            {/* <Form.Select aria-label="Default select example dropPro" onChange={(e) => handleOwner(e)}>
              <option value={roleEnum.owner} >Owner</option>
              <option value={roleEnum.professional}>Provider</option>
            </Form.Select> */}
            {/* <h1 className="saloonHeadings mt-4">
              Your salon's number of Service Providers
            </h1>
            <Form.Select aria-label="Default select example" onChange={(e) => handleServices(e)}>
              <option value="">Select Range</option>
              <option value="01-10">1-10</option>
              <option value="11-20">11-20</option>
              <option value="21-30">21-30</option>
              <option value="31-40">31-40</option>
              <option value="41-50">41-50</option>
              <option value="51-60">51-60</option>
              <option value="61-70">61-70</option>
              <option value="71-80">71-80</option>
              <option value="81-90">81-90</option>
              <option value="91-100">91-100</option>
              <option value="100+">100+</option>
            </Form.Select> */}
            <div>
              <div className="reeqflex">
                <h1 className="saloonHeadings mt-4">About</h1>
                <span className="reqAsterik">*</span>
              </div>
              <div>
                <textarea
                  className="textAdd"
                  rows="4"
                  cols="77"
                  placeholder="About"
                  value={abouts}
                  onChange={(e) => {
                    setAbouts(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <MediaUpload
              filesArr={filesArr}
              images={images}
              setImages={setImages}
              setFilesArr={setFilesArr}
              removeArrImg={removeArrImg}
              setRemoveArrImg={setRemoveArrImg}
              handleImages={handleImages}
              check
            />
            <Captcha setCapSide={setCapSide} capSide={capSide} />
            <div style={{ display: "flex" }}>
              <Form>
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`} className="mb-3">
                    <Form.Check
                      type={type}
                      id={`default-${type}`}
                      label=""
                      required
                      onChange={() => setCheckBox(!checkBox)}
                    />
                  </div>
                ))}
              </Form>
              <p className="saloonContract d-flex align-items-center mb-0">
                When you create an account or sign in, you agree to Salon
                Substitute's
                <a href="/termsconditions" className="cleckHref ms-1">
                  Terms,
                </a>{" "}
                <a href="/privacypolicy" className="cleckHref">
                  Cookie and Privacy policies.
                </a>{" "}
              </p>
            </div>
            <div className="saloonBtnDiv">
              <button
                disabled={
                  abouts && location.locationName && checkBox && bool && capSide
                    ? false
                    : true
                }
                className="btn btnSaloon"
                onClick={handleSubmit}
              >
                {load ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </Card.Body>
          <LocationModal show={seeLocation} handleClose={handleLocationClose} />
        </Card>
      </div>
    </div>
  );
};

export default CreateSalon;
