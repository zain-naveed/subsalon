import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { ChangePasswordSchema } from "../../../Shared/Formik/formik";
import "../Settings.css";
import { toastMessage } from "../../../Shared";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function EditPwd({ handleChange }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showPasswordCurrent, setShowCurrentPassword] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  const handleeSubmit = (value) => {
    handleChange(value);
    handleClose();
  };
  const showPass = (name, e) => {
    if (e == "1") {
      setShowCurrentPassword(!showPasswordCurrent);
    } else if (e == "2") {
      setShowPasswordNew(!showPasswordNew);
    }
    else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <>
      <h3 className="settingsEdit" variant="primary" onClick={handleShow}>
        Edit
      </h3>

      <Modal
        style={{ marginTop: "10%" }}
        className="ModalMobile"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 className="SetModalTitle">Change Password</h3>
          </Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            current: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={ChangePasswordSchema}
          onSubmit={(values) => {
            
            handleeSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <>
              <Form>
                <Modal.Body>
                  <div style={{ position: "relative" }}>
                    <h5 className="SetModalHead">Current Password</h5>
                    <Field
                      name="current"
                      type={showPasswordCurrent ? "text" : "password"}
                      className="SetModalIpt"
                      placeholder="•••••••••••••"
                    />
                    {errors.current || touched.current ? (
                      <div className="formikerror1">{errors.current}</div>
                    ) : (
                      <div style={{ height: "2px" }}></div>
                    )}
                    <div
                      onClick={(e) => showPass("Confirm", "1")}
                      className="shoowpass"
                      style={{ cursor: "pointer" }}
                    >
                      {showPasswordCurrent ? (
                        <AiOutlineEye
                          style={{
                            position: "absolute",
                            top: "60%",
                            right: "4%",
                          }}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          style={{
                            position: "absolute",
                            top: "60%",
                            right: "4%",
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div style={{ position: "relative" }}>
                    <h5 className="SetModalHead mt-4">New Password</h5>
                    <Field
                      name="password"
                      type={showPasswordNew ? "text" : "password"}
                      className="SetModalIpt"
                      placeholder="•••••••••••••"
                    />
                    {errors.password || touched.password ? (
                      <div className="formikerror1">{errors.password}</div>
                    ) : (
                      <div style={{ height: "2px" }}>
                        <p className="passReq">
                          You can use letters, numbers &amp; periods.
                        </p>
                      </div>
                    )}
                    <div
                      onClick={(e) => showPass("Confirm", "2")}
                      className="shoowpass"
                      style={{ cursor: "pointer" }}
                    >
                      {showPasswordNew ? (
                        <AiOutlineEye
                          style={{
                            position: "absolute",
                            top: "60%",
                            right: "4%",
                          }}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          style={{
                            position: "absolute",
                            top: "60%",
                            right: "4%",
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div style={{ position: "relative" }}>
                    <h5 className="SetModalHead mt-4">Confirm Password</h5>
                    <Field
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className="SetModalIpt"
                      placeholder="•••••••••••••"
                    />
                    {errors.confirmPassword || touched.confirmPassword ? (
                      <div className="formikerror1">
                        {errors.confirmPassword}
                      </div>
                    ) : (
                      <div style={{ height: "2px" }}></div>
                    )}
                    <div
                      onClick={(e) => showPass("Confirm", e)}
                      className="shoowpass"
                      style={{ cursor: "pointer" }}
                    >
                      {showConfirmPassword ? (
                        <AiOutlineEye
                          style={{
                            position: "absolute",
                            top: "60%",
                            right: "4%",
                          }}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          style={{
                            position: "absolute",
                            top: "60%",
                            right: "4%",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
                  <button className="btn btnSetModal" type="submit">
                    Save Changes
                  </button>
                </Modal.Footer>
              </Form>
            </>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default EditPwd;
