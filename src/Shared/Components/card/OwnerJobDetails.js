import React, { useState, useEffect, useLayoutEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Img,
  Filtericon,
  Avatar,
  Vccinate,
  EmptyProfilePicture,
} from "../../../Assets/index";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import "./Ownerrjob.css";
import { AllProffessionalApi } from "../../Services/all_proffessional";
import CircularProgress from "@mui/material/CircularProgress";
import { toastMessage, roleEnum } from "../../../Shared";
import { useSelector, useDispatch } from "react-redux";
import OfferJobModal from "./offerJobModal";
import { setUser } from "../../../Shared/Redux/reducers/userSlice";
import { Spinner } from "react-bootstrap";
import {
  FavProfessionalsApi,
  RevFavProfessionalsApi,
} from "../../../Shared/Services/myFavouriteServices";
import { useNavigate } from "react-router";
import { AllGetApiApplicants } from "../../Services/applicantsApis";

function OwnerJobDeatils(props) {
  const navigate = useNavigate();
  const { landing } = props;

  const { proFilter, filters, setTotalRecord } = props;
  const { user } = useSelector((state) => state?.root);
  let saloonId = user?.user?.saloon._id;

  
  const [fav, setFav] = useState(false);
  const [job, setJob] = useState();
  const [open, setOpen] = useState(false);
  const [offerModal, setOfferModal] = useState(false);
  const [canResp, setcandResp] = useState(null);
  const [array, setArray] = useState();
  const [countss, setcountss] = useState(3);
  const [favLoader, setfavLoader] = useState(null);
  const favProvider = useSelector((state) => state.root.user.user.favProvider);
  const saloonIdProvider = useSelector((state) => state.root.user.user.saloon);
  const [TotalRating, setTotalRating] = useState();
  const [noOfelement, setnoOfelement] = useState(9);
  const [Appllicants, setAppllicants] = useState();

  let slice = job
    ?.map((el) => el)
    .slice(0, !landing ? job?.length : noOfelement);

  const onMoreLoasd = () => {
    setnoOfelement(job?.length);
  };

  const onMoreLoasdSeervices = (index, leength) => {
    let cloneproffessional = [...slice];
    cloneproffessional[index].count = leength;
    setJob(cloneproffessional);
  };
  const onMoreLessSeervices = (index, leength) => {
    let cloneproffessional = [...slice];
    cloneproffessional[index].count = 3;
    setJob(cloneproffessional);
  };
  const userResp = useSelector((state) => state.root.user);
  const dispatch = useDispatch();
  
  const favJOb = (id) => {
    let obj = {
      favProvider: id,
      saloon: saloonIdProvider?._id,
    };
    setfavLoader(id);
    FavProfessionalsApi(obj)
      .then((data) => {
        const { tokens } = userResp;

        let clonResep = {
          tokens,
          user: data.data.data,
        };
        
        dispatch(setUser(clonResep));
        toastMessage("success", "Added to Favourites");
        setfavLoader();
      })
      .catch((e) => {
        toastMessage("error", e.response.data.message);
        setfavLoader();
      })
      .finally(() => setfavLoader(null));
  };
  const RevfavJOb = (id) => {
    let obj = {
      favProvider: id,
      saloon: saloonIdProvider?._id,
    };
    setfavLoader(id);

    RevFavProfessionalsApi(obj)
      .then((data) => {
        const { tokens } = userResp;
        let clonResep = {
          tokens,
          user: data.data.data,
        };
        
        dispatch(setUser(clonResep));
        toastMessage("success", "Removed from Favourites");
        setfavLoader();
      })
      .catch((e) => {
        toastMessage("error", e.response.data.message);
        setfavLoader();
      });
  };

  useEffect(() => {
    setJob();

    setOpen(true);

    getAllJobs();
    AllGetApiApplicants(saloonId, "")
      .then(({ data: { data } }) => {
        
        setAppllicants(data.applicant);
      })
      .catch((e) => {
        toastMessage("error", e);
      });
  }, [
    filters?.search ? filters?.search : "",
    filters?.services,
    filters?.map,
    filters?.rangeSlider,
  ]);

  const getAllJobs = () => {
    if (landing) {
      // 
      AllProffessionalApi()
        .then(({ data: { data } }) => {
          // props.totals(data.length);
          
          setJob(data);
          setOpen(false);
        })
        .catch((e) => {
          setJob();
          setOpen(false);
        });
    } else {
      
      let query = `${
        !filters?.rangeSlider[0] && filters?.rangeSlider[1]
          ? `?min=${filters?.rangeSlider[0]}&max=${filters.rangeSlider[1]}`
          : filters?.rangeSlider[1]
          ? `?min=${filters?.rangeSlider[0]}&max=${filters.rangeSlider[1]}`
          : `?min=${filters?.rangeSlider[0]}&max=${filters.rangeSlider[1]}`
      }${
        !filters?.rangeSlider[0] && !filters?.rangeSlider[1] && filters.search
          ? `?search=${filters.search}`
          : filters?.search
          ? `&search=${filters.search}`
          : ""
      }${
        !filters?.rangeSlider[0] &&
        !filters?.rangeSlider[1] &&
        !filters.search &&
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
        filters.map
          ? `?jobtype=${filters.map}`
          : filters.map
          ? `&jobtype=${filters.map}`
          : ""
      }


`;

      // 
      AllProffessionalApi(query)
        .then(({ data: { data } }) => {
          // props.totals(data.length);
          
          setJob(data);
          props.totals(data.length);
          setOpen(false);
        })
        .catch((e) => {
          setJob();
          setOpen(false);
        });
    }
  };

  const handleClose = () => setOfferModal(false);
  const handleShow = () => setOfferModal(true);
  // const [noOfelement, setnoOfelement] = useState(2);
  // const onMoreLoasd = (index) => {
  //   let clone = [...job]
  //   let couutPluus = job[index].experience.services.length
  //   setcountss(couutPluus)

  //   setJob(clone);
  // };
  const favFunction = (index) => {
    let clone = [...array];
    if (clone[index].favs == true) {
      clone[index].favs = false;
    } else {
      clone[index].favs = true;
    }
    setArray(clone);
  };
  const offerJobforCandidate = (obj) => {
    // 
    // setOfferLaoder(obj?._id)
    setcandResp(obj);
    handleShow();
    // offerJobService
    // setTimeout(() => {
    //   setOfferLaoder(null);
    //
    // }, 3000);
  };

  return (
    <div>
      

      {open ? (
        <div className="centeer">
          <CircularProgress />
        </div>
      ) : (
        <div className="jobcards owner">
          {slice == ""
            ? "No Record Found"
            : slice?.map((item, index) => {
                return (
                  <>
                    
                    <div className="jobcardItems owner">
                      <div
                        className="cliickss"
                        onClick={() => {
                          let idIs = Appllicants.filter((ii) =>
                            ii?.candidate?._id.includes(item?._id)
                          );
                          
                          navigate(`/candidate/${item?._id}`);
                          // if (idIs != "") {
                          //   navigate(`/applicant-info/${item?._id}`);
                          // } else {
                          //   navigate(`/candidate/${item?._id}`);
                          // }
                        }}
                      >
                        <div className="picInfo owner">
                          <div className="info">
                            <div className="infoImg owner">
                              <img
                                src={
                                  item?.profilePic
                                    ? item.profilePic
                                    : EmptyProfilePicture
                                }
                              ></img>
                            </div>
                          </div>
                        </div>
                        <div className="titleName owner">
                          <div className="inffoText">
                            <p className="textone">
                              {item?.name
                                ? item?.name
                                : item?.email?.slice(
                                    0,
                                    item?.email?.indexOf("@")
                                  )}
                            </p>
                            <p className="texttwo">{item?.location?.address}</p>
                          </div>
                        </div>
                      </div>

                      <div className="detailMain owner">
                        {item?.experience?.jobTitle
                          ?.map((el, index) => el)
                          .slice(0, item?.count)
                          .map((items, indexs) => {
                            
                            return (
                              <div className="detailItem owner">
                                <p className="detailone owner">{items}</p>
                              </div>
                            );
                          })}
                        {item?.serviceLength > item?.count &&
                        !item?.serviceLength == 0 &&
                        item?.count != item?.serviceLength ? (
                          <div className="detailItem owner btn">
                            <p
                              className="detailone owner"
                              onClick={() => {
                                onMoreLoasdSeervices(
                                  index,
                                  item?.serviceLength
                                );
                              }}
                            >
                              {"See more"}
                              
                              {
                                (item?.serviceLength > 3 )  ? <span style={{marginLeft:"5px"}}>

                                {item?.serviceLength - item?.count}
                                </span>:""
                              }
                              
                            </p>
                          </div>
                        ) : item?.count == item?.serviceLength &&
                          item?.serviceLength > 3 ? (
                          <div className="detailItem owner btn">
                            <p
                              className="detailone owner"
                              onClick={() => {
                                onMoreLessSeervices(index, item?.serviceLength);
                              }}
                            >
                              {"See less"}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="detailMain">
                        <div className="detailItem">
                          <p className="detailone">Job Type</p>
                          <p className="detailtwo">{item.jobType}</p>
                        </div>
                        <div className="detailItem">
                          <p className="detailone">Hourly Rate</p>
                          <p className="detailtwo">${item.hourRate}/hr</p>
                        </div>

                        <div className="detailItem">
                          <p className="detailone">Reviews</p>
                          <p className="detailtwo">
                            <StarOutlinedIcon className="start_reviews" />{" "}
                            <span className="reviwes">{TotalRating}</span>{" "}
                            <span className="detailone">
                              {item?.reviews.length
                                ? (
                                    item?.reviews.reduce(
                                      (previousValue, currentValue) =>
                                        previousValue + currentValue.ratings,
                                      0
                                    ) / item?.reviews.length
                                  ).toFixed(1)
                                : "0"}
                              {"  "}({item?.reviews?.length})
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="Buttons_applay">
                        <div className="innerbtn">
                          <button
                            className="apllyy minWidth44 width-45 custom-offer-btn"
                            onClick={() => offerJobforCandidate(item)}
                            variant="outlined"
                          >
                            Offer a Job
                          </button>
                          {favProvider.includes(item._id) ? (
                            <div className="favWeb width-45  ">
                              <button
                                className={"favon custom-fav-btn"}
                                variant="outlined"
                                onClick={() => {
                                  RevfavJOb(item._id);
                                }}
                              >
                                <FavoriteIcon />
                                Favorite
                              </button>
                            </div>
                          ) : (
                            <div className="favWeb width-45">
                              {favLoader == item._id ? (
                                <button
                                  style={{ minWidth: "100%" }}
                                  className={
                                    favLoader == item._id
                                      ? "favv loadings custom-fav-btn"
                                      : "favv"
                                  }
                                  variant="outlined"
                                >
                                  {" "}
                                  <Spinner animation="border" role="status">
                                    <span className="visually-hidden">
                                      Loading...
                                    </span>
                                  </Spinner>
                                </button>
                              ) : (
                                <button
                                  className={"favv custom-add-fav-btn"}
                                  variant="outlined"
                                  onClick={() => {
                                    favJOb(item._id);
                                  }}
                                >
                                  <FavoriteIcon />
                                  Add to Favorite
                                </button>
                              )}
                            </div>
                          )}

                          {favProvider.includes(item._id) ? (
                            <div className="favMob">
                              <div className={"favrtonn"}>
                                <FavoriteIcon
                                  onClick={() => {
                                    RevfavJOb(item._id);
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="favMob">
                              <div className={"favrt"}>
                                <FavoriteIcon
                                  onClick={() => {
                                    favJOb(item._id);
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
        </div>
      )}
      {landing && noOfelement != job?.length ? (
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

      <OfferJobModal
        offerModal={offerModal}
        handleClose={handleClose}
        canResp={canResp}
      />
    </div>
  );
}

export default OwnerJobDeatils;
