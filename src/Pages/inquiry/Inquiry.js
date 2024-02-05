import React, { useState } from "react";
import "./Inquiry.css";
import { Card, Button, Form } from "react-bootstrap";
import InquiryUpload from "./InquiryUpload";
import { store } from "../../Shared/Redux/store";
import { inquiryFeedbackService } from "../../Shared/Services/all_proffessional";
import { Formik, Field } from "formik";
import { inquireFeedbackValidation } from "../../Shared/Formik/formik";
import { toastMessage } from "../../Shared";
import CircularProgress from "@mui/material/CircularProgress";

function Inquiry() {
  const {
    user: { user, status, tokens },
  } = store.getState().root;
  const [filesArr, setFilesArr] = useState([]);
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState([]);
  const [removeArrImg, setRemoveArrImg] = useState([]);
  const [validated, setValidated] = useState(false);

  
  const handleImages = (images, URLs) => {
    setFilesArr(images);
  };
  return (
    <div className="inquiry">
      <div className="inquiry_card">
        <Card
          style={{
            width: "562px",
            height: "auto",
            justifyContent: "center",
            alignItems: "center",
            // marginTop:'65px'
          }}
        >
          <Card.Title className="text-center inquiry_cardtitle">
            Inquiry &amp; Feedback
          </Card.Title>
          <div className="inquiry_cardBody">
            <Card.Body>
              <Formik
                initialValues={{
                  email: "",
                  reason: "",
                  description: "",
                }}
                validationSchema={inquireFeedbackValidation}
                onSubmit={(values, methods) => {
                  let obj = {
                    ...values,
                  };
                  if (filesArr.length) {
                    obj["attachments"] = filesArr;
                  }
                  setLoader(true);
                  // same shape as initial values
                  inquiryFeedbackService(obj)
                    .then(() => {
                      methods.resetForm();
                      setRemoveArrImg([]);
                      setFilesArr([]);
                      setImages([]);
                      toastMessage(
                        "success",
                        "Inquiry & Feedback has been successfully submitted"
                      );
                    })
                    .catch((err) => {})
                    .finally(() => setLoader(false));
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  setFieldValue,
                  handleSubmit,
                  resetForm,
                }) => (
                  <>
                    {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="inquiry_email">
                        Email address
                      </Form.Label>
                      <span className="reqAsterik">*</span>
                      <Field
                        placeholder="Enter email"
                        className="inquiry_emailinpt form-control"
                        type="email"
                        name="email"
                      />
                      {errors.email && touched.email ? (
                        <div className="formikerror">{errors.email}</div>
                      ) : null}
                      {/* <Form.Control value={email} type="email" onChange={(e=> setEmail(e.target.value))} placeholder="Enter email" className='inquiry_emailinpt' required /> */}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label className="inquiry_suport">
                        Support Reason
                      </Form.Label>
                      <span className="reqAsterik">*</span>
                      <Field
                        placeholder="Enter reason"
                        className="inquiry_emailinpt form-control"
                        type="text"
                        name="reason"
                      />
                      {errors.reason && touched.reason ? (
                        <div className="formikerror">{errors.reason}</div>
                      ) : null}
                      {/* <Form.Control
                    value={reason}
                    type="text"
                    placeholder="bug found"
                    onChange={(e) => setReason(e.target.value)}
                    className="inquiry_suportinpt"
                    required
                  /> */}
                    </Form.Group>
                    <Form.Label className="inquiry_attachment">
                      Attachment
                    </Form.Label>
                    <div>
                      <Form.Text className="text-muted inquiry_attachmentMute">
                        Upload Format: PDF, JPEG, JPG &amp; PNG
                      </Form.Text>
                    </div>
                    <Form.Group
                      className="mb-3 upload"
                      controlId="formBasicCheckbox"
                    >
                      <InquiryUpload
                        filesArr={filesArr}
                        setFilesArr={setFilesArr}
                        images={images}
                        setImages={setImages}
                        removeArrImg={removeArrImg}
                        setRemoveArrImg={setRemoveArrImg}
                        photoArr={{}}
                        handleImages={handleImages}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Label className="inquiry_descrip">
                        Description
                      </Form.Label>
                      <span className="reqAsterik">*</span>
                      <textarea
                        value={values.description}
                        style={{ height: "100px", resize: "none" }}
                        className="inquiry_emailinpt form-control"
                        onChange={(e) =>
                          setFieldValue("description", e.target.value)
                        }
                        placeholder="Enter description"
                      ></textarea>

                      {errors.description && touched.description ? (
                        <div className="formikerror">{errors.description}</div>
                      ) : null}
                    </Form.Group>
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        size="lg"
                        className="inquiry_btn"
                        onClick={() => handleSubmit(10)}
                        disabled={loader}
                      >
                        {loader ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </div>
                    {/* </Form> */}
                  </>
                )}
              </Formik>
            </Card.Body>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Inquiry;
