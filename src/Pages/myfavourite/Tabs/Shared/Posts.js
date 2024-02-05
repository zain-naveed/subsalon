import React, { useState } from "react";
import { GiPlainCircle } from "react-icons/gi";
import { vectorMan, SearchIcons, Searchicon } from "./../../../../Assets/index";
import { MdOutlineDone } from "react-icons/md";
import { AiOutlineClose, AiOutlineEye } from "react-icons/ai";
// import ModalJob from "./Jobs_Modal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../../Shared/Redux/reducers/userSlice";
import CircularProgress from "@mui/material/CircularProgress";

import {
  AllJobsApi,
  FavJobsApi,
  RevFavJobsApi,
  applyJobs,
} from "../../../../Shared/Services";

import moment from "moment";
import { jobStatus } from "../../../../Shared/util/constant";
import { toastMessage } from "../../../../Shared";
import { RevFavSaloonsApi } from "../../../../Shared/Services/allSalons";

const Posts = ({
  posts,
  handleSearch,
  setPosts,
  title,
  check,
  favSaloonup,
  ownerFav,
  TotalDoc,
  setTotalDoc,
  indexOfLastPost,
  indexOfFirstPost,
  currentPage,
  setremovePage,
}) => {
  const favJobs = useSelector((state) => state.root.user.user.favJob);
  const favSaloons = useSelector((state) => state.root.user.user.favSaloon);
  const userResp = useSelector((state) => state.root.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [Open, setOpen] = useState(false);
  const [ind, setInd] = useState(-1);

  const RevfavJOb = (inx, id) => {
    setInd(inx);
    setOpen(true);
    let obj = {
      favJobId: id,
    };

    RevFavJobsApi(obj)
      .then((data) => {
        const { access_token, user } = userResp;
        let clonResep = {
          access_token,
          user: data.data.data,
        };

        dispatch(setUser(clonResep));
        toastMessage("success", "Succcessfully Removed from Favourites");
        setremovePage(true);
        let clone = [...posts];
        let findPostIndx = clone.findIndex((ii) => ii?.job?._id == id);
        
        if (findPostIndx > -1) {
          clone.splice(findPostIndx, 1);
          setTotalDoc(TotalDoc - 1);
          setPosts(clone);
        }

        setInd(-1);
        setOpen(false);
      })
      .catch((e) => {
        toastMessage("error", e?.response?.data?.message);
      });
  };
  const RevfavSaloon = (inx, id) => {
    setInd(inx);
    setOpen(true);
    let obj = {
      favSalonId: id,
    };

    RevFavSaloonsApi(obj)
      .then((data) => {
        const { access_token, user } = userResp;
        let clonResep = {
          access_token,
          user: data.data.data,
        };
        
        dispatch(setUser(clonResep));
        setremovePage(true);
        toastMessage("success", "Succcessfully Removed from Favourites");

        let clone = [...posts];
        let findPostIndx = clone.findIndex((ii) => ii.saloon._id == id);
        
        clone.splice(findPostIndx, 1);
        setPosts(clone);
        setTotalDoc(TotalDoc - 1);
        setInd(-1);
        setOpen(false);
      })
      .catch((e) => {
        toastMessage("error", e.response.data.message);
      });
  };

  const handleClick = () => {
    let text = `Hey you might wanna check this post out on OmeGame.\n${window.location.href}`;

    var copyText = text.substr(52, 200);

    navigator.clipboard.writeText(copyText);
    toastMessage("success", "Copied to Clipboard");
  };

  return (
    <>
      <table className="tableJobList">
        <tr className="respTableJob">
          <th className="thJobList thBack thHeading">#</th>
          <th className="thJobList thBack thHeading">
            {check ? "Salon Name" : "Job Title"}
          </th>
          {/* <th className="thJobList thBack thHeading">
            {check ? "Services Provided" : "Job Type"}
          </th> */}
          <th className="thJobList thBack thHeading">
            {check ? "" : "Salary"}
          </th>
          <th className="thJobList thBack thHeading">
            {check ? "Phone no" : "Last Date"}
          </th>
          <th className="thJobList thBack thHeading">
            {check ? "" : "Job Status"}
          </th>
          <th
            className="thJobList thBack thHeading span"
            align="center"
            colSpan={2}
          >
            {check ? "" : "Action"}
          </th>
          {/* <th className='thJobList thBack thHeading'>Action</th> */}
        </tr>
        {posts.map((post, inx) => (
          <>
           
            <tr className="respPosition">
              <td className="tdJobList tdHeading respList">
                {currentPage > 1 ? (currentPage - 1) * 10 + (inx + 1) : inx + 1}
              </td>
              {/* <td className='tdJobList tdHeading respList'><img src={vectorMan} className="imgMyJob" />{post?.saloon?.Saloon_name}</td> : "" */}

              <td className="tdJobList tdHeading respList">
                {check ? (
                  <img
                    src={
                      post?.saloon?.coverImage
                        ? post?.saloon?.coverImage
                        : vectorMan
                    }
                    className="imgMyJob imgFavSalon"
                    style={{ marginLeft: "0px" }}
                  />
                ) : (
                  ""
                )}
                {check ? post?.saloon?.Saloon_name : post?.job?.jobTitle}
              </td>
              {/* <td className="tdJobList tdHeading respList">
                {post?.job?.jobType || post?.saloon?.Salon_Service_Provider}
              </td> */}
              <td className="tdJobList tdHeading respList">
                {check ? "" : post?.job?.minRate}
                {check ? "" : "-"}
                {check ? "" : post?.job?.maxRate} {check ? "" : "/ hour"}
              </td>
              <td className="tdJobList tdHeading respList">
                {check
                  ? post?.saloon?.phoneNumber
                  : moment(post?.job?.jobAvailabilityDate).format(
                      "DD MMM, YYYY"
                    )}
              </td>
              <td className="tdJobList tdHeading respList">
                {check ? (
                  ""
                ) : (
                  <GiPlainCircle
                    style={
                      post?.job?.jobStatus == jobStatus.Open
                        ? { color: "#4CAF50" }
                        : post?.job?.jobStatus == "Re-Open"
                        ? { color: "#2196F3" }
                        : { color: "#F44336" }
                    }
                  />
                )}{" "}
                &nbsp;{check ? "" : post?.job?.jobStatus}
              </td>
              <td className="tdJobList tdHeading respList">
               

                {favSaloonup ? (
                  favSaloons?.includes(post?.saloon?._id) ? (
                    <div className={"favrtonn"}>
                      
                      {Open && ind == inx ? (
                        <CircularProgress
                          style={{ color: "#FA4949" }}
                          className="circulerr actionJob"
                        />
                      ) : (
                        <FavoriteIcon
                          onClick={() => {
                            RevfavSaloon(inx, post.saloon._id);
                          }}
                        />
                      )}
                    </div>
                  ) : (
                    <div className={"favrt"}>
                      <FavoriteIcon />
                    </div>
                  )
                ) : favJobs?.includes(post?.job?._id) ? (
                  <div className={"favrtonn"}>
                    {Open && ind == inx ? (
                      <CircularProgress
                        style={{ color: "#FA4949" }}
                        className="circulerr actionJob"
                      />
                    ) : (
                      <FavoriteIcon
                        onClick={() => {
                          RevfavJOb(inx, post.job._id);
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <div className={"favrt"}>
                    <FavoriteIcon />
                  </div>
                )}
              </td>
              <td className="tdJobList tdHeading respList">
                {check ? (
                  ""
                ) : (
                  <button className="btn btnReferJob" onClick={handleClick}>
                    Refer Job
                  </button>
                )}
              </td>

              {/* This only appears in responsiveness */}
              <div className="responsiveTableMyJob respDiv1">
                <div className="divFirst1">
                  <div>
                    <h1 className="JobRole2 mb-4" style={{ width: "300px" }}>
                      {indexOfFirstPost + 1 + inx}.{" "}
                      {check ? (
                        <img
                          src={
                            post?.saloon?.coverImage
                              ? post?.saloon?.coverImage
                              : vectorMan
                          }
                          className="imgMyJob imgFavSalon"
                        />
                      ) : (
                        ""
                      )}
                      {check ? post?.saloon?.Saloon_name : post?.job?.jobTitle}
                    </h1>

                    {/* <h1 className='JobRole1'><img src={vectorMan} className="imgMyJob" />{post?.saloon?.Saloon_name}</h1> */}
                  </div>
                  <div></div>
                </div>
                <div className="divSecond1">
                  <div>
                    <h1 className="respHeading1">
                      {check ? "Services Provided" : "Job Type"}
                    </h1>
                    <h1 className="JobRole1">
                      {check
                        ? post?.saloon?.Salon_Service_Provider
                        : post?.job?.jobType}
                    </h1>
                  </div>
                  <div>
                    <h1 className="respHeading1">{check ? "" : "Salary"}</h1>
                    <h1 className="JobRole1">
                      {check ? "" : post?.job?.minRate}
                      {check ? "" : "-"}
                      {check ? "" : post?.job?.maxRate} {check ? "" : "/ hour"}
                    </h1>
                  </div>
                  <div>
                    <h1 className="respHeading1">
                      {check ? "Phone no" : "Last Date"}
                    </h1>
                    <h1 className="JobRole1">
                      {" "}
                      {check
                        ? post?.saloon?.phoneNumber
                        : moment(post?.job?.jobAvailabilityDate).format(
                            "DD MMM, YYYY"
                          )}
                    </h1>
                  </div>
                  <div>
                    <h1 className="respHeading1">
                      {check ? "" : "Job Status"}
                    </h1>
                    <h1 className="JobRole1">
                      {check ? (
                        ""
                      ) : (
                        <GiPlainCircle
                          style={
                            (post?.job?.jobStatus ||
                              post?.offerJob?.jobStatus) == jobStatus.Open
                              ? { color: "#4CAF50" }
                              : { color: "#F44336" }
                          }
                        />
                      )}{" "}
                      &nbsp; {post?.job?.jobStatus || post?.offerJob?.jobStatus}
                    </h1>
                  </div>
                </div>
                <div style={{ display: "flex" }} className="mb-4">
                  {favSaloonup ? (
                    favSaloons?.includes(post?.saloon?._id) ? (
                      <div className={"favrtonn"}>
                        {Open && ind == inx ? (
                          <CircularProgress
                            style={{ color: "#FA4949" }}
                            className="circulerr actionJob"
                          />
                        ) : (
                          <FavoriteIcon
                            onClick={() => {
                              RevfavSaloon(inx, post.saloon._id);
                            }}
                          />
                        )}
                      </div>
                    ) : (
                      <div className={"favrt"}>
                        <FavoriteIcon />
                      </div>
                    )
                  ) : favJobs?.includes(post?.job?._id) ? (
                    <div className={"favrtonn"}>
                      {Open && ind == inx ? (
                        <CircularProgress
                          style={{ color: "#FA4949" }}
                          className="circulerr actionJob"
                        />
                      ) : (
                        <FavoriteIcon
                          onClick={() => {
                            RevfavJOb(inx, post.job._id);
                          }}
                        />
                      )}
                    </div>
                  ) : (
                    <div className={"favrt"}>
                      <FavoriteIcon />
                    </div>
                  )}
                  {check ? (
                    ""
                  ) : (
                    <button className="btn btnReferJob" onClick={handleClick}>
                      Refer Job
                    </button>
                  )}
                </div>
              </div>
            </tr>
          
          </>
        ))}
      </table>
    </>
  );
};

export default Posts;
