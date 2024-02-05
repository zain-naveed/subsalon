import React, { useState, useEffect } from "react";
import { Card, Form, Dropdown } from "react-bootstrap";
import ImageUploading from "react-images-uploading";
import { RiDeleteBin7Line } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { user, Banner, BannersEdiit, Delete } from "../../../Assets/index";
import "../../Auth/Auth.css";
import { ButtonBase } from "@mui/material";
import MediaUpload from "../../../Shared/Components/MediaUploader/MediaUpload";
import { useSelector, useDispatch } from "react-redux";
import AutoComplete from "../../Profile/Tabs/autoComplete";
import { roleEnum, toastMessage } from "../../../Shared";
import { createSalonServices } from "../../../Shared/Services/CreateSalon";
import { Spinner } from "react-bootstrap";
import { setUser } from "../../../Shared/Redux/reducers/userSlice";
import { ArrMap } from "../../../Shared/util/constant";
import LocationModal from "../../../Shared/Components/LocationsModal";

const CreateSalon = () => {
  const userResp = useSelector((state) => state.root.user);
  const dispatch = useDispatch();

  const [salonId, setSalonId] = useState(
    userResp?.user?.saloon?._id ? userResp?.user?.saloon?._id : ""
  );
  const [name, setName] = useState(
    userResp?.user?.saloon?.Saloon_name
      ? userResp?.user?.saloon?.Saloon_name
      : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    userResp?.user?.saloon?.phoneNumber != "undefined"
      ? userResp?.user?.saloon?.phoneNumber
      : ""
  );
  const [location, setLocation] = useState(
    userResp?.user?.saloon?.location
      ? {
          locationName: userResp?.user?.saloon?.location?.address,
          coordinates: userResp?.user?.saloon?.location?.coordinates,
        }
      : { locationName: "", coordinates: [] }
  );
  const [coverFile, setCoverFile] = useState(null);
  const [coverUrl, setcoverUrl] = useState(
    userResp?.user?.saloon?.coverImage
      ? userResp?.user?.saloon?.coverImage
      : BannersEdiit
  );
  const [AvatarUrl, setAvatarUrl] = useState(
    userResp?.user?.saloon?.avatar ? userResp?.user?.saloon?.avatar : user
  );
  const [AvatarFile, setAvatareFile] = useState(null);
  const [images, setImages] = useState(
    userResp?.user?.saloon?.certification
      ? userResp?.user?.saloon?.certification
      : []
  );
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState(BannersEdiit);
  const [profile, setProfile] = useState(user);
  const [selectedProfileFile, setSelectedProfileFile] = useState();
  const [removeArrImg, setRemoveArrImg] = useState([]);
  const [filesArr, setFilesArr] = useState([]);
  const [loader, setLoader] = useState(false);
  const [phone, setPhone] = useState(Number);
  const [abouts, setAbouts] = useState(
    userResp?.user?.saloon?.about ? userResp?.user?.saloon?.about : ""
  );
  const [numServices, setNumServices] = useState(
    userResp?.user?.saloon?.Salon_Service_Provider
      ? userResp?.user?.saloon?.Salon_Service_Provider
      : "01-10"
  );
  const [error, setError] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  // const [role, setRole] = useState(roleEnum.owner);
  const [coverBool, setCoverBool] = useState(false);
  const [avatarBool, setAvatarBool] = useState(false);
  const [avatarBools, setAvatarBools] = useState(
    userResp?.user?.saloon?.avatar ? true : false
  );
  const [seeLocation, setSeeLocation] = useState(false);
  const handleLocationClose = () => {
    setSeeLocation(false);
  };
  const handleLocationOpen = () => {
    setSeeLocation(true);
  };

  const handlePhoto = () => {
    setAvatarUrl(user);
    setAvatarBools(false);
    setAvatarBool(true);
  };

  const handleFields = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "PhoneNo") {
      setPhoneNumber(e.target.value);
    } else if (e.target.name == "about") {
      setAbouts(e.target.value);
    }
  };

  // const handleJobType = (e) => {
  //   setRole(e.target.value);
  // }

  const handleRole = (e) => {
    setNumServices(e.target.value);
  };

  const handleImages = (images, URLs) => {
    setFilesArr(images);
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

  const onSelectProfileFile = (e) => {
    let file = e.target.files[0];
    let url = URL.createObjectURL(file);

    setAvatarUrl(url);
    setAvatareFile(file);
    setAvatarBools(true);
    setAvatarBool(false);
  };

  const handleSubmit = () => {
    let RespObj = {
      Saloon_name: name,
      phoneNumber: phoneNumber,
      saloonRole: roleEnum.owner,
      // Salon_Service_Provider: numServices,
      about: abouts,
      certifImg: filesArr,
      salonId: salonId,
      removeAvaBool: avatarBool,
      removeCoverBool: coverBool,
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

    setLoader(true);
    createSalonServices(RespObj)
      .then(({ data: { data } }) => {
        dispatch(
          setUser({
            user: data,
            status: userResp.status,
            tokens: userResp.tokens,
            sub: userResp.sub,
          })
        );
        toastMessage("success", "Salon Updated Successfully");
        setFilesArr([]);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        if (err) {
          toastMessage("error", "Kindly add banner properly");
        }
      });
  };

  let bool = false;
  ArrMap?.map((i) => {
    if (
      location.locationName
        ?.toLowerCase()
        ?.includes(i?.toLowerCase()?.concat(", nc"))
    ) {
      bool = bool || true;
    }
  });

  return (
    <div className="divSigin" style={{ background: "none" }}>
      <div className="contSignIn">
        <Card
          className=""
          style={{ width: "45rem", height: "80rem", border: "none" }}
        >
          {/* <Card.Title>
            <h1 className='saloonCardTitle'>Create Salon Account</h1>
            <p className='saloonCardp'>You haven't posted a job before, so you'll need to create an Salon account.</p>
          </Card.Title> */}
          <Card.Body>
            <div>
              <div className="saloonCover">
                <div
                  className="coverPhoto"
                  style={{ backgroundImage: `url("${coverUrl}")` }}
                >
                  <label
                    htmlFor={`upload_image`}
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
                    id={`upload_image`}
                    name={`upload_image`}
                    style={{ display: "none" }}
                    accept="image/*"
                    maxFileSize={2000000}
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
                                  {userResp.user.saloon.avatar
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
            <div className="salonInfo">
              <div className="mt-5">
                <div className="reeqflex">
                  <h1 className="saloonHeadings mt-5 nrml">Salon Name</h1>
                  <span className="reqAsterik">*</span>
                </div>
              </div>
              <input
                className="saloonCardIpt"
                placeholder="Lyras Hair Salon"
                value={name}
                name="name"
                onChange={(e) => handleFields(e)}
              />
              <div className="reeqflex">
                <h1 className="saloonHeadings mt-5 nrml">Phone number</h1>
                <span className="reqAsterik">*</span>
              </div>
              <input
                className="saloonCardIpt"
                placeholder="+19107631216"
                type="tel"
                maxLength={15}
                name="PhoneNo"
                value={phoneNumber}
                onChange={(e) => handleFields(e)}
              />

              <div className="reeqflex">
                <h1 className="saloonHeadings mt-4">Location</h1>
                <span className="reqAsterik">*</span>
              </div>
              <AutoComplete form={location} setForm={setLocation} check1 />
              {!bool && location?.locationName?.length > 0 ? (
                <p className="error_location mb-0">
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
              <div style={{ position: "relative" }}>
                {/* <HiOutlineLocationMarker className="locationTag" /> */}
              </div>
              {/* <h1 className="saloonHeadings mt-5">
                Your role in the hiring process
              </h1>
              <Form.Select aria-label="Default select example dropPro" onChange={(e) => handleJobType(e)}>
                <option value={roleEnum.owner}>Owner</option>
                <option value={roleEnum.professional}>Provider</option>
              </Form.Select> */}
              {/* <h1 className="saloonHeadings mt-4">
                Your salon's number of Service Providers
              </h1>
              <Form.Select
                aria-label="Default select example dropPro"
                value={numServices}
                onChange={(e) => handleRole(e)}
              >
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
                    name="about"
                    value={abouts}
                    onChange={(e) => handleFields(e)}
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
                photoArr={{}}
                check
              />

              <div className="mt-5" style={{ display: "flex" }}>
                {/* <Form>
                  {["checkbox"].map((type) => (
                    <div key={`default-${type}`} className="mb-3 formSalon">
                      <Form.Check type={type} id={`default-${type}`} label="" onChange={() => setCheckBox(!checkBox)} />
                    </div>
                  ))}
                </Form>
                <p className="saloonContract">
                  When you create an account or sign in, you agree to Salon Substitute's <span style={{ color: "#2075AC", textDecoration: "underline" }}> Terms, Cookie and Privacy policies. </span> You consent to receiving marketing messages from Indeed and may opt out from receiving such messages by following the unsubscribe link in our messages, or as detailed in our terms.
                </p> */}
              </div>
              <div className="saloonBtnDiv">
                <button
                  className="btn btnSaloon"
                  disabled={
                    abouts && name && phoneNumber && bool ? false : true
                  }
                  onClick={handleSubmit}
                >
                  {loader ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </Card.Body>
          <LocationModal show={seeLocation} handleClose={handleLocationClose} />
        </Card>
      </div>
    </div>
  );
};

export default CreateSalon;
