import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { licenseValidation } from "../../../Shared/Formik/formik"
import { Formik, Form, Field } from 'formik';
cimport "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from 'react-redux'
import { license } from "../../../Shared/Redux/Slicers/licenseSlice";
import { MDBPagination } from "mdb-react-ui-kit";
import Experience from "./experience";




const Modals = ({ title, buttonTxt }) => {
  const [license, setLicense] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [show, setShow] = useState(false);
  const [startYear, setStartYear] = useState(new Date());
  const [endYear, setEndYear] = useState(new Date());
  const [ChildData, setChildData] = useState({})


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const submitForm = (values) => {
    const { licenseTitle, licenseNo } = values;
  }

  return (
    <>
      <button variant="primary" onClick={handleShow} className="btn btnSection mb-4">
        {buttonTxt}
      </button>

      <Formik
        initialValues={{
          licenseTitle: '',
          licenseNo: '',
        }}
        validationSchema={licenseValidation}
        onSubmit={values => {
          setLicenseNo(values.licenseNo);
          setLicense(values.licenseTitle);
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            {title == "Your License" ? <Modal className="contentModal" show={show} onHide={handleClose}>
              <Modal.Header closeButton style={{ borderBottom: "none" }}>
                <Modal.Title style={{ fontSize: "18px" }}>{buttonTxt}</Modal.Title>
              </Modal.Header>
              <Form onSubmit={submitForm(values)}>
                <Modal.Body>
                  <div>
                    <h1 className="modalText">License Title: </h1>
                    <Field name="licenseTitle" className="w-100 inputInd" type="text" onChange={handleChange} />
                    {errors.licenseTitle || touched.licenseTitle ? (
                      <div className="formikLicense">{errors.licenseTitle}</div>
                    ) : <div className="modalSpacing"></div>}
                  </div>
                  <div>
                    <h1 className="modalText">License #: </h1>
                    <Field name="licenseNo" className="w-100 inputInd" type="text" onChange={handleChange} />
                    {errors.licenseNo || touched.licenseNo ? (
                      <div className="formikLicense">{errors.licenseNo}</div>
                    ) : <div className="modalSpacing"></div>}
                  </div>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: "none" }}>
                  <Button type="submit" variant="primary" onClick={handleSubmit} className="btn btnSection w-100">
                    Add License
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal> : ""
            }

            {title == "Your Experience" ?
              <Modal className="contentModal" show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ borderBottom: "none" }}>
                  <Modal.Title style={{ fontSize: "18px" }}>{buttonTxt}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitForm(values)}>
                  <Modal.Body className="calenderDiv">
                    <div>
                      <h1 className="modalText">Starting Year: </h1>
                      <DatePicker
                        className="datepick"
                        selected={startYear}
                        onChange={(date) => setStartYear(date)}
                        showYearPicker
                        dateFormat="yyyy"
                      />
                    </div>
                    <div>
                      <h1 className="modalText">Ending Year: </h1>
                      <DatePicker
                        className="datepick"
                        selected={endYear}
                        onChange={(date) => setEndYear(date)}
                        showYearPicker
                        dateFormat="yyyy"
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Footer style={{ borderTop: "none" }}>
                    <Button type="submit" variant="primary" onClick={handleSubmit} className="btn btnSection w-100">
                      Add Experience
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal> : ""
            }
            {title == "Additional Certificates" ?
              <Modal className="contentModal" show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ borderBottom: "none" }}>
                  <Modal.Title style={{ fontSize: "18px" }}>{buttonTxt}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitForm(values)}>
                  <Modal.Body className="calenderDiv">
                    <div>
                      <h1 className="modalText">Starting Year: </h1>
                      <DatePicker
                        selected={startYear}
                        onChange={(date) => setStartYear(date)}
                        showYearPicker
                        dateFormat="yyyy"
                      />
                    </div>
                    <div>
                      <h1 className="modalText">Ending Year: </h1>
                      <DatePicker
                        selected={endYear}
                        onChange={(date) => setEndYear(date)}
                        showYearPicker
                        dateFormat="yyyy"
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Footer style={{ borderTop: "none" }}>
                    <Button type="submit" variant="primary" onClick={handleSubmit} className="btn btnSection w-100">
                      Add Experience
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal> : ""
            }
          </>)}
      </Formik>
    </>
  );
}

export default Modals;