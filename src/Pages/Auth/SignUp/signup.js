import React, { useState } from "react";
import { Card, Container, NavLink } from "react-bootstrap";
import Navigation from "../../../Shared/Components/Navbar/navigation";
import Foot from "../../../Shared/Components/Foot/Foot";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import { emailOnly } from "../../../Shared/Formik/formik";
import { Form as Jeezzy } from "react-bootstrap";
import { roleEnum } from "../../../Shared/index";

const SignUp = () => {
  const [role, setRole] = useState("");

  const naviagte = useNavigate();
  return (
    <div className="divSigin">
      <Navigation />

      <div className="contSignIn">
        <Card className="cardSign" style={{ width: "33rem", height: "43rem " }}>
          <Card.Body>
            <div>
              <div className="">
                <Card.Title className="titleSign1 titleDiv">
                  Ready to take the next step?
                </Card.Title>
              </div>
              <Card.Title className="titleSign2">
                Create an account or sign in.
              </Card.Title>

              <Card.Text>
                <div className="btnDiv marg">
                  <button className="btn google">
                    <FcGoogle />
                    &nbsp; Continue With Google
                  </button>
                  <button className="btn facebook">
                    <FaFacebookF />
                    &nbsp; Continue With Facebook
                  </button>
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
                    email: "",
                    role: "",
                  }}
                  validationSchema={emailOnly}
                  onSubmit={(values) => {
                    naviagte("/create-password", {
                      state: { email: values.email, role: role },
                    });
                  }}
                >
                  {({ errors, touched }) => (
                    <>
                      <Form>
                        <Card.Text className="emailAuth">Email</Card.Text>
                        <div className="btnDiv">
                          <Field
                            name="email"
                            className="iptSignin"
                            placeholder="johndoe@email.com"
                          />
                          {errors.email || touched.email ? (
                            <div className="formikerror">{errors.email}</div>
                          ) : (
                            ""
                          )}
                        </div>
                        <Card.Text className="emailAuth signup">Role</Card.Text>
                        <div className="btnDiv signupps">
                          <Jeezzy.Select
                            aria-label="Default select example dropPro"
                            name="firstDose"
                            required
                            onChange={(e) => setRole(e.target.value)}
                          >
                            <option value="">Select one</option>
                            <option value={roleEnum.professional}>
                              Provider
                            </option>
                            <option value={roleEnum.owner}>Owner</option>
                          </Jeezzy.Select>
                        </div>
                        <Card.Text className="content11">
                          Already have an account?
                          <Link to="/Login">
                            <span className="link" style={{ color: "#6F6F6F" }}>
                              {" "}
                              Sign In!
                            </span>
                          </Link>
                        </Card.Text>

                        <Card.Text className="content mt-4">
                          When you create an account or sign in, you agree to
                          Salon Substitute's{" "}
                          <span
                            style={{
                              color: "#2075AC",
                              textDecoration: "underline",
                            }}
                          >
                            {" "}
                            Terms, Cookie and Privacy policies.{" "}
                          </span>{" "}
                          You consent to receiving marketing messages from
                          Indeed and may opt out from receiving such messages by
                          following the unsubscribe link in our messages, or as
                          detailed in our terms.
                        </Card.Text>
                        <div className="btnDiv">
                          {/* <Link to=""> */}
                          <button className="btn continue" type="submit">
                            <span
                              style={{ color: "white", textDecoration: "none" }}
                            >
                              Continue{" "}
                              <FaGreaterThan
                                style={{ opacity: "0.9", paddingLeft: "5px" }}
                              />
                            </span>
                          </button>
                          {/* </Link> */}
                        </div>
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
    </div>
  );
};

export default SignUp;
