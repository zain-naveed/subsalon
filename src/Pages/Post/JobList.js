// import React, { useState } from "react";
// import "./JobList.css";
// import {
//   Card,
//   Form,
//   Row,
//   Col,
//   Button,
//   FormCheck,
//   Input,
//   Container
// } from "react-bootstrap";
// import { BsCircleFill } from "react-icons/bs";
// import Tags from "../Profile/Tabs/Tags";
// import DatePicker from "react-datepicker";
// import moment from "moment";
// import { jobType, jobStatus, jobRequestEnum } from "../../Shared/util/constant";
// import { PostAJob } from "../../Shared/Formik/formik";
// import { Formik, Form as Forms, Field } from "formik";
// import { toastMessage } from "../../Shared/Components/Toast/Toast";
// import { useSelector } from "react-redux";
// import { store } from "../../Shared/Redux/store";
// import { Spinner } from "react-bootstrap";
// import { PostAJobServices } from "../../Shared";
// import { useNavigate } from "react-router-dom";
// import { addDays } from "date-fns";
// import { useLocation } from "react-router";
// import FreeSolo from "../autocomplete/FreeSolo";
// import Services from "../../Pages/autocomplete/Services.json"
// import Products from "../../Pages/autocomplete/Products.json"

// const JobList = () => {
//   const { user } = store.getState().root;
//   const navigate = useNavigate();
//   const locat = useLocation();
//

//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(null);
//   const onChange = (dates) => {
//     const [start, end] = dates;
//     setStartDate(start);
//     setEndDate(end);
//   };

//   const [tempJob, SetTempJob] = useState(false);

//   const [application, setApplication] = useState(
//     locat?.state?.post?.jobAvailabilityBool
//       ? locat?.state?.post?.jobAvailabilityBool
//       : jobRequestEnum.accepted
//   );
//   const [salonId, setSalonId] = useState(
//     user?.user?.saloon._id ? user?.user?.saloon._id : ""
//   );
//   const [jobDesc, setJobDesc] = useState("");
//   const [servicesTag, setServicesTags] = useState(
//     locat?.state?.post?.jobServices ? locat?.state?.post?.jobServices : []
//   );
//   const [check, setCheck] = useState(true);
//   const [status1, setStatus1] = useState(
//     locat?.state?.post?.jobStatus
//       ? locat?.state?.post?.jobStatus
//       : jobStatus.Open
//   );
//   const [maxRate, setMaxRate] = useState(0);
//   const [type, setType] = useState(
//     locat?.state?.post?.jobType ? locat?.state?.post?.jobType : jobType.fullTime
//   );
//   const [checkDeadline, setCheckDeadline] = useState("");
//   const [deadline, setDeadline] = useState(
//     locat?.state?.post?.jobAvailabilityDate
//       ? new Date(locat?.state?.post?.jobAvailabilityDate)
//       : new Date()
//   );
//   const [status, setStatus] = useState(jobStatus.Open);
//   const [covid, setCovid] = useState(
//     locat?.state?.post?.covidCertificate
//       ? locat?.state?.post?.covidCertificate
//       : false
//   );
//   const [tag, setTag] = useState();
//   const [loader, setLoader] = useState(false);
//   const [rate, setRate] = useState(
//     locat?.state?.post?.minRate && locat?.state?.post?.maxRate
//       ? { min: locat.state.post.minRate, max: locat.state.post.maxRate }
//       : { min: "", max: "" }
//   );
//   const [comm, setComm] = useState(false);

//
//   const load = (e) => {
//     e.preventDefault();
//   };

//   const handleChecked = (e) => {
//     setType(e.target.value);
//   };

//   const handleState = (key, value) => {
//     setServicesTags(value);
//   };

//   const deadLine = (evt) => {
//     setApplication(evt.target.value);
//   };
//   const checking = (svnt) => {
//     setStatus1(svnt.target.value);
//   };

//   const temporaryJob = (svnt) => {
//

//     if (svnt.target.value == "true") {
//       SetTempJob(true);
//     } else {
//       SetTempJob(false);
//     }
//   };

//   const Covinding = (evnt) => {
//     setCovid(!covid);
//   };

//   const SettingCommission = (e) => {
//     if (e.target.value == "Commission") {
//       setComm(true);
//     }
//     else if (e.target.value == "Per Hour") {
//       setComm(false);
//     }
//   }

//   const handleSubmit = (values) => {
//
//     if (Number(values.Minimum) > Number(values.Maximum)) {
//       toastMessage("error", "Minimum Rate can't be higher than maximum Rate");
//     } else {
//       let obj = {
//         jobTitle: values.JobTitle,
//         jobDescription: values.JobDescription,
//         jobServices: servicesTag,
//         minRate: values.Minimum,
//         maxRate: values.Maximum,
//         jobType: type,
//         jobStatus: status1,
//         // covidCertificate: covid,
//         reqEquip: values.reqEquip,
//         saloon: salonId,
//       };
//       if (application == "true" || application == true) {
//         obj["jobAvailabilityBool"] = true;
//         obj["jobAvailabilityDate"] = moment(deadline).format();
//       } else {
//         obj["jobAvailabilityBool"] = false;
//       }

//       if (locat?.state != null) {
//         obj["jobId"] = locat.state.post._id;
//       }

//

//       setLoader(true);

//       PostAJobServices(obj)
//         .then(({ data }) => {
//           {
//             locat?.state?.post?._id
//               ? toastMessage("success", "Job Update Successfully!")
//               : toastMessage("success", "Job Create Successfully!");
//           }
//           navigate("/owner/jobs");
//         })
//         .catch((er) => {
//           toastMessage("error", er?.response?.data?.message);
//         })
//         .finally(() => setLoader(false));
//     }
//   };

//   return (
//     <div
//       className={user?.user?.isSubscription ? "joblist" : "joblist blurReviews"}
//     >
//       <div className="joblist_body">
//         <Formik
//           initialValues={{
//             JobTitle: locat?.state?.post?.jobTitle
//               ? locat?.state?.post?.jobTitle
//               : "",
//             JobDescription: locat?.state?.post?.jobDescription
//               ? locat?.state?.post?.jobDescription
//               : "",
//             reqEquip: locat?.state?.post?.reqEquip
//               ? locat?.state?.post?.reqEquip
//               : "",
//             // Equipment: locat?.state?.post?.Equipment ? locat?.state?.post?.Equipment : "",
//             Maximum: locat?.state?.post?.maxRate
//               ? locat?.state?.post?.maxRate
//               : "",
//             Minimum: locat?.state?.post?.minRate
//               ? locat?.state?.post?.minRate
//               : "",
//             tag: locat?.state?.post?.jobServices
//               ? locat?.state?.post?.jobServices
//               : [],
//             // terms: false,
//           }}
//           validationSchema={PostAJob}
//           onSubmit={(values) => {
//             setRate({
//               max: values.Maximum,
//               min: values.Minimum,
//             });
//             handleSubmit(values);
//           }}
//         >
//           {({
//             values,
//             errors,
//             touched,
//             handleChange,
//             handleSubmit,
//             setFieldValue,
//           }) => (
//             <>
//               <Forms
//                 noValidate
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   handleSubmit();
//                 }}
//               >
//                 <div className="joblist_text">
//                   <h3 className="joblist_texth">Post a Job</h3>
//                 </div>
//                 <div className="joblist_card">
//                   <div className="joblist_card1">
//                     <Card
//                       style={{ width: "530px" }}
//                       className="joblist_card1_side"
//                     >
//                       <Card.Header
//                         as="h5"
//                         style={{ background: "#29B57A", color: "#FFFFFF" }}
//                       >
//                         <span className="text-in-post">Describe Job</span>
//                       </Card.Header>
//                       <Card.Body>
//                         {

//                         <Form>
//                           <Form.Group
//                             className="mb-3"
//                             controlId="exampleForm.ControlInput1"
//                           >
//                             <div style={{ display: "flex" }}>
//                               <Form.Label className="post-heading pt-4">
//                                 Job Title
//                               </Form.Label>
//                               <span className="reqAsterik">*</span>
//                             </div>

//                             <Field
//                               type="text"
//                               placeholder="Spa Receptionist - Full Time"
//                               className="joblist_field1"
//                               name="JobTitle"
//                               value={values.JobTitle}
//                               isValid={touched.JobTitle && !errors.JobTitle}
//                             />
//                             {errors.JobTitle && touched.JobTitle ? (
//                               <div className="formikerror_show">
//                                 {errors.JobTitle}
//                               </div>
//                             ) : (
//                               <div style={{ height: "2px" }}></div>
//                             )}
//                           </Form.Group>
//                           <Form.Group
//                             className="mb-3"
//                             controlId="exampleForm.ControlTextarea2"
//                           >
//                             <Form.Label className="post-heading">
//                               Job Description
//                             </Form.Label>
//                             <span className="reqAsterik">*</span>
//                             <Field
//                               as="textarea"
//                               rows={3}
//                               placeholder="Enter job description"
//                               name="JobDescription"
//                               value={values.JobDescription}
//                               onChange={handleChange}
//                               className="joblist_field2"
//                               isValid={
//                                 touched.JobDescription && !errors.JobDescription
//                               }
//                             />
//                             {errors.JobDescription && touched.JobDescription ? (
//                               <div className="formikerror_show">
//                                 {errors.JobDescription}
//                               </div>
//                             ) : (
//                               <div style={{ height: "2px" }}></div>
//                             )}
//                           </Form.Group>
//                           <Form.Group
//                             className="mb-3"
//                             controlId="exampleForm.ControlTextarea2"
//                           >
//                             <Form.Label className="post-heading">
//                               Required equipment
//                             </Form.Label>
//                             <span className="reqAsterik">*</span>
//                             <Field
//                               as="textarea"
//                               rows={3}
//                               placeholder="Please mention required equipment(s) to bring to job."
//                               name="reqEquip"
//                               value={values.reqEquip}
//                               onChange={handleChange}
//                               className="joblist_field2"
//                               isValid={touched.reqEquip && !errors.reqEquip}
//                             />
//                             {errors.reqEquip && touched.reqEquip ? (
//                               <div className="formikerror_show">
//                                 {errors.reqEquip}
//                               </div>
//                             ) : (
//                               <div style={{ height: "2px" }}></div>
//                             )}
//                           </Form.Group>
//                           <Form.Group>
//                             <Form.Label className="post-heading">
//                               Add services required for the job
//                             </Form.Label>
//                             <span className="reqAsterik">*</span>
//                             <Tags
//                               title="posts"
//                               handleState={handleState}
//                               tags={servicesTag}
//                               formikField={setFieldValue}
//                               form={tag}
//                               setForm={setTag}
//                               isValid={touched.tag && !errors.tag}
//                               tag={tag}
//                               errors={errors}
//                               touched={touched}
//                               arr={Services}
//                             />
//                             {/* {errors.tag && touched.tag ? (
//                               <div className="formikerror_show w-100  ">
//                                 {errors.tag}
//                               </div>
//                             ) : (
//                               <div style={{ height: "2px" }}></div>
//                             )} */}
//                             {/* <Field name="lastName" placeholder="Doe" component={MyInput} /> */}
//                           </Form.Group>
//                         </Form>
//                       </Card.Body>
//                     </Card>
//                     <Card
//                       style={{ width: "300px", height: "260px" }}
//                       className="card1_child"
//                     >
//                       <Card.Body>
//                         <Container>
//                           <Card.Title className="jobPreviewTitle">
//                             Job Preview
//                           </Card.Title>
//                           <Form>
//                             <Row className="mb-2 custums">
//                               <Form.Group
//                                 as={Col}
//                                 controlId="exampleForm.ControlTextarea3"
//                                 className="col1"
//                               >
//                                 <Form.Label className="list_col1">
//                                   Status
//                                 </Form.Label>
//                               </Form.Group>
//                               <Form.Group
//                                 as={Col}
//                                 controlId="exampleForm.ControlTextarea4"
//                                 className="col2"
//                               >
//                                 <div className="list_icon">
//                                   <Form.Label>
//                                     <BsCircleFill
//                                       style={
//                                         status1 == "Open"
//                                           ? { color: "#00800099", width: "8px" }
//                                           : { color: "red", width: "8px" }
//                                       }
//                                     />
//                                   </Form.Label>
//                                   <Form.Label className="list_col2">
//                                     {status1}
//                                   </Form.Label>
//                                 </div>
//                               </Form.Group>
//                             </Row>
//                             <Row className="mb-2 custums">
//                               <Form.Group
//                                 as={Col}
//                                 controlId="exampleForm.ControlTextarea5"
//                                 className="col1"
//                               >
//                                 <Form.Label className="list_col1">
//                                   Application deadline
//                                 </Form.Label>
//                               </Form.Group>
//                               <Form.Group
//                                 as={Col}
//                                 controlId="exampleForm.ControlTextarea6"
//                                 className="col2"
//                               >
//                                 <Form.Label className="list_col2">
//                                   {application == "true" || application == true
//                                     ? moment(deadline).format("D MMM, YYYY")
//                                     : "N/A"}
//                                 </Form.Label>
//                               </Form.Group>
//                             </Row>
//                             <Row className="mb-2 custums">
//                               <Form.Group
//                                 as={Col}
//                                 controlId="exampleForm.ControlTextarea7"
//                                 className="col1"
//                               >
//                                 <Form.Label className="list_col1">
//                                   Job Posted On
//                                 </Form.Label>
//                               </Form.Group>
//                               <Form.Group
//                                 as={Col}
//                                 controlId="exampleForm.ControlTextarea8"
//                                 className="col2"
//                               >
//                                 <Form.Label className="list_col2">
//                                   {locat?.state?.post?.createdAt
//                                     ? moment(
//                                       new Date(locat?.state?.post?.createdAt)
//                                     ).format("D MMM, YYYY")
//                                     : moment(new Date()).format("D MMM, YYYY")}
//                                 </Form.Label>
//                               </Form.Group>
//                             </Row>
//                             <Row className="mb-2 custums">
//                               <Form.Group
//                                 as={Col}
//                                 controlId="exampleForm.ControlTextarea9"
//                                 className="col1"
//                               >
//                                 <Form.Label className="list_col1">
//                                   Job Type
//                                 </Form.Label>
//                               </Form.Group>
//                               <Form.Group
//                                 as={Col}
//                                 controlId="exampleForm.ControlTextarea10"
//                                 className="col2"
//                               >
//                                 <Form.Label className="list_col2">
//                                   {type}
//                                 </Form.Label>
//                               </Form.Group>
//                             </Row>
//                             <Row className="mb-2 custums">
//                               <Form.Group
//                                 as={Col}
//                                 controlId="exampleForm.ControlTextarea11"
//                                 className="col1"
//                               >
//                                 <Form.Label className="list_col1">
//                                   Salary
//                                 </Form.Label>
//                               </Form.Group>
//                               <Form.Group
//                                 as={Col}
//                                 controlId="exampleForm.ControlTextarea12"
//                                 className="col2"
//                               >
//                                 <Form.Label className="list_col2">
//                                   ${rate.min} - {rate.max}/ hour
//                                 </Form.Label>
//                               </Form.Group>
//                             </Row>
//                             {/* <Row className="mb-2">
//                             <Form.Group as={Col} controlId="exampleForm.ControlTextarea11">
//                               <Form.Label className="list_col1">Covid Certificate</Form.Label>
//                           <Row className="mb-2 custums">
//                             <Form.Group
//                               as={Col}
//                               controlId="exampleForm.ControlTextarea11"
//                               className="col1"
//                             >
//                               <Form.Label className="list_col1">
//                                 Covid Certificate
//                               </Form.Label>
//                             </Form.Group>
//                             <Form.Group
//                               as={Col}
//                               controlId="exampleForm.ControlTextarea12"
//                               className="col2"
//                             >
//                               <Form.Label className="list_col2">
//                                 {covid ? "Required" : "Not Required"}
//                               </Form.Label>
//                             </Form.Group>
//                           </Row> */}
//                           </Form>
//                         </Container>
//                       </Card.Body>
//                     </Card>
//                   </div>
//                   <div className="joblist_card2">
//                     <Card style={{ width: "530px" }}>
//                       <Card.Header
//                         as="h5"
//                         style={{ background: "#29B57A", color: "#FFFFFF" }}
//                       >
//                         <span className="text-in-post ">What is the pay?</span>
//                       </Card.Header>
//                       <Card.Body>
//                         <Form>
//                           <Row className="mb-3">
//                             <Col>
//                               <Form.Group
//                                 as={Col}
//                                 md="4"
//                                 controlId="exampleForm.ControlInput2"
//                               >
//                                 <div style={{ display: "flex" }}>
//                                   <Form.Label className="post-heading">
//                                     Minimum
//                                   </Form.Label>
//                                   <span
//                                     className="reqAsterik"
//                                     style={{ marginTop: "-6px" }}
//                                   >
//                                     *
//                                   </span>
//                                 </div>
//                                 <Field
//                                   type="number"
//                                   placeholder="$ 10"
//                                   min={1}
//                                   max={9999}
//                                   style={{ width: "140px" }}
//                                   name="Minimum"
//                                   value={values.Minimum}
//                                   className="joblist_field3"
//                                   onChange={(e) => {
//                                     if (e.target.value <= 9999) {
//                                       setFieldValue("Minimum", e.target.value);
//                                       setRate({
//                                         ...rate,
//                                         min: e.target.value,
//                                       });
//                                     }
//                                   }}
//                                 />
//                                 {errors.Minimum && touched.Minimum ? (
//                                   <div
//                                     className="formikerror_show pt-0"
//                                     style={{ width: "150px" }}
//                                   >
//                                     {errors.Minimum}
//                                   </div>
//                                 ) : (
//                                   <div style={{ height: "2px" }}></div>
//                                 )}
//                               </Form.Group>
//                             </Col>
//                             <Col>
//                               <Form.Group
//                                 as={Col}
//                                 md="4"
//                                 controlId="exampleForm.ControlInput4"
//                               >
//                                 <div style={{ display: "flex" }}>
//                                   <Form.Label className="post-heading">
//                                     Maximum
//                                   </Form.Label>
//                                   <span
//                                     className="reqAsterik"
//                                     style={{ marginTop: "-6px" }}
//                                   >
//                                     *
//                                   </span>
//                                 </div>
//                                 <Field
//                                   type="number"
//                                   placeholder="$ 40"
//                                   min={1}
//                                   style={{ width: "140px" }}
//                                   name="Maximum"
//                                   value={values.Maximum}
//                                   className="joblist_field3"
//                                   max="9999"
//                                   onChange={(e) => {
//                                     if (e.target.value <= 9999) {
//                                       setFieldValue("Maximum", e.target.value);
//                                       setRate({
//                                         ...rate,
//                                         max: e.target.value,
//                                       });
//                                     }
//                                   }}
//                                 // isValid={touched.Minimum && !errors.Minimum}
//                                 />
//                                 {errors.Maximum && touched.Maximum ? (
//                                   <div
//                                     className="formikerror_show pt-0"
//                                     style={{ width: "150px" }}
//                                   >
//                                     {errors.Maximum}
//                                   </div>
//                                 ) : (
//                                   <div style={{ height: "2px" }}></div>
//                                 )}
//                               </Form.Group>
//                             </Col>

//                             <Col>
//                               <Form.Group
//                                 as={Col}
//                                 md="4"
//                                 controlId="exampleForm.ControlInput3"
//                               >
//                                 <Form.Label className="post-heading">
//                                   Rate
//                                 </Form.Label>
//                                 {/* <Form.Control type="number" placeholder="Per hour" min={1} /> */}
//                                 <Form.Select
//                                   onChange={(e) => SettingCommission(e)}
//                                   aria-label="Default select example dropPro"
//                                   style={{ width: "140px" }}
//                                 >
//                                   <option name="hourRate">Per Hour</option>
//                                   <option name="Commission">Commission</option>
//                                 </Form.Select>
//                               </Form.Group>
//                             </Col>
//                           </Row>
//                         </Form>
//                       </Card.Body>
//                     </Card>
//                   </div>
//                   <div className="joblist_card3">
//                     <Card style={{ width: "530px", height: "auto" }}>
//                       <Card.Header
//                         as="h5"
//                         style={{ background: "#29B57A", color: "#FFFFFF" }}
//                       >
//                         <span className="text-in-post ">
//                           Application Preferences
//                         </span>
//                       </Card.Header>
//                       <Card.Body>
//                         <Form>
//                           <Form.Group controlId="exampleForm.ControlTextarea13">
//                             {/* <Form.Label className="post-heading">
//                               Is this temporary job ?
//                             </Form.Label>
//                             {["radio"].map((type) => (
//                               <div key={`default-${type}`} className="mb-3">
//                                 <Form.Check
//                                   className="form-check1"
//                                   onChange={(e) => temporaryJob(e)}
//                                   type={type}
//                                   id={`default-${type}`}
//                                   label={`Yes`}
//                                   name="group5"
//                                   value={true}
//                                   defaultChecked={false}
//                                 />
//                                 {tempJob == "true" ||
//                                   tempJob == true ? (
//                                   <Row className="mb-3 mt-3">
//                                     <Form.Group
//                                       as={Col}
//                                       md="4"
//                                       controlId="exampleForm.ControlInput14"
//                                     >
//                                       <div
//                                         style={{
//                                           marginBottom: "-10px",
//                                           marginTop: "-10px",
//                                         }}
//                                       >
//                                         <DatePicker
//                                           className="inputInd w-100"
//                                           dateFormat="d MMMM"
//                                           selected={startDate}
//                                           onChange={onChange}
//                                           startDate={startDate}
//                                           endDate={endDate}
//                                           minDate={addDays(new Date(), 0)}
//                                           selectsRange
//                                         />
//                                       </div>
//                                     </Form.Group>
//                                   </Row>
//                                 ) : (
//                                   ""
//                                 )}
//                                 <Form.Check
//                                   className="form-check1"
//                                   onChange={(e) => temporaryJob(e)}
//                                   type={type}
//                                   id={`default-${type}`}
//                                   label={`No`}
//                                   name="group5"
//                                   value={false}
//                                   defaultChecked={true}
//                                 />
//                               </div>
//                             ))} */}
//                             {/* {
//                               tempJob == true || tempJob == "true" ? "" :
//                                 <> */}
//                             <Form.Label className="post-heading">
//                               Is this a full-time or part-time job?
//                             </Form.Label>
//                             {["radio"].map((type) => (
//                               <div key={`default-${type}`} className="mb-3">
//                                 <Form.Check
//                                   className="form-check1"
//                                   onChange={(e) => handleChecked(e)}
//                                   type={type}
//                                   id={`default-${type}`}
//                                   label={`Full-time`}
//                                   name="group1"
//                                   value={jobType.fullTime}
//                                   // defaultChecked={locat?.state?.post?.jobType == "Full-time" ? true : false}
//                                   defaultChecked={
//                                     locat?.state == null
//                                       ? true
//                                       : locat?.state?.post?.jobType ==
//                                         "Full-time"
//                                         ? true
//                                         : false
//                                   }
//                                 />
//                                 <Form.Check
//                                   className="form-check1"
//                                   onChange={(e) => handleChecked(e)}
//                                   type={type}
//                                   // name="terms"
//                                   id={`default-${type}`}
//                                   label={`Part-time`}
//                                   name="group1"
//                                   value={jobType.partTime}
//                                   defaultChecked={
//                                     locat?.state == null
//                                       ? false
//                                       : locat?.state?.post?.jobType ==
//                                         "Part-time"
//                                         ? true
//                                         : false
//                                   }
//                                 />
//                               </div>
//                             ))}
//                             {/* </>
//                             } */}
//                             <Form.Label
//                               className="post-heading"
//                               defaultValue="group3"
//                             >
//                               Job Status
//                             </Form.Label>
//                             {["radio"].map((type) => (
//                               <div key={`default-${type}`} className="mb-3">
//                                 <Form.Check
//                                   className="form-check1"
//                                   type={type}
//                                   id={`default-${type}`}
//                                   label={`Open`}
//                                   name="group3"
//                                   value={jobStatus.Open}
//                                   onChange={(e) => {
//                                     checking(e);
//                                   }}
//                                   defaultChecked={
//                                     locat?.state == null
//                                       ? true
//                                       : locat?.state?.post?.jobStatus ==
//                                         "Open" ||
//                                         locat?.state?.post?.jobStatus ==
//                                         "Re-open"
//                                         ? true
//                                         : false
//                                   }
//                                 />
//                                 <Form.Check
//                                   className="form-check1"
//                                   type={type}
//                                   id={`default-${type}`}
//                                   label={`Closed`}
//                                   name="group3"
//                                   value={jobStatus.Close}
//                                   onChange={(e) => {
//                                     checking(e);
//                                   }}
//                                   defaultChecked={
//                                     locat?.state == null
//                                       ? false
//                                       : locat?.state?.post?.jobStatus ==
//                                         "Closed"
//                                         ? true
//                                         : false
//                                   }
//                                 />
//                               </div>
//                             ))}
//                             <Form.Label className="post-heading">
//                               Is there an application deadline?
//                             </Form.Label>
//                             {["radio"].map((type) => (
//                               <div key={`default-${type}`} className="mb-3">
//                                 <Form.Check
//                                   className="form-check1"
//                                   onChange={(e) => deadLine(e)}
//                                   type={type}
//                                   id={`default-${type}`}
//                                   label={`Yes`}
//                                   name="group2"
//                                   value={true}
//                                   defaultChecked={
//                                     locat?.state == null
//                                       ? false
//                                       : locat?.state?.post
//                                         ?.jobAvailabilityBool == true
//                                         ? true
//                                         : false
//                                   }
//                                 />
//                                 {application == "true" ||
//                                   application == true ? (
//                                   <Row className="mb-3 mt-3">
//                                     <Form.Group
//                                       as={Col}
//                                       md="4"
//                                       controlId="exampleForm.ControlInput14"
//                                     >
//                                       {/* <Form.Control type="date" style={{ height: '75%' }} placeholder="date" /> */}
//                                       <div
//                                         style={{
//                                           marginBottom: "-10px",
//                                           marginTop: "-10px",
//                                         }}
//                                       >
//                                         <DatePicker
//                                           className="inputInd w-100"
//                                           selected={deadline}
//                                           disabled={false}
//                                           minDate={addDays(new Date(), 0)}
//                                           onChange={(secondDate) =>
//                                             setDeadline(secondDate)
//                                           }
//                                         />
//                                       </div>
//                                     </Form.Group>
//                                   </Row>
//                                 ) : (
//                                   ""
//                                 )}
//                                 <Form.Check
//                                   className="form-check1"
//                                   type={type}
//                                   id={`default-${type}`}
//                                   label={`No`}
//                                   name="group2"
//                                   value={false}
//                                   onChange={(e) => deadLine(e)}
//                                   defaultChecked={
//                                     locat?.state == null
//                                       ? true
//                                       : locat?.state?.post
//                                         ?.jobAvailabilityBool == false
//                                         ? true
//                                         : false
//                                   }
//                                 />
//                               </div>
//                             ))}
//                             {/* <Form.Label className="post-heading">Covid certificate required for the job?</Form.Label>
//                             {['radio'].map((type) => (
//                             <Form.Label className="post-heading">
//                               Covid certificate required for the job?
//                             </Form.Label>
//                             {["radio"].map((type) => (
//                               <div key={`default-${type}`} className="mb-3">
//                                 <Form.Check
//                                   className="form-check1"
//                                   type={type}
//                                   id={`default-${type}`}
//                                   label={`Yes`}
//                                   name="group4"
//                                   value={covid.yes}
//                                   onChange={(e) => setCovid(true)}
//                                   defaultChecked={
//                                     locat?.state == null
//                                       ? false
//                                       : locat?.state?.post?.covidCertificate
//                                       ? true
//                                       : false
//                                   }
//                                 />
//                                 <Form.Check
//                                   className="form-check1"
//                                   type={type}
//                                   id={`default-${type}`}
//                                   label={`No`}
//                                   name="group4"
//                                   value={covid.no}
//                                   onChange={(e) => setCovid(false)}
//                                   defaultChecked={
//                                     locat?.state == null
//                                       ? true
//                                       : locat?.state?.post?.covidCertificate
//                                       ? false
//                                       : true
//                                   }
//                                 />
//                               </div>
//                             ))} */}
//                           </Form.Group>
//                         </Form>
//                       </Card.Body>
//                     </Card>
//                   </div>
//                 </div>
//                 <div className="buton_side">
//                   <Button
//                     variant="primary"
//                     className="joblist_body_btn w-25"
//                     type="submit"
//                   >
//                     {loader ? (
//                       <Spinner animation="border" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                       </Spinner>
//                     ) : (
//                       "Post Now"
//                     )}
//                   </Button>
//                 </div>
//               </Forms>
//             </>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default JobList;

import React, { useState } from "react";
import "./JobList.css";
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  FormCheck,
  Input,
  Container,
} from "react-bootstrap";
import { BsCircleFill } from "react-icons/bs";
import Tags from "../Profile/Tabs/Tags";
import DatePicker from "react-datepicker";
import moment from "moment";
import {
  jobType,
  jobStatus,
  jobRequestEnum,
  rateType,
} from "../../Shared/util/constant";
import {
  PostAJob,
  PostAJobWithComm,
  PostAJobPartTime,
  PostAJobWithCommPartTime,
} from "../../Shared/Formik/formik";
import { Formik, Form as Forms, Field } from "formik";
import { toastMessage } from "../../Shared/Components/Toast/Toast";
import { useSelector } from "react-redux";
import { store } from "../../Shared/Redux/store";
import { Spinner } from "react-bootstrap";
import { PostAJobServices } from "../../Shared";
import { useNavigate } from "react-router-dom";
import { addDays } from "date-fns";
import { useLocation } from "react-router";
import FreeSolo from "../autocomplete/FreeSolo";
// import Services from "../../Pages/autocomplete/Services.json";
import Products from "../../Pages/autocomplete/Products.json";

const JobList = () => {
  const { user } = store.getState().root;
  const navigate = useNavigate();
  const locat = useLocation();

  const { notfy } = store.getState().root;

  const currencies = notfy?.services;

  const [startDate, setStartDate] = useState(
    locat?.state?.post?.startDate
      ? new Date(locat?.state?.post?.startDate)
      : null
  );
  const [endDate, setEndDate] = useState(
    locat?.state?.post?.endDate ? new Date(locat?.state?.post?.endDate) : null
  );

  const [tempJob, SetTempJob] = useState(false);

  const [application, setApplication] = useState(
    locat?.state?.post?.jobAvailabilityBool
      ? locat?.state?.post?.jobAvailabilityBool
      : jobRequestEnum.accepted
  );
  const [salonId, setSalonId] = useState(
    user?.user?.saloon._id ? user?.user?.saloon._id : ""
  );
  const [jobDesc, setJobDesc] = useState("");
  const [servicesTag, setServicesTags] = useState(
    locat?.state?.post?.jobServices ? locat?.state?.post?.jobServices : []
  );
  const [NumberOfHours, setNumberOfHours] = useState(
    locat?.state?.post?.NumberOfHours
  );

  const [check, setCheck] = useState(true);
  const [status1, setStatus1] = useState(
    locat?.state?.post?.jobStatus
      ? locat?.state?.post?.jobStatus
      : jobStatus.Open
  );
  const [maxRate, setMaxRate] = useState(0);
  const [type, setType] = useState(
    locat?.state?.post?.jobType ? locat?.state?.post?.jobType : jobType.fullTime
  );
  const [checkDeadline, setCheckDeadline] = useState("");
  const [deadline, setDeadline] = useState(
    locat?.state?.post?.jobAvailabilityDate
      ? new Date(locat?.state?.post?.jobAvailabilityDate)
      : new Date()
  );
  const [status, setStatus] = useState(jobStatus.Open);
  const [covid, setCovid] = useState(
    locat?.state?.post?.covidCertificate
      ? locat?.state?.post?.covidCertificate
      : false
  );
  const [tag, setTag] = useState();
  const [loader, setLoader] = useState(false);
  const [rate, setRate] = useState(
    locat?.state?.post?.minRate && locat?.state?.post?.maxRate
      ? { min: locat.state.post.minRate, max: locat.state.post.maxRate }
      : { min: "", max: "" }
  );
  const [stateComms, setStateComms] = useState("");
  const [comm, setComm] = useState(
    locat?.state?.post?.rateType === "Commission" ? true : false
  );
  const [tempType, setTempType] = useState(
    locat?.state?.post?.jobType ? locat?.state?.post?.jobType : jobType.fullTime
  );

  const CalenderCheck = (date) => {
    setStartDate(date);
    setEndDate(null);
  };

  const load = (e) => {
    e.preventDefault();
  };

  const handleChecked = (e) => {
    setType(e.target.value);
    setTempType(e.target.value);
  };

  const handleState = (key, value) => {
    setServicesTags(value);
  };

  const deadLine = (evt) => {
    setApplication(evt.target.value);
  };
  const checking = (svnt) => {
    setStatus1(svnt.target.value);
  };

  const temporaryJob = (svnt) => {
    if (svnt.target.value == "true") {
      SetTempJob(true);
    } else {
      SetTempJob(false);
    }
  };

  const Covinding = (evnt) => {
    setCovid(!covid);
  };

  const SettingCommission = (e) => {
    if (e.target.value == "Commission") {
      setComm(true);
    } else if (e.target.value == "Per Hour") {
      setComm(false);
    }
  };

  const handleSubmit = (values) => {
    if (tempType == "Part-time" && (startDate == null || endDate == null)) {
      toastMessage("error", "Start and End Date can't be empty");
    } else {
      if (comm) {
        if (values.Commission <= 100) {
          let obj = {
            jobTitle: values.JobTitle,
            jobDescription: values.JobDescription,
            jobServices: servicesTag,
            commisionRate: values.Commission,
            jobType: type,
            jobStatus: status1,
            rateType: rateType.commission,
            // covidCertificate: covid,
            reqEquip: values.reqEquip,
            saloon: salonId,
            NumberOfHours: Number(values.NumberOfHours),
          };

          if (tempType == "Part-time") {
            obj["startDate"] = moment(startDate).format("YYYY/MM/DD");
            obj["endDate"] = moment(endDate).format("YYYY/MM/DD");
          }

          if (locat?.state != null) {
            obj["jobId"] = locat.state.post._id;
          }

          setLoader(true);
          PostAJobServices(obj)
            .then(({ data }) => {
              {
                locat?.state?.post?._id
                  ? toastMessage("success", "Job Update Successfully!")
                  : toastMessage("success", "Job Create Successfully!");
              }
              navigate("/owner/jobs");
            })
            .catch((er) => {
              toastMessage("error", er?.response?.data?.message);
            })
            .finally(() => setLoader(false));
        } else {
          toastMessage("error", "Commission must be less than equal to 100");
        }
      } else {
        if (Number(values.Minimum) > Number(values.Maximum)) {
          toastMessage(
            "error",
            "Minimum Rate can't be higher than maximum Rate"
          );
        } else {
          let obj = {
            jobTitle: values.JobTitle,
            jobDescription: values.JobDescription,
            jobServices: servicesTag,
            minRate: values.Minimum,
            maxRate: values.Maximum,
            rateType: rateType.perHour,
            jobType: type,
            jobStatus: status1,
            // covidCertificate: covid,
            reqEquip: values.reqEquip,
            saloon: salonId,
            NumberOfHours: Number(values.NumberOfHours),
          };

          if (tempType == "Part-time") {
            obj["startDate"] = moment(startDate).format("YYYY/MM/DD");
            obj["endDate"] = moment(endDate).format("YYYY/MM/DD");
          }

          if (locat?.state != null) {
            obj["jobId"] = locat.state.post._id;
          }

          setLoader(true);
          PostAJobServices(obj)
            .then(({ data }) => {
              {
                locat?.state?.post?._id
                  ? toastMessage("success", "Job Update Successfully!")
                  : toastMessage("success", "Job Create Successfully!");
              }
              navigate("/owner/jobs");
            })
            .catch((er) => {
              toastMessage("error", er?.response?.data?.message);
            })
            .finally(() => setLoader(false));
        }
      }
    }
  };

  return (
    <div
      className={user?.user?.isSubscription ? "joblist" : "joblist blurReviews"}
    >
      <div className="joblist_body">
        <Formik
          initialValues={{
            JobTitle: locat?.state?.post?.jobTitle
              ? locat?.state?.post?.jobTitle
              : "",
            JobDescription: locat?.state?.post?.jobDescription
              ? locat?.state?.post?.jobDescription
              : "",
            reqEquip: locat?.state?.post?.reqEquip
              ? locat?.state?.post?.reqEquip
              : "",
            // Equipment: locat?.state?.post?.Equipment ? locat?.state?.post?.Equipment : "",
            Maximum: locat?.state?.post?.maxRate
              ? locat?.state?.post?.maxRate
              : "",
            Minimum: locat?.state?.post?.minRate
              ? locat?.state?.post?.minRate
              : "",
            tag: locat?.state?.post?.jobServices
              ? locat?.state?.post?.jobServices
              : [],
            Commission: locat?.state?.post?.commisionRate
              ? locat?.state?.post?.commisionRate
              : "",
            NumberOfHours: locat?.state?.post?.NumberOfHours
              ? locat?.state?.post?.NumberOfHours
              : "",
            // terms: false,
          }}
          validationSchema={
            comm
              ? type === "Part-time"
                ? PostAJobWithCommPartTime
                : PostAJobWithComm
              : type === "Part-time"
              ? PostAJobPartTime
              : PostAJob
          }
          onSubmit={(values) => {
            setStateComms(values.Commission);
            setRate({
              max: values.Maximum,
              min: values.Minimum,
            });
            handleSubmit(values);
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
              <Forms
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="joblist_text">
                  <h3 className="joblist_texth">Post a Job</h3>
                </div>
                <div className="joblist_card">
                  <div className="joblist_card1">
                    <Card
                      style={{ width: "530px" }}
                      className="joblist_card1_side"
                    >
                      <Card.Header
                        as="h5"
                        style={{ background: "#29B57A", color: "#FFFFFF" }}
                      >
                        <span className="text-in-post">Describe Job</span>
                      </Card.Header>
                      <Card.Body>
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="post-heading pt-4">
                              Job Title
                            </Form.Label>
                            <span className="reqAsterik">*</span>
                            {/* <div style={{ display: "flex" }}>
                            </div> */}

                            <Field
                              type="text"
                              placeholder="Spa Receptionist - Full Time"
                              className="joblist_field1"
                              name="JobTitle"
                              value={values.JobTitle}
                              isValid={touched.JobTitle && !errors.JobTitle}
                            />
                            {errors.JobTitle && touched.JobTitle ? (
                              <div className="formikerror_show">
                                {errors.JobTitle}
                              </div>
                            ) : (
                              <div style={{ height: "2px" }}></div>
                            )}
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea2"
                          >
                            <Form.Label className="post-heading">
                              Job Description
                            </Form.Label>
                            <span className="reqAsterik">*</span>
                            <Field
                              as="textarea"
                              rows={3}
                              placeholder="Enter job description"
                              name="JobDescription"
                              value={values.JobDescription}
                              onChange={handleChange}
                              className="joblist_field2"
                              isValid={
                                touched.JobDescription && !errors.JobDescription
                              }
                            />
                            {errors.JobDescription && touched.JobDescription ? (
                              <div className="formikerror_show">
                                {errors.JobDescription}
                              </div>
                            ) : (
                              <div style={{ height: "2px" }}></div>
                            )}
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea2"
                          >
                            <Form.Label className="post-heading">
                              Required equipment
                            </Form.Label>
                            <span className="reqAsterik">*</span>
                            <Field
                              as="textarea"
                              rows={3}
                              placeholder="Please mention required equipment(s) to bring to job."
                              name="reqEquip"
                              value={values.reqEquip}
                              onChange={handleChange}
                              className="joblist_field2"
                              isValid={touched.reqEquip && !errors.reqEquip}
                            />
                            {errors.reqEquip && touched.reqEquip ? (
                              <div className="formikerror_show">
                                {errors.reqEquip}
                              </div>
                            ) : (
                              <div style={{ height: "2px" }}></div>
                            )}
                          </Form.Group>
                          <Form.Group>
                            <Form.Label className="post-heading mb-0">
                              Add services required for the job
                            </Form.Label>
                            <span className="reqAsterik">*</span>
                            <Tags
                              title="posts"
                              handleState={handleState}
                              tags={servicesTag}
                              formikField={setFieldValue}
                              form={tag}
                              setForm={setTag}
                              isValid={touched.tag && !errors.tag}
                              tag={tag}
                              errors={errors}
                              touched={touched}
                              arr={currencies}
                            />
                            {/* {errors.tag && touched.tag ? (
                              <div className="formikerror_show w-100  ">
                                {errors.tag}
                              </div>
                            ) : (
                              <div style={{ height: "2px" }}></div>
                            )} */}
                            {/* <Field name="lastName" placeholder="Doe" component={MyInput} /> */}
                          </Form.Group>
                        </Form>
                      </Card.Body>
                    </Card>
                    <Card
                      style={{
                        width: "300px",
                        height: type === "Part-time" ? "330px" : "225px",
                      }}
                      className="card1_child"
                    >
                      <Card.Body>
                        <Container>
                          <Card.Title className="jobPreviewTitle">
                            Job Preview
                          </Card.Title>
                          <Form>
                            <Row className="mb-2 custums">
                              <Form.Group
                                as={Col}
                                controlId="exampleForm.ControlTextarea3"
                                className="col1"
                              >
                                <Form.Label className="list_col1">
                                  Status
                                </Form.Label>
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                controlId="exampleForm.ControlTextarea4"
                                className="col2"
                              >
                                <div className="list_icon">
                                  <Form.Label>
                                    <BsCircleFill
                                      style={
                                        status1 == "Open"
                                          ? { color: "#00800099", width: "8px" }
                                          : { color: "red", width: "8px" }
                                      }
                                    />
                                  </Form.Label>
                                  <Form.Label className="list_col2">
                                    {status1}
                                  </Form.Label>
                                </div>
                              </Form.Group>
                            </Row>
                            {/* <Row className="mb-2 custums">
                              <Form.Group
                                as={Col}
                                controlId="exampleForm.ControlTextarea5"
                                className="col1"
                              >
                                <Form.Label className="list_col1">
                                  Application deadline
                                </Form.Label>
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                controlId="exampleForm.ControlTextarea6"
                                className="col2"
                              >
                                <Form.Label className="list_col2">
                                  {application == "true" || application == true
                                    ? moment(deadline).format("D MMM, YYYY")
                                    : "N/A"}
                                </Form.Label>
                              </Form.Group>
                            </Row> */}
                            <Row className="mb-2 custums">
                              <Form.Group
                                as={Col}
                                controlId="exampleForm.ControlTextarea7"
                                className="col1"
                              >
                                <Form.Label className="list_col1">
                                  Job Posted On
                                </Form.Label>
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                controlId="exampleForm.ControlTextarea8"
                                className="col2"
                              >
                                <Form.Label className="list_col2">
                                  {locat?.state?.post?.createdAt
                                    ? moment(
                                        new Date(locat?.state?.post?.createdAt)
                                      ).format("D MMM, YYYY")
                                    : moment(new Date()).format("D MMM, YYYY")}
                                </Form.Label>
                              </Form.Group>
                            </Row>
                            <Row className="mb-2 custums">
                              <Form.Group
                                as={Col}
                                controlId="exampleForm.ControlTextarea9"
                                className="col1"
                              >
                                <Form.Label className="list_col1">
                                  Job Type
                                </Form.Label>
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                controlId="exampleForm.ControlTextarea10"
                                className="col2"
                              >
                                <Form.Label className="list_col2">
                                  {type}
                                </Form.Label>
                              </Form.Group>
                            </Row>
                            {type === "Part-time" ? (
                              <>
                                <Row className="mb-2 custums">
                                  <Form.Group
                                    as={Col}
                                    controlId="exampleForm.ControlTextarea9"
                                    className="col1"
                                  >
                                    <Form.Label className="list_col1">
                                      Start Date
                                    </Form.Label>
                                  </Form.Group>
                                  <Form.Group
                                    as={Col}
                                    controlId="exampleForm.ControlTextarea10"
                                    className="col2"
                                  >
                                    <Form.Label className="list_col2">
                                      {startDate
                                        ? moment(startDate)?.format(
                                            "D MMM, YYYY"
                                          )
                                        : ""}
                                    </Form.Label>
                                  </Form.Group>
                                </Row>
                                <Row className="mb-2 custums">
                                  <Form.Group
                                    as={Col}
                                    controlId="exampleForm.ControlTextarea9"
                                    className="col1"
                                  >
                                    <Form.Label className="list_col1">
                                      End Date
                                    </Form.Label>
                                  </Form.Group>
                                  <Form.Group
                                    as={Col}
                                    controlId="exampleForm.ControlTextarea10"
                                    className="col2"
                                  >
                                    <Form.Label className="list_col2">
                                      {endDate
                                        ? moment(endDate)?.format("D MMM, YYYY")
                                        : ""}
                                    </Form.Label>
                                  </Form.Group>
                                </Row>
                                <Row className="mb-2 custums">
                                  <Form.Group
                                    as={Col}
                                    controlId="exampleForm.ControlTextarea9"
                                    className="col1"
                                  >
                                    <Form.Label className="list_col1">
                                      Working hours
                                    </Form.Label>
                                  </Form.Group>
                                  <Form.Group
                                    as={Col}
                                    controlId="exampleForm.ControlTextarea10"
                                    className="col2"
                                  >
                                    <Form.Label className="list_col2">
                                      {`${
                                        NumberOfHours ? NumberOfHours : ""
                                      } Hours`}
                                    </Form.Label>
                                  </Form.Group>
                                </Row>
                              </>
                            ) : (
                              ""
                            )}
                            <Row className="mb-2 custums">
                              <Form.Group
                                as={Col}
                                controlId="exampleForm.ControlTextarea11"
                                className="col1"
                              >
                                <Form.Label className="list_col1">
                                  {comm ? `Commission` : `Salary`}
                                </Form.Label>
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                controlId="exampleForm.ControlTextarea12"
                                className="col2"
                              >
                                <Form.Label className="list_col2">
                                  {comm ? (
                                    <>
                                      {" "}
                                      {locat?.state?.post?.commisionRate
                                        ? locat?.state?.post?.commisionRate
                                        : stateComms}
                                      %{" "}
                                    </>
                                  ) : (
                                    <>
                                      ${rate.min} - {rate.max}/ hour
                                    </>
                                  )}
                                </Form.Label>
                              </Form.Group>
                            </Row>
                            {/* <Row className="mb-2">
                            <Form.Group as={Col} controlId="exampleForm.ControlTextarea11">
                              <Form.Label className="list_col1">Covid Certificate</Form.Label>
                          <Row className="mb-2 custums">
                            <Form.Group
                              as={Col}
                              controlId="exampleForm.ControlTextarea11"
                              className="col1"
                            >
                              <Form.Label className="list_col1">
                                Covid Certificate
                              </Form.Label>
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              controlId="exampleForm.ControlTextarea12"
                              className="col2"
                            >
                              <Form.Label className="list_col2">
                                {covid ? "Required" : "Not Required"}
                              </Form.Label>
                            </Form.Group>
                          </Row> */}
                          </Form>
                        </Container>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="joblist_card2">
                    <Card style={{ width: "530px" }}>
                      <Card.Header
                        as="h5"
                        style={{ background: "#29B57A", color: "#FFFFFF" }}
                      >
                        <span className="text-in-post ">What is the pay?</span>
                      </Card.Header>
                      <Card.Body>
                        <Form>
                          <Row className="mb-3">
                            {comm ? (
                              <Col>
                                <Form.Group
                                  as={Col}
                                  md="4"
                                  controlId="exampleForm.ControlInput2"
                                >
                                  <div style={{ display: "flex" }}>
                                    <Form.Label className="post-heading">
                                      Commission
                                    </Form.Label>
                                    <span
                                      className="reqAsterik"
                                      style={{ marginTop: "-6px" }}
                                    >
                                      *
                                    </span>
                                  </div>
                                  <Field
                                    type="number"
                                    placeholder="Percentage"
                                    min={1}
                                    max={9999}
                                    name="Commission"
                                    value={values.Commission}
                                    className="joblist_field3 widthIptPost"
                                    onChange={(e) => {
                                      if (e.target.value <= 9999) {
                                        setFieldValue(
                                          "Commission",
                                          e.target.value
                                        );
                                        setStateComms(e.target.value);
                                      }
                                    }}
                                  />
                                  {errors.Commission && touched.Commission ? (
                                    <div
                                      className="formikerror_show pt-0"
                                      style={{ width: "150px" }}
                                    >
                                      {errors.Commission}
                                    </div>
                                  ) : (
                                    <div style={{ height: "2px" }}></div>
                                  )}
                                </Form.Group>
                              </Col>
                            ) : (
                              <>
                                <Col>
                                  <Form.Group
                                    as={Col}
                                    md="4"
                                    controlId="exampleForm.ControlInput2"
                                  >
                                    <div style={{ display: "flex" }}>
                                      <Form.Label className="post-heading">
                                        Minimum
                                      </Form.Label>
                                      <span
                                        className="reqAsterik"
                                        style={{ marginTop: "-6px" }}
                                      >
                                        *
                                      </span>
                                    </div>
                                    <Field
                                      type="number"
                                      placeholder="$ 10"
                                      min={1}
                                      max={9999}
                                      style={{ width: "140px" }}
                                      name="Minimum"
                                      value={values.Minimum}
                                      className="joblist_field3"
                                      onChange={(e) => {
                                        if (e.target.value <= 9999) {
                                          setFieldValue(
                                            "Minimum",
                                            e.target.value
                                          );
                                          setRate({
                                            ...rate,
                                            min: e.target.value,
                                          });
                                        }
                                      }}
                                    />
                                    {errors.Minimum && touched.Minimum ? (
                                      <div
                                        className="formikerror_show pt-0"
                                        style={{ width: "150px" }}
                                      >
                                        {errors.Minimum}
                                      </div>
                                    ) : (
                                      <div style={{ height: "2px" }}></div>
                                    )}
                                  </Form.Group>
                                </Col>
                                <Col>
                                  <Form.Group
                                    as={Col}
                                    md="4"
                                    controlId="exampleForm.ControlInput4"
                                  >
                                    <div style={{ display: "flex" }}>
                                      <Form.Label className="post-heading">
                                        Maximum
                                      </Form.Label>
                                      <span
                                        className="reqAsterik"
                                        style={{ marginTop: "-6px" }}
                                      >
                                        *
                                      </span>
                                    </div>
                                    <Field
                                      type="number"
                                      placeholder="$ 40"
                                      min={1}
                                      style={{ width: "140px" }}
                                      name="Maximum"
                                      value={values.Maximum}
                                      className="joblist_field3"
                                      max="9999"
                                      onChange={(e) => {
                                        if (e.target.value <= 9999) {
                                          setFieldValue(
                                            "Maximum",
                                            e.target.value
                                          );
                                          setRate({
                                            ...rate,
                                            max: e.target.value,
                                          });
                                        }
                                      }}
                                      // isValid={touched.Minimum && !errors.Minimum}
                                    />
                                    {errors.Maximum && touched.Maximum ? (
                                      <div
                                        className="formikerror_show pt-0"
                                        style={{ width: "150px" }}
                                      >
                                        {errors.Maximum}
                                      </div>
                                    ) : (
                                      <div style={{ height: "2px" }}></div>
                                    )}
                                  </Form.Group>
                                </Col>
                              </>
                            )}

                            <Col>
                              <Form.Group
                                as={Col}
                                md="4"
                                controlId="exampleForm.ControlInput3"
                              >
                                <Form.Label className="post-heading">
                                  Rate
                                </Form.Label>
                                {/* <Form.Control type="number" placeholder="Per hour" min={1} /> */}
                                <Form.Select
                                  onChange={(e) => SettingCommission(e)}
                                  value={comm ? "Commission" : "Per Hour"}
                                  aria-label="Default select example dropPro"
                                  style={{ width: "142px" }}
                                >
                                  <option name="hourRate">Per Hour</option>
                                  <option name="Commission">Commission</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                          </Row>
                        </Form>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="joblist_card3">
                    <Card style={{ width: "530px", height: "auto" }}>
                      <Card.Header
                        as="h5"
                        style={{ background: "#29B57A", color: "#FFFFFF" }}
                      >
                        <span className="text-in-post ">
                          Application Preferences
                        </span>
                      </Card.Header>
                      <Card.Body>
                        <Form>
                          <Form.Group controlId="exampleForm.ControlTextarea13">
                            {/* <Form.Label className="post-heading">
                              Is this temporary job ?
                            </Form.Label>
                            {["radio"].map((type) => (
                              <div key={`default-${type}`} className="mb-3">
                                <Form.Check
                                  className="form-check1"
                                  onChange={(e) => temporaryJob(e)}
                                  type={type}
                                  id={`default-${type}`}
                                  label={`Yes`}
                                  name="group5"
                                  value={true}
                                  defaultChecked={false}
                                />
                                {tempJob == "true" ||
                                  tempJob == true ? (
                                  <Row className="mb-3 mt-3">
                                    <Form.Group
                                      as={Col}
                                      md="4"
                                      controlId="exampleForm.ControlInput14"
                                    >
                                      <div
                                        style={{
                                          marginBottom: "-10px",
                                          marginTop: "-10px",
                                        }}
                                      >
                                        <DatePicker
                                          className="inputInd w-100"
                                          dateFormat="d MMMM"
                                          selected={startDate}
                                          onChange={onChange}
                                          startDate={startDate}
                                          endDate={endDate}
                                          minDate={addDays(new Date(), 0)}
                                          selectsRange
                                        />
                                      </div>
                                    </Form.Group>
                                  </Row>
                                ) : (
                                  ""
                                )}
                                <Form.Check
                                  className="form-check1"
                                  onChange={(e) => temporaryJob(e)}
                                  type={type}
                                  id={`default-${type}`}
                                  label={`No`}
                                  name="group5"
                                  value={false}
                                  defaultChecked={true}
                                />
                              </div>
                            ))} */}
                            {/* {
                              tempJob == true || tempJob == "true" ? "" :
                                <> */}
                            <Form.Label className="post-heading">
                              Is this a full-time or part-time job?
                            </Form.Label>
                            {["radio"].map((type) => (
                              <div key={`default-${type}`} className="mb-3">
                                <Form.Check
                                  className="form-check1"
                                  onChange={(e) => handleChecked(e)}
                                  type={type}
                                  id={`default-${type}`}
                                  label={`Full-time`}
                                  name="group1"
                                  value={jobType.fullTime}
                                  // defaultChecked={locat?.state?.post?.jobType == "Full-time" ? true : false}
                                  defaultChecked={
                                    locat?.state == null
                                      ? true
                                      : locat?.state?.post?.jobType ==
                                        "Full-time"
                                      ? true
                                      : false
                                  }
                                />
                                <Form.Check
                                  className="form-check1"
                                  onChange={(e) => handleChecked(e)}
                                  type={type}
                                  // name="terms"
                                  id={`default-${type}`}
                                  label={`Part-time`}
                                  name="group1"
                                  value={jobType.partTime}
                                  defaultChecked={
                                    locat?.state == null
                                      ? false
                                      : locat?.state?.post?.jobType ==
                                        "Part-time"
                                      ? true
                                      : false
                                  }
                                />
                                {tempType == "Part-time" ? (
                                  <Row className="mb-3 mt-3 enddu">
                                    <Form.Group
                                      as={Col}
                                      md="4"
                                      controlId="exampleForm.ControlInput14"
                                    >
                                      {/* <Form.Control type="date" style={{ height: '75%' }} placeholder="date" /> */}
                                      <div
                                        className="eend_date"
                                        style={{
                                          marginBottom: "-10px",
                                          marginTop: "-10px",
                                        }}
                                      >
                                        {/* <DatePicker
                                            className="inputInd w-100"
                                            selected={deadline}
                                            disabled={false}
                                            minDate={addDays(new Date(), 0)}
                                            onChange={(secondDate) =>
                                              setDeadline(secondDate)
                                            }
                                          /> */}
                                        <DatePicker
                                          dateFormat="d MMMM, yyyy"
                                          placeholderText="Enter Start Date"
                                          className="inputInd w-100 mt-1 endds"
                                          selected={startDate}
                                          minDate={addDays(new Date(), 0)}
                                          onChange={(date) =>
                                            CalenderCheck(date)
                                          }
                                        />
                                        <DatePicker
                                          dateFormat="d MMMM, yyyy"
                                          placeholderText="Enter End Date"
                                          className="inputInd w-100 mt-2 mb-2 endds"
                                          selected={endDate}
                                          minDate={addDays(startDate, 0)}
                                          onChange={(date) => setEndDate(date)}
                                        />
                                      </div>
                                      <Field
                                        className="inputInd mt-2 numberOfHours"
                                        type="number"
                                        placeholder="Enter Working Hours"
                                        name="NumberOfHours"
                                        max={24}
                                        value={values.NumberOfHours}
                                        onChange={handleChange}
                                        isValid={
                                          touched.NumberOfHours &&
                                          !errors.NumberOfHours
                                        }
                                      />
                                      {errors.NumberOfHours &&
                                      touched.NumberOfHours ? (
                                        <div className="formikerror_show">
                                          {errors.NumberOfHours}
                                        </div>
                                      ) : (
                                        <div style={{ height: "2px" }}></div>
                                      )}
                                    </Form.Group>
                                  </Row>
                                ) : (
                                  ""
                                )}
                              </div>
                            ))}
                            {/* </>
                            } */}
                            <Form.Label
                              className="post-heading"
                              defaultValue="group3"
                            >
                              Job Status
                            </Form.Label>
                            {["radio"].map((type) => (
                              <div key={`default-${type}`} className="mb-3">
                                <Form.Check
                                  className="form-check1"
                                  type={type}
                                  id={`default-${type}`}
                                  label={`Open`}
                                  name="group3"
                                  value={jobStatus.Open}
                                  onChange={(e) => {
                                    checking(e);
                                  }}
                                  defaultChecked={
                                    locat?.state == null
                                      ? true
                                      : locat?.state?.post?.jobStatus ==
                                          "Open" ||
                                        locat?.state?.post?.jobStatus ==
                                          "Re-open"
                                      ? true
                                      : false
                                  }
                                />
                                <Form.Check
                                  className="form-check1"
                                  type={type}
                                  id={`default-${type}`}
                                  label={`Closed`}
                                  name="group3"
                                  value={jobStatus.Close}
                                  onChange={(e) => {
                                    checking(e);
                                  }}
                                  defaultChecked={
                                    locat?.state == null
                                      ? false
                                      : locat?.state?.post?.jobStatus ==
                                        "Closed"
                                      ? true
                                      : false
                                  }
                                />
                              </div>
                            ))}
                            {/* <Form.Label className="post-heading">
                              Is there an application deadline?
                            </Form.Label> */}
                            {/* {["radio"].map((type) => (
                              <div key={`default-${type}`} className="mb-3">
                                <Form.Check
                                  className="form-check1"
                                  onChange={(e) => deadLine(e)}
                                  type={type}
                                  id={`default-${type}`}
                                  label={`Yes`}
                                  name="group2"
                                  value={true}
                                  defaultChecked={
                                    locat?.state == null
                                      ? false
                                      : locat?.state?.post
                                        ?.jobAvailabilityBool == true
                                        ? true
                                        : false
                                  }
                                />
                                {application == "true" ||
                                  application == true ? (
                                  <Row className="mb-3 mt-3">
                                    <Form.Group
                                      as={Col}
                                      md="4"
                                      controlId="exampleForm.ControlInput14"
                                    >
                                      <div
                                        style={{
                                          marginBottom: "-10px",
                                          marginTop: "-10px",
                                        }}
                                      >
                                        <DatePicker
                                          className="inputInd w-100"
                                          selected={deadline}
                                          disabled={false}
                                          minDate={addDays(new Date(), 0)}
                                          onChange={(secondDate) =>
                                            setDeadline(secondDate)
                                          }
                                        />
                                      </div>
                                    </Form.Group>
                                  </Row>
                                ) : (
                                  ""
                                )}
                                <Form.Check
                                  className="form-check1"
                                  type={type}
                                  id={`default-${type}`}
                                  label={`No`}
                                  name="group2"
                                  value={false}
                                  onChange={(e) => deadLine(e)}
                                  defaultChecked={
                                    locat?.state == null
                                      ? true
                                      : locat?.state?.post
                                        ?.jobAvailabilityBool == false
                                        ? true
                                        : false
                                  }
                                />
                              </div>
                            ))} */}
                            {/* <Form.Label className="post-heading">Covid certificate required for the job?</Form.Label>
                            {['radio'].map((type) => (
                            <Form.Label className="post-heading">
                              Covid certificate required for the job?
                            </Form.Label>
                            {["radio"].map((type) => (
                              <div key={`default-${type}`} className="mb-3">
                                <Form.Check
                                  className="form-check1"
                                  type={type}
                                  id={`default-${type}`}
                                  label={`Yes`}
                                  name="group4"
                                  value={covid.yes}
                                  onChange={(e) => setCovid(true)}
                                  defaultChecked={
                                    locat?.state == null
                                      ? false
                                      : locat?.state?.post?.covidCertificate
                                      ? true
                                      : false
                                  }
                                />
                                <Form.Check
                                  className="form-check1"
                                  type={type}
                                  id={`default-${type}`}
                                  label={`No`}
                                  name="group4"
                                  value={covid.no}
                                  onChange={(e) => setCovid(false)}
                                  defaultChecked={
                                    locat?.state == null
                                      ? true
                                      : locat?.state?.post?.covidCertificate
                                      ? false
                                      : true
                                  }
                                />
                              </div>
                            ))} */}
                          </Form.Group>
                        </Form>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
                <div className={loader ? "buton_side nthing" : "buton_side"}>
                  <Button
                    variant="primary"
                    className="joblist_body_btn w-25"
                    type="submit"
                  >
                    {loader ? (
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : (
                      "Post Now"
                    )}
                  </Button>
                </div>
              </Forms>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default JobList;
