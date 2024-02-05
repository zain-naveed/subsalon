import React from 'react'

function SaloonAbout(props) {
  const {about} = props
  const services = ["Makeup Artist", "Nail Technician", "Esthetician"];
  const Products = ["Intimo Warm Wax", "Keune Hair Cosmetics"];
  const Chemical = ["A Curl-Protecting Cream", "A Rich Mask", "Tres Kit Color Revitalize", "Panasonic- Hair Styler"]
  return (
    <div style={{ width: "97%", margin: "0 auto" }}>
      <h1 className='h1-applicant' style={{ color: "#202430", opacity: "0.5" }}>About</h1>
      <p className='bio'>{about?.about ?about?.about:"" }</p>
      <div className='div-sec-applicant respJobDiv2 mb-3'>
        <h1 className='h1-applicant'>Location</h1>
        <p className='p-applicant'>1203 S 43rd St, Wilmington</p>

        <h1 className='h1-applicant'>Mile Range to Travel</h1>
        <p className='p-applicant'>15 - 30 miles</p>

        <h1 className='h1-applicant'>Hourly Rate</h1>
        <p className='p-applicant'>$30 • Full Time</p>
      </div>
    </div>

  )
}

export default SaloonAbout


