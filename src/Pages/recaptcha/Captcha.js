import React,{useState,useEffect, useRef} from 'react'
// import  ReCAPTCHA  from 'react-recaptcha-google'
import ReCAPTCHA from "react-google-recaptcha";
import './Captcha.css';


const Captcha = ({setCapSide,capSide}) => {
  const OWNER_LIVE="6LcRY8UgAAAAAPhpSEHCUhC5yve6P6XRO2-ymXNf"
  // const TEST_LIVE_KEY="6LdPN8UgAAAAAHj0cOfwMWmbCWL21oeXz7Thb7qf"
  const LIVE_SECRET_KEY="6LdPN8UgAAAAAGXovP6W0iaHTjxk96ABxKUGnT59"
    // const TEST_SITE_KEY = "6LdDDcEgAAAAAF48yjhGlS22Kx2ygCtUxXKmZJBy";
    // const Secret_Key="6LdDDcEgAAAAAMQbjwkxSgrKEkBmj5-Vz_unkuOl"
const DELAY = 1800;
const [capVal,setCapVal] = useState({
    callback: "not fired",
      value: "[empty]",
      load: false,
      expired: "false"
})

    const onChange=(value)=>{
        
        setCapSide(!capSide);
      }
      const reCaptchaRef=useRef(null)
      // const handleChange = (value) => {
      //   
      //   setCapVal({ value });
      //   // if value is null recaptcha expired
      //   if (value === null) setCapVal({ expired: "true" });
      // };
      // const asyncScriptOnLoad = () => {
      //   setCapVal({ callback: "called!" });
      //   
      // };
      // const { value, callback, load, expired } = capVal || {};
      // useEffect(()=>{
      //   setTimeout(()=>{
      //       setCapVal({load:true})
      //   },DELAY)
      //   
      // },[])

      const onSubmit = (e) => {
        e.preventDefault();
        const token = reCaptchaRef.current.getValue();
        reCaptchaRef.current.reset();
        // const recaptchaValue = reCaptchaRef.current.getValue();
        // onSubmit(recaptchaValue);
      }
      // const onSubmitWithReCAPTCHA = async () => {
      //   const token = await reCaptchaRef.current.executeAsync();
     
      //   // apply to form data
      // }
  return (
    <div className='captcha_side'>
      {/* <h5>Recaptcha value: {capVal.value}</h5>
        <h5>Expired: {capVal.expired}</h5> */}
        {!capVal.load && (
          <form onSubmit={onSubmit}>

          <ReCAPTCHA

            style={{ display: "inline-block"}}
            theme="light"
            // size="invisible"
            size="normal"
            // badge="bottomright"
            ref={reCaptchaRef}
            sitekey={
              // "http://localhost:3000/create-salon" ? 
              // TEST_SITE_KEY :
              //  "https://subsalon.netlify.app/create-salon" ? 
              OWNER_LIVE
              //  :""
              }
            onChange={onChange}
            // asyncScriptOnLoad={asyncScriptOnLoad}
          />
          </form>
        )}
        {/* )} */}
    </div>
  )
}

export default Captcha