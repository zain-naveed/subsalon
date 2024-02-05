import React, { useEffect, useState } from "react";
import "./Notification.css";
import { Toast, Card } from "react-bootstrap";
import { user } from "../../Assets/index";
import fake from "./fake";
import moment from "moment";
import { getAllNotification } from "../../Shared";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../Shared/Redux/reducers/notReducer";
import { useNavigate } from "react-router";
import {
  Img,
  Filtericon,
  Salonimg2,
  user as userr,
  EmptyProfilePicture,
} from "../../../src/Assets/index";
import {
  AllJobsApi,
  FavJobsApi,
  RevFavJobsApi,
  applyJobs,
} from "../../Shared/Services";
import Modals from "../../Shared/Components/card/Modals";
import { readAllnotifyApi } from "../../Shared/Services/notification";
import { Spinner } from "react-bootstrap";
import { toastMessage } from "../../../src/Shared";

function Notification(props) {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { chat, user, notfy } = useSelector((state) => state.root);
  const [allNotfy, setAllNoty] = useState([]);
  const [selectIndx, setSelectedIndx] = useState(0);
  const [show, setShow] = useState(false);
  const [resp, setResp] = useState(null);
  const { publicJobs, jobfilter, landing } = props;
  const [job, setJob] = useState(publicJobs ? publicJobs : []);
  const [getjobid, setGetjobid] = useState();
  const [loading, setLoading] = useState(false);
  const [isAnnouncemnt, setIsAnnouncement] = useState(false);
  const navigate = useNavigate();

  const handleChat = () => {
    if (user?.user?.subType) {
      // if (user?.user?.subType == "basic") {
      //     toastMessage(
      //       "error",
      //       "Please upgrade your subscription to Professional or Premium in order to send or recieve messages"
      //     );

      // } else if (
      //   user?.user?.subType == "professional" ||
      //   user?.user?.subType == "free" ||
      //   user?.user?.subType == "premium"
      // ) {
      navigate("/chat");
      // }
    } else {
      toastMessage("error", "Please buy a subscription");
    }
  };

  const handleModalOpenJob = (id) => {
    setGetjobid(id);
    setIsAnnouncement(false);
    setShow(true);
  };

  const handleModalOpenAnn = (announcement) => {
    setResp(announcement);
    setIsAnnouncement(true);
    setShow(true);
  };
  const handleModalClose = () => setShow(false);
  const userResp = useSelector((state) => state.root.user);

  useEffect(() => {
    setLoading(true);

    getAllNotification()
      .then(({ data: { data } }) => {
        setLoading(false);
        dispatch(setNotification({ notify: false }));
        if (allNotfy.length < 0) {
        } else {
          readAllnotifyApi()
            .then((data) => {})
            .catch((err) => {});
          setAllNoty(data);
        }
      })
      .catch((err) => {});
    setJob(publicJobs);
  }, [
    notfy.notify,
    publicJobs,
    jobfilter?.search,
    jobfilter?.services,
    jobfilter?.jobtype,
    jobfilter?.rangeSlider,
  ]);

  const apply = (jb) => {
    let obj = {
      appliedJob: jb?._id,
      saloon: jb?.saloon?._id,
      candidate: userResp?.user?._id,
    };
    // setLoader(true);
    applyJobs(obj).then(({ data: { data } }) => {
      let cloneJob = [...job];

      let finJobInx = cloneJob.findIndex((ii) => ii?._id == data?._id);
      if (finJobInx > -1) {
        cloneJob[finJobInx] = data;
      }
      setJob(cloneJob);

      // setLoader(false);
      // handleModalClose();
      // toastMessage("success", "Successfully Apply Job");
    });
    // .catch((e) => {
    //   toastMessage("error", e?.response?.data?.message);
    // })
    // .finally(() => setLoader(false));
  };
  const handleClickOnName = (val) =>
    navigation(
      val?.senderId?.role == "owner"
        ? `/salonDetail/${val?.senderId?.saloon?._id}`
        : val?.senderId?.role == "professional"
        ? `/applicant-info/${val?.senderId?._id}`
        : `/profile`,
      { state: "checkNotify" }
    );
  return (
    <div className="notification">
      {loading ? (
        <div
          className={
            allNotfy.length == 0 ? "notifi_body2 center" : "notifi_body center"
          }
        >
          <div className="notifi_text noooti ">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </div>
      ) : (
        <div className={allNotfy.length == 0 ? "notifi_body2" : "notifi_body"}>
          <div className="notifi_text">
            <div className="notifi_text1">Notification </div>
            <div className="notifi_text2">
              {"\u00a0\u00a0"}
              {allNotfy.length}
            </div>
          </div>
          {allNotfy && allNotfy?.length
            ? allNotfy.map((val, index) => {
                return (
                  <>
                    <Card style={{ width: "562px" }}>
                      <div className="cards">
                        <Card.Body>
                          <div className="card_bodys">
                            <div className="card_bodys_avtar">
                              <Card.Text>
                                {val?.senderId?.role == "owner" ? (
                                  <img
                                    src={
                                      val?.senderId?.saloon?.avatar
                                        ? val?.senderId?.saloon?.avatar
                                        : EmptyProfilePicture
                                    }
                                    style={{
                                      width: "48px",
                                      height: "48px",
                                      borderRadius: "25px",
                                      objectFit: "cover",
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={
                                      val?.senderId?.profilePic
                                        ? val?.senderId?.profilePic
                                        : EmptyProfilePicture
                                    }
                                    style={{
                                      width: "48px",
                                      height: "48px",
                                      borderRadius: "25px",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Card.Text>
                            </div>
                            <div className="card_divs">
                              <div style={{ display: "flex" }}>
                                <div
                                  className="card_span1"
                                  style={
                                    val?.senderId?.role === "admin"
                                      ? {}
                                      : { cursor: "pointer" }
                                  }
                                  onClick={() => {
                                    val?.senderId?.role !== "admin" &&
                                      handleClickOnName(val);
                                  }}
                                >
                                  {val?.senderId?.role == "owner"
                                    ? val?.senderId?.saloon?.Saloon_name
                                    : val?.senderId?.name}
                                </div>
                                {val?.type === "chat" ? (
                                  <div className="card_span2">
                                    sent you a message.
                                  </div>
                                ) : val?.type === "chat-pic" ? (
                                  <div className="card_span2">sent you an</div>
                                ) : (
                                  <div className="card_span2"> {val?.text}</div>
                                )}
                                {val.type == "view" ? (
                                  ""
                                ) : val?.jobId ? (
                                  val?.type === "request" ? (
                                    <span
                                      className="card_span3"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setResp(val);
                                        setSelectedIndx(index);
                                        navigation("/my-jobs", {
                                          state: "job-offer",
                                        });
                                      }}
                                    >
                                      {val?.jobId?.jobTitle}
                                    </span>
                                  ) : (
                                    <span
                                      className="card_span3"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setResp(val);
                                        setSelectedIndx(index);
                                        handleModalOpenJob(val?.jobId?._id);
                                      }}
                                    >
                                      {val?.jobId?.jobTitle}
                                    </span>
                                  )
                                ) : val?.announcement ? (
                                  <span
                                    className="card_span3"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      handleModalOpenAnn(val?.announcement);
                                    }}
                                  >
                                    Announcement.
                                  </span>
                                ) : val?.reviewId ? (
                                  <span className="card_span3">
                                    {val?.reviewId?.ratings}
                                  </span>
                                ) : val?.type === "chat" ? (
                                  <span
                                    className="card_span3"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      handleChat();
                                    }}
                                  >
                                    {val?.text}
                                  </span>
                                ) : val?.type === "chat-pic" ? (
                                  <span
                                    className="card_span3"
                                    style={{ cursor: "pointer" }}
                                    onClick={handleChat}
                                  >
                                    {" Attachment."}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div>
                                <Card.Text>
                                  <span className="card_span4">
                                    {val.type == "view"
                                      ? "Profile View"
                                      : val.type === "announcement"
                                      ? "Admin Notification"
                                      : val.type === "rating"
                                      ? "Rating Notification"
                                      : val.type === "chat"
                                      ? "Chat Notification"
                                      : "Job Notification"}
                                  </span>{" "}
                                  <span className="card_span5">
                                    • {moment(val?.createdAt).fromNow()}
                                  </span>
                                </Card.Text>
                              </div>
                            </div>
                            <div>
                              <span>{val.status}</span>
                            </div>
                          </div>
                        </Card.Body>
                      </div>
                    </Card>
                  </>
                );
              })
            : "No Notificaiton Found!"}
        </div>
      )}
      <Modals
        response={resp}
        show={show}
        handleClose={handleModalClose}
        // loader={loader}
        getjobid={getjobid}
        jobApply={apply}
        announcement={isAnnouncemnt}
      />
    </div>
  );
}

export default Notification;
