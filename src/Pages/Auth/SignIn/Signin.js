import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import FacebookLogin from "react-facebook-login";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFacebookF, FaGreaterThan } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginSocialGoogle } from "reactjs-social-login";
import { beforeLogin, socialLoginService } from "../../../Shared";
import Foot from "../../../Shared/Components/Foot/Foot";
import { emailAndPassword } from "../../../Shared/Formik/formik";
import { setUser } from "../../../Shared/Redux/reducers/userSlice";
import "../Auth.css";
import SignUpModal from "../SignUp/SignUpModal";

import { useSelector } from "react-redux";
import { GoogleIcon } from "../../../Assets";
import { toastMessage } from "../../../Shared/Components/Toast/Toast";
import {
  resetRem,
  setRember,
} from "../../../Shared/Redux/reducers/remberSlice";
import { loginApiService } from "../../../Shared/Services";
import { notificationTokenApi } from "../../../Shared/Services/notification";
import NavbarAuth from "../SignUp/NavbarAuth";
import SocialLoginPopup from "../SignUp/SocialLoginPopup";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notifctnTokn, user } = useSelector((state) => state.root);

  const handleModalClose = () => {
    setShow(false);
    setsocialpop(false);
  };
  const handleSocialModalClose = () => {
    setsocialpop(false);
  };
  const [close, setClose] = useState(false);
  const [show, setShow] = useState(false);
  const { remeber } = useSelector((state) => state.root);
  const [loader, setLoader] = useState(false);
  const [floader, setFloader] = useState(false);
  const [gLoader, setGLoader] = useState(false);
  const [beforeSocialRolee, setBeforeSocial] = useState("");
  const [email, setEmail] = useState(remeber?.email ? remeber?.email : "");
  const [password, setPassword] = useState(
    remeber?.password ? remeber?.password : ""
  );
  const [rememberCheck, setRememberCheck] = useState(
    remeber?.remberCheck ? remeber?.remberCheck : false
  );
  const [respSocialpop, setrespSocialpop] = useState(null);
  const [socialpop, setsocialpop] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const showPass = (name, e) => {
    if (e == "1") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };
  const socialpopupfun = (resp) => {
    setrespSocialpop(resp);
    setsocialpop(true);
  };
  const handleLogin = async (obj) => {
    setLoader(true);
    loginApiService(obj)
      .then(({ data }) => {
        if (data) {
          let userToken = data.tokens;
          let userStatus = data.status;
          dispatch(
            setUser({
              user: data.user,
              status: data.status,
              tokens: data.tokens,
              hourRate: data?.hourRate,
              maxJobRate: data?.maxJobRate,
              sub: false,
            })
          );
          notificationTokenApi(notifctnTokn?.notficationToken)
            .then(({ data: { data } }) => {
              let cloneUser = {
                user: data,
                tokens: userToken,
                sub: false,
                status: userStatus,
              };
              dispatch(setUser(cloneUser));
            })
            .catch((err) => {});

          if (data.user.isSubscription && data.user.isProfileComplete) {
            navigate("/profile");
          } else if (!data.user.isSubscription) {
            navigate("/plan");
          } else if (data.user.isProfileComplete) {
            navigate("/profile-setup");
          }

          setLoader(false);
        }
      })
      .catch((e) => {
        setLoader(false);
        toastMessage("error", e.response.data.message);
      });
  };

  const ForgetClick = () => {
    navigate("/forget-password");
  };

  const handleModal = () => {
    setShow(true);
    setClose(false);
  };

  const onSuccess = (respon) => {
    const { sub, email, picture, name } = respon;
    beforeLogin(sub)
      .then(({ data: { data } }) => {
        if (data) {
          let obj = {
            platform: "google",
            profilePic: picture,
            socialId: sub,
            email: email,
            name: name,
          };
          setGLoader(true);
          socialLoginService(obj)
            .then(({ data }) => {
              dispatch(
                setUser({
                  user: data.user,
                  status: data.status,
                  tokens: data.tokens,
                  hourRate: data?.hourRate,
                  maxJobRate: data?.maxJobRate,
                })
              );
            })
            .catch((err) => {
              toastMessage("error", err?.response?.data?.message);
            })
            .finally(() => setGLoader(false));
        } else {
          let platFormObj = {
            ...respon,
            platform: "google",
          };
          socialpopupfun(platFormObj);
        }
      })
      .catch((err) => {
        toastMessage("error", err?.response?.data?.message);
      });
  };

  useEffect(() => {
    // function start() {
    //   gapi.client.init({
    //     clientId: clientGoogleId,
    //     scope: "",
    //   });
    // }
    // gapi.load("client:auth2", start);
  });

  const handleSocialLogin = (data) => {
    const { userID, picture, name, email } = data;
    if (userID != undefined) {
      let obj = {
        platform: "facbook",
        profilePic: `https://graph.facebook.com/${userID}/picture?type=large`,
        socialId: userID,
        name: name,
      };
      if (email) {
        obj["email"] = email;
      }
      let platFormObj = {
        ...data,
        platform: "facbook",
      };

      beforeLogin(userID)
        .then(({ data: { data } }) => {
          if (data) {
            setFloader(true);
            socialLoginService(obj)
              .then(({ data }) => {
                dispatch(
                  setUser({
                    user: data.user,
                    status: data.status,
                    tokens: data.tokens,
                    hourRate: data?.hourRate,
                    maxJobRate: data?.maxJobRate,
                  })
                );
              })
              .catch((err) => {
                toastMessage("error", err?.response?.data?.message);
              })
              .finally(() => setFloader(false));
          } else {
            socialpopupfun(platFormObj);
          }
        })
        .catch((err) => {
          toastMessage("error", err?.response?.data?.message);
        });
    }
  };

  const rememberMe = () => {
    setRememberCheck(!rememberCheck);
    if (!rememberCheck == true) {
      setRememberCheck(!rememberCheck);
      let obj = {
        email,
        password,
        remberCheck: !rememberCheck,
      };
      dispatch(setRember(obj));
    } else {
      dispatch(resetRem());
    }
  };
  const clientGoogleId =
    "437562956851-g49r8d0epd7mqmc4jdf0gvg0p2ei1gdk.apps.googleusercontent.com";
  return (
    <div className="divSigin">
      <NavbarAuth />
      <div className="contSignIn">
        <Card className="cardSign" style={{ width: "30rem", height: "auto " }}>
          <Card.Body>
            <div>
              <div className="">
                <Card.Title className="titleSign1 titleDiv">
                  Ready to take the next step?
                </Card.Title>
              </div>
              <Card.Title className="titleSign2 mb-5">
                Create an account or sign in.
              </Card.Title>

              <Card.Text>
                <div className="btnDiv marg">
                  <div className="googleDiv">
                    <LoginSocialGoogle
                      client_id={clientGoogleId}
                      scope="openid profile email"
                      discoveryDocs="claims_supported"
                      access_type="offline"
                      onResolve={({ provider, data }) => {
                        onSuccess(data);
                      }}
                      onReject={(err) => {
                        console.log(err);
                      }}
                    >
                      <div className="googleSocial">
                        <>
                          {gLoader ? (
                            <div className="py-1">
                              <Spinner animation="border" role="status">
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </Spinner>
                            </div>
                          ) : (
                            <button className="">
                              <GoogleIcon className="me-2" /> Continue with
                              Google
                            </button>
                          )}
                        </>
                      </div>
                    </LoginSocialGoogle>
                  </div>

                  <div className="facebookDiv mt-3">
                    <FacebookLogin
                      appId="226704183275181"
                      fields="name,email,picture"
                      cssClass="socialFacebook"
                      callback={handleSocialLogin}
                      textButton={
                        floader ? (
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        ) : (
                          <>
                            <FaFacebookF style={{ height: "20px" }} />
                            &nbsp;{" "}
                            <button
                              className="faceText"
                              style={{
                                border: "none",
                                background: "transparent",
                              }}
                            >
                              Continue With Facebook
                            </button>
                          </>
                        )
                      }
                    >
                      <button className="btn facebook"></button>
                    </FacebookLogin>
                  </div>
                </div>
              </Card.Text>
              <Container>
                <div className="lineDiv">
                  <div className="line"></div>
                  <div className="lineText">or continue with</div>
                  <div className="line"></div>
                </div>
                <Formik
                  initialValues={{
                    email: email ? email : "",
                    password: password ? password : "",
                  }}
                  validationSchema={emailAndPassword}
                  onSubmit={(values) => {
                    //
                    setEmail(values.email);
                    setPassword(values.password);
                    handleLogin({
                      email: values.email,
                      password: values.password,
                    });

                    // naviagte("/login_", { state: { email: values.email } });
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    setFieldValue,
                  }) => (
                    <>
                      <Form>
                        <Card.Text className="emailAuth mb-1 ">Email</Card.Text>
                        <div className="btnDiv cu">
                          <Field
                            name="email"
                            className="iptSignin"
                            value={values.email}
                            placeholder="johndoe@email.com"
                            onChange={handleChange("email")}
                            // onChange={(e) => {
                            //   setEmail(e.target.value);

                            //   // setFieldValue("email", e.target.value);
                            // }}
                          />
                          {errors.email && touched.email ? (
                            <div className="formikerror">{errors.email}</div>
                          ) : (
                            ""
                          )}
                        </div>
                        <Card.Text className="emailAuth mt-3 mb-1">
                          Password
                        </Card.Text>
                        <div style={{ position: "relative" }}>
                          <div className="btnDiv cu">
                            <Field
                              className="iptSignin"
                              type={showConfirmPassword ? "text" : "password"}
                              name="password"
                              value={values.password}
                              placeholder="•••••••••••••••••"
                              onChange={handleChange("password")}
                              // onChange={(e) => {
                              //   setPassword(e.target.value);
                              //   setFieldValue("password", e.target.value);
                              // }}
                            />
                            {errors.password && touched.password ? (
                              <div className="formikerror">
                                {errors.password}
                              </div>
                            ) : null}
                            <div
                              onClick={(e) => showPass("Confirm", "1")}
                              className="shoowpass"
                              style={{ cursor: "pointer" }}
                            >
                              {showConfirmPassword ? (
                                <AiOutlineEye
                                  style={{
                                    position: "absolute",
                                    top: "40%",
                                    right: "7%",
                                  }}
                                />
                              ) : (
                                <AiOutlineEyeInvisible
                                  style={{
                                    position: "absolute",
                                    top: "40%",
                                    right: "7%",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        {/* <div>
                          <Card.Text className="content11">
                            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                            <span className="ms-2">Remember me</span>
                            <Link to="/signup">
                            <span className="link" style={{ color: "#6F6F6F" }}>
                              {" "}
                              Sign Up!
                            </span>
                          </Link>
                          </Card.Text>

                          <Card.Text className="forgetPass">
                            Forget Password ?
                          </Card.Text>
                        </div> */}

                        <div className="checkBoxDiv">
                          <Card.Text className="">
                            <input
                              checked={rememberCheck}
                              onClick={() => rememberMe()}
                              type="checkbox"
                            />
                            <label className="checkboxInAuth ms-2">
                              Remember Me
                            </label>
                          </Card.Text>
                          <Card.Text
                            className="forgetPass"
                            onClick={() => ForgetClick()}
                          >
                            Forget Password ?
                          </Card.Text>
                        </div>

                        <Card.Text className="content">
                          When you create an account or sign in, you agree to
                          Salon Substitute's{" "}
                          <a href="/termsconditions" className="cleckHref">
                            Terms,
                          </a>{" "}
                          <a href="/privacypolicy" className="cleckHref">
                            Cookie and Privacy policies.
                          </a>{" "}
                          {/* . You consent to receiving marketing messages from
                          Indeed and may opt out from receiving such messages by
                          following the unsubscribe link in our messages, or as
                          detailed in our terms. */}
                        </Card.Text>
                        <div className="btnDiv">
                          {/* <Link to=""> */}
                          <button className="btn continue" type="submit">
                            {loader ? (
                              <Spinner animation="border" role="status">
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </Spinner>
                            ) : (
                              <span
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                              >
                                Login{" "}
                                <FaGreaterThan
                                  style={{ opacity: "0.9", paddingLeft: "5px" }}
                                />
                              </span>
                            )}
                          </button>
                          {/* </Link> */}
                        </div>
                        <Card.Text
                          style={{ display: "flex", justifyContent: "center" }}
                          className="mt-3"
                        >
                          <p className="signUpText">
                            Don't have an account?
                            <span
                              style={{
                                fontWeight: "500",
                                color: "black",
                                cursor: "pointer",
                              }}
                              className="ms-2"
                              onClick={handleModal}
                            >
                              Sign Up
                            </span>
                          </p>
                        </Card.Text>
                      </Form>
                    </>
                  )}
                </Formik>
              </Container>
            </div>
          </Card.Body>
        </Card>
      </div>

      <Foot />
      <SignUpModal show={show} handleClose={handleModalClose} />
      {socialpop ? (
        <SocialLoginPopup
          show={socialpop}
          handleClose={handleSocialModalClose}
          respSocialpop={respSocialpop}
          beeefore
          setFloader={setFloader}
          floader={floader}
          gLoader={gLoader}
          setGLoader={setGLoader}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default SignUp;
