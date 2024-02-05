import React, { useState } from 'react';
import { Alert, Container, Col, Row, Form, Button } from "react-bootstrap";
import { getCovidServices } from "../../../Shared/Services/EditProfileApi";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Exclamation } from "./../../../Assets/index";
import moment from "moment";
import { toastMessage } from '../../../Shared';
import { setUser } from "../../../Shared/Redux/reducers/userSlice";
import { store } from '../../../Shared/Redux/store';
import { addDays } from 'date-fns/esm';



function Covid() {
  const { user } = store.getState().root;
  
  
  
  
  const [firstDose, setFirstDose] = useState(user?.user?.covidDetails?.dose1?.vaccine1 ? user?.user?.covidDetails?.dose1?.vaccine1 : "");
  const [secondDose, setSecondDose] = useState(user?.user?.covidDetails?.dose2?.vaccine2 ? user?.user?.covidDetails?.dose2?.vaccine2 : "");
  const [loader, setLoader] = useState(false)
  const [firstdate, setFirstDate] = useState(user?.user?.covidDetails?.dose1?.date1 ? new Date(String(user?.user?.covidDetails?.dose1?.date1)) : new Date());
  const [secondDate, setSecondDate] = useState(user?.user?.covidDetails?.dose2?.date2 ? new Date(String(user?.user?.covidDetails?.dose2?.date2)) : new Date());
  
  
  const dispatch = useDispatch();
  const SelectDose = (e) => {
    
    if (e.target.name == "firstDose") {
      setFirstDose(e.target.value)
    }
    else {
      setSecondDose(e.target.value);
    }
  }

  const onSubmit = () => {
    setLoader(true)
    let obj = {
      date1: moment(firstdate).format("M/D/YYYY"),
      vaccine1: firstDose,
      isDone: !!firstDose
    }
    let obj2 = {
      date2: moment(secondDate).format("M/D/YYYY"),
      vaccine2: secondDose,
      isDone: !!secondDose
    }

    if (!!secondDose) {
      var params = {
        dose1: obj,
        dose2: obj2
      }
      toastMessage("success", "You added your vaccination history successfully")
    } else {
      var params = {
        dose1: obj
      }
      toastMessage("success", "You added your vaccination history successfully")
    }


    getCovidServices(params)
      .then(({ data: { data } }) => {
        let userClone = { ...user?.user }
        let obj = {
          ...userClone,
          covidDetails: data
        }
        dispatch(setUser(
          {
            user: obj,
            status: user?.status,
            tokens: user?.tokens
          }
        ))
      })
      .catch(() => {
      }).finally(() => setLoader(false));
  }


  return (
    <div>
      <div className='cov'>
        {user?.user?.covidDetails ?
`Covid Compliance Information `:`Covid Compliance Information (Optional)`
}
        </div>
      {/* <Alert variant="warning" style={{ width: "95%", marginTop: "4%" }}>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <img style={{ marginRight: "30px" }} src={Exclamation} />
          <p className='warnText'>
     Please upload a copy of your Covid vaccination record. Your vaccination record will be stored within the UMS COVID-19 PointNClick System ONLY. The PointNClick system is a secure electronic medical record system used by healthcare providers and universities around the globe. By providing your vaccination record, you are consenting to and authorizing the University of Maine System to very and use your COVID-19 vaccination status ONLY for pandemic management purposes, including in compliance with the state of Maine, CDC, and other applicable laws, regulations, guidance or standards, which may include exemption from quarantine or testing in certain circumstances. I certify warrant represent and attest that any information upload to this UMS COVID-19 portal is complete and accurate to the best of my knowledge, and I understand that any intentional misrepresentation contained in the infomation provide may result in disciplinary action for students under the UMS Student Conduct Code up to and including disciplinary dismissal, and d dcn for empees up to and including termindin
          </p>
        </div>
      </Alert> */}

      <Container style={{ margin: 0, marginBottom: "4%", width: "96%" }}>
        <Row>
          <Col className="colCovid">
            <div className="reeqflex">
            <div className='dateDiv textpro' style={{ marginTop: "2rem" }}>Date 1</div>
          <span className="reqAsterik">*</span>
        </div>
            {/* <input className='vaccineDiv' type="date" /> */}
            <DatePicker
              className='inputInd w-100'
              selected={firstdate}
              onChange={(firstdate) => setFirstDate(firstdate)}
              maxDate={addDays(new Date(), 0)}

            />
          </Col>
          <Col className="colCovid">
            <div className="reeqflex">
            <div className='dateDiv textpro' style={{ marginTop: "2rem" }}>Types</div>
          <span className="reqAsterik">*</span>
        </div>
            <Form.Select aria-label="Default select example dropPro" name="firstDose" onChange={(e) => SelectDose(e)} value={firstDose}>
              <option value="">Select one</option>
              <option value="Sinopharm">Sinopharm</option>
              <option value="Sinovac">Sinovac</option>
              <option value="Pfizer">Pfizer</option>
              <option value="Johnson & Johnson">Johnson &amp; Johnson</option>
              <option value="Miderna">Miderna</option>
            </Form.Select>
          </Col>
        </Row>
      </Container>
      <Container style={{ margin: 0, width: "96%", marginBottom: "4%" }}>
        <Row>
          <Col className="colCovid">
            <div className="reeqflex">
            <div className='dateDiv textpro' style={{ marginTop: "2rem" }}>Date 2</div>
          <span className="reqAsterik">*</span>
        </div>
            {/* <input className='vaccineDiv' type="date" /> */}
            <DatePicker
              className='inputInd w-100'
              selected={secondDate}
              minDate={addDays(firstdate, 1)}
              maxDate={addDays(new Date(), 0)}
              onChange={(secondDate) => setSecondDate(secondDate)}
            />
          </Col>
          <Col className="colCovid">
            <div className="reeqflex">
            <div className='dateDiv textpro' style={{ marginTop: "2rem" }}>Types</div>
          <span className="reqAsterik">*</span>
        </div>
            <Form.Select aria-label="Default select example dropPro" name="secondDose" onChange={(e) => SelectDose(e)} value={secondDose}>
              <option value="">Select one</option>
              <option value="Sinopharm">Sinopharm</option>
              <option value="Sinovac">Sinovac</option>
              <option value="Pfizer">Pfizer</option>
              <option value="Johnson & Johnson">Johnson &amp; Johnson</option>
              <option value="Miderna">Miderna</option>



            </Form.Select>
          </Col>
        </Row>
        <Button disabled={firstDose && secondDose ? false : true} className='mt-4 btnPro' onClick={onSubmit}>
          {
            loader ? <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner> : "Save Changes"
          }
        </Button>
      </Container>

    </div>
  )
}

export default Covid