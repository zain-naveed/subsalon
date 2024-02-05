import React from 'react';
import "../Foot/Foot.css";
import "../../../Pages/Auth/Auth.css";
import {Link} from "react-router-dom"

const Foot = () => {
  return (
    <div className='container contFoot' style={{ marginBottom: "1%" }}>
      {/* <div className='p-4 Afoot1'>
        © 2022
        <a className=' Afoot1'>
          &nbsp;Salon Substitute
        </a>
      </div>
      <div className='footDiv'>
        <a className='Afoot'>Privacy Center</a>
        <a className='Afoot'>Cookies</a>
        <a className='Afoot'>Privacy</a>
        <a className='Afoot'>Terms</a>
      </div> */}
      <div className='Afoot1'>
        © 2022 Salon Substitute
      </div>
      <div className='footDiv'>
      <p className='Afoot'><Link to='/privacypolicy'>Privacy Center</Link></p>
        {/* <div className='separatorFoot'></div>
        <p className='Afoot'><Link to='#.'>Cookies</Link></p>
        <div className='separatorFoot'></div>
        <p className='Afoot'><Link to='/privacypolicy'>Privacy</Link></p> */}
        {/* <div className='separatorFoot'></div> */}
        <p className='Afoot'><Link to='/termsconditions'>Terms</Link></p>
      </div>
    </div>
  )
}

export default Foot