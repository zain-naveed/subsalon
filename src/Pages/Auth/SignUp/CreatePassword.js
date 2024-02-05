import React, { useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Navigation from "../../../Shared/Components/Navbar/navigation";
import Foot from "../../../Shared/Components/Foot/Foot"
import "../Auth.css";
import PasswordStrengthBar from 'react-password-strength-bar';
import { confirmSchema } from '../../../Shared/Formik/formik';
import { useLocation } from 'react-router';
import { signUpApiService } from '../../../Shared/Services';
import CircularProgress from "@mui/material/CircularProgress";
import { toastMessage } from "../../../Shared/"
import { useDispatch } from 'react-redux'
import { setUser } from "../../../Shared/Redux/reducers/userSlice";


const CreatePassword = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);


  



  const showPassword = (name) => {

    if (name === "Password") {
      if (showPass === true) {
        setShowPass(false)
      }
      else {
        setShowPass(true);
      }
    }
    else {
      if (showConfirm === true) {
        setShowConfirm(false)
      }
      else {
        setShowConfirm(true);
      }
    }
  }

  const submitForm = (values) => {

    const { password, confirmPassword } = values;
  }
  const SignUpHandle = async (obj) => {
    
    setOpen(true)
    

    signUpApiService(obj)
      .then(({ data }) => {

        
        if (data) {
          dispatch(setUser(data))
          toastMessage("success", "Signup Successfully!");
          setOpen(false)
          navigate("/plan");
          // navigate("/professionals/findjob")
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
        <Card className="cardSign" style={{ width: '33rem', height: "34rem" }}>
          <Card.Body>
            <Container className='pChange'>
              <Card.Title className="titleSign1 titleDiv1">Finish Signing up</Card.Title>
              <Card.Title className="titleSign2 titleSignUp">Creating an account as <span className='spanWelcome1'>{location.state.email}&nbsp;</span>
                <span className='spanWelcome2'> (not your email?)</span></Card.Title>
            </Container>
            <Formik
              initialValues={{
                password: '',
                confirmPassword: '',
              }}
              validationSchema={confirmSchema}
              onSubmit={(values) => {
                const { password, confirmPassword } = values;
                SignUpHandle({
                  email: location.state.email,
                  role: location.state.role,
                  password: confirmPassword,
                });
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit }) => (<>
                <Form>
                  <Container>
                    <div className="changeDiv">
                      <div className='mb-3' style={{ position: "relative" }}>
                        <div className='passChange' >Password</div>
                        <Field type={showPass ? "text" : "password"} name="password" className='iptSignUp' onChange={handleChange("password")} />

                        {errors.password || touched.password ? (
                          <div className='formikerror1'>{errors.password}</div>
                        ) : <div className='divError'></div>}
                        <div className='eyeButton' onClick={() => showPassword("Password")}>
                          {showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                        </div>
                        {values.password ? <div style={{ width: "94%", height: "21px" }}>
                          <PasswordStrengthBar
                            className="signUpBar"
                            password={values.password}
                            minLength={5}
                            minScore={2}
                            scoreWords={['weak', 'okay', 'good', 'strong']}
                          />
                        </div> : <div className='strengthBar'></div>}
                      </div>

                      <div className='' style={{ position: "relative" }}>
                        <div className='passChange'>Confirm Password</div>
                        <Field type={showConfirm ? "text" : "password"} name="confirmPassword" className='iptSignUp' onChange={handleChange("confirmPassword")} />

                        {errors.confirmPassword || touched.confirmPassword ? (
                          <div className='formikerror1'>{errors.confirmPassword}</div>
                        ) : null}
                        <div className='eyeButton1' style={{ top: "32px" }} onClick={() => showPassword("Confirm")}>
                          {showConfirm ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                        </div>

                        {/* {values.confirmPassword ? <div style={{ width: "94%" }}>
                          <PasswordStrengthBar password={values.confirmPassword} />
                        </div> : <div className="strengthBar"></div>} */}
                      </div>
                    </div>
                    <div class="form-check check-div">
                      <input class="form-check-input widthCheck" type="checkbox" value="" id="flexCheckDefault" required />
                      <label class="form-check-label" for="flexCheckDefault">
                      </label>
                      <p className="check">When you create an account or sign in, you agree to Salon Substitute's <span style={{ color: "#2075AC", textDecoration: "underline" }}> Terms, Cookie and Privacy policies. </span> You consent to receiving marketing messages from Indeed and may opt out from receiving such messages by following the unsubscribe link in our messages, or as detailed in our terms.</p>
                    </div>
                    <div className='btnDiv'>
                      <button className='btn continue btnChangePass my-4' style={{ width: "92%" }} type='submit'>{open ? (
                        <CircularProgress style={{ 'color': 'white' }} className="circulerr" />
                      ) : (
                        "Create account"
                      )}</button>
                    </div>
                  </Container>
                </Form>
              </>)}
            </Formik>
          </Card.Body>
        </Card>
      </div>
      <Foot />
    </div >
  )
}

export default CreatePassword