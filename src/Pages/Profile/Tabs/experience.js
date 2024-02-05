import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import "./../profile.css";
import { Delete } from "../../../Assets";
import ExpModal from "./Shared/ExpModal";
import LicenseModal from "./Shared/LicenseModal";
import UpdateModal from "./Shared/UpdateModal";
import Tags from "./Tags";
import MediaUpload from "../../../Shared/Components/MediaUploader/MediaUpload";
import { getExperienceServices } from "../../../Shared/Services/EditProfileApi";
import { useDispatch, useSelector } from "react-redux";
import { toastMessage } from "../../../Shared";
import { setUser } from "../../../Shared/Redux/reducers/userSlice";
import { store } from "../../../Shared/Redux/store";
import { Spinner } from "react-bootstrap";
import Products from "../../../Pages/autocomplete/Products.json";
import Services from "../../../Pages/autocomplete/Services.json";
import jobTitles from "../../../Pages/autocomplete/JobTitles.json";
import { setServiceQuery } from "../../../Shared/Redux/reducers/serviceQuerySlice";

const Experience = ({ handleSubmit, form, bool }) => {
  
  const { notfy } = store.getState().root;
  
  let currencies = notfy?.services;
  console.log(currencies,"currenciescurrencies")

  let tempoArr = [...new Set(Products)];
  
  const {
    user: { user, status, tokens },
  } = store.getState().root;
  

  const [servicesTag, setServicesTags] = useState(
    user?.experience?.services ? user?.experience?.services : []
  );
  const [productsTag, setProductsTag] = useState(
    user?.experience?.familiarProducts ? user?.experience?.familiarProducts : []
  );
  const [chemicalTag, setChemicalTag] = useState(
    user?.experience?.familiarChemicalProd
      ? user?.experience?.familiarChemicalProd
      : []
  );
  

  const [jobTitleArr, setJobTitleArr] = useState(user?.experience?.jobTitle ? user?.experience?.jobTitle : []);
  const [experienceArr, setExperienceArr] = useState(
    user?.experience?.expYear ? user?.experience?.expYear : []
  );
  const [licenseArr, setLicenseArr] = useState(
    user?.experience?.license ? user?.experience?.license : []
  );
  const [additionalInfo, setAdditionalInfo] = useState(
    user?.experience?.AdditionalInfo ? user?.experience?.AdditionalInfo : ""
  );
  const [images, setImages] = useState(
    user?.experience?.certificationImgs
      ? user?.experience?.certificationImgs
      : []
  );
  const [isDisabled, setIsDisabled] = useState(true);
  const [filesArr, setFilesArr] = useState([]);
  const [removeArrImg, setRemoveArrImg] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const handleExperience = (value) => {
    setExperienceArr(value);
  };

  const handleLicense = (value) => {
    setLicenseArr(value);
  };

  const handleImages = (images, URLs) => {
    setFilesArr(images);
  };

  const handleState = (key, value) => {
    if (key == "Your Services") {
      setServicesTags(value);
    } else if (key == "Familiar Products") {
      setProductsTag(value);
    } else {
      setJobTitleArr(value);
    }
  };

  const handleText = (e) => {
    setAdditionalInfo(e.target.value);
  };
  
  const onSubmit = () => {
    let params = {
      license: JSON.stringify(licenseArr),
      expYear: JSON.stringify(experienceArr),
      removeImg: JSON.stringify(removeArrImg),
      services: JSON.stringify(servicesTag),
      familiarProducts: JSON.stringify(productsTag),
      "jobTitle": JSON.stringify(jobTitleArr),
      // "familiarChemicalProd": JSON.stringify(chemicalTag),
      // "AdditionalInfo": additionalInfo,
    };
    if (additionalInfo) {
      params["AdditionalInfo"] = additionalInfo;
    }
    if (filesArr.length > 0) {
      params["certificationImgs"] = filesArr;
    }
    setLoader(true);
    getExperienceServices(params)
      .then(({ data: { data } }) => {
        setRemoveArrImg([]);
        let userClone = { ...user };
        let obj = {
          ...userClone,
          experience: data,
        };

        let userObj = {
          user: obj,
          status: status,
          tokens: tokens,
        };
        
        // toastMessage("success", "Expereience Added Successfully!");
        dispatch(setUser(userObj));
        handleSubmit();
        setFilesArr([]);
      })
      .catch((err) => {
        
      })
      .finally(() => setLoader(false));
  };
  useEffect(()=>{
    currencies = currencies
  },[currencies?.length ? 1:0 ])

  return (
    <>
      <Container style={{ marginBottom: "4%" }} className="mt-5">
        <AddSection
          title="Your License"
          buttonTxt="+ Add License"
          handleLicense={handleLicense}
          licenseArr1={licenseArr}
        />
        <AddSection
          title="Your Experience"
          buttonTxt="+ Add Experience"
          handleExperience={handleExperience}
          expArr1={experienceArr}
        />
        <Tags title="Job Title" handleState={handleState} tags={jobTitleArr} arr={jobTitles} jobtitleCheck/>
        <Tags
          title="Your Services"
          handleState={handleState}
          tags={servicesTag}
          arr={currencies}
        />
        <Tags
          title="Familiar Products"
          handleState={handleState}
          tags={productsTag}
          arr={tempoArr}
        />
        {/* <Tags title="Familiar Chemical Service Product" handleState={handleState} tags={chemicalTag} /> */}
        {/* <Certificates /> */}
        <MediaUpload
          filesArr={filesArr}
          images={images}
          setImages={setImages}
          setFilesArr={setFilesArr}
          removeArrImg={removeArrImg}
          setRemoveArrImg={setRemoveArrImg}
          handleImages={handleImages}
          photoArr={{}}
        />
        <div className="mt-5">
          <h1 className="headingSection">Additonal Information</h1>
          <div>
            <textarea
              className="textAdd"
              rows="4"
              cols="77"
              resize="none"
              value={additionalInfo}
              onChange={(e) => handleText(e)}
            ></textarea>
          </div>
        </div>
        <Button
          disabled={
            experienceArr.length > 0 &&
            servicesTag.length > 0 &&
            productsTag.length > 0 &&
            jobTitleArr.length > 0 &&
            form.name &&
            form.phoneNumber &&
            form.location &&
            form.rate &&
            form.locationName &&
            bool &&
            form.jobtype
              ? false
              : true
          }
          onClick={onSubmit}
          className="mt-4 btnPro minWidth135"
        >
          {loader ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            "Save Changes"
          )}
        </Button>
      </Container>
    </>
  );
};

export default Experience;

const AddSection = ({
  handleLicense,
  handleExperience,
  title,
  licenseArr1,
  expArr1,
}) => {
  const {
    user: { user, status, tokens },
  } = store.getState().root;
  

  const [check, setCheck] = useState(true);
  // const [show, setShow] = useState(true);
  const [licenseArr, setLicenseArr] = useState(licenseArr1 ? licenseArr1 : []);
  const [exp, setExp] = useState(expArr1 ? expArr1 : []);
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [experienceArr, setExperienceArr] = useState(expArr1 ? expArr1 : []);

  const handleChange = (license) => {
    let temp = [...licenseArr];
    temp.push(license);
    setLicenseArr(temp);
    handleLicense(temp);
  };

  const handleDates = (value, id) => {
    // let cloneExp = [...expArr1];
    let Exper = [
      ...(user?.experience?.expYear ? user?.experience?.expYear : expArr1),
    ];

    let obj = {
      start: value.start,
      end: value.end,
      description: "I've 3 years of Experience in Tony n Guy.",
    };
    let objs = {
      ...Exper[id],
      start: Number(obj.start),
      end: Number(obj.end),
    };
    Exper[id] = objs;
    // cloneExp[id].start = Number(obj.start)
    // cloneExp[id].end = Number(obj.end)

    setExperienceArr(Exper);
    handleExperience(Exper);
  };

  const handleExp = (years) => {
    let clone = [...experienceArr];
    let obj = {
      start: years.start,
      end: years.end,
      description: "I've 3 years of Experience in Tony n Guy.",
    };
    clone.push(obj);

    setExperienceArr(clone);
    handleExperience(clone);
    // 
    // if (years.startYear > years.endYear) {
    //   toastMessage('error', "Ending Year cant be earlier than Starting Year")
    // }
    // else {
    //   if (experienceArr.length > 0) {
    //     let temp = [...experienceArr];
    //     temp.push(years);
    //     setExperienceArr(temp);
    //     setExp(years)
    //     setEndYear(years.endYear);
    //     setStartYear(years.startYear);
    //   }
    //   else {
    //     let temp = [];
    //     temp.push(years);
    //     setExperienceArr(temp);
    //     setExp(years)
    //     setEndYear(years.endYear);
    //     setStartYear(years.startYear);
    //   }
    // }
    // handleExperience(experienceArr);
  };

  const handleDelete = (id) => {
    let temp = [
      ...(user?.experience?.license ? user?.experience?.license : licenseArr),
    ];
    temp.splice(id, 1);
    setLicenseArr(temp);
    handleLicense(temp);
  };

  const deleteExp = (e, id) => {
    let temp = [...expArr1];
    temp.splice(id, 1);
    setExperienceArr(temp);
    handleExperience(temp);
    setEndYear();
    setStartYear();
    setExp();
  };

  return (
    <>
      <div style={{ marginBottom: "8%" }}>
        <div className="headingDiv">
          <div className="reeqflex">
            <h1
              className="headingSection textpro"
              style={{ marginTop: "2rem" }}
            >
              {title === "Your Experience" ? "Year of Experience" : title}
            </h1>
            <span className="reqAsterik">*</span>
          </div>

          {title == "Your License" ? (
            <LicenseModal handleChange={handleChange} />
          ) : (
            <ExpModal handleExp={handleExp} />
          )}
        </div>

        <div
          className="divSection"
          style={
            licenseArr.length == 0 && licenseArr.length == 1
              ? { height: "10px" }
              : { height: "auto" }
          }
        >
          {title === "Your License" ? (
            <>
              {licenseArr.length == 0 ? (
                <div className="expDiv">
                  <p className="toBeAdded"> No license added yet!</p>
                </div>
              ) : (
                licenseArr.map((i, key) => {
                  return (
                    <>
                      <div className="divDetail">
                        <div className="divLic">
                          <div>
                            <p
                              className="detailH1"
                              style={{ marginRight: "20px", marginTop: "35%" }}
                            >
                              {key + 1}.
                            </p>
                          </div>
                          <div>
                            <h1 className="detailH1">{i.name}</h1>
                            <p className="detailp">
                              License#{" "}
                              <span style={{ color: "black" }}>{i.number}</span>
                            </p>
                          </div>
                        </div>

                        <div
                          className="deletediv"
                          onClick={() => handleDelete(key)}
                        >
                          <img src={Delete} />
                        </div>
                      </div>
                    </>
                  );
                })
              )}
            </>
          ) : (
            ""
          )}
          {title === "Your Experience" ? (
            <>
              {experienceArr.length > 0 && experienceArr ? (
                experienceArr.map((resp, id) => {
                  return (
                    <>
                      <div
                        className="expDiv"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h1 className="exp">
                          {resp.start} - {resp.end}{" "}
                          <span style={{ color: "#757575" }}>
                            {" "}
                            &nbsp; {resp.end - resp.start} years{" "}
                            <span className="expYears">experience</span>{" "}
                          </span>
                        </h1>
                        <div>
                          <UpdateModal
                            startingYear={resp.start}
                            endingYear={resp.end}
                            handleDates={handleDates}
                            id={id}
                          />
                          <img
                            src={Delete}
                            style={{
                              paddingRight: "25px",
                              paddingLeft: "25px",
                              cursor: "pointer",
                            }}
                            onClick={(e) => deleteExp(e, id)}
                          />
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <div className="expDiv">
                  <p className="toBeAdded">No experience added yet!</p>
                </div>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
