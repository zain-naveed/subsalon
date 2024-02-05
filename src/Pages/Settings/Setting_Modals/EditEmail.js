import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import { emailAndPassword } from "../../../Shared/Formik/formik";
import "../Settings.css";



function EditEmail({ handleChange }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleeSubmit = (value) => {
    handleChange('email', value)
    handleClose();
  }

  return (
    <>
      <h3 className="settingsEdit" variant="primary" onClick={handleShow}>
        Edit
      </h3>

      <Modal style={{ marginTop: "10%" }} className="ModalMobile" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 className="SetModalTitle">Edit Email Address</h3>
          </Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={emailAndPassword}
          onSubmit={values => {
            // 
            handleeSubmit(values.email);
          }}
        >
          {({ errors, touched, handleSubmit }) => (
            <>
              <Form onSubmit={handleSubmit}>
                <Modal.Body>
                  <h5 className="SetModalHead">Enter your new email</h5>
                  <Field name="email" className='SetModalIpt' placeholder="johndoe@email.com" />
                  {errors.email || touched.email ? (
                    <div className='formikerror1' >{errors.email}</div>
                  ) : <div style={{ height: "2px" }}></div>
                  }

                  <h5 className="SetModalHead mt-4">Password</h5>
                  <Field name="password" type="password" className='SetModalIpt' placeholder="•••••••••••••" />
                  {errors.password || touched.password ? (
                    <div className='formikerror1' >{errors.password}</div>
                  ) : <div style={{ height: "2px" }}></div>
                  }
                </Modal.Body>
                <Modal.Footer>
                  {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
                  <Button className="btn btnSetModal" type="submit">
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            </>)}
        </Formik>

      </Modal>
    </>
  );
}

export default EditEmail;