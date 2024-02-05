import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { FaColumns } from "react-icons/fa";
import Stack from "react-bootstrap/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./drawer.css";
import {
  Pin,
  SearchWhite,
  Calender,
  Resetffilter,
} from "../../../Assets/index";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import JobCards from "../card/JobCards";
import currencies from "../../../Pages/autocomplete/Services.json";
import FreeSolo from "../../../Pages/autocomplete/FreeSolo";
import jobTitles from "../../../Pages/autocomplete/JobTitles.json";
import { store } from "../../Redux/store";
import useDebounce from "../../util/useDebounce";

// const currencies = [
//   {
//     value: "Receptionist",
//     label: "Receptionist",
//   },
//   {
//     value: "Assistant to a stylist",
//     label: "Assistant to a stylist",
//   },
//   {
//     value: "Substitute stylist",
//     label: "Substitute stylist",
//   },
//   {
//     value: "Nail Technician",
//     label: "Nail Technician",
//   },
//   {
//     value: "Esthetician",
//     label: "Esthetician",
//   },
//   {
//     value: "Massage Therapist",
//     label: "Massage Therapist",
//   },
//   {
//     value: "Makeup Artist",
//     label: "Makeup Artist",
//   },

// ];
const jobtypes = [
  {
    value: "Full Time",
    label: "Full Time",
  },
  {
    value: "Part Time",
    label: "Part Time",
  },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
function valuetext(value) {
  return `${value}°C`;
}

function JobSearchDrawer(props) {
  const [data, setData] = useState(props.servicesData);
  const { user } = store.getState().root;
  const [searching, setSearching] = useState();
  const [currency, setCurrency] = useState(props.servicesData);
  const [jobtype, setJobtype] = useState(props.jobData);
  const [zipCode, setZipCode] = useState(props.mapData);
  const [datevalue, setDatevalue] = useState(props.dateData);
  const maxValue = props?.isProfessional
    ? user?.maxJobRate
      ? user?.maxJobRate
      : 50
    : user?.hourRate
    ? user?.hourRate
    : 50;
  const [value, setValue] = useState(
    props.rangeSliderData
      ? props.rangeSliderData
      : [
          0,
          props?.isProfessional
            ? user?.maxJobRate
              ? user?.maxJobRate
              : 50
            : user?.hourRate
            ? user?.hourRate
            : 50,
        ]
  );
  const [value2, setValue2] = useState(
    props.rangeSliderData2
      ? props.rangeSliderData2
      : [
          0,
          props?.isProfessional
            ? user?.maxJobRate
              ? user?.maxJobRate
              : 50
            : user?.hourRate
            ? user?.hourRate
            : 50,
        ]
  );

  useEffect(() => {
    window.addEventListener("resize", isMobile);
  }, []);
  const isMobile = () => {
    let widdthh = window.innerWidth;
    setscreenWidth(widdthh);
  };
  const [screenWidth, setscreenWidth] = useState(window.innerWidth);

  const resetallfilter = () => {
    setSearching("");
    setCurrency("");
    setJobtype("");
    setZipCode("");
    setData("");
    setSearching("");
    setDatevalue("");
    setValue([0, props?.isProfessional ? user?.maxJobRate : user?.hourRate]);
    setValue2([0, props?.isProfessional ? user?.maxJobRate : user?.hourRate]);
  };
  props.ReturnDrawer(data, jobtype, zipCode, datevalue, value2);
  useDebounce(
    () => {
      setValue(value2);
    },
    [value2],
    800
  );
  return (
    <div className="jobdrawer">
      <div className="flex">
        <div className="fluuu">
          {props.services ? (
            <div className="bg-light border firsttabs">
              <div className="search"></div>
              {/* <div className="services">
                <TextField
                  id="standard-select-currency"
                  select
                  label="Services"
                  value={currency}
                  onChange={(e) => {
                    if (currency != e.target.value) {
                      setCurrency(e.target.value);
                    }
                  }}
                  variant="standard"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div> */}
              <div className="services">
                <TextField
                  id="standard-select-currency"
                  label="Services"
                ></TextField>
                <FreeSolo setData={setData} data={data} arr={jobTitles} />
              </div>
            </div>
          ) : (
            ""
          )}
          {props.jobtype ? (
            <>
              <span className="liner">
                <hr></hr>
              </span>

              <div className="bg-light border">
                <div className="jobtype">
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Job type"
                    value={jobtype}
                    onChange={(e) => {
                      if (jobtype != e.target.value) {
                        setJobtype(e.target.value);
                      }
                    }}
                    variant="standard"
                  >
                    {jobtypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {props.map ? (
            <>
              <span className="liner">
                <hr></hr>
              </span>
              <div className="bg-light border zipcodes">
                <div className="zipcode">
                  <div className="pin">
                    <img src={Pin} />
                  </div>
                  <TextField
                    id="standard-multiline-flexible"
                    label="Location you can serve"
                    placeholder="Enter your zip code"
                    multiline
                    maxRows={1}
                    value={zipCode}
                    onChange={(e) => {
                      if (zipCode != e.target.value) {
                        setZipCode(e.target.value);
                      }
                    }}
                    variant="standard"
                  />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {props.date ? (
            <>
              <span className="liner">
                <hr></hr>
              </span>
              <div className="bg-light border zipcodes">
                <div className="zipcode">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date"
                      className="datteeee"
                      inputFormat="dd, MMM, yyyy"
                      // formatDate={(date) => moment(date).format('Do MM YYYY')}
                      value={datevalue}
                      onChange={(newValue) => {
                        setDatevalue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <span className="liner">
            <hr></hr>
          </span>
          <div className="bg-light border rangepicker">
            {props.rangeSlider ? (
              <>
                <div className="rangeslider">
                  <Box sx={{ width: 200 }}>
                    <Typography gutterBottom>Rate of pay hourly</Typography>
                    <div className="sliderflex">
                      ${value2[0]}{" "}
                      <Slider
                        getAriaLabel={() => "Temperature range"}
                        value={value2}
                        onChange={(e) => {
                          if (value2 != e.target.value) {
                            setValue2(e.target.value);
                          }
                        }}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        max={maxValue}
                      />
                      ${value2[1]}
                    </div>
                  </Box>
                </div>
              </>
            ) : (
              ""
            )}
            <div className="resetbtn">
              <div className="applybtn">
                <Button variant="outlined" onClick={props.closii}>
                  Apply Now
                </Button>
              </div>
              <Button
                variant="outlined"
                onClick={() => {
                  resetallfilter();
                }}
                startIcon={<img src={Resetffilter} />}
              >
                Reset filter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSearchDrawer;
