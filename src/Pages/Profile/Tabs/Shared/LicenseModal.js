import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { licenseValidation } from "../../../../Shared/Formik/formik";
import { Formik, Form, Field } from 'formik';




const LicenseModal = ({ handleChange }) => {
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleeSubmit = (value) => {
    handleChange(value)
    handleClose();
  }

  return (
    <>
      <button variant="primary" onClick={handleShow} className="btn btnSection mb-4">
        + Add License
      </button>

      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        validationSchema={licenseValidation}
        onSubmit={(values, { resetForm }) => {
          handleeSubmit(values);
          resetForm();
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <Modal className="contentModal" show={show} onHide={handleClose}>
              <Modal.Header closeButton style={{ borderBottom: "none" }}>
                <Modal.Title style={{ fontSize: "18px" }}>Add License</Modal.Title>
              </Modal.Header>
              <Form onSubmit={handleSubmit}>
                <Modal.Body>
                  <div>
                    <h1 className="modalText">License Title: </h1>
                    <Field name="name" className="w-100 inputInd" type="text" onChange={handleChange} placeholder="Hair Stylist" />
                    {errors.name || touched.name ? (
                      <div className="formikLicense mb-2 mt-1" style={{ height: "10px" }}>{errors.name}</div>
                    ) : <div className="modalSpacing" style={{ height: "10px" }}></div>}
                  </div>
                  <div>
                    <h1 className="modalText">License #: </h1>
                    <Field name="number" className="w-100 inputInd" type="text" onChange={handleChange} placeholder="EH23664876" />
                    {errors.number || touched.number ? (
                      <div className="formikLicense mt-1" style={{ height: "10px" }}>{errors.number}</div>
                    ) : <div className="modalSpacing" style={{ height: "10px" }}></div>}
                  </div>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: "none" }}>
                  <button type="submit" variant="primary" className="btn btnSection w-100">
                    Add License
                  </button>
                </Modal.Footer>
              </Form>
            </Modal>
          </>)}
      </Formik>
    </>
  );
}

export default LicenseModal;