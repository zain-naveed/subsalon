import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { nameOnly } from "../../../Shared/Formik/formik";
import "../Settings.css";


function EditName({ handleChange, names }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleeSubmit = (value) => {
    handleChange('name', value)
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
            <h3 className="SetModalTitle">Edit Name</h3>
          </Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={nameOnly}
          onSubmit={values => {
            // 
            handleeSubmit(values.name)
            // setName(values.name);
          }}
        >
          {({ errors, touched, handleSubmit }) => (<>
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <h5 className="SetModalHead">Enter your name</h5>
                <Field name="name" className='SetModalIpt' placeholder={names} />
                {errors.name || touched.name ? (
                  <div className='formikerror1' >{errors.name}</div>
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

export default EditName;