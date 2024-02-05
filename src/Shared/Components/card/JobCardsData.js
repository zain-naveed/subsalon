import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Img,
  Filtericon,
  Salonimg2,
  user as userr,
} from "../../../Assets/index";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { toastMessage } from "../../../Shared/";

import {
  AllJobsApi,
  FavJobsApi,
  RevFavJobsApi,
  applyJobs,
} from "../../../Shared/Services";
import moment from "moment";
import { setUser } from "../../../Shared/Redux/reducers/userSlice";
import CircularProgressWithLabel from "../../Components/Loader/Loader";
import CircularProgress from "@mui/material/CircularProgress";
import { GiPlainCircle } from "react-icons/gi";
import Modals from "./Modals";
import { Link, useNavigate } from "react-router-dom";

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}
function JobCardsData(props) {
  const { user } = useSelector((state) => state.root);
  
  const { publicJobs, jobfilter, landing } = props;

  const favJobs = useSelector((state) => state.root.user?.user?.favJob);
  const userResp = useSelector((state) => state.root.user);

  // const favJobs = ["6266260a8a2d540991ff1ee2", "6266260a8a2d540991ffdeee1"];
  // 

  let filters = jobfilter;
  

  let neew = "";
  if (filters?.date) {
    neew = moment(filters?.date).format("YYYY/MM/DD");
    
  } else {
    neew = "";
  }

  const dispatch = useDispatch();
  const [proops, setproops] = useState(props.test);
  const [job, setJob] = useState(publicJobs ? publicJobs : []);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectIndx, setSelectedIndx] = useState(0);
  const [show, setShow] = useState(false);
  const [resp, setResp] = useState(null);
  // const [featureddata, setFeatureddata] = useState([]);
  // const [array, setArray] = useState(job);
  const [noOfelement, setnoOfelement] = useState(9);
  const slice = job ?  job?.map((el) => el).slice(0, !landing ? job?.length : noOfelement) : null;
  const onMoreLoasd = () => {
    setnoOfelement(job?.length);
  };
  const debouncedSearchTerm = useDebounce(jobfilter?.search, 999900);
  const handleModalClose = () => setShow(false);
  const handleModalOpen = () => setShow(true);
  useEffect(() => {
    setOpen(true);
    if (props.test) {
      setJob(publicJobs);
      // setnoOfelement(6);
      setOpen(false);
    } else {
      getAllJobs();
    }
  }, [
    publicJobs,
    jobfilter?.search,
    jobfilter?.services,
    jobfilter?.jobtype,
    jobfilter?.rangeSlider,
    neew,
  ]);
  // 

  const getAllJobs = () => {
    setJob();

    let query = `${
      !filters?.rangeSlider[0] && filters?.rangeSlider[1]
        ? `?min=${filters.rangeSlider[0]}&max=${filters.rangeSlider[1]}`
        : filters?.rangeSlider[1]
        ? `?min=${filters.rangeSlider[0]}&max=${filters.rangeSlider[1]}`
        : `?min=${filters.rangeSlider[0]}&max=${filters.rangeSlider[1]}`
    }${
      !filters?.rangeSlider[0] && !filters?.rangeSlider[1] && filters?.jobtype
        ? `?jobType=${filters.jobtype}`
        : filters?.jobtype
        ? `&jobType=${filters.jobtype}`
        : ""
    }${
      !filters?.rangeSlider[0] &&
      !filters?.rangeSlider[1] &&
      !filters.jobtype &&
      filters.search
        ? `?search=${filters.search}`
        : filters?.search
        ? `&search=${filters.search}`
        : ""
    }${
      !filters?.rangeSlider[0] &&
      !filters?.rangeSlider[1] &&
      !filters.search &&
      !filters.jobtype &&
      filters?.services
        ? `?service=${filters.services}`
        : filters?.services
        ? `&service=${filters.services}`
        : ""
    }${
      !filters?.rangeSlider[0] &&
      !filters?.rangeSlider[1] &&
      !filters.search &&
      !filters?.services &&
      !filters.jobtype &&
      neew
        ? `?date=${neew}`
        : neew
        ? `&date=${neew}`
        : ""
    } `;

    
    AllJobsApi(query)
      .then(({ data: { data } }) => {
        props.totals(data.length);
        
        if (data.length > 0) {
          //         debugger
          //         let i;
          //         for(i = 0 ; i <= data.length;i++){
          //           
          //           // data[i].maxRate > data[i+1].maxRate
          //           // let greatee

          // }
          setJob(data);
          // if (props.test == "recent") {
          //   setArray(data);
          //   setnoOfelement(6);
          // } else {
          //   setArray(data);
          //   setnoOfelement(6);
          // }
          // toastMessage("success", "Thank you !");
          setOpen(false);
        } else {
          // toastMessage("error", data.message);
          setOpen(false);
          props.totals(0);
        }
      })
      .catch((e) => {
        
        setJob("");
        props.totals(0);
        setOpen(false);
      });
  };

  const favJOb = (id) => {
    if (userResp?.user?._id) {
      let obj = {
        favJobId: id,
      };
      FavJobsApi(obj)
        .then((data) => {
          const { access_token, user } = userResp;

          let clonResep = {
            access_token,
            user: data.data.data,
          };
          
          dispatch(setUser(clonResep));
          toastMessage("success", "favourite Successfully");
        })
        .catch((e) => {
          toastMessage("error", e.response.data.message);
        });
    } else {
      toastMessage("error", "You are not authenticate, Please Login First!! ");
    }
  };
  const RevfavJOb = (id) => {
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
        toastMessage("error", "Unfavourite Successfully");
      })
      .catch((e) => {
        toastMessage("error", e?.response?.data?.message);
      });
  };
  const apply = (jb) => {
    if (userResp?.user?.isLicensed) {
      let obj = {
        appliedJob: jb?._id,
        saloon: jb?.saloon?._id,
        candidate: userResp?.user?._id,
      };
      setLoader(true);
      applyJobs(obj)
        .then(({ data: { data } }) => {
          let cloneJob = [...job];

          let finJobInx = cloneJob.findIndex((ii) => ii?._id == data?._id);
          if (finJobInx > -1) {
            cloneJob[finJobInx] = data;
          }
          setJob(cloneJob);

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
    <div>
      {open ? (
        <div className="centeer">
          <CircularProgress />
        </div>
      ) : (
        <div className="jobcards jobis">
          {!slice
            ? "No Record Found"
            : slice.map((item, index) => {
                
                return (
                  <>
                    <div
                      className={
                        user?.user?.subType == "free" || user?.user?.trial == "Started_Basic" || user?.user?.trial == "Started_Pro" ||
                        user?.user?.trial == "Started_Prem"
                          ? "jobcardItems"
                          : (user?.user?.role !== "professional" &&
                              user?.user?.role !== "owner") ||
                            user?.user?.subscriptionId.length == 0
                          ? "jobcardItems bluuring"
                          : "jobcardItems"
                      }
                      key={index}
                    >
                      <div className="picInfo">
                        <div className="info">
                          <div className="infoImg">
                            <img
                              className="jobAvatar"
                              src={
                                item?.saloon?.avatar
                                  ? item?.saloon?.avatar
                                  : userr
                              }
                            />
                          </div>
                          <div className="inffoText">
                            <Link to={`/salonDetail/${item?.saloon?._id}`}>
                              <p className="textone">
                                {item?.saloon?.Saloon_name}
                              </p>
                            </Link>
                            <p className="texttwo">
                              {/* {/ {item?.saloon?.about ? item?.saloon?.about : ""} /} */}

                              
                            
                              {item?.saloon?.location?.address
                                ? item?.saloon?.location?.address
                                : ""}

                              {/* {item?.saloon?.location?.address !=
                                "" &&
                                item?.saloon?.location?.coordinates
                                ?.length > 0
                                ? {
                                    locationName: JSON.parse(
                                      item?.saloon?.location
                                    ).address,
                                    coordinates: JSON.parse(
                                      item?.saloon?.location
                                    ).coordinates,
                                  }
                                :""} */}
                            </p>
                          </div>
                        </div>

                        {favJobs?.includes(item._id) ? (
                          <div className={"favrtonn"}>
                            <FavoriteIcon
                              onClick={() => {
                                RevfavJOb(item._id);
                              }}
                            />
                          </div>
                        ) : (
                          <div className={"favrt"}>
                            <FavoriteIcon
                              onClick={() => {
                                favJOb(item._id);
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="titleName">
                        <h3
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setResp(item._id);
                            handleModalOpen();
                          }}
                        >
                          {item?.jobTitle}
                        </h3>
                      </div>
                      {item?.jobType === "Part-time" && item?.NumberOfHours && (
                        <div className="detailMain">
                          <div className="detailItem">
                            <p className="detailone">Working Hours</p>
                            <p className="detailtwo">{`${
                              item?.NumberOfHours ? item?.NumberOfHours : ""
                            } Hours`}</p>
                          </div>
                        </div>
                      )}

                      <div className="detailMain">
                        <div className="detailItem">
                          <p className="detailone">Job Type</p>
                          <p className="detailtwo">{item?.jobType}</p>
                        </div>
                        <div className="detailItem">
                          <p className="detailone">
                            {item?.rateType === "Commission"
                              ? `Commission`
                              : `Salary`}
                          </p>
                          {item?.rateType === "Commission" ? (
                            <p
                              className="detailtwo"
                              style={{ textAlign: "center", display: "block" }}
                            >
                              {item?.commisionRate}%
                            </p>
                          ) : (
                            <p className="detailtwo">
                              ${item?.minRate}-{item?.maxRate} / hour
                            </p>
                          )}
                        </div>
                        {item?.jobType === "Part-time" ? (
                          <>
                            <div className="detailItem">
                              <p className="detailone">Start Date</p>
                              <p className="detailtwo cardP">
                                {item?.jobType === "Part-time"
                                  ? `${moment(item?.startDate).format(
                                      "DD MMM, YYYY"
                                    )}`
                                  : "N/A"}
                              </p>
                            </div>
                            <div className="detailItem">
                              <p className="detailone">End Date</p>
                              <p className="detailtwo cardP">
                                {item?.jobType === "Part-time"
                                  ? `${moment(item?.endDate).format(
                                      "DD MMM, YYYY"
                                    )}`
                                  : "N/A"}
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="detailItem">
                            <p className="detailone">Posted Date</p>
                            <p className="detailtwo cardP">
                              {item?.jobType === "Full-time"
                                ? `${moment(item?.createdAt).format(
                                    "DD MMM, YYYY"
                                  )}`
                                : "- -"}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="statuusMain">
                        <div className="status">
                          {/* <GiPlainCircle
                            style={
                              item.covidCertificate
                                ? { color: "#4CAF50" }
                                : { color: "#EF9D21" }
                            }
                          />
                          <p>
                            {" "}
                            &nbsp;{" "}
                            {item.covidCertificate
                              ? "Covid Certificate Required"
                              : "No Certificate Required"}
                          </p> */}
                        </div>
                        <div className="applybtn">
                          {item?.userApply?.includes(userResp?.user?._id) ? (
                            <Button variant="outlined" disabled={true}>
                              Applied
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              disabled={loader}
                              onClick={() => {
                                setResp(item._id);
                                setSelectedIndx(index);
                                handleModalOpen();
                              }}
                            >
                              Apply Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
        </div>
      )}
      {landing && noOfelement != job.length ? (
        <div className="seall">
          <Button
            className="seeall"
            onClick={() => {
              onMoreLoasd();
            }}
          >
            See all
          </Button>
        </div>
      ) : (
        ""
      )}
      <Modals
        getjobid={resp}
        show={show}
        handleClose={handleModalClose}
        loader={loader}
        jobApply={apply}
        checkJobCard
      />
    </div>
  );
}

export default JobCardsData;
