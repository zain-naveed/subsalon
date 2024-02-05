import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
// import "../salonSettings.css";
// import Data from "../data.json";
import DatePicker from "react-datepicker";
import moment from "moment";
import { getAvailability, getAvailabilityBack } from "../../../Shared/Services/getAvailabilityServices";
import { Spinner } from 'react-bootstrap';
import { toastMessage } from '../../../Shared';

const Data = [
  { id: 0, day: "MON", flag: false, startTime: null, endTime: null, ETUTC: "", STUTC: "" },
  { id: 1, day: "TUE", flag: false, startTime: null, endTime: null, ETUTC: "", STUTC: "" },
  { id: 2, day: "WED", flag: false, startTime: null, endTime: null, ETUTC: "", STUTC: "" },
  { id: 3, day: "THU", flag: false, startTime: null, endTime: null, ETUTC: "", STUTC: "" },
  { id: 4, day: "FRI", flag: false, startTime: null, endTime: null, ETUTC: "", STUTC: "" },
  { id: 5, day: "SAT", flag: false, startTime: null, endTime: null, ETUTC: "", STUTC: "" },
  { id: 6, day: "SUN", flag: false, startTime: null, endTime: null, ETUTC: "", STUTC: "" }
]
function Availability() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [flag, setFlag] = useState(false);
  const [startTime, setstartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [endTimeOpen, setendTimeOpen] = useState(false);
  const [data, setData] = useState(Data);
  const [loader, setLoader] = useState(false);
  const [bool, setBool] = useState(false)



  const handleChange = (e, id) => {
    setIsOpen(!isOpen);
    setstartTime(e)
  };

  // useEffect(()=>{

  // },[data])

  const handleeChange = (e) => {
    // 
    setendTimeOpen(!endTimeOpen);
    setEndTime(e);
  }

  const handleClick = (id) => {
    // e.preventDefault();

    // setIsOpen(!isOpen);
    setData(
      data.map(i => {
        if (i.id === id) {
          return {
            ...i,
            startTime: null,
          }
        }
        return i;
      }
      )
    )
  };

  const handleeClick = (id) => {
    setData(
      data.map(i => {
        if (i.id === id) {
          return {
            ...i,
            endTime: null,
          }
        }
        return i;
      }
      )
    )
  };

  const onSwitchAction = (e, id) => {
    setData(
      data.map(i => {
        if (i.id === id) {
          return {
            ...i,
            flag: !i.flag,
          }
        }
        return i;
      }
      )
    )
  };
  // 


  const handleStartTime = (value, id) => {
    setData(
      data.map(i => {
        if (i.id === id) {
          setstartTime(value);

          return {
            ...i,
            STUTC: moment(value).format(),
            startTime: moment(value).format("h:mm a"),
          }
        }
        return i;
      }
      )
    )
  }



  const handleEndTime = (value, id) => {
    setData(
      data.map(i => {
        if (i.id === id) {
          setEndTime(value);
          return {
            ...i,
            ETUTC: moment(value).format(),
            endTime: moment(value).format("h:mm a"),
          }
        }
        return i;
      }
      )
    )

  }

  const handleSubmit = () => {

    debugger
    let obj = {}
    let bool = true
    for (let i = 0; i < data.length; i++) {
      if (data[i].flag == true && ((data[i].STUTC == undefined || data[i].STUTC == "") || (data[i].ETUTC == undefined || data[i].ETUTC == undefined))) {
        bool = bool && false;
        toastMessage("error", `Please enter both Times against ${data[i].day.toUpperCase()}`)
      }
      else {
        if (data[i].flag == false) {
          obj[data[i].day.toLowerCase()] = {
            isAvail: data[i].flag
          }
        }
        else {
          if (data[i].STUTC && data[i].ETUTC) {
            obj[data[i].day.toLowerCase()] = {
              startTime: data[i].STUTC,
              endTime: data[i].ETUTC,
              isAvail: data[i].flag
            };
          } else {
            obj[data[i].day.toLowerCase()] = {
              isAvail: data[i].flag
            };
          }
        }
      }
    }

    
    setLoader(true)
    if (bool) {
      getAvailability(obj).then(({ data: { data } }) => {
        toastMessage("success", "Availability Set/Updated Successfully");
      }).catch((err) => {
      }).finally(() => setLoader(false))
    }
    else {
      setLoader(false)
    }

  }

  const getAvailabilityData = () => {
    getAvailabilityBack().then(({ data: { data } }) => {
      
      let tempData = { ...data };

      delete tempData._id
      let DataFromApi = { ...tempData };
      let temp = [];
      let days = Object.keys(DataFromApi)
      let arrayofObjs = [];
      Object.keys(DataFromApi).forEach((key) => {
        arrayofObjs.push({ [key]: DataFromApi[key] })
      })
      for (let i = 0; i < Object.keys(DataFromApi).length; i++) {
        temp.push({
          day: days[i],
          id: i,
          STUTC: arrayofObjs[i][days[i]].startTime,
          ETUTC: arrayofObjs[i][days[i]].endTime,
          flag: arrayofObjs[i][days[i]].isAvail,
          startTime: (arrayofObjs[i][days[i]]?.startTime) ? moment(arrayofObjs[i][days[i]].startTime).format("h:mm a") : "",
          endTime: (arrayofObjs[i][days[i]]?.endTime) ? moment(arrayofObjs[i][days[i]].endTime).format("h:mm a") : ""
        })
      }

      setData(temp)
    }).catch((err) => {
      // toastMessage("error", err?.response?.data?.message)
    }).finally(() => setLoader(false))
  }

  useEffect(() => {
    getAvailabilityData();
  }, [])


  return (
    <div>
      <h1 className='saloonCardTitle'>Set availability</h1>
      {
        data.map((i, id) => {
          return (
            <>
              <div className='divSlots' key={id}>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "35px" }}>
                    <h1 className='slotsDay'>{i.day}</h1>
                  </div>
                  {i.flag == false ?
                    <p className='slotUnavail'>Unavailable</p> :
                    <>
                      {
                        i.startTime ?
                          <div className='slotsDiv'><p className='slotsTime' onClick={() => handleClick(i.id)}> {i.startTime}</p></div>
                          :
                          <div className=''>
                            <DatePicker
                              placeholderText="Add Start Time"
                              className='availableStartTime slotsDiv'
                              selected={startTime}
                              onChange={(value) => handleStartTime(value, i.id)}
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={15}
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                            />
                          </div>
                      }
                      {/* {isOpen && (
                          <DatePicker
                            selected={startTime}
                            onChange={(e) => handleChange(e, i.id)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            onCalendarClose={handleCalendarClose}
                            onCalendarOpen={handleCalendarOpen}
                            inline />
                        )} */}

                      {/* </div> */}
                      {i.endTime ?
                        <div className='slotsDiv'><p className='slotsTime' onClick={() => handleeClick(i.id)}> {i.endTime}</p></div>
                        :
                        <div className=''>
                          <DatePicker
                            placeholderText="Add End Time"
                            className='availableEndTime slotsDiv'
                            selected={endTime}
                            onChange={(value) => handleEndTime(value, i.id)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                          />
                        </div>
                      }
                      {/* {endTimeOpen && (
                          <DatePicker
                            selected={endTime}
                            onChange={handleeChange}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            onCalendarClose={handleCalendarClose}
                            onCalendarOpen={handleCalendarOpen}
                            inline />
                        )} */}
                      {/* </div> */}
                    </>

                  }
                </div>
                <Form className='switchSlot'>
                  <Form.Check
                    className='switch'
                    checked={i.flag}
                    type="switch"
                    id={id}
                    onChange={(e) => onSwitchAction(e, id)}
                  />
                </Form>
              </div>
            </>
          )
        })
      }
      <button className='mt-4 btnPro minWidth135 btn btn-primary' onClick={() => handleSubmit()}>
        {loader ?
          <Spinner animation="border" role="status">
            <span className="visually-hidden">
              Loading...
            </span>
          </Spinner> :
          "Save Changes"}
      </button>
    </div >
  )
}

export default Availability