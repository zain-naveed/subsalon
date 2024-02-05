import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  WriteReview,
  RatingBright,
  RatingDull,
  vectorMan,
} from "./../../../../Assets/index";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { toastMessage } from "../../../../Shared";

function ReviewModel({ handleState, propsdddd }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const { user } = useSelector((state) => state.root);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setRating(e.target.value);
  };

  const SetReview = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = () => {
    if (user?.user?.subType) {
      // if (
      //   user?.user?.subType == "basic" ||
      //   user?.user?.subType == "professional"
      // ) {
      //   // navigate("/Subscriptions");
      //   toastMessage(
      //     "error",
      //     "Change your subcription to Professional in order to give a review"
      //   );
      // } else if (
      //   user?.user?.subType == "premium" ||
      //   user?.user?.subType == "free"
      // ) {
      handleState({
        rating: rating,
        review: review,
      });
      handleClose();
      setReview("");
      setRating("");
      // }
    }
  };

  return (
    <>
      {propsdddd === "candidate" ? (
        ""
      ) : (
        <button className="btn btnRating" onClick={handleShow}>
          {/*<RiEdit2Line />*/}
          <img src={WriteReview} />
          &nbsp;Write a review
        </button>
      )}

      <Modal show={show} className="reviewModal" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 className="SetModalTitle">Write a review</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="SetModalHead">Select rating</h5>
          <Stack spacing={1}>
            <Rating
              name="half-rating"
              defaultValue={0}
              precision={0.5}
              size="large"
              onChange={(e) => handleChange(e)}
            />
          </Stack>
          <h5 className="SetModalHead">Review</h5>
          <textarea
            className="reviewText"
            id="w3review"
            name="w3review"
            rows="4"
            cols="50"
            onChange={(e) => SetReview(e)}
            placeholder="Write Review"
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <button
            disabled={review && rating ? false : true}
            className="btn btnSetModal"
            variant="primary"
            onClick={handleSubmit}
            style={{ width: "100%", margin: "0 auto" }}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReviewModel;
