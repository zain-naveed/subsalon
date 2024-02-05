import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import "../Settings.css";
import CreditCardInput from "react-credit-card-input";
import { toastMessage } from "../../../Shared";
import CircularProgress from "@mui/material/CircularProgress";
import { Spinner } from "react-bootstrap";
import {
  addCardService,
  createSubscriptionService,
  trialType,
} from "../../../Shared/Services/subscription.service";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../Shared/Redux/reducers/userSlice";
import { GiCheckMark } from "react-icons/gi";
import { Subscription } from "../../../Shared/util/constant";
import { updateSubscriptionServices } from "../../../Shared/Services/subscription.service";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  ElementsConsumer,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { FaBullseye } from "react-icons/fa";
import { toast } from "react-toastify";
import DoneSubmitBtn from "../../chat/assets/Done.png";

// elements,stripe

function Credits({
  subscription,
  getCardState,
  subscribe1,
  subscribe2,
  subscribe3,
  elements,
  stripe,
  getAllDebits,
  againprimee,
  ccardslenght,
}) {
  const navigate = useNavigate();
  const trailBase = false;
  const { user } = useSelector((state) => state.root);
  
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [popup, setPopup] = useState(false);
  const [check, setCheck] = useState({
    cardNo: false,
    cvc: false,
    exp: false,
  });
  const [state, setState] = useState({
    stateErrors: {},
  });
  const [cardDetail, setCardDetail] = useState("");
  const [cardNo, setCardNo] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [subCheck, setSubCheck] = useState({
    BasicSub: false,
    ProSub: false,
    PremSub: false,
  });
  const [cvc, setCVC] = useState(null);
  const [obj, setObj] = useState({
    holder: "",
    cardNo: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
  });
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function navigateeesProvideer() {
    await delay(4000);
    navigate("/profile");
    setLoader(false);
    handleClose();
    againprimee("", ccardslenght - 1);
  }
  async function navigateeesOwner() {
    await delay(4000);
    navigate("/salon-settings");
    setLoader(false);
    handleClose();
    againprimee("", ccardslenght - 1);
  }

  const trialFunction = (e) => {
    debugger
    if (e) {
      let value = e.target.name;
      let type = "";
      if (value === "BasicSub") {
        type = "Started_Basic";
      } else if (value === "ProSub") {
        type = "Started_Pro";
      }else{
        type = "Started_Prem";
      }
      let obj = {
        trial_type: type,
      };
      setBtnLoader(true);
      trialType(obj)
        .then(({ data }) => {
          
          dispatch(
            setUser({
              user: data?.data,
              status: user?.status,
              tokens: user?.tokens,
              sub: user?.sub,
            })
          );
          toastMessage("success", data?.msg);
          if (data?.role == "professional") {
            setShow(true);
            setSubCheck({
              ...subCheck,
              [e.target.name]: true,
            });
            setPopup(true);
            navigateeesProvideer();
          } else {
            setShow(true);
            setSubCheck({
              ...subCheck,
              [e.target.name]: true,
            });
            setPopup(true);
            navigateeesOwner();
          }
        })
        .catch((e) => {
          toastMessage("error", e?.response?.data?.message);
        })
        .finally(() => setBtnLoader(false));
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    debugger
    if (Object.keys(user?.user).length) {
      if (e.target.name == "add") {
        setShow(true);
        setSubCheck({
          ...subCheck,
          [e.target.name]: true,
        });
      } else {
        if (user?.user?.subscriptionId) {
          let updateObj = {
            subscrptnId: user?.user?.subscriptionId,
            customer: user?.user?.customer,
          };

          if (e.target.name == "BasicSub") {
            updateObj["price"] = Subscription.basicSubscription;
            updateObj["subType"] = "basic";
          } else if (e.target.name == "ProSub") {
            updateObj["price"] = Subscription.proSubscription;
            updateObj["subType"] = "professional";
          } else {
            updateObj["price"] = Subscription.premSubscription;
            updateObj["subType"] = "premium";
          }

          setBtnLoader(true);
          updateSubscriptionServices(updateObj)
            .then(({ data }) => {
              dispatch(
                setUser({
                  user: data?.data,
                  status: user?.status,
                  tokens: user?.tokens,
                  sub: user?.sub,
                })
              );
              toastMessage("success", data?.msg);
            })
            .catch((e) => {})
            .finally(() => setBtnLoader(false));
        } else {
          setShow(true);
          setSubCheck({
            ...subCheck,
            [e.target.name]: true,
          });
        }
      }
    } else {
      toastMessage("error", "First you login must");
    }
  };

  const handleCardNumberChange = (e) => {
    setCardNo(e.target.value);
    obj["cardNo"] = e.target.value;
  };

  const handleChange = (e) => {
    setObj({
      ...obj,
      [e.target.name]: e.target.value,
    });
  };

  const Closing = () => {
    setLoader(false);
    setShow(false);
  };

  const handleSubmit = async () => {
    setLoader(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    
    const cardElement = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      
    } else {
      const { token } = await stripe.createToken(cardElement);
      
      
      let objPayment = {
        pm_last_four: paymentMethod.card.last4,
        paymentMethod: token.card.id,
        brand: token.id,
      };
      addCardService(objPayment)
        .then(({ data }) => {
          
          if (user.user.isSubscription) {
            getAllDebits();
          }
          if (subscription) {
            let subBody = {
              customer: data?.data?.customer,
              paymentMethod: objPayment.paymentMethod,
              price: subscription,
            };

            if (subCheck.BasicSub) {
              subBody["subType"] = "basic";
            } else if (subCheck.ProSub) {
              subBody["subType"] = "professional";
            } else if (subCheck.PremSub) {
              subBody["subType"] = "premium";
            }
            createSubscriptionService(subBody)
              .then(({ data: { data } }) => {
                
                let obj = {
                  tokens: user?.tokens,
                  status: user?.status,
                  user: data,
                };
                dispatch(setUser(obj));
                if (data?.role == "professional") {
                  setPopup(true);
                  navigateeesProvideer();
                } else {
                  setPopup(true);
                  navigateeesOwner();
                }
              })
              .catch((err) => {
                toastMessage("error", err?.response?.data?.message);
              })
              .finally(() => setLoader(false));
          } else {
            dispatch(
              setUser({
                user: data?.data,
                status: user.status,
                tokens: user.tokens,
              })
            );
            setLoader(false);
            handleClose();
            againprimee("", ccardslenght - 1);
            toastMessage("success", data.msg);
          }
          setObj({
            holder: "",
            cardNo: "",
            expiryMonth: "",
            expiryYear: "",
            cvc: "",
          });
        })
        .catch((err) => {
          setLoader(false);
          toastMessage("error", err?.response?.data?.message);
          setShow(false);
        });
    }
  };
  const handlePayment_InputChange = (name, label) => (elementData) => {
    //store values
    
    let stateErrors = state.stateErrors || {};

    

    if (!elementData.complete && !elementData.error) {
      stateErrors[name] = `Your ${label} is incomplete or invalid.`;
    } else if (elementData.complete && !elementData.error) {
      delete stateErrors[name];
    }

    setState({
      ...state,
      stateErrors,
    });
  };

  return (
    <>
      {subscribe1 ? (
        user?.user?.subType == "basic" ? (
          <>
            {user?.user?.trial === "Started_Basic" ? (
              <button name="BasicSub" className="btn btnPrice">
                <>
                  <GiCheckMark /> Basic Trial
                </>
              </button>
            ) : (
              <button name="BasicSub" className="btn btnPrice">
                <GiCheckMark /> Subcribed
              </button>
            )}
          </>
        ) : (
          <>
            {user?.user?.trial === "Not_Started" ||
            user?.user?.trial === "Started_Pro"||
            user?.user?.subType == "premium" ? (
              <button
                name="BasicSub"
                className="btn btnPrice"
                onClick={(e) => trialFunction(e)}
              >
                {btnLoader ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  // "Start your 2 month's free trial"
                  // "Try risk free for 2 months"
                  <> <span>
                  Try risk free for 2 months
                  </span>
                  <br></br>
                  <span>
                  No financial information required
                  </span>
                  </>
                )}
              </button>
            ) : user?.user?.trial === "Started_Basic" ? (
              <button name="BasicSub" className="btn btnPrice">
                <>
                  <GiCheckMark /> Basic Trial
                </>
              </button>
            ) : user?.user?.trial === "Ended" ? (
              <button
                name="BasicSub"
                className="btn btnPrice"
                onClick={(e) => handleShow(e)}
              >
                {btnLoader ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Buy Now"
                )}
              </button>
            ) : (
              <button
                name="BasicSub"
                className="btn btnPrice"
                onClick={(e) => handleShow(e)}
              >
                {btnLoader ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Buy Now"
                )}
              </button>
            )}
          </>
        )
      ) : subscribe2 ? (
        user?.user?.subType == "professional" ? (
          <>
            {user?.user?.trial === "Started_Pro" ? (
              <button name="BasicSub" className="btn btnPrice">
                <>
                  <GiCheckMark /> Professional Trial
                </>
              </button>
            ) : (
              <button name="BasicSub" className="btn btnPrice">
                <GiCheckMark /> Subcribed
              </button>
            )}
          </>
        ) : (
          <>
            {user?.user?.trial === "Not_Started" ||
            user?.user?.trial === "Started_Basic"||
            user?.user?.subType == "premium" ? (
              <button
                name="ProSub"
                className="btn btnPrice"
                onClick={(e) => trialFunction(e)}
              >
                {btnLoader ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  // "Start your 2 month's free trial"
                  // "Try risk free for 2 months"
                  <> <span>
                  Try risk free for 2 months
                  </span>
                  <br></br>
                  <span>
                  No financial information required
                  </span>
                  </>
                )}
              </button>
            ) : user?.user?.trial === "Started_Pro" ? (
              <button name="ProSub" className="btn btnPrice">
                <>
                  <GiCheckMark /> Basic Trial
                </>
              </button>
            ) : user?.user?.trial === "Ended" ? (
              <button
                name="ProSub"
                className="btn btnPrice"
                onClick={(e) => handleShow(e)}
              >
                {btnLoader ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Buy Now"
                )}
              </button>
            ) : (
              <button
                name="ProSub"
                className="btn btnPrice"
                onClick={(e) => handleShow(e)}
              >
                {btnLoader ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Buy Now"
                )}
              </button>
            )}
          </>
        )
      ) : subscribe3 ? (
        user?.user?.subType == "premium" ? (<>
 
            {user?.user?.trial === "Started_Prem" ? (
              <button name="BasicSub" className="btn btnPrice">
                <>
                  <GiCheckMark /> Premium Trial
                </>
              </button>
            ) : (
              <button name="BasicSub" className="btn btnPrice">
                <GiCheckMark /> Subcribed
              </button>
            )}
          
          {/* <button name="BasicSub" className="btn btnPricePre">
            <GiCheckMark /> Subcribed
          </button> */}
          </>
        ) : (<>

<>
            {user?.user?.trial === "Not_Started" ||
            user?.user?.trial === "Started_Basic" ||
            user?.user?.trial === "Started_Pro" ? (
              <button
              name="PremSub"
              className="btn btnPricePre"
                onClick={(e) => trialFunction(e)}
              >
                {btnLoader ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  // "Start your 2 month's free trial"
                  // "`{"Try risk free for 2 months" "<br>sasddsdsa"}`"
                 <> <span>
                  Try risk free for 2 months
                  </span>
                  <br></br>
                  <span>
                  No financial information required
                  </span>
                  </>
                )}
              </button>
            ) : user?.user?.trial === "Started_Pro" ? (
              <button name="PremSub"
              className="btn btnPricePre">
                <>
                  <GiCheckMark /> Basic Trial
                </>
              </button>
            ) : user?.user?.trial === "Ended" ? (
              <button
              name="PremSub"
              className="btn btnPricePre"
                onClick={(e) => handleShow(e)}
              >
                {btnLoader ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Buy Now"
                )}
              </button>
            ) : (
              <button
              name="PremSub"
              className="btn btnPricePre"
                onClick={(e) => handleShow(e)}
              >
                {btnLoader ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Buy Now"
                )}
              </button>
            )}
          </>

          {/* <button
            name="PremSub"
            className="btn btnPricePre"
            onClick={(e) => handleShow(e)}
          >
            {btnLoader ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              "Buy Now"
            )}
          </button> */}
          </>
        )
      ) : (
        <button
          className="btn btnPayment mb-3"
          style={{ display: "block" }}
          variant="primary"
          name="add"
          onClick={(e) => handleShow(e)}
        >
          + Add payment method
        </button>
      )}

      <Modal
        style={{ marginTop: "10%" }}
        className="ModalMobile"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 className="SetModalTitle"> {popup ? "" : ""}</h3>
          </Modal.Title>
        </Modal.Header>
        {popup ? (
          <Modal.Body>
            <div className="congrates">
              <h2 className="">Congratulations</h2>
              <img src={DoneSubmitBtn}></img>
              <h5>You have to complete profile</h5>
            </div>
          </Modal.Body>
        ) : (
          <Modal.Body>
            <h5 className="SetModalHead">Card Holder Name</h5>
            <input
              name="holder"
              className="SetModalIptCard w-100"
              onChange={(e) => handleChange(e)}
              placeholder="John Doe"
            />
            <h5 className="SetModalHead mt-3">Enter Card</h5>
            <CardNumberElement
              id="cardNumber"
              onChange={(e, name, label) => {
                setCheck({
                  ...check,
                  cardNo: e.complete,
                });
                handlePayment_InputChange(name, label);
              }}
              className="border"
            />

            <div className="headingCard">
              <h5 className="SetModalHead mt-3">Expiry Date</h5>
              <div style={{ width: "15%" }}>
                <h5 className="SetModalHead mt-3" style={{ width: "100px" }}>
                  CVC Code
                </h5>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <CardExpiryElement
                id="cardExpiry"
                onChange={(e, name, label) => {
                  setCheck({
                    ...check,
                    exp: e.complete,
                  });
                  handlePayment_InputChange(name, label);
                }}
                className="border marginRight-10  w-50 SetModalIptCard"
              />
              <CardCvcElement
                id="cardCvc"
                onChange={(e, name, label) => {
                  setCheck({
                    ...check,
                    cvc: e.complete,
                  });
                  handlePayment_InputChange(name, label);
                }}
                className="border  ml-4 w-50 SetModalIptCard"
              />
            </div>
            <div style={{ display: "flex" }}></div>
          </Modal.Body>
        )}
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          {popup ? (
            ""
          ) : (
            <button
              className="btn btnSetModal"
              disabled={
                obj.holder && check.cardNo && check.cvc && check.exp
                  ? false
                  : true
              }
              // {obj.holder && Object.keys(state.stateErrors).length == 0 ? false : true}
              onClick={handleSubmit}
            >
              {loader ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Save Changes"
              )}
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Credits;
