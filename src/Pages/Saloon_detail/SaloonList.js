import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { SalonFake } from "./SalonFake";
import { getallJobFromSingleSaloon } from "../../Shared/Services/allSalons";
import { toastMessage } from "../../Shared";
import moment from "moment";
import { useParams } from "react-router-dom";
import Modals from "../../Shared/Components/card/Modals";
import { useSelector, useDispatch } from "react-redux";
import {
  AllJobsApi,
  FavJobsApi,
  RevFavJobsApi,
  applyJobs,
} from "../../Shared/Services";

function SaloonList(props) {
  const { saloon } = props;
  const [datas, setData] = useState([]);
  const param = useParams();
  
  const [resp, setResp] = useState();
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const handleModalClose = () => setShow(false);
  const handleModalOpen = () => setShow(true);
  const userResp = useSelector((state) => state.root.user);
  const [job, setJob] = useState(saloon);

  useEffect(() => {
    getallJobFromSingleSaloon(param?.id)
      .then(({ data: { data } }) => {
        setData(data);
        
      })
      .catch((e) => {
        toastMessage("error", e?.response?.data?.message);
      });
  }, []);

  const apply = (jb) => {
    if (userResp?.user?.isLicensed) {
      setLoader(true);
      debugger;
      let obj = {
        appliedJob: jb?._id,
        saloon: jb?.saloon._id,
        candidate: userResp?.user?._id,
      };
      applyJobs(obj)
        .then(({ data: { data } }) => {
          let cloneJob = [...datas];

          let finJobInx = cloneJob.findIndex((ii) => ii?._id == jb?._id);
          if (finJobInx > -1) {
            cloneJob[finJobInx] = data;
          }
          setData(cloneJob);

          setLoader(false);
          handleModalClose();
          toastMessage("success", "Applied");
        })
        .catch((e) => {
          toastMessage("error", e?.response?.data?.message);
        })
        .finally(() => setLoader(false));
    } else {
      toastMessage("error", "Your License has not been verified!!");
    }
  };

  return (
    <div className="salonList">
      <Table className="tableJobList">
        <thead style={{ borderStyle: "hidden" }}>
          <tr>
            <th className="thJobList thBack thHeading">Roles</th>
            {/* <th className='thJobList thBack thHeading'>Status</th> */}
            <th className="thJobList thBack thHeading">Posted Date</th>
            {/* <th className="thJobList thBack thHeading">End Date</th> */}

            <th className="thJobList thBack thHeading">Job Type</th>
          </tr>
        </thead>

        {datas?.length > 0 && (
          <tbody>
            {datas?.map((val) => {
              return (
                <tr
                  className="respPosition"
                  onClick={() => {
                    handleModalOpen();
                    setResp(val._id);
                  }}
                >
                  <td className="tdJobList tdHeading pt-3">{val?.jobTitle}</td>
                  {/* <td className='tdJobList tdHeading pt-3'>{val?.jobStatus}</td> */}
                  <td className="tdJobList tdHeading pt-3">
                    {val?.createdAt
                      ? `${moment(val?.createdAt).format("DD MMM, YYYY")}`
                      : "N/A"}
                  </td>
                  <td className="tdJobList tdHeading pt-3">{val?.jobType}</td>{" "}
                  <div className="responsiveTable respDiv">
                    <div className="ListSpacing">
                      <h1 className="respJobDetailH">{val?.slonName}</h1>
                      {/* <h1 className='respJobDetailsR'>
                    <AiFillStar style={{ color: "#EF9D21" }} className="me-1" />{post.ratings}
                  </h1> */}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        marginBottom: "5%",
                        justifyContent: "space-around",
                      }}
                      className="mt-3"
                    >
                      <div className="ListSpacing">
                        <h1 className="respJobH">Roles</h1>
                        <p className="respJobP">{val?.jobTitle}</p>
                      </div>
                      {/* <div className='ListSpacing'>      
                  <h1 className='respJobH'>Status</h1>
                  <p className='respJobP'>{val?.jobStatus}</p>
                </div> */}
                      <div className="ListSpacing">
                        <h1 className="respJobH">Job Type</h1>
                        <p className="respJobP">{val?.jobType}</p>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </tr>
              );
            })}
          </tbody>
        )}
      </Table>
      {datas?.length <= 0 && (
        <p className="bio mt-1 d-flex text-align-center justify-content-center">
          No Record Found!
        </p>
      )}

      <Modals
        getjobid={resp}
        show={show}
        handleClose={handleModalClose}
        loader={loader}
        jobApply={apply}
        checkJobCard={true}
      />
    </div>
  );
}

export default SaloonList;
