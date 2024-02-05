import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import FacebookLogin from "react-facebook-login";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFacebookF, FaGreaterThan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleIcon } from "../../../Assets";
import { roleEnum, socialLoginService } from "../../../Shared";
import Foot from "../../../Shared/Components/Foot/Foot";
import { toastMessage } from "../../../Shared/Components/Toast/Toast";
import { FormSchemaOwner } from "../../../Shared/Formik/formik";
import { setUser } from "../../../Shared/Redux/reducers/userSlice";
import { signUpApiService } from "../../../Shared/Services";
import "../Auth.css";
import NavbarAuth from "./NavbarAuth";
const SignUpOwner = () => {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const { notifctnTokn } = useSelector((state) => state.root);
  const clientGoogleId =
    "437562956851-g49r8d0epd7mqmc4jdf0gvg0p2ei1gdk.apps.googleusercontent.com";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [floader, setFloader] = useState(false);
  const [gLoader, setGLoader] = useState(false);

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else {
      setConfirmPassword(e.target.value);
    }
  };

  const showPass = (name, e) => {
    if (name == "Password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSignUp = async (obj) => {
    let numbber = obj.phoneNumber;
    if (numbber.length < 7 || numbber.length > 15) {
      toastMessage("error", "Phone Number must be min 8 and max 15 digits");
    } else {
      setLoader(true);

      signUpApiService(obj)
        .then(({ data }) => {
          if (data) {
            // dispatch(setUser(data))
            toastMessage("success", "Signup Successfully!");
            setLoader(false);
            naviagte("/email-authentication", { state: data });
          }
        })
        .catch((e) => {
          setLoader(false);
          toastMessage("error", e.response.data.message);
        });
    }
  };

  const handleSocialLogin = (data) => {
    const { userID, picture, name, email } = data;
    if (userID != undefined) {
      let obj = {
        platform: "facbook",
        profilePic: `https://graph.facebook.com/${userID}/picture?type=large`,
        socialId: userID,
        name: name,
        role: roleEnum.owner,
      };
      if (email) {
        obj["email"] = email;
      }
      setFloader(true);
      socialLoginService(obj)
        .then(({ data }) => {
          dispatch(
            setUser({
              hourRate: data?.hourRate,
              maxJobRate: data?.maxJobRate,
              user: data.user,
              status: data.status,
              tokens: data.tokens,
              sub: false,
            })
          );
          naviagte("/salon-setup");
        })
        .catch((err) => {
          toastMessage("error", err?.response?.data?.message);
        })
        .finally(() => setFloader(false));
    }
  };
  const onSuccess = (respon) => {
    const { sub, email, picture, name } = respon;

    let obj = {
      platform: "google",
      profilePic: picture,
      socialId: sub,
      email: email,
      name: name,
      role: roleEnum.owner,
    };
    setGLoader(true);
    socialLoginService(obj)
      .then(({ data }) => {
        dispatch(
          setUser({
            hourRate: data?.hourRate,
            maxJobRate: data?.maxJobRate,
            user: data?.user,
            status: data.status,
            tokens: data.tokens,
            sub: false,
          })
        );

        naviagte("/salon-setup");
      })
      .catch((err) => {
        toastMessage("error", err?.response?.data?.message);
      })
      .finally(() => setGLoader(false));
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
  return (
    <div className="divSigin">
      <NavbarAuth />
      <div className="contSignIn">
        <Card className="cardSign" style={{ width: "30rem", height: "auto" }}>
          <Card.Body>
            <Container className="pChange">
              <Card.Title className="titleSign1 titleDiv1">
                Create new account
              </Card.Title>
              <Card.Title className="titleSign2 titleSignUp width1">
                Please enter your credentials to sign up
              </Card.Title>
            </Container>
            <div className="btnDiv marg">
              {/* <button className="btn google">
                    
                    &nbsp; Continue With Google
                  </button> */}
              {/* <button className="btn facebook"
                  provider="facebook"
                  appId="381322010719385"
                  fields="name,email,picture"
                  callback={handleSocialLogin}
      >
                    <FaFacebookF />
                    &nbsp; Continue With Facebook
                  </button> */}
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
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        </div>
                      ) : (
                        <button className="">
                          <GoogleIcon className="me-2" /> Continue with Google
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
                          style={{ border: "none", background: "transparent" }}
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
            <div className="lineDiv">
              <div className="line"></div>
              <div className="lineText">or continue with</div>
              <div className="line"></div>
            </div>
            <Container className="containerAuth">
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  role: "Owner",
                  phone: "",
                }}
                validationSchema={FormSchemaOwner}
                onSubmit={(values) => {
                  let obj = {
                    email: values.email,
                    password: values.password,
                    role: roleEnum.owner,
                    Saloon_name: values.name,
                    phoneNumber: JSON.stringify(values.phone),
                  };
                  if (notifctnTokn.notficationToken) {
                    obj["deviceToken"] = notifctnTokn.notficationToken;
                  }
                  handleSignUp(obj);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <>
                    <Form>
                      <Card.Text className=" marginNone emailAuth mb-1 mt-4">
                        Salon Name
                      </Card.Text>
                      <Field
                        name="name"
                        className="iptAuth w-100"
                        Placeholder="Enter your name"
                        onChange={(e) => handleChange(e)}
                      />
                      {errors.name && touched.name ? (
                        <div className="formikerror1">{errors.name}</div>
                      ) : (
                        <div style={{ height: "2px" }}></div>
                      )}
                      <Card.Text className=" marginNone emailAuth mb-1 mt-4">
                        Phone Number
                      </Card.Text>
                      {/* <input type={"number"} value={values.phone} className='iptAuth w-100' Placeholder="Enter your phone number" minLength={8} maxLength={15} onChange={handleChange("phone")} /> */}
                      <Field
                        name="phone"
                        className="iptAuth w-100"
                        type="number"
                        pattern="[0-9]+"
                        Placeholder="Enter your phone number"
                        onKeyDown={(evt) =>
                          evt.key === "e" && evt.preventDefault()
                        }
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      {errors.phoneNumber && touched.phoneNumber ? (
                        <div className="formikerror1">{errors.phoneNumber}</div>
                      ) : (
                        <div style={{ height: "2px" }}></div>
                      )}
                      <Card.Text className=" marginNone mt-4 emailAuth mb-1">
                        Email
                      </Card.Text>
                      <Field
                        name="email"
                        Placeholder="Enter your email"
                        className="iptAuth w-100"
                        onChange={(e) => handleChange(e)}
                      />
                      {errors.email && touched.email ? (
                        <div className="formikerror1">{errors.email}</div>
                      ) : null}

                      {/* <Card.Text className=' marginNone mt-4 emailAuth mb-1'>
                        Your role in the hiring process
                      </Card.Text>
                      <select
                        class="form-select iptAuth w-100"
                        aria-label="Default select example"
                        style={{
                          boxShadow: "none",
                          outline: "none"
                        }}
                        onChange={(e) => {
                          setFieldValue("role", e.target.value)
                        }}
                      >
                        <option value="Owner">Owner</option>
                        <option value="Provider">Provider</option>
                      </select> */}
                      <Card.Text className=" marginNone mt-4 emailAuth mb-1">
                        Password
                      </Card.Text>
                      <div style={{ position: "relative" }}>
                        <Field
                          name="password"
                          Placeholder="•••••••••••••"
                          type={showPassword ? "text" : "password"}
                          className="iptAuth w-100"
                          onChange={(e) => handleChange(e)}
                        />
                        <div className="">
                          {errors.password && touched.password ? (
                            <div className="formikerror1">
                              {errors.password}
                            </div>
                          ) : (
                            <div className="divError"></div>
                          )}
                        </div>
                        <div
                          onClick={(e) => showPass("Password", e)}
                          style={{ cursor: "pointer" }}
                        >
                          {showPassword ? (
                            <AiOutlineEye className="eyeAuth" />
                          ) : (
                            <AiOutlineEyeInvisible className="eyeAuth" />
                          )}
                        </div>
                      </div>
                      <Card.Text className=" marginNone mt-4 emailAuth mb-1">
                        Confirm Password
                      </Card.Text>
                      <div style={{ position: "relative" }}>
                        <Field
                          name="confirmPassword"
                          Placeholder="•••••••••••••"
                          type={showConfirmPassword ? "text" : "password"}
                          className="iptAuth w-100"
                          onChange={(e) => handleChange(e)}
                        />
                        {errors.confirmPassword && touched.confirmPassword ? (
                          <div className="formikerror1">
                            {errors.confirmPassword}
                          </div>
                        ) : null}
                        <div
                          onClick={(e) => showPass("Confirm", e)}
                          style={{ cursor: "pointer" }}
                        >
                          {showConfirmPassword ? (
                            <AiOutlineEye
                              style={{
                                position: "absolute",
                                top: "30%",
                                right: "4%",
                              }}
                            />
                          ) : (
                            <AiOutlineEyeInvisible
                              style={{
                                position: "absolute",
                                top: "30%",
                                right: "4%",
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <button
                        className="btn continue w-100 mt-4"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        {loader ? (
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        ) : (
                          <span
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            Next{" "}
                            <FaGreaterThan
                              style={{ opacity: "0.9", paddingLeft: "5px" }}
                            />
                          </span>
                        )}
                      </button>
                    </Form>
                  </>
                )}
              </Formik>
            </Container>
            <Card.Text
              style={{ display: "flex", justifyContent: "center" }}
              className="mt-3"
            >
              <p className="signUpText">
                Don't have an account?
                <span
                  style={{ fontWeight: "500", color: "black" }}
                  className="ms-2"
                >
                  <Link to="/Login">Sign In</Link>
                </span>
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <Foot />
    </div>
  );
};

export default SignUpOwner;
