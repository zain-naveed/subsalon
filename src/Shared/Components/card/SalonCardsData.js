import React, { useState, useEffect, useLayoutEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Img,
  Filtericon,
  Banner,
  Profile,
  EmptyDummy,
  BannersEdiit,
} from "../../../Assets/index";
import Button from "@mui/material/Button";
import { toastMessage } from "../../../Shared/";
import {
  AllSalonsApi,
  FavSaloonsApi,
  RevFavSaloonsApi,
} from "../../../Shared/Services/allSalons";
import CircularProgress from "@mui/material/CircularProgress";
import { setUser } from "../../../Shared/Redux/reducers/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Spinner } from "react-bootstrap";
function SalonCardsData(props) {
  const navigate = useNavigate();
  const favSaloons = useSelector((state) => state.root.user.user.favSaloon);
  const userResp = useSelector((state) => state.root.user);
  const dispatch = useDispatch();

  
  let filters = props.props;
  const [array, setArray] = useState();
  const [open, setOpen] = useState(false);
  const [favLoader, setfavLoader] = useState(null);
  {
    
  }

  useEffect(() => {
    setArray("");
    allSaloon();
  }, [filters?.search, filters?.services, filters?.jobtype]);

  const allSaloon = () => {
    let query = `${filters?.search ? `?search=${filters.search}` : ""}${
      !filters?.search && filters?.services
        ? `?service=${filters.services}`
        : filters.services
        ? `&service=${filters.services}`
        : ""
    }`;

    setOpen(true);
    
    AllSalonsApi(query)
      .then(({ data: { data } }) => {
        props.totals(data.length);
        if (data.length > 0) {
          setOpen(false);
          setArray(data);
        } else {
          // toastMessage("error", "Not found data !");
          setOpen(false);
        }
      })
      .catch((e) => {
        setArray("");
        setOpen(false);
        setOpen(false);
        // toastMessage("error", e.response.data.message);
      });
  };

  const [fav, setFav] = useState(false);
  const favFunction = () => {
    setFav((prev) => !prev);
    
  };
  const favJOb = (id) => {
    let obj = {
      favSalonId: id,
    };
    setfavLoader(id);
    FavSaloonsApi(obj)
      .then((data) => {
        const { tokens } = userResp;

        let clonResep = {
          tokens,
          user: data.data.data,
        };
        
        dispatch(setUser(clonResep));
        toastMessage("success", "Added to Favourites");
      })
      .catch((e) => {
        toastMessage("error", e.response.data.message);
      })
      .finally(() => setfavLoader(null));
  };
  const RevfavJOb = (id) => {
    let obj = {
      favSalonId: id,
    };

    RevFavSaloonsApi(obj)
      .then((data) => {
        const { tokens } = userResp;
        let clonResep = {
          tokens,
          user: data.data.data,
        };
        
        dispatch(setUser(clonResep));
        toastMessage("success", "Removed from Favourites");
      })
      .catch((e) => {
        toastMessage("error", e.response.data.message);
      });
  };
  return (
    <div>
      {open ? (
        <div className="centeer">
          <CircularProgress />
        </div>
      ) : (
        <div className="jobcards">
          {!array
            ? "No Record Found"
            : array?.map((item, index) => {
                
                return (
                  <>
                    <div className="jobcardItems salonitem">
                      <div className="banner">
                        <img
                          src={
                            item?.coverImage ? item?.coverImage : BannersEdiit
                          }
                        ></img>
                        <div className="profilepicc">
                          <img
                            src={item?.avatar ? item?.avatar : EmptyDummy}
                          ></img>
                        </div>
                      </div>

                      <div className="bioInfo">
                        <p className="titles">{item?.Saloon_name}</p>
                        <p className="descrip">{item?.location?.address}</p>
                      </div>
                      <div className="Buttons_applay">
                        <div className="innerbtn">
                          <button
                            className="apllyy custom-offer-btn"
                            onClick={() =>
                              navigate(`/salonDetail/${item?._id}`)
                            }
                            variant="outlined"
                          >
                            View Open Jobs
                          </button>
                          {/* <Link to="/salonDetail" state={{ state: item }}>
                           
                          </Link> */}

                          {favSaloons.includes(item._id) ? (
                            <div className="favWeb">
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
                            <div className="favWeb">
                              {favLoader == item._id ? (
                                <button
                                  className={
                                    favLoader == item._id
                                      ? "favv loadings custom-fav-btn"
                                      : "favv "
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

                          {favSaloons.includes(item._id) ? (
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
    </div>
  );
}

export default SalonCardsData;
