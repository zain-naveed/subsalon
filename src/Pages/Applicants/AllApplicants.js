import React, { useEffect, useState } from "react";
import { toastMessage } from "../../../src/Shared";
import { AiFillStar } from "react-icons/ai";
import { Dropdown } from "react-bootstrap";
import moment from "moment";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { AllGetApiApplicants } from "../../Shared/Services/applicantsApis";
import { useSelector } from "react-redux";
import { vectorMan, VaccinatedIcon } from "./../../Assets/index";
import { MdOutlineDone } from "react-icons/md";
import { AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CircularProgress from "@mui/material/CircularProgress";
import ListPagination from "./../../Shared/Components/Pagination/ListPagination";
import { actionOnApplicants } from "../../Shared/Services/applicantsApis";

function AllApplicants({ posts, handleSearch, setPosts, title, check }) {
  
  const [ind, setInd] = useState(null);
  const [actionType, setActionType] = useState("");

  // const [searchElement, setSearchElement] = useState();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(10);
  // const [loader, setLoader] = useState(false);
  // const { user } = useSelector(state => state.root);
  const navigate = useNavigate();
  // const [posts, setpost] = useState()
  // let saloonId = user?.user?.saloon._id
  // const [loader, setloader] = useState(false);
  // const [TotalDoc, setTotalDoc] = useState(0);

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);
  // 

  // // let indexOfLastPost = currentPage * TotalDoc;
  // // const indexOfFirstPost = indexOfLastPost - TotalDoc;
  // // const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);
  // // indexOfLastPost = (indexOfLastPost > TotalDoc) ? TotalDoc : indexOfLastPost

  // // Change page
  // const paginate = pageNumber => setCurrentPage(pageNumber);

  // let query = `?limit=${10}&page=${(currentPage - 1)}`;
  // useEffect(() => {
  //   setloader(true)
  //   AllGetApiApplicants(saloonId, query)
  //     .then(({ data: { data } }) => {
  //       
  //       setpost(data.applicant)
  //       setTotalDoc(data?.doc)
  //       setloader(false)

  //     })
  //     .catch((e) => {
  //       toastMessage("error", e);
  //     }).finally(() => setloader(false));

  // }, [currentPage])
  const actionApplicants = (indx, action, item) => {
    setInd(indx);
    setActionType(action);
    let obj = {
      jobId: item,
      requestAction: action,
    };
    actionOnApplicants(obj)
      .then(({ data: { data } }) => {
        toastMessage("success", `Application ${action}`);

        setInd("");
        setActionType("");
        let clone = [...posts];
        let cloneInx = clone.findIndex((ii) => ii._id == item);
        if (cloneInx > -1) {
          if (clone[cloneInx].requestAction) {
            clone[cloneInx].requestAction = action;
          } else {
            clone[cloneInx]["requestAction"] = action;
          }
        }
        
        setPosts(clone);
      })
      .catch((err) => {
        setInd("");
        setActionType("");
      });
  };

  return (
    <div>
      <table className="tableJobList">
        <tr>
          <th className="thJobList thBack thHeading">Applicant Name</th>
          <th className="thJobList thBack thHeading">Job Title</th>
          <th className="thJobList thBack thHeading">Rating</th>
          <th className="thJobList thBack thHeading">Applied Date </th>
          <th className="thJobList thBack thHeading">Hour Rate</th>
          {/* <th className='thJobList thBack thHeading'>Hourly Rate</th> */}
          <th className="thJobList thBack thHeading">Action</th>
          {/* <th className='thJobList thBack thHeading'></th> */}
        </tr>
        {posts.length > 0 ? (
          posts?.map((post, inx) => (
            <>
              <tr className="respPosition">
                <td className="tdJobList tdHeading">
                  <img
                    src={
                      post?.candidate?.profilePic
                        ? post?.candidate?.profilePic
                        : vectorMan
                    }
                    className="imgAplicants me-4"
                  />
                  {post?.candidate?.covidDetails ? (
                    // <button className='btn injectionButton' >
                    //   <img src={Injection} className="injectionImg" />
                    // </button>
                    <img src={VaccinatedIcon} className="injectImg" />
                  ) : (
                    ""
                  )}
                  {post?.candidate?.name
                    ? post?.candidate.name
                    : post?.candidate?.email.slice(
                        0,
                        post?.candidate?.email.indexOf("@")
                      )}
                </td>
                <td className="tdJobList tdHeading">
                 {post?.appliedJob?.jobTitle}
                </td>
                <td className="tdJobList tdHeading">
                  <AiFillStar style={{ color: "#EF9D21" }} />
                  {post?.review?.length
                    ? (
                        post?.review.reduce(
                          (previousValue, currentValue) =>
                            previousValue + currentValue.ratings,
                          0
                        ) / post?.review.length
                      ).toFixed(1)
                    : "0"}
                  {"   "}({post?.review.length})
                </td>
                <td className="tdJobList tdHeading">
                  {moment(post?.createdAt).format("D MMM, YYYY")}
                </td>
                <td className="tdJobList tdHeading">
                  {post?.candidate?.hourRate} / hour
                </td>
                <td className="tdJobList tdHeading" style={{ width: "220px" }}>
                  {post?.requestAction ? (
                    <button
                      style={{ width: "96px" }}
                      className={`btn ${
                        post?.requestAction == "Accept" ? "btnDone" : "btnClose"
                      }  me-2`}
                    >
                      <span
                        style={{
                          color: `${
                            post?.requestAction == "Accept"
                              ? "#29B57A"
                              : "#FA4949"
                          }`,
                          position: "relative",
                          top: "-3px",
                        }}
                      >
                        {post?.requestAction == "Accept"
                          ? post?.requestAction + "ed"
                          : post?.requestAction + "ed"}
                      </span>
                    </button>
                  ) : (
                    <>
                      <button className="btn btnDone me-2">
                        {ind == inx && actionType == "Accept" ? (
                          <CircularProgress
                            style={{ color: "#29B57A" }}
                            className="circulerr actionJob"
                          />
                        ) : (
                          <MdOutlineDone
                            style={{
                              color: "#29B57A",
                              marginBottom: "9px",
                              cursor:"pointer"

                            }}
                            onClick={() => {
                              actionApplicants(inx, "Accept", post._id);
                            }}
                          />
                        )}
                      </button>
                      <button className="btn btnClose me-2">
                        {ind == inx && actionType == "Reject" ? (
                          <CircularProgress
                            style={{ color: "#FA4949" }}
                            className="circulerr actionJob"
                          />
                        ) : (
                          <AiOutlineClose
                            style={{
                              color: "#FA4949",
                              marginBottom: "9px",
                              cursor:"pointer"
                            }}
                            onClick={() => {
                              actionApplicants(inx, "Reject", post._id);
                            }}
                          />
                        )}
                      </button>
                    </>
                  )}

                  <button
                    className="btn btnApplicant"
                    style={{ height: "30px" }}
                    onClick={() =>
                      navigate(`/applicant-info/${post?.candidate?._id}`, {
                        state: { post },
                      })
                    }
                  >
                    <VisibilityIcon
                      style={{
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "16px",
                      }}
                      // onClick={() => {
                      //   actionPerfome(inx, "Reject", post._id);
                      // }}
                    />
                    {/* See Application */}
                  </button>
                  {
                    <span>
                      <button className="btn">
                        <Dropdown className="dropDown-Job">
                          {/* <Dropdown.Toggle className='btnDots' variant="" id="dropdown-basic" style={{ padding: "1px 10px 7px 10px" }}>
                      <span> ... </span>
                    </Dropdown.Toggle> */}

                          <Dropdown.Menu className="dropJob">
                            <Dropdown.Item className="dropDownList">
                              &nbsp;Refer Job
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </button>
                    </span>
                  }
                </td>

                {/* This only appears in responsiveness */}
                <div className="responsiveTable respDiv">
                  <div
                    style={{ display: "flex", marginBottom: "5%" }}
                    className="mt-3"
                  >
                    <div>
                      <img
                        src={
                          post?.candidate?.profilePic
                            ? post?.candidate?.profilePic
                            : vectorMan
                        }
                        className="imgAplicants me-4"
                      />
                      {post?.candidate?.covidDetails ? (
                        // <button className='btn injectionButton' >
                        //   <img src={Injection} className="injectionImg" />
                        // </button>
                        <img src={VaccinatedIcon} className="injectImg" />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="ListSpacing">
                      <h1 className="respJobDetailH">
                        {post.candidate?.name
                          ? post.candidate.name
                          : post?.candidate?.email.slice(
                              0,
                              post?.candidate?.email.indexOf("@")
                            )}
                      </h1>
                      {/* <h1 className='respJobDetailsR'>
                      <AiFillStar style={{ color: "#EF9D21" }} className="me-1" />0.00
                    </h1> */}
                    </div>
                    <div className="ListSpacing">
                      <h1 className="respJobH">Applied Date</h1>
                      <p className="respJobP">
                        {moment(post?.createdAt).format(
                          "D MMM, YYYY"
                        )}
                      </p>
                    </div>
                    <div>
                      <h1 className="respJobH">Hourly Rate</h1>
                      <p className="respJobP">
                        {post?.candidate?.hourRate} / hour
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn btnApplicant"
                      onClick={() =>
                        navigate(`/applicant-info/${post?.candidate?._id}`, {
                          state: { post },
                        })
                      }
                    >
                      See Application
                    </button>
                    {/* {<span><button className='btn'>
                    <Dropdown>
                      <Dropdown.Toggle className='btnDots btnDotList' variant="" id="dropdown-basic" style={{ marginBottom: "4px" }} >
                        <span style={{ height: "35px" }}> ... </span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className='dropJob'>
                        <Dropdown.Item className="dropDownList">&nbsp;Refer Job</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown></button></span>} */}
                  </div>
                </div>
              </tr>
              {/* <li key={post.id} className='list-group-item' style={{ display: "flex" }}>
              <p className='distance'>{post.roles}</p>
              <p className='distance'>{post.status}</p>
              <p className='distance'>{post.date_posted}</p>
              <p className='distance'>{post.due_date}</p>
              <p className='distance'>{post.job_type}</p>
            </li> */}
            </>
          ))
        ) : (
          <tr className="ccnetr">No record found !</tr>
        )}
      </table>
    </div>
  );
}

export default AllApplicants;
