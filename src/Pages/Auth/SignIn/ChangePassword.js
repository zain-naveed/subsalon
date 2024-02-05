import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import PasswordStrengthBar from "react-password-strength-bar";
import { Formik, Form, Field } from "formik";
import { confirmSchema } from "../../../Shared/Formik/formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router";
import Navigation from "../../../Shared/Components/Navbar/navigation";
import Foot from "../../../Shared/Components/Foot/Foot";
import "../Auth.css";
import { useLocation } from "react-router";
import { resetPassService } from "../../../Shared/Services";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { toastMessage } from "../../../Shared";
import NavbarAuth from "../SignUp/NavbarAuth";

const ChangePassword = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // 
  
  let { id } = useParams();
  

  const showPassword = (name, e) => {
    e.preventDefault();
    if (name === "Password") {
      if (showPass === true) {
        setShowPass(false);
      } else {
        setShowPass(true);
      }
    } else {
      if (showConfirm === true) {
        setShowConfirm(false);
      } else {
        setShowConfirm(true);
      }
    }
  };

  const submitForm = (values) => {
    const { password, confirmPassword } = values;
    
  };
  const ResetPass = async (obj) => {
    
    setLoader(true);
    resetPassService(obj)
      .then(({ data }) => {
        setLoader(false);
        
        if (data) {
          navigate("/Login");
        }
      })
      .catch((e) => {
        toastMessage("error", e?.response?.data?.message);
        setLoader(false);
      });
  };

  return (
    <div className="divSigin">
      <NavbarAuth />
      <div className="contSignIn padCard">
        <Card className="cardSign" style={{ width: "30rem", height: "28rem" }}>
          <Card.Body>
            <Container className="pChange">
              <Card.Title className="titleSign1 titleDiv1">
                Create new password
              </Card.Title>
              <Card.Title className="titleSign2 titleSignUp">
                Type and confirm a secure new password for the account:
              </Card.Title>
            </Container>
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={confirmSchema}
              onSubmit={(values) => {
                
                const { confirmPassword } = values;

                ResetPass({
                  userId: id,
                  password: confirmPassword,
                });
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit }) => (
                <>
                  <Form onSubmit={submitForm}>
                    <Container>
                      <div className="changeDiv">
                        <div className="mb-3" style={{ position: "relative" }}>
                          <div className="passChange">Password</div>
                          <Field
                            type={showPass ? "text" : "password"}
                            className="iptSignUp ps-2"
                            name="password"
                            onChange={handleChange("password")}
                            placeholder="•••••••••••••"
                          />
                          <div
                            className="eyeButton"
                            onClick={(e) => showPassword("Password", e)}
                          >
                            {showPass ? (
                              <AiOutlineEye />
                            ) : (
                              <AiOutlineEyeInvisible />
                            )}
                          </div>
                          <div className="">
                            {errors.password && touched.password ? (
                              <div className="formikerror1">
                                {errors.password}
                              </div>
                            ) : (
                              <div className="divError"></div>
                            )}
                          </div>
                          {values.password ? (
                            <div style={{ width: "94%", height: "21px" }}>
                              <PasswordStrengthBar
                                password={values.password}
                                minLength={5}
                                minScore={2}
                                scoreWords={["weak", "okay", "good", "strong"]}
                              />
                            </div>
                          ) : (
                            <div className="strengthBar"></div>
                          )}
                        </div>

                        <div className="">
                          <div className="passChange">Confirm Password</div>
                          <div style={{ position: "relative" }}>
                            <Field
                              type={showConfirm ? "text" : "password"}
                              name="confirmPassword"
                              className="iptSignUp ps-2"
                              onChange={handleChange("confirmPassword")}
                              placeholder="•••••••••••••"
                            />
                            {errors.confirmPassword &&
                            touched.confirmPassword ? (
                              <div className="formikerror1">
                                {errors.confirmPassword}
                              </div>
                            ) : null}
                            <div
                              className="eyeButton1"
                              onClick={(e) => showPassword("Confirm", e)}
                            >
                              {showConfirm ? (
                                <AiOutlineEye />
                              ) : (
                                <AiOutlineEyeInvisible />
                              )}
                            </div>
                          </div>
                          {/* {values.confirmPassword ? <div style={{ width: "94%" }}>
                          <PasswordStrengthBar password={values.confirmPassword} />
                        </div> : <div className="strengthBar"></div>} */}
                        </div>
                      </div>
                      <div className="btnDiv">
                        <button
                          className="btn continue btnChangePass my-4"
                          style={{ width: "92%" }}
                          type="submit"
                          onClick={handleSubmit}
                        >
                          {loader ? (
                            <CircularProgress
                              style={{ color: "white" }}
                              className="circulerr"
                            />
                          ) : (
                            "Change Password"
                          )}
                        </button>
                      </div>
                    </Container>
                  </Form>
                </>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </div>
      <Foot />
    </div>
  );
};

export default ChangePassword;
