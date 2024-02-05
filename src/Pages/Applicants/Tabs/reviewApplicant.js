import React, { useState, useEffect } from "react";
import { RiEdit2Line } from "react-icons/ri";
import {
  WriteReview,
  RatingBright,
  RatingDull,
  vectorMan,
} from "./../../../Assets/index";
import ReviewModel from "./Shared/ReviewModel";
import { store } from "../../../Shared/Redux/store";
import { writeReviewService, getReviewService } from "../../../Shared";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";

function ReviewApplicant(props) {
  const { user } = store.getState().root;
  const params = useParams();

  const [loader, setloader] = useState(false);
  const propsdddd = props.candidate;

  const [reviewArr, setReviewArr] = useState([]);
  const [TotalRating, setTotalRating] = useState();

  const handleState = (value) => {
    setloader(true);
    let Obj = {
      ratings: Number(value.rating),
      description: value.review,
    };

    writeReviewService(params.id, Obj)
      .then(({ data: { data } }) => {
        let cloneReview = [...reviewArr];
        cloneReview.push(data);
        setReviewArr(cloneReview);
        setloader(false);
      })
      .catch((err) => {});
    // let temp = [...reviewArr];
    // temp.push(Obj)
    // setReviewArr(temp);
  };

  const getAllApplicantReviews = () => {
    getReviewService(params.id)
      .then(({ data: { data } }) => {
        setReviewArr(data);
        let sumRating = 0;
        data?.map((iitem) => {
          sumRating = iitem.ratings + sumRating;
        });
        let TotalRating = sumRating / data.length;
        TotalRating.toFixed(1);

        setTotalRating(TotalRating.toFixed(1));
        props.reevu(TotalRating.toFixed(1));
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getAllApplicantReviews();
  }, [loader]);

  return (
    <div
      className={
        (user?.user?.subType && user?.user?.subType == "premium") ||
        (user?.user?.subType && user?.user?.subType == "free")
          ? " "
          : ""
      }
    >
      <div style={{ borderBottom: "1px solid #E0E0E0" }}>
        <h1 style={{ marginTop: "7%" }} className="reviewHeading">
          Overall Rating
        </h1>
        <div className="reviewDiv">
          <div className="w-100" style={{ display: "flex" }}>
            <h1 className="ratingNo">
              {TotalRating == "NaN" ? "0" : TotalRating}
            </h1>
            <div style={{ padding: "5% 0% 0% 4%" }}>
              {TotalRating && (
                <Rating
                  name="half-rating-read"
                  value={TotalRating == "NaN" ? 0 : TotalRating}
                  precision={0.5}
                  size="large"
                  readOnly
                />
              )}

              <h1 className="exp2-info">
                based on {reviewArr?.length} reviews
              </h1>
            </div>
          </div>
          <div>
            <ReviewModel
              propsdddd={props.candidate}
              handleState={handleState}
            />
          </div>
        </div>
      </div>

      <div className="reesspo">
        {loader ? (
          <CircularProgress />
        ) : (
          reviewArr?.map((resp) => {
            return (
              <div style={{ borderBottom: "1px solid #E0E0E0" }}>
                <div style={{ display: "flex", marginTop: "5%" }}>
                  <img
                    src={
                      resp.givenBy?.saloon?.avatar
                        ? resp.givenBy?.saloon?.avatar
                        : vectorMan
                    }
                    className="applicantPic1"
                  />
                  <div style={{ margin: "5px 0px 0px 15px" }}>
                    <div style={{ padding: "0% 0% 0% 3%" }}>
                      <div>
                        <h1
                          className="aplicant-name"
                          style={{
                            // paddingLeft: "6%",
                            // paddingTop: "6%",
                            textAlign: "left",
                          }}
                        >
                          {resp.givenBy?.saloon?.Saloon_name}
                        </h1>
                      </div>
                      <Stack spacing={1}>
                        <Rating
                          name="half-rating-read"
                          defaultValue={resp.ratings}
                          precision={0.5}
                          size="large"
                          readOnly
                        />
                      </Stack>
                    </div>
                    <div>
                      <div
                        className="paddingReview"
                        style={{ padding: "16px 0px 0px 10px" }}
                      >
                        <p className="bio">
                          {resp.description}{" "}
                          {/* <span style={{ color: "#2892D7" }}>read more</span> */}
                        </p>
                        <p className="exp2-info" style={{ color: "#BDBDBD" }}>
                          {moment(resp?.createdAt).format("D MMM, YYYY")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="paddingReview"></div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ReviewApplicant;
