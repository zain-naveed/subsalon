import React, { useState, useEffect } from "react";
import {
  WriteReview,
  RatingBright,
  RatingDull,
  vectorMan,
} from "../../Assets/index";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import "./review.css";
import { useSelector } from "react-redux";
import { getReviewService } from "../../Shared/index";
import { useParams } from "react-router-dom";
import moment from "moment";
import ReadMoreReact from "read-more-react";

function Index() {
  const userResp = useSelector((state) => state.root.user);

  const [reviewArr, setReviewArr] = useState([]);
  const params = useParams();

  const getAllApplicantReviews = () => {
    getReviewService(userResp.user._id)
      .then(({ data: { data } }) => {
        setReviewArr(data);
        // setReviewArr(data);
        // let sumRating = 0
        // data?.map((iitem) => {
        //   sumRating = iitem.ratings + sumRating
        // })
        // let TotalRating = sumRating / data.length
        // TotalRating.toFixed(1)
        //
        // setTotalRating(TotalRating.toFixed(1))
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getAllApplicantReviews();
  }, []);

  //  const reviewObj = {
  //    name: "",
  //    img: "",
  //    desc: "",
  //    rating: "",
  //    date: ""
  //  }
  // const [name, setName] = useState("")
  // const [img, setImg] = useState("");
  // const [desc, setDesc] = useState("");
  // const [rating, setRating] = useState(null);
  // const [date, setDate] = useState("");

  // const getMyReviews = () => {

  //   getReviews()
  //     .then(({ data: { data } }) => {

  //     })
  //     .catch((err) => {
  //     }).finally(() => setLoader(false))
  // }

  // useEffect(() => {
  //   getMyReviews();
  // });

  let arr = ["", "", ""];
  return (
    <div
      className={
        (userResp?.user?.subType && userResp?.user?.subType == "premium") ||
        (userResp?.user?.subType && userResp?.user?.subType == "free")
          ? "container"
          : "container"
      }
    >
      {reviewArr.length > 0 ? (
        reviewArr.map((item, inx) => {
          return <ReviewItem item={item} key={inx} />;
        })
      ) : (
        <div className="noReview">No reviews found !</div>
      )}
    </div>
  );
}
const ReviewItem = ({ item }) => {
  const userResp = useSelector((state) => state.root.user);
  const [elipses, setElipses] = useState(false);
  const [value, setValue] = React.useState(item?.ratings ? item?.ratings : 0);
  const [name, setName] = useState(
    item?.givenBy?.saloon?.Saloon_name ? item?.givenBy?.saloon?.Saloon_name : ""
  );
  const [description, setDescription] = useState(
    item?.description ? item?.description : ""
  );
  const [avatar, setAvatar] = useState(
    item?.givenBy?.saloon?.avatar ? item?.givenBy?.saloon?.avatar : null
  );
  const [created, setCreated] = useState(
    item?.createdAt ? item?.createdAt : ""
  );

  const ReadMore = () => {
    setElipses(!elipses);
  };

  return (
    <div style={{ borderBottom: "1px solid #E0E0E0" }}>
      <div style={{ display: "flex" }}>
        <img src={avatar ? avatar : vectorMan} className="applicantPic1" />
        <div style={{ paddingLeft: "4%", paddingTop: "10px" }}>
          <div>
            <h1
              className="aplicant-name"
              style={{
                paddingLeft: "6%",
                paddingTop: "6%",
                textAlign: "inherit",
              }}
            >
              {name}
            </h1>
          </div>
          <div style={{ width: "140px", marginLeft: "4%" }}>
            <Stack spacing={1}>
              <Rating
                name="half-rating-read"
                defaultValue={value}
                precision={0.5}
                size="large"
                readOnly
              />
            </Stack>
            {/* <Box >
            <Rating name="read-only" value={value} readOnly />
          </Box> */}
            {/* <img style={{ marginRight: "4%" }} src={RatingBright} />
          <img style={{ marginRight: "4%" }} src={RatingBright} />
          <img style={{ marginRight: "4%" }} src={RatingBright} />
          <img style={{ marginRight: "4%" }} src={RatingBright} />
          <img style={{ marginRight: "4%" }} src={RatingDull} /> */}
          </div>
        </div>
      </div>
      <div className="paddingReview">
        {/* <p className={elipses ? "bio" : "bio ellipseAtBio"}>{description}</p> */}
        <p>
          <ReadMoreReact className="seemore" text={description} />
        </p>

        {/* <button style={{ background: "none", border: "none" }} className="mb-3">
        <span onClick={() => ReadMore()} style={{ color: "#2892D7", marginLeft: "-5px" }}>{elipses ? "read less" : "read more"}</span>
      </button> */}
        <p className="exp2-info" style={{ color: "#BDBDBD" }}>
          {moment(created).format("D MMMM YYYY")}
        </p>
      </div>
    </div>
  );
};

export default Index;
