import React, { useState } from 'react'
import { Card, Button, Container } from 'react-bootstrap'
import Navigation from "../../../Shared/Components/Navbar/navigation";
import Foot from "../../../Shared/Components/Foot/Foot";
import { setUser } from "../../../Shared/Redux/reducers/userSlice";
import "../Auth.css";
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { passwordOnly } from '../../../Shared/Formik/formik';
import { loginApiService } from '../../../Shared/Services';
import { toastMessage } from "../../../Shared/"
import CircularProgress from "@mui/material/CircularProgress";




const Welcome = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);



  const handleForget = () => {
    navigate("/forget-password", { state: { email: location.state.email } })
  }
  const loGinHandle = async (obj) => {
    // 
    setOpen(true)

    loginApiService(obj)
      .then(({ data }) => {
        // 
        if (data) {

          dispatch(setUser(
            {
              user: data.user,
              status: data.status,
              tokens: data.tokens,
              sub: false
            }
          ))
          // navigate("/professionals/findjob");
          navigate("/plan", { state: { routePath: '/professionals/findjob' } });
          setOpen(false)
        }
      })
      .catch((e) => {
        setOpen(false)
        toastMessage("error", e.response.data.message);
      });
  };

  return (
    <div className='divSigin'>
      <Navigation />
      <div className='contSignIn'>
        <Card className="cardSign" style={{ width: '33rem', height: "26rem " }}>
          <Card.Body>
            <div>
              <div className=''>
                <Card.Title className="titleSign1 titleDiv">Hi, Welcome Back!</Card.Title>
              </div>
              <Card.Title className="titleSign2 titleWelcome">Signing in as <span className='spanWelcome1'>{location.state.email}&nbsp;</span>
                <span className='spanWelcome2'>(not your email?)</span>
              </Card.Title>
              <Formik
                initialValues={{
                  password: "",
                }}
                validationSchema={passwordOnly}
                onSubmit={values => {
                  // same shape as initial values
                  const { password } = values;

                  loGinHandle({
                    email: location.state.email,
                    password: password,
                  });

                }}
              >
                {({ errors, touched }) => (<>
                  <Form>
                    <Container className="welcomeCont">
                      <Card.Text className="emailAuth">
                        Password
                      </Card.Text>
                      <div className='btnDiv'>
                        <Field className='iptSignin' type="password" name="password" />
                        {errors.password || touched.password ? (
                          <div className='formikerror'>{errors.password}</div>
                        ) : null}
                      </div>
                      <Card.Text className='content11'>
                        <p style={{ fontSize: "12px", fontWeight: "600", cursor: "pointer" }} className="forgetPass" onClick={handleForget} >
                          Forget Password ?
                        </p>
                      </Card.Text>
                      <Card.Text className='content'>
                        When you create an account or sign in, you agree to Salon Substitute's <span style={{ color: "#2075AC", textDecoration: "underline" }}>  Terms, Cookie and Privacy policies.  </span>  </Card.Text>
                      <div className='btnDiv'>
                        <button className='btn continue' type='submit'>
                          {open ? (
                            <CircularProgress style={{ 'color': 'white' }} className="circulerr" />
                          ) : (
                            "Signin"
                          )}
                        </button>
                      </div>
                    </Container>
                  </Form>

                </>)}

              </Formik>
            </div>

          </Card.Body>
        </Card>
      </div>
      <Foot />
    </div>
  )
}

export default Welcome