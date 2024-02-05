import React from 'react'
import { Card, Button, Container, NavbarBrand } from 'react-bootstrap'
import Navigation from "../../../Shared/Components/Navbar/navigation";
import Foot from "../../../Shared/Components/Foot/Foot"
import "../Auth.css"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { emailOnly } from '../../../Shared/Formik/formik';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { forgetApiService } from '../../../Shared/Services';
import { toastMessage } from "../../../Shared/"
import CircularProgress from "@mui/material/CircularProgress";
import NavbarAuth from "../../../Pages/Auth/SignUp/NavbarAuth"


const ForgetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);


  const ForgetPass = async (obj) => {
    setOpen(true)

    forgetApiService(obj)
      .then(({ data }) => {
        
        if (data) {
          toastMessage("success", data.message);
          setOpen(false)
          navigate("/email-reset", { state: { email: obj.email } })
        }
      })
      .catch((e) => {
        setOpen(false)
        toastMessage("error", e.response.data.message);
      });
  };
  return (
    <div className='divSigin'>
      <NavbarAuth />
      <div className='contSignIn padCard' >
        <Card className="cardSign" style={{ width: '30rem', height: "19rem" }}>
          <Card.Body>
            <div>
              <div className=''>
                <Card.Title className="titleSign1 titleDiv mt-2">Forgot Password?</Card.Title>
              </div>
              <Card.Title className="titleSign2 titleWelcome pb-0">Enter your valid email address</Card.Title>
              <Container className="welcomeCont">
                {/* <Card.Text className='errorHandle'>
                  <div className="alert alert-danger errorMsg" role="alert">
                    Sorry, the address <span style={{ textDecoration: "underline" }}>{ }</span>  is not known to Salon Subtitute.
                  </div>
                </Card.Text> */}
                <Formik
                  initialValues={{
                    email: '',
                  }}
                  validationSchema={emailOnly}
                  onSubmit={values => {
                    const { email } = values;

                    ForgetPass({
                      email: email,
                    });
                  }}
                >
                  {({ errors, touched }) => (<>
                    <Form>
                      <Card.Text className="emailAuth">
                        Email
                      </Card.Text>
                      <div className='btnDiv'>
                        <Field className='iptSignin' type="email" name="email" placeholder='johndoe@email.com' />
                        {errors.email || touched.email ? (
                          <div className='formikerror'>{errors.email}</div>
                        ) : null}
                      </div>
                      <div className='btnDiv'>
                        <button className='btn continue mt-4'>
                          {/* <Link to="/email-reset" style={{ color: "white" }}> */}
                          {open ? (
                            <CircularProgress style={{ 'color': 'white' }} className="circulerr" />
                          ) : (
                            "Send Link"
                          )}
                          {/* </Link> */}
                        </button>
                      </div>
                    </Form>
                  </>)}

                </Formik>
              </Container>
            </div>

          </Card.Body>
        </Card>
      </div>
      <Foot />
    </div >
  )
}

export default ForgetPassword