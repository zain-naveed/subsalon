import React, { useState } from "react";
import { GiPlainCircle } from "react-icons/gi";
import { vectorMan, SearchIcons, Searchicon } from "./../../../Assets/index";
import { MdOutlineDone } from "react-icons/md";
import { AiOutlineClose, AiOutlineEye } from "react-icons/ai";
// import ModalJob from "./Jobs_Modal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../Shared/Redux/reducers/userSlice";
import CircularProgress from "@mui/material/CircularProgress";

import {
  AllJobsApi,
  FavJobsApi,
  RevFavJobsApi,
  applyJobs,
} from "../../../Shared/Services";

import moment from "moment";
import { jobStatus } from "../../../Shared/util/constant";
import { toastMessage } from "../../../Shared";
import { RevFavSaloonsApi } from "../../../Shared/Services/allSalons";
import { RevFavProfessionalsApi } from "../../../Shared/Services/myFavouriteServices";

const OwnerFavsTab = ({
  posts,
  handleSearch,
  setPosts,
  title,
  check,
  favSaloonup,
  ownerFav,
  TotalDoc,
  setTotalDoc,
  indexOfFirstPost,
  setremovePage,
  currentPage,
}) => {
  const favJobs = useSelector((state) => state.root.user.user.favJob);
  const favProvider = useSelector((state) => state.root.user.user.favProvider);
  const saloonIdProvider = useSelector(
    (state) => state.root.user?.user?.saloon._id
  );

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
        setremovePage(true);
        dispatch(setUser(clonResep));
        toastMessage("success", "Succcessfully Removed from Favourites");

        let clone = [...posts];
        let findPostIndx = clone.findIndex((ii) => ii?.job?._id == id);
        
        if (findPostIndx > -1) {
          clone.splice(findPostIndx, 1);

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
        toastMessage("success", "Succcessfully Removed from Favourites");

        let clone = [...posts];
        let findPostIndx = clone.findIndex((ii) => ii.saloon._id == id);
        
        clone.splice(findPostIndx, 1);
        setTotalDoc(TotalDoc - 1);
        setPosts(clone);
        setInd(-1);
        setOpen(false);
      })
      .catch((e) => {
        toastMessage("error", e.response.data.message);
      });
  };

  const RevfavProffessional = (inx, id) => {
    setInd(inx);
    setOpen(true);
    let obj = {
      favProvider: id,
      saloon: saloonIdProvider,
    };

    RevFavProfessionalsApi(obj)
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
        
        // debugger
        // let findPostIndx = clone.findIndex((ii) => ii.favourites._id == id);
        // 
        clone.splice(inx, 1);
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
          <th className="thJobList thBack thHeading">{"Fav Name"}</th>
          <th className="thJobList thBack thHeading">{"jobType"}</th>
          <th className="thJobList thBack thHeading">{"hourRate"}</th>
          <th className="thJobList thBack thHeading">{"Date"}</th>
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
                <img
                  src={post?.saloon?.avatar ? post?.saloon?.avatar : vectorMan}
                  className="imgMyJob imgFavSalon"
                  style={{ marginLeft: "0px" }}
                />
                {post?.favProvider?.name
                  ? post?.favProvider?.name
                  : post?.favProvider?.email?.slice(
                      0,
                      post?.favProvider?.email?.indexOf("@")
                    )}
              </td>
              <td className="tdJobList tdHeading respList">
                {post?.favProvider?.jobType}
              </td>
              <td className="tdJobList tdHeading respList">
                {post?.favProvider?.hourRate}
              </td>
              <td className="tdJobList tdHeading respList">
                {moment(post?.favProvider?.updatedAt).format("DD MMM, YYYY")}
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
                  favProvider?.includes(post?.favProvider?._id) ? (
                    <div className={"favrtonn"}>
                      
                      {Open && ind == inx ? (
                        <CircularProgress
                          style={{ color: "#FA4949" }}
                          className="circulerr actionJob"
                        />
                      ) : (
                        <FavoriteIcon
                          onClick={() => {
                            RevfavProffessional(inx, post.favProvider._id);
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
              <td className="tdJobList tdHeading respList"></td>

              {/* This only appears in responsiveness */}
              <div className="responsiveTableMyJob respDiv1">
                <div className="divFirst1">
                  <div>
                    <h1 className="JobRole2 mb-4" style={{ width: "300px" }}>
                      {inx + 1}.{" "}
                      {check ? (
                        <img
                          src={
                            post?.saloon?.avatar
                              ? post?.saloon?.avatar
                              : vectorMan
                          }
                          className="imgMyJob imgFavSalon"
                        />
                      ) : (
                        ""
                      )}
                      {post?.favProvider?.name
                        ? post?.favProvider?.name
                        : post?.favProvider?.email?.slice(
                            0,
                            post?.favProvider?.email?.indexOf("@")
                          )}
                    </h1>

                    {/* <h1 className='JobRole1'><img src={vectorMan} className="imgMyJob" />{post?.saloon?.Saloon_name}</h1> */}
                  </div>
                  <div></div>
                </div>
                <div className="divSecond1">
                  <div>
                    <h1 className="respHeading1">{"Job Type"}</h1>
                    <h1 className="JobRole1">{post?.favProvider?.jobType}</h1>
                  </div>
                  <div>
                    <h1 className="respHeading1">{"hour Rate"}</h1>
                    <h1 className="JobRole1">{post?.favProvider?.hourRate}</h1>
                  </div>
                  <div>
                    <h1 className="respHeading1">{"Date"}</h1>
                    <h1 className="JobRole1">
                      {" "}
                      {moment(post?.favProvider?.updatedAt).format(
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
                    favProvider?.includes(post?.favProvider?._id) ? (
                      <div className={"favrtonn"}>
                        {Open && ind == inx ? (
                          <CircularProgress
                            style={{ color: "#FA4949" }}
                            className="circulerr actionJob"
                          />
                        ) : (
                          <FavoriteIcon
                            onClick={() => {
                              RevfavSaloon(inx, post.favProvider._id);
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
                </div>
              </div>
            </tr>
          
          </>
        ))}
      </table>
    </>
  );
};

export default OwnerFavsTab;
