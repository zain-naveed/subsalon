import React, { useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import "./pricing.css";
import { GiDiamonds } from "react-icons/gi";
import { AiFillStar } from "react-icons/ai";
import { star, CutThrough, CutThroughBlack } from "../../../Assets/index";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../../../Shared/Redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Credits from "../../../Pages/Settings/Setting_Modals/Credits";
import { Subscription } from "../../util/constant";
import { loadStripe } from "@stripe/stripe-js";
import Navigation from "../Navbar/navigation";

import {
  CardElement,
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import Stripeee, { CheckoutForm } from "./Stripeee";
// import StripeCheckOut from "react-stripe-checkout"
const stripePromise = loadStripe(
  "pk_live_51KToJjAOwInuazNMGuaVN73HcGDUW8NBue3CIDqVViEzpL2yZUpVtUCXz6imDAnaxVFsQL1MgRLO52hRT3C7Lrv800JwWHmNsT"
);
const Pricing = ({ type, elements, stripe }) => {
  const { user } = useSelector((state) => state.root);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigation = useNavigate();
  const [cardState, setCardState] = useState([]);

  const SelectPackage = () => {
    if (!type) {
      dispatch(
        setUser({
          user: user?.user,
          status: user?.status,
          tokens: user?.tokens,
          sub: true,
        })
      );
      navigation("/professionals/findjob");
    }
  };

  const getCardState = (card, any) => {
    if (cardState.length > 0) {
      let obj = {
        cvc: card.cvc,
        expiryMonth: card.expiryMonth,
        expiryYear: card.expiryYear,
        holder: card.holder,
        customer_id: "Customer_id",
      };
      if (any === "subscribe1") {
        obj["payment"] = Subscription.basicSubscription;
      } else if (any === "subscribe2") {
        obj["payment"] = Subscription.proSubscription;
      } else if (any === "subscribe3") {
        obj["payment"] = Subscription.premSubscription;
      }
      // temp.push(obj);
      setCardState(obj);
    } else {
      let temp = [];
      let obj = {
        cvc: card.cvc,
        expiryMonth: card.expiryMonth,
        expiryYear: card.expiryYear,
        holder: card.holder,
        customer_id: "Customer_id",
      };
      if (any === "subscribe1") {
        obj["payment"] = Subscription.basicSubscription;
      } else if (any === "subscribe2") {
        obj["payment"] = Subscription.proSubscription;
      } else if (any === "subscribe3") {
        obj["payment"] = Subscription.premSubscription;
      }
      // temp.push(obj);
      setCardState(obj);
    }
  };

  return (
    <div className="mt-5">
      {/* {location.pathname == "/subscriptions"  */}
      {user?.user?.isSubscription ? (
        " "
      ) : location.pathname == "/" ? (
        ""
      ) : (
        <Navigation plan />
      )}
      <Container className="contprice">
        <h1 className="priceh1">Affordable pricing plan for you</h1>
        <p className="pricep">
          The application features will be accessible to the Salon Owners and
          Service Providers as per their subscription plans.{" "}
        </p>
      </Container>

      <Container style={{ marginTop: "5rem" }}>
        <Row style={{ marginBottom: "10%" }}>
          <Col className="priceCol" style={{ borderTopLeftRadius: "10px" }}>
            <div className="ColDiv">
              <div style={{ display: "flex" }}>
                <div className="priceSign">$</div>
                <div className="priceTag">11.99</div>
              </div>
              <div className="priceDuration">1 Month</div>
              <div className="priceType">Basic</div>
              {/* <button className='btn btnPrice' onClick={SelectPackage}>Buy Now</button> */}
              {/* <StripeCheckOut
           stripekey = ""
           tokeen=""
           billingAddress
           shippingAddress
           amount="200"
           
           /> */}
              <div className="pb-3">
                <Credits
                  subscribe1
                  subscription={Subscription.basicSubscription}
                  getCardState={getCardState}
                  elements={elements}
                  stripe={stripe}
                />
              </div>
              <div style={{ marginBottom: "15%" }}>
                <p className="priceList">
                  <GiDiamonds style={{ color: "#185781" }} /> Search &amp;
                  Filters
                </p>
                <p className="priceList">
                  <GiDiamonds style={{ color: "#185781" }} />{" "}
                  {user?.user?.role == "owner" ? "Post" : "Apply"} Jobs
                </p>
                <p className="priceList">
                  <GiDiamonds style={{ color: "#185781" }} /> Send Messages
                </p>
                <p className="priceList">
                  <GiDiamonds style={{ color: "#185781" }} /> Reviews
                </p>
              </div>
            </div>
          </Col>
          <Col className="priceCol">
            <div className="ColDiv">
              <div style={{ display: "flex", marginBottom: "-27px" }}>
                <div style={{ display: "flex" }}>
                  <div className="priceSignPre" style={{ color: "#424242" }}>
                    $
                  </div>
                  <div className="priceTagPre" style={{ color: "#424242" }}>
                    60
                  </div>
                </div>
                <div style={{ display: "flex", marginLeft: "10px" }}>
                  {/* <CutThroughBlack id="cutThrough" /> */}
                  <img
                    src={CutThrough}
                    className="cuttingThrough"
                    style={{ marginRight: "-42px" }}
                  />
                  <div className="priceTagPre1" style={{ color: "#424242" }}>
                    $75
                  </div>
                </div>
              </div>

              <div className="priceDuration">6 Months</div>
              <div className="priceType">15% discount</div>
              {/* <button className='btn btnPrice' onClick={SelectPackage}>Buy Now</button> */}
              <div className="pb-3">
                <Credits
                  subscribe2
                  subscription={Subscription.proSubscription}
                  getCardState={getCardState}
                  elements={elements}
                  stripe={stripe}
                />
              </div>
              <div style={{ marginBottom: "15%" }}>
                <p className="priceList">
                  <GiDiamonds style={{ color: "#185781" }} /> Search &amp;
                  Filters
                </p>
                <p className="priceList">
                  <GiDiamonds style={{ color: "#185781" }} />{" "}
                  {user?.user?.role == "owner" ? "Post" : "Apply"} Jobs
                </p>
                <p className="priceList">
                  <GiDiamonds style={{ color: "#185781" }} /> Send Messages
                </p>
                <p className="priceList">
                  <GiDiamonds style={{ color: "#185781" }} /> Reviews
                </p>
              </div>
            </div>
          </Col>
          <Col className="premium">
            <div className="prePackDiv">
              {/* <img src={star} /> */}
              <AiFillStar style={{ color: "white" }} />{" "}
              <h5 className="preTitle">Most Popular</h5>
            </div>
            <div className="ColDiv">
              <div className="yearlyPre">Yearly Plan</div>
              {/* <div className="priceTypePre">30% discount</div> */}
              <div style={{ display: "flex" }}>
                <div style={{ display: "flex" }} className="flex-column">
                  {/* <div className="priceSignPre">$</div> */}
                  <div className="pricePre">First 2 months Free</div>
                  <div className="priceTypePre">Then $100 / every year</div>
                </div>
              </div>
              {/* <button className='btn btnPricePre' onClick={SelectPackage}>Buy Now</button> */}
              <div className="pb-3">
                <Credits
                  subscribe3
                  subscription={Subscription.premSubscription}
                  getCardState={getCardState}
                  elements={elements}
                  stripe={stripe}
                />
              </div>
              <div style={{ marginBottom: "15%" }}>
                <p className="priceListPre">
                  <GiDiamonds style={{ color: "#A9D3EF" }} /> Search &amp;
                  Filters
                </p>
                <p className="priceListPre">
                  <GiDiamonds style={{ color: "#A9D3EF" }} />{" "}
                  {user?.user?.role == "owner" ? "Post" : "Apply"} Jobs
                </p>
                <p className="priceListPre">
                  <GiDiamonds style={{ color: "#A9D3EF" }} /> Send Messages
                </p>
                <p className="priceListPre">
                  <GiDiamonds style={{ color: "#A9D3EF" }} /> Reviews
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
const InjectedCheckoutForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {({ elements, stripe }) => (
          <Pricing elements={elements} stripe={stripe} plan />
        )}
      </ElementsConsumer>
    </Elements>
  );
};

export default InjectedCheckoutForm;
