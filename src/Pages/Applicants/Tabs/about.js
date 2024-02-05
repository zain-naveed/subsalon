import moment from "moment";
import React, { useState } from "react";

function About(props) {
  const { data } = props;
  // const { avail } = props;
  // const [avail, setAvail] = useState(props?.avail ? props?.avail : [])
  const avail = [...props.avail];
  

  let bool = false;
  for (let i = 0; i < avail.length; i++) {
    bool = bool || avail[i].flag;
  }

  const services = ["Makeup Artist", "Nail Technician", "Esthetician"];
  const Products = ["Intimo Warm Wax", "Keune Hair Cosmetics"];
  const Chemical = [
    "A Curl-Protecting Cream",
    "A Rich Mask",
    "Tres Kit Color Revitalize",
    "Panasonic- Hair Styler",
  ];
  return (
    <div style={{ width: "97%", margin: "0 auto" }}>
      {data?.candidate?.experience || data?.experience ? (
        <>
          <h1
            className="h1-applicant"
            style={{ color: "#202430", opacity: "0.5" }}
          >
            Bio
          </h1>
          <p className="bio">
            {data?.candidate?.experience?.AdditionalInfo
              ? data?.candidate?.experience?.AdditionalInfo
              : data?.experience?.AdditionalInfo
              ? data?.experience?.AdditionalInfo
              : "Not added"}
          </p>

          <h1 className="h1-applicant mt-5">License</h1>
          {data?.candidate?.experience ? (
            <div className="exp-Div">
              {data?.candidate?.experience?.license.map((itemss, index) => {
                return (
                  <div className="div-exp-main">
                    <div style={{ display: "flex" }}>
                      <p className="exp-info">{index + 1}.</p>
                      <p className="exp-info ms-2">{itemss?.name}</p>
                    </div>
                    <div>
                      <p className="exp2-info">
                        License#{" "}
                        <span className="exp-info">{itemss.number}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="exp-Div">
              {data?.experience?.license.map((itemss, index) => {
                return (
                  <div className="div-exp-main">
                    <div style={{ display: "flex" }}>
                      <p className="exp-info">{index + 1}.</p>
                      <p className="exp-info ms-2">{itemss?.name}</p>
                    </div>
                    <div>
                      <p className="exp2-info">
                        License#{" "}
                        <span className="exp-info">{itemss.number}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <h1 className="h1-applicant mt-4">Year of Experience</h1>

          {data?.candidate?.experience ? (
            <div className="exp-Div">
              {data?.candidate?.experience?.expYear.map((itemss, index) => {
                return (
                  <div className="div-exp-main">
                    <div style={{ display: "flex" }}>
                      <p className="exp-info ms-2">
                        {itemss?.start} - {itemss?.end}
                      </p>
                    </div>
                    <div>
                      <p className="exp2-info">
                        {itemss?.end - itemss?.start} Years of Experience
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="exp-Div">
              {data?.experience?.expYear.map((itemss, index) => {
                return (
                  <div className="div-exp-main">
                    <div style={{ display: "flex" }}>
                      <p className="exp-info ms-2">
                        {itemss?.start} - {itemss?.end}
                      </p>
                    </div>
                    <div>
                      <p className="exp2-info">
                        {itemss?.end - itemss?.start} Years of Experience
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <h1 className="h1-applicant mt-4 mb-3">Services</h1>
          {data?.candidate?.experience ? (
            <div>
              {data?.candidate?.experience?.services?.map((i) => {
                return (
                  <>
                    <button type="button" class="btn qualities">
                      {i}
                    </button>
                  </>
                );
              })}
            </div>
          ) : (
            <div>
              {data?.experience?.services?.map((i) => {
                return (
                  <>
                    <button type="button" class="btn qualities">
                      {i}
                    </button>
                  </>
                );
              })}
            </div>
          )}

          <h1 className="h1-applicant mt-4 mb-3">Familiar Products</h1>
          {data?.candidate?.experience ? (
            <div>
              {data?.candidate?.experience?.familiarProducts?.map((i) => {
                return (
                  <>
                    <button type="button" class="btn qualities">
                      {i}
                    </button>
                  </>
                );
              })}
            </div>
          ) : (
            <div>
              {data?.experience?.familiarProducts?.map((i) => {
                return (
                  <>
                    <button type="button" class="btn qualities">
                      {i}
                    </button>
                  </>
                );
              })}
            </div>
          )}

          <h1 className="h1-applicant mt-4 mb-3">Availability</h1>
          {bool ? (
            avail?.map((i) => {
              return (
                <>
                  {i.flag ? (
                    <>
                      <p
                        className="exp2-info"
                        style={{ color: "black", fontSize: "10px" }}
                      >
                        {i?.day.toUpperCase()}
                      </p>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <button
                          className="btn qualities"
                          style={{ padding: "1% 1% 1% 1%" }}
                        >
                          {moment(i.STUTC).format("h:mm a")}
                        </button>
                        <span className="toSeparator"> to </span>
                        <button
                          className="btn qualities"
                          style={{ padding: "1% 1% 1% 1%" }}
                        >
                          {" "}
                          {moment(i.ETUTC).format("h:mm a")}
                        </button>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </>
              );
            })
          ) : (
            <p
              className="exp2-info"
              style={{ color: "black", fontSize: "10px" }}
            >
              Not Added
            </p>
          )}

          {/* <h1 className="h1-applicant mt-4 mb-3">
            Familiar Chemical Service Product
          </h1>
          {data?.candidate?.experience ?

            <div className="mb-4">
              {data?.candidate?.experience?.familiarChemicalProd?.map((i) => {
                return (
                  <>
                    <button type="button" class="btn qualities">
                      {i}
                    </button>
                  </>
                );
              })}
            </div>
            :
            <div className="mb-4">
              {data?.experience?.familiarChemicalProd?.map((i) => {
                return (
                  <>
                    <button type="button" class="btn qualities">
                      {i}
                    </button>
                  </>
                );
              })}
            </div>
          } */}

          <div className="div-sec-applicant respJobDiv2 mb-3">
            <h1 className="h1-applicant">Location</h1>
            <p className="p-applicant">
              {data?.candidate?.address
                ? data?.candidate?.address
                : data?.location?.address}
            </p>

            <h1 className="h1-applicant">Mile Range to Travel</h1>
            <p className="p-applicant">
              {data?.candidate?.minMiles
                ? data?.candidate?.minMiles
                : data?.minMiles}{" "}
              -{" "}
              {data?.candidate?.maxMiles
                ? data?.candidate?.maxMiles
                : data?.maxMiles}{" "}
              miles
            </p>

            <h1 className="h1-applicant">Hourly Rate</h1>
            <p className="p-applicant">
              $
              {data?.candidate?.hourRate
                ? data?.candidate?.hourRate
                : data?.hourRate}{" "}
              • Full Time
            </p>
          </div>
        </>
      ) : (
        <>
          <h1 className="aplicant-name">No experience and bio found</h1>
          
          {bool ? <h1 className="h1-applicant mt-4 mb-3">Availability</h1> : ""}
          {bool ? (
            avail?.map((i) => {
              return (
                <>
                  {i.flag ? (
                    <>
                      <p
                        className="exp2-info"
                        style={{ color: "black", fontSize: "10px" }}
                      >
                        {i?.day.toUpperCase()}
                      </p>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <button
                          className="btn qualities"
                          style={{ padding: "1% 1% 1% 1%" }}
                        >
                          {moment(i.STUTC).format("h:mm a")}
                        </button>
                        <span className="toSeparator"> to </span>
                        <button
                          className="btn qualities"
                          style={{ padding: "1% 1% 1% 1%" }}
                        >
                          {" "}
                          {moment(i.ETUTC).format("h:mm a")}
                        </button>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </>
              );
            })
          ) : data?.candidate?.experience || data?.experience ? (
            <p
              className="exp2-info"
              style={{ color: "black", fontSize: "10px" }}
            >
              Not Added
            </p>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}

export default About;
