import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { GiConsoleController, GiPlainCircle } from "react-icons/gi";
import { BsBriefcase } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  Reload,
  Brief,
  EditList,
  Delete,
  Searchicon,
} from "./../../../../Assets/index";
import moment from "moment";
import { deleteAJob, toastMessage, ReOpenJob } from "../../../../Shared";
import { jobStatus } from "../../../../Shared/util/constant";
import Alert from "../../../../Shared/util/Alert";

const Posts = ({ posts, handleSearch, setPosts, title, check }) => {
  const navigate = useNavigate();

  const handleEdit = () => {};
  const [resp, setResp] = useState();
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const handleModalClose = () => setShow(false);
  const handleModalOpen = () => setShow(true);

  const [setpart, setSetpart] = useState(false);

  const [search, setSearch] = useState();
  
  const handleChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  handleSearch(search);

  const handleReOpen = (e, id) => {
    let JobId = posts[id]._id;
    let temp = [...posts];
    let obj = {
      jobStatus: jobStatus.reOpen,
    };
    ReOpenJob(obj, JobId)
      .then(({ data }) => {
        toastMessage("success", data.message);
        temp.splice(id, 1);
        setPosts(temp);
      })
      .catch((e) => {})
      .finally(() => {});
  };

  const handleDelete = (e, id) => {
    
    let JobId = posts[id]._id;
    let temp = [...posts];
    deleteAJob(JobId)
      .then(({ data }) => {
        toastMessage("success", data.message);
        temp.splice(id, 1);
        setPosts(temp);
      })
      .catch((e) => {})
      .finally(() => {});
  };

  return (
    <>
      <div className="divForSearch">
        <div style={{ position: "relative" }}>
          <img className="SearchIcon" src={Searchicon} />
          <input
            className="JobIpt"
            placeholder="Search for Items"
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <table className="tableJobList">
        <tr>
          <th className="thJobList thBack thHeading">Name</th>
          <th className="thJobList thBack thHeading">Status</th>
          <th className="thJobList thBack thHeading">Date Posted</th>
          <th className="thJobList thBack thHeading">Job Type</th>
          {/* <th className='thJobList thBack thHeading'></th> */}
        </tr>
        {posts.length > 0 ? (
          posts.map((post, id) => (
            <>
              <tr className="respPosition" key={id}>
                <td className="tdJobList tdHeading">{post.jobTitle}</td>
                <td className="tdJobList tdHeading">
                  <GiPlainCircle
                    style={
                      post?.jobStatus == jobStatus.Open
                        ? { color: "#4CAF50" }
                        : post?.jobStatus == "Re-open"
                        ? { color: "#2196F3" }
                        : { color: "#F44336" }
                    }
                  />{" "}
                  &nbsp;{post?.jobStatus}
                </td>
                <td className="tdJobList tdHeading">
                  {moment(post?.createdAt).format("DD MMM, YYYY")}
                </td>
                <td className="tdJobList tdHeading" style={{ width: "170px" }}>
                  {post.jobType}
                  {
                    <span>
                      <button className="btn dropdown-Job">
                        <Dropdown>
                          <Dropdown.Toggle variant="" id="dropdown-basic">
                            ...
                          </Dropdown.Toggle>

                          <Dropdown.Menu className="dropJob">
                            <Dropdown.Item
                              className="dropDownList"
                              onClick={() =>
                                navigate(`/job-details/${post._id}`, {
                                  state: { post },
                                })
                              }
                            >
                              <BsBriefcase />
                              &nbsp;
                              <span style={{ paddingLeft: "5%" }}>
                                View Job Detail
                              </span>
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="dropDownList"
                              onClick={() =>
                                navigate("/post", { state: { post } })
                              }
                            >
                              <img src={EditList} />
                              &nbsp;
                              <span style={{ paddingLeft: "5%" }}>
                                Edit Job
                              </span>
                            </Dropdown.Item>
                            {check ? (
                              <Dropdown.Item
                                onClick={(e) => handleReOpen(e, id)}
                                className="dropDownList"
                              >
                                <img src={Reload} />
                                &nbsp;
                                <span style={{ paddingLeft: "5%" }}>
                                  Re-Open
                                </span>
                              </Dropdown.Item>
                            ) : (
                              ""
                            )}
                            <Dropdown.Item
                              onClick={(e) => {
                                setResp(id);
                                handleModalOpen();
                              }}
                              className="dropDownList"
                              style={{ color: "red" }}
                            >
                              <img src={Delete} style={{ color: "red" }} />
                              &nbsp;
                              <span style={{ paddingLeft: "5%", color: "red" }}>
                                Delete
                              </span>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </button>
                    </span>
                  }
                </td>

                {/* This only appears in responsiveness */}
                <div className="responsiveTable respDiv">
                  <div className="divFirst">
                    <div>
                      <h1 className="JobRole">{post.jobTitle}</h1>
                      <h1 className="JobRole">
                        <GiPlainCircle
                          style={
                            post.jobStatus == "Open"
                              ? { color: "#4CAF50" }
                              : post.jobStatus == "Re-open"
                              ? { color: "#2196F3" }
                              : { color: "#F44336" }
                          }
                        />{" "}
                        &nbsp;{post.jobStatus}
                      </h1>
                    </div>
                    <div>
                      <button className="btn">
                        <Dropdown style={{ marginTop: "-19px" }}>
                          <Dropdown.Toggle variant="" id="dropdown-basic">
                            ...
                          </Dropdown.Toggle>

                          <Dropdown.Menu className="dropJob">
                            <Dropdown.Item
                              className="dropDownList"
                              onClick={() =>
                                navigate(`/job-details/${post._id}`, {
                                  state: { post },
                                })
                              }
                            >
                              <BsBriefcase />
                              &nbsp;
                              <span style={{ paddingLeft: "5%" }}>
                                View Job Detail
                              </span>
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="dropDownList"
                              onClick={() =>
                                navigate("/post", { state: { post } })
                              }
                            >
                              <BiEditAlt />
                              &nbsp;
                              <span style={{ paddingLeft: "5%" }}>
                                Edit Job
                              </span>
                            </Dropdown.Item>
                            {check ? (
                              <Dropdown.Item className="dropDownList">
                                <img src={Reload} />
                                &nbsp;
                                <span style={{ paddingLeft: "5%" }}>
                                  Re-Open
                                </span>
                              </Dropdown.Item>
                            ) : (
                              ""
                            )}

                            <Dropdown.Item
                              onClick={(e) => handleDelete(e, id)}
                              className="dropDownList"
                            >
                              <RiDeleteBinLine style={{ color: "red" }} />
                              <span style={{ color: "red", paddingLeft: "5%" }}>
                                Delete
                              </span>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </button>
                    </div>
                  </div>
                  <div className="divSecond">
                    <div>
                      <h1 className="respHeading">Date Posted</h1>
                      <h1 className="JobRole">
                        {moment(post.createdAt).format("DD MMM, YYYY")}
                      </h1>
                    </div>
                    <div>
                      <h1 className="respHeading">Due Date</h1>
                      <h1 className="JobRole">
                        {post?.jobTitle === "part"
                          ? moment(post?.startDate).format("DD MMM, YYYY") -
                            moment(post?.endDate).format("DD MMM, YYYY")
                          : "N/A"}
                      </h1>
                    </div>
                    <div>
                      <h1 className="respHeading">Job Type</h1>
                      <h1 className="JobRole"> {post.jobType}</h1>
                    </div>
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
      <Alert
        response={resp}
        show={show}
        handleClose={handleModalClose}
        loader={loader}
        Alerts={handleDelete}
        action="delete"
      />
    </>
  );
};

export default Posts;
