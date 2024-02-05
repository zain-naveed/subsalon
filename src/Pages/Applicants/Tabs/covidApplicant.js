import React from "react";
import { Alert } from "react-bootstrap";
import { RiErrorWarningLine } from "react-icons/ri";
import { Exclamation } from "../../../Assets/index";
import moment from "moment";

function CovidApplicant({ data, checkCondidate }) {
  
  
  return (
    <div>
      {
        
      }
      {/* <div className="cov">
        {data === undefined
          ? ``
          : `Covid Compliance Information `}
      </div> */}
      {data === undefined ? (
        <>
          <Alert variant="warning" style={{ width: "98%", marginTop: "4%" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img style={{ marginRight: "30px" }} src={Exclamation} />
              <p className="warnText">
                No Covid Compliance Information Found`
              </p>
            </div>
          </Alert>
        </>
      ) : (
        ""
      )}
      {data?.dose2 ? (
        <div className="exp-Div" style={{ width: "98%" }}>
          {data?.dose1 ? (
            <div className="div-exp-main">
              <div style={{ display: "flex" }}>
                <p className="exp-info">Dose 1.</p>
                <p className="exp-info ms-2">
                  {moment(data?.dose1?.date1).format("DD MMM,YYYY")}
                </p>
              </div>
              <div>
                <p className="exp2-info">{data?.dose1?.vaccine1}</p>
              </div>
            </div>
          ) : (
            ""
          )}

          {data?.dose2 ? (
            <div className="div-exp-main">
              <div style={{ display: "flex" }}>
                <p className="exp-info">Dose 2.</p>
                <p className="exp-info ms-2">
                  {moment(data?.dose2?.date2).format("DD MMM,YYYY")}{" "}
                </p>
              </div>
              <div>
                <p className="exp2-info">{data?.dose2?.vaccine2}</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CovidApplicant;
