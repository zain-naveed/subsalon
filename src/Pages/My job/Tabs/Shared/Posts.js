import React, { useState } from "react";
import { GiPlainCircle } from "react-icons/gi";
import {
  vectorMan,
  SearchIcons,
  Searchicon,
  msgJob,
  msgInBlue,
} from "./../../../../Assets/index";
import { MdOutlineDone } from "react-icons/md";
import { AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import ModalJob from "./Jobs_Modal";
import moment from "moment";
import { jobStatus } from "../../../../Shared/util/constant";
import { JobResAction, toastMessage } from "../../../../Shared";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setChatUser } from "../../../../Shared/Redux/reducers/chatReducer";
import { post } from "jquery";

const Posts = ({
  posts,
  setPosts,
  handleSearch,
  title,
  check,
  currentPage,
}) => {
  const [search, setSearch] = useState();
  const [Open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ind, setInd] = useState(-1);
  const [Candidate, setCandidate] = useState("");
  const [typee, setType] = useState();
  const { chat, user } = useSelector((state) => state.root);

  // const [posts, setneewpost] = useState(post)

  //
  const handleChat = (data, value) => {
    // let Sender = {
    //   _id:user?.user?._id,
    //   name: user?.user.name,
    //   email: user?.user.email,
    //   profilePic: user?.user.profilePic,
    //   createdAt: new Date(),
    // };
    if (user?.user?.subType) {
      // if (user?.user?.subType == "basic") {

      //     toastMessage(
      //       "error",
      //       "Please upgrade your subscription to Professional or Premium in order to send a message"
      //     );

      // } else {
      let Msguser = value === "offer" ? data?.offerJob : data?.appliedJob;

      let obj = data?.saloon;
      let cloneChat = { ...chat.receiver };
      // cloneChat = { ...chat.receiver };

      if (!(cloneChat._id == obj._id)) {
        let reciver = {
          _id: Msguser.user,
          name: obj.Saloon_name,
          profilePic: obj.avatar,
          createdAt: new Date(),
        };

        let cloneChats = reciver;
        cloneChat = "";

        dispatch(setChatUser(cloneChats));
        navigate("/chat");
      } else {
        navigate("/chat");
      }
      // }
    } else {
      toastMessage("error", "Please buy a subscription");
    }
  };

  // const handleChange = (e) => {
  //   setSearch(e.target.value.toLowerCase());
  // }
  // handleSearch(search)

  const handleClick = () => {
    let text = `Hey you might wanna check this post out on OmeGame.\n${window.location.href}`;

    var copyText = text.substr(52, 200);

    navigator.clipboard.writeText(copyText);
    toastMessage("success", "Invite link suscessfully copied to clipboard");
  };
  const actionPerfome = (inx, value, id) => {
    let clone = [...posts];
    setInd(inx);
    setOpen(true);
    setType(value);

    let obj = {
      jobRequestId: id,
      requestAction: value,
    };
    JobResAction(obj)
      .then((data) => {
        if (value == "Accept") {
          toastMessage("success", "Offer accepted");
        } else {
          toastMessage("success", "Offer rejected");
        }

        let findPostIndx = clone.findIndex((ii) => ii._id == id);
        clone[findPostIndx].requestAction = value;
        setPosts(clone);
      })
      .catch((e) => {
        setOpen(false);
      })
      .finally(() => setOpen(false));
  };

  return (
    <>
      {posts.length > 0 ? (
        <>
          <table className="tableJobList">
            <tr className="respTableJob">
              <th className="thJobList thBack thHeading">#</th>
              <th className="thJobList thBack thHeading">Saloon</th>
              <th className="thJobList thBack thHeading">Roles</th>
              <th className="thJobList thBack thHeading">Job Type</th>
              <th className="thJobList thBack thHeading">Income</th>
              <th className="thJobList thBack thHeading">
                {check ? "Date Request" : "Date Applied"}
              </th>
              <th className="thJobList thBack thHeading">
                {check ? "Offer Status" : "Job Status"}
              </th>
              <th className="thJobList thBack thHeading center">Action</th>
              {/* <th className='thJobList thBack thHeading'>Action</th> */}
            </tr>
            {posts?.map((post, inx) => {
              return (
                <>
                  <tr className="respPosition">
                    <td className="tdJobList tdHeading respList">
                      {currentPage > 1
                        ? (currentPage - 1) * 10 + (inx + 1)
                        : inx + 1}
                    </td>
                    <td className="tdJobList tdHeading respList">
                      <img
                        src={
                          post?.saloon?.avatar
                            ? post?.saloon?.avatar
                            : vectorMan
                        }
                        className="imgMyJob"
                      />
                      {post?.saloon?.Saloon_name}
                    </td>
                    <td className="tdJobList tdHeading respList">
                      {post?.appliedJob?.jobTitle || post?.offerJob?.jobTitle}
                    </td>
                    <td className="tdJobList tdHeading respList">
                      {post?.appliedJob?.jobType || post?.offerJob?.jobType}
                    </td>
                    {post?.appliedJob?.rateType === "Commission" ? (
                      <td className="tdJobList tdHeading respList">
                        {post?.appliedJob?.commisionRate} %
                      </td>
                    ) : post?.offerJob?.commisionRate ? (
                      <td className="tdJobList tdHeading respList">
                        {post?.offerJob?.commisionRate} %
                      </td>
                    ) : (
                      <td className="tdJobList tdHeading respList">
                        {post?.appliedJob?.minRate || post?.offerJob?.minRate}-
                        {post?.appliedJob?.maxRate || post?.offerJob?.maxRate} /
                        hour
                      </td>
                    )}
                    <td className="tdJobList tdHeading respList">
                      {moment(post?.createdAt).format("DD MMM, YYYY")}
                    </td>
                    <td className="tdJobList tdHeading respList">
                      <GiPlainCircle
                        style={
                          post?.requestAction == "Accept"
                            ? { color: "#4CAF50" }
                            : post?.requestAction == "Reject"
                            ? { color: "#F44336" }
                            : { color: "darkorange" }
                        }
                      />{" "}
                      &nbsp;
                      {post?.requestAction == "Accept"
                        ? "Accepted"
                        : post?.requestAction == "Reject"
                        ? "Rejected"
                        : "Pending"}
                    </td>
                    <td className="tdJobList tdHeading respList">
                      {check ? (
                        <>
                          {post?.requestAction != "" ? (
                            <button
                              className={
                                post?.requestAction === "Accept"
                                  ? "btn btnDone me-2 cusbttn Accpt"
                                  : "btn btnDone me-2 cusbttn rejec"
                              }
                            >
                              {post?.requestAction === "Accept"
                                ? "Accepted"
                                : "Rejected"}
                            </button>
                          ) : (
                            <>
                              {" "}
                              <button className="btn btnDone me-2">
                                {Open && ind == inx && typee == "Accept" ? (
                                  <CircularProgress
                                    style={{ color: "#29B57A" }}
                                    className="circulerr actionJob"
                                  />
                                ) : (
                                  <MdOutlineDone
                                    style={{
                                      color: "#29B57A",
                                      marginBottom: "9px",
                                    }}
                                    onClick={() => {
                                      actionPerfome(inx, "Accept", post._id);
                                    }}
                                  />
                                )}
                              </button>
                              <button className="btn btnClose me-2">
                                {Open && ind == inx && typee == "Reject" ? (
                                  <CircularProgress
                                    style={{ color: "#FA4949" }}
                                    className="circulerr actionJob"
                                  />
                                ) : (
                                  <AiOutlineClose
                                    style={{
                                      color: "#FA4949",
                                      marginBottom: "9px",
                                    }}
                                    onClick={() => {
                                      actionPerfome(inx, "Reject", post._id);
                                    }}
                                  />
                                )}
                              </button>
                            </>
                          )}
                          <ModalJob
                            actions={actionPerfome}
                            inx={inx}
                            postId={post._id}
                            check={check}
                            post={post}
                          />
                        </>
                      ) : (
                        // <button className='btn btnViewJob me-2'>View Job</button>
                        <ModalJob post={post} check2 />
                      )}
                      <button className="btn btnReferJob" onClick={handleClick}>
                        Refer Job
                      </button>
                      <button
                        className="btn btnMsginList pop"
                        onClick={() =>
                          handleChat(post, post?.offerJob ? "offer" : "")
                        }
                      >
                        <img src={msgInBlue} />
                        <span className="msgTxt">Message</span>
                      </button>
                    </td>

                    {/* This only appears in responsiveness */}
                    <div className="responsiveTableMyJob respDiv1">
                      <div className="divFirst1">
                        <div>
                          <h1 className="JobRole2 mb-4">
                            {inx + 1}.{" "}
                            {post?.appliedJob?.jobTitle ||
                              post?.offerJob?.jobTitle}
                          </h1>

                          <h1 className="JobRole1">
                            <img
                              src={
                                post?.candidate?.profilePic
                                  ? post?.candidate?.profilePic
                                  : vectorMan
                              }
                              className="imgMyJob"
                            />
                            {post?.saloon?.Saloon_name}
                          </h1>
                        </div>
                        <div></div>
                      </div>
                      <div className="divSecond1">
                        <div>
                          <h1 className="respHeading1">Job Type</h1>
                          <h1 className="JobRole1">
                            {post?.appliedJob?.jobType ||
                              post?.offerJob?.jobType}
                          </h1>
                        </div>
                        <div>
                          <h1 className="respHeading2">
                            {post?.appliedJob?.rateType === "Commission"
                              ? "Commission"
                              : "Salary"}
                          </h1>
                          {post?.appliedJob?.rateType === "Commission" ? (
                            <h1 className="JobRole2">
                              {post?.appliedJob?.commisionRate} %
                            </h1>
                          ) : (
                            <h1 className="JobRole1">
                              {post?.appliedJob?.minRate ||
                                post?.offerJob?.minRate}
                              -
                              {post?.appliedJob?.maxRate ||
                                post?.offerJob?.maxRate}{" "}
                              / hour
                            </h1>
                          )}
                        </div>
                        <div>
                          <h1 className="respHeading1">Date Applied</h1>
                          <h1 className="JobRole1">
                            {" "}
                            {moment(post?.createdAt).format("DD MMM, YYYY")}
                          </h1>
                        </div>
                        <div>
                          <h1 className="respHeading1">Job Status</h1>
                          <h1 className="JobRole1">
                            <GiPlainCircle
                              style={
                                (post?.appliedJob?.jobStatus ||
                                  post?.offerJob?.jobStatus) == jobStatus.Open
                                  ? { color: "#4CAF50" }
                                  : { color: "#F44336" }
                              }
                            />{" "}
                            &nbsp;{" "}
                            {post?.appliedJob?.jobStatus ||
                              post?.offerJob?.jobStatus}
                          </h1>
                        </div>
                      </div>
                      <div style={{ display: "flex" }} className="mb-4">
                        {check ? (
                          <>
                            <button className="btn btnDone me-2">
                              {Open && ind == inx && typee == "Accept" ? (
                                <CircularProgress
                                  style={{ color: "#29B57A" }}
                                  className="circulerr actionJob"
                                />
                              ) : (
                                <MdOutlineDone
                                  style={{
                                    color: "#29B57A",
                                    marginBottom: "9px",
                                  }}
                                  onClick={() => {
                                    actionPerfome(inx, "Accept", post._id);
                                  }}
                                />
                              )}
                            </button>

                            <button className="btn btnClose me-2">
                              {Open && ind == inx && typee == "Reject" ? (
                                <CircularProgress
                                  style={{ color: "#FA4949" }}
                                  className="circulerr actionJob"
                                />
                              ) : (
                                <AiOutlineClose
                                  style={{
                                    color: "#FA4949",
                                    marginBottom: "9px",
                                  }}
                                  onClick={() => {
                                    actionPerfome(inx, "Reject", post._id);
                                  }}
                                />
                              )}
                            </button>
                            <ModalJob
                              inx={inx}
                              postId={post._id}
                              check={check}
                              post={post}
                            />
                          </>
                        ) : (
                          <ModalJob post={post} check={check} />
                        )}
                        <button
                          className="btn btnReferJob"
                          onClick={handleClick}
                        >
                          Refer Job
                        </button>
                        <button
                          className="btn btnMsginList empty"
                          onClick={() =>
                            handleChat(post, post?.offerJob ? "offer" : "")
                          }
                        >
                          <img src={msgJob} />
                          <span className="msgTxt 2">Message</span>
                        </button>
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
              );
            })}
          </table>
        </>
      ) : (
        <p className="tabsHeading">No Record Found</p>
      )}
    </>
  );
};

export default Posts;
