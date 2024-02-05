import React, { useState, useEffect } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Settings.css";
import { DeleteIcon, EditIcon } from "../../Assets";
import {
  EditName,
  EditEmail,
  EditPwd,
  DefAccount,
  Credits,
} from "./Setting_Modals/Index";
import { CollectionsOutlined, Password } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { changeUserDetail } from "../../Shared/Services/Settings";
import { toastMessage } from "../../Shared/Components/Toast/Toast";
import { setUser } from "../../Shared/Redux/reducers/userSlice";
import CancelModal from "./Setting_Modals/CancelModal";
import {
  getAllCardsServices,
  delCardService,
} from "../../Shared/Services/subscription.service";
import { emailNotify } from "../../Shared/Services/Settings";
import ModalLogOut from "../../Shared/Components/Navbar/ModalLogOut";
import { getPrimaryCard } from "../../Shared/Services/subscription.service";
import ModalDeleteAccount from "../../Shared/Components/Navbar/ModalDeleteAccount";
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
import Stripeee, {
  CheckoutForm,
} from "./../../Shared/Components/Pricing/Stripeee";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_live_51KToJjAOwInuazNMGuaVN73HcGDUW8NBue3CIDqVViEzpL2yZUpVtUCXz6imDAnaxVFsQL1MgRLO52hRT3C7Lrv800JwWHmNsT"
);

const Settings = ({ type, elements, stripe }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [passEncrypt, setpassEncrypt] = useState("");
  const [boolForCard, setBoolforCard] = useState(false);
  const [show, setShow] = useState(false);
  const [close, setClose] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // const {user} = useSelector(state=> state.root)
  const {
    user: { user, tokens },
  } = useSelector((state) => state.root);
  // const user = useSelector((state) => state.root.user.user);

  const [loader, setLoader] = useState(false);
  const [DefaultAccount, setDefaultAccount] = useState("");
  // const [check1, setCheck1] = useState("");
  // const [check2, setCheck2] = useState("");
  const [notfy, setNotify] = useState({
    isEnableSalon: user?.isEnableSaloonJob ? user?.isEnableSaloonJob : false,
    isEnableProduct: user?.isEnableProductUpdate
      ? user?.isEnableProductUpdate
      : false,
  });
  const handleModalClose = () => setShow(false);

  const [cardsArr, setCardsArr] = useState([]);
  const [cardLoader, setCardLoader] = useState(true);
  const [primeLoader, setPrimeLoader] = useState(false);
  const [cardell, setCardell] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const closeDeleteModal = () => setShowDeleteModal(false);

  const [state, setState] = useState({
    name: "",
    confirmPassword: "",
  });
  const [windowWdth, setWindowWdth] = useState(window.innerWidth);
  const [cardState, setCardState] = useState([]);
  const handleChange = (key, value) => {
    if (key === "name") {
      if (user.role === "owner") {
        setName(value);
      }
      setconfirmPassword(key?.confirmPassword);
      paasu(value);
    } else {
      setDefaultAccount(value);
    }

    setState({
      ...state,
      [key]: value,
    });
    updateSettings(key, value);
  };
  const handleModal = (resp, id) => {
    let obj = {
      resp: resp,
      id: id,
    };
    setCardell(obj);
    setExpanded(false);
    setShow(true);
    setClose(false);
  };

  const setPrimary = (e, id) => {
    let PriObj = {
      userId: user?._id,
      cardId: id,
    };
    setPrimeLoader(true);
    getPrimaryCard(PriObj)
      .then(({ data: { data } }) => {
        // setPrime(data?.paymentMethod)
        dispatch(
          setUser({
            user: data,
            tokens,
          })
        );
      })
      .catch((er) => {})
      .finally(() => setPrimeLoader(false));
  };

  useEffect(() => {
    const isMobile = () => {
      let width = window.innerWidth;
      setWindowWdth(width);
      //
    };
    window.addEventListener("resize", isMobile);
  }, []);
  const getCardState = (card) => {
    if (cardState.length > 0) {
      let temp = [...cardState];
      temp.push(card);
      setCardState(temp);
    } else {
      let temp = [];
      temp.push(card);
      setCardState(temp);
    }
  };

  const Delete = (e, id) => {
    let obj = {
      customer: user.customer,
      cardId: e.id,
      userId: user._id,
    };
    delCardService(obj)
      .then(({ data }) => {
        let temp = [...cardsArr];
        temp.splice(id, 1);
        setCardsArr(temp);
        toastMessage("success", data?.msg);
      })
      .catch((err) => toastMessage("error", err?.response?.data?.message));
  };

  const paasu = (value) => {
    let passing = "";
    for (let i = 1; i <= value.length; i++) {
      passing += "*";
    }

    setpassEncrypt(passing);
  };

  const updateSettings = (key, value) => {
    let obj = {};
    if (key.confirmPassword) {
      obj["password"] = key.confirmPassword;
    }
    if (key.current) {
      obj["current_password"] = key.current;
    }

    if (user.role != "owner") {
      if (key === "name") {
        obj["name"] = value;
      }
    }

    changeUserDetail(obj)
      .then((data) => {
        if (data) {
          dispatch(
            setUser({
              user: data.data,
              tokens,
            })
          );
        }
      })
      .catch((e) => {
        toastMessage("error", e.response.data.message);
      });
  };
  const handleDeleteAccountModal = () => {
    setExpanded(false);
    setShowDeleteModal(true);
  };
  const getAllDebits = () => {
    getAllCardsServices()
      .then(({ data: { data } }) => {
        setCardsArr(data?.data);
        setCardLoader(false);
      })
      .catch((e) => {})
      .finally();
  };

  useEffect(() => {
    getAllDebits();
  }, [cardLoader]);

  const enableNotification = (key, bool) => {
    let cloneEnableNot = { ...notfy };
    let obj = {
      ...cloneEnableNot,
      [key]: bool,
    };
    let serverObj = {};
    if (!obj?.isEnableSalon || obj?.isEnableSalon) {
      serverObj["isEnableSaloonJob"] = obj?.isEnableSalon;
    }
    if (!obj?.isEnableProduct || obj?.isEnableProduct) {
      serverObj["isEnableProductUpdate"] = obj?.isEnableProduct;
    }
    if (Object.keys(serverObj).length) {
      emailNotify(serverObj)
        .then(({ data: { data } }) => {
          let obj = {
            user: data,
            tokens,
          };
          dispatch(setUser(obj));
          setNotify({
            isEnableProduct: data?.isEnableProductUpdate,
            isEnableSalon: data?.isEnableSaloonJob,
          });
        })
        .catch((err) => {});
    }
  };

  return (
    <div className="divSigin">
      <div className="contSignIn">
        <Card
          className="cardSign billCard"
          style={{ width: "45rem", height: "auto " }}
        >
          <Card.Title>
            <h1 className="settingTitle">Settings</h1>
          </Card.Title>
          <Card.Body>
            <h1 className="settingh1 mb-4">User Detail</h1>
            <div className="divSettings">
              {user.role === "owner" ? (
                ""
              ) : (
                <div className="rowSettings">
                  <div>
                    <h3 className="settingsList">Name</h3>
                  </div>
                  <div style={{ display: "flex" }}>
                    <h3 className="settingsTab">
                      {state.name ? state.name : user?.name}
                    </h3>
                    <EditName handleChange={handleChange} names={user?.name} />
                  </div>
                </div>
              )}

              <div className="rowSettings">
                <div>
                  <h3 className="settingsList">Email Address</h3>
                </div>
                <div
                  style={
                    windowWdth >= 500
                      ? {
                          display: "flex",
                          alignItems: "center",
                          margin: "0px -32px",
                        }
                      : windowWdth <= 500
                      ? { display: "flex" }
                      : ""
                  }
                >
                  <h3 className="settingsTab">
                    {state.email ? state.email : user?.email}
                  </h3>
                  {/* <EditEmail handleChange={handleChange} /> */}
                </div>
              </div>

              {!user?.user?.socialId ? (
                <div className="rowSettings">
                  <div>
                    <h3 className="settingsList">Password</h3>
                  </div>
                  <div style={{ display: "flex" }}>
                    <h3 className="settingsTab">
                      {state.confirmPassword ? passEncrypt : "********"}
                    </h3>
                    <EditPwd handleChange={handleChange} />
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="rowSettings1">
                <div>
                  <h3 className="settingsList">Default Account</h3>
                </div>
                <div
                  style={
                    windowWdth >= 500
                      ? {
                          display: "flex",
                          alignItems: "center",
                          margin: "0px -32px",
                        }
                      : windowWdth <= 480
                      ? { display: "flex" }
                      : ""
                  }
                >
                  <h3 className="settingsTab">
                    {user.role == "professional"
                      ? "Service Provider"
                      : "Salon Owner"}
                  </h3>
                  {/* <DefAccount handleChange={handleChange} /> */}
                </div>
              </div>
            </div>

            <h1 className="billingh1 mt-5 mb-4">
              Subscription Plan &amp; Billing
            </h1>
            <div className="billDiv">
              <div className="billUp">
                <p className="settingsP">Current Plan</p>

                <div className="divBilling mb-3">
                  <div>
                    {user?.subType == "basic" ? (
                      <h1 className="settingPrice">1 Month - $11.99</h1>
                    ) : user?.subType == "professional" ? (
                      <h1 className="settingPrice">6 Months - $60.00</h1>
                    ) : user?.subType == "premium" ? (
                      <h1 className="settingPrice">Yearly Plan - $100.00</h1>
                    ) : (
                      "You currently have subscribed to no plan"
                    )}
                  </div>
                  <div>
                    <Link to="/subscriptions">
                      <button className="btn btnSubs">Upgrade Plan</button>
                    </Link>
                  </div>
                </div>
                <div className="divBilling mb-2">
                  <div>
                    <h5 className="settingTitle1">
                      {user?.subType == "basic"
                        ? "Search & Filters, Apply Jobs, Send Messages and Reviews"
                        : user?.subType == "professional"
                        ? "Search & Filters, Apply Jobs, Send Messages and Reviews"
                        : user?.subType == "premium"
                        ? "Search & Filters, Apply Jobs, Send Messages and Reviews"
                        : ""}
                    </h5>
                    <h5 className="upcomingPayment">
                      {user?.subscriptionId == ""
                        ? ""
                        : "Next Payment: $100 on January 3rd, 2020"}
                    </h5>
                  </div>
                  <div>
                    {/* <button className="btn btnCancel">Cancel Membership</button> */}
                    <CancelModal />
                  </div>
                </div>
                <div
                  className="mb-3"
                  style={{ borderBottom: "2px solid #E0E0E0" }}
                ></div>
              </div>
              <p className="settingsP">Payment Method</p>
              <div className={cardState.cardNo ? "divBilling1" : ""}>
                {/* <div>
                  <p className='creditCard'>{cardState.cardNo ? "**** **** ****" + cardState.cardNo.split("").splice(14).join("") : ""}</p>
                </div>
                {cardState.cardNo ?  */}

                {/* :
                  <div>
                    <Credits getCardState={getCardState} />
                  </div>
                } */}

                {cardLoader || primeLoader ? (
                  <>
                    <Spinner
                      animation="border"
                      role="status"
                      className="mt-2 mb-4"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </>
                ) : (
                  cardsArr.length > 0 &&
                  cardsArr?.map((resp, id) => {
                    return (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            <Form>
                              {["radio"].map((type) => (
                                <div key={`default-${type}`} className="mb-3">
                                  <Form.Check
                                    className="checkSettings"
                                    type={type}
                                    name="radio"
                                    onChange={(e) => setPrimary(e, resp.id)}
                                    checked={
                                      resp.id == user?.paymentMethod
                                        ? true
                                        : false
                                    }
                                    // defaultChecked={resp.id == user?.paymentMethod ? true : false}
                                  />
                                </div>
                              ))}
                            </Form>
                            <p className="creditCard">
                              {"**** **** **** " + resp.last4}
                            </p>
                          </div>
                          {resp.id != user?.paymentMethod ? (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                              }}
                            >
                              {/* <img src={EditIcon} style={{ marginRight: "30px" }} /> */}
                              <img
                                style={{ cursor: "pointer", width: "16px" }}
                                src={DeleteIcon}
                                // onClick={(e) => Delete(resp, id)}
                                onClick={(e) => handleModal(resp, id)}
                                // onClick={handleModal}
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </>
                    );
                  })
                )}

                <div className="pb-3">
                  <Credits
                    // subscribe1
                    // subscription={Subscription.basicSubscription}
                    getCardState={getCardState}
                    elements={elements}
                    stripe={stripe}
                    ccardslenght={cardsArr.length}
                    againprimee={setPrimary}
                    getAllDebits={getAllDebits}
                  />
                </div>
              </div>
            </div>

            <div className="settingh1 mb-4 mt-4">Email Preferences</div>

            <div className="EmailDiv">
              {user?.role == "professional" ? (
                <div className="emailHead">
                  <h1 className="emailh1">
                    When favorite salons post new jobs
                  </h1>
                  <div>
                    <Form>
                      <Form.Check
                        className="switcher"
                        type="switch"
                        id="custom-switch"
                        checked={notfy.isEnableSalon}
                        onChange={(e) =>
                          enableNotification("isEnableSalon", e.target.checked)
                        }
                      />
                    </Form>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="emailHead">
                <h1 className="emailh1">Product education and updates</h1>
                <div>
                  <Form>
                    <Form.Check
                      className="switcher"
                      type="switch"
                      id="custom-switch"
                      checked={notfy.isEnableProduct}
                      onChange={(e) =>
                        enableNotification("isEnableProduct", e.target.checked)
                      }
                      // onChange={(e) => setCheck2(e.target.value)}
                    />
                  </Form>
                </div>
              </div>
            </div>
            <div className="delete" onClick={handleDeleteAccountModal}>
              <button className="btn butttonsDelte"> Delete Account</button>
            </div>
          </Card.Body>
        </Card>
      </div>
      <ModalLogOut
        show={show}
        handleClose={handleModalClose}
        cardDelete
        card={Delete}
        cardell={cardell}
      />
      <ModalDeleteAccount
        show={showDeleteModal}
        handleClose={closeDeleteModal}
      />
    </div>
  );
};

const InjectedCheckoutForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {({ elements, stripe }) => (
          <Settings elements={elements} stripe={stripe} plan />
        )}
      </ElementsConsumer>
    </Elements>
  );
};

export default InjectedCheckoutForm;
