import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { FaColumns } from "react-icons/fa";
// import Stack from "react-bootstrap/Stack";
import "./findjob.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
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
import { useLocation } from "react-router";
import moment from "moment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { jobType } from "../../index";
// import currencies from "../../../Pages/autocomplete/Services.json";
import { useSelector, useDispatch } from "react-redux";
import FreeSolo from "../../../Pages/autocomplete/FreeSolo";
import { servicesGet } from "../../Services/";
import { store } from "../../../Shared/Redux/store";
import { setServiceQuery } from "../../Redux/reducers/serviceQuerySlice";
import useDebounce from "../../util/useDebounce";

// import {currencies}  from "../../../../src/App"

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
    value: jobType.fullTime,
    label: "Full Time",
  },
  {
    value: jobType.partTime,
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

function FindJobs(props) {
  const { notfy } = store.getState().root;
  const { user } = store.getState().root;

  const location = useLocation();

  const currencies = notfy?.services;
  const [data, setData] = useState("");
  const [searching, setSearching] = useState(
    props.search ? props.search : location.state?.searchJob
  );

  const [currency, setCurrency] = useState(data);
  const [jobtype, setJobtype] = useState();
  const [zipCode, setZipCode] = useState(
    props.zip ? props.zip : location.state?.zip
  );
  const [datevalue, setDatevalue] = useState("");
  const [selectService, setSelectService] = useState("");
  const [value, setValue] = useState([
    0,
    user?.maxJobRate ? user?.maxJobRate : 50,
  ]);
  const [value2, setValue2] = useState([
    0,
    user?.maxJobRate ? user?.maxJobRate : 50,
  ]);
  const [open, setOpen] = React.useState(false);
  const [dt, setdte] = useState("");

  const ReturnDrawersDatas = (
    currencyData,
    jobtypeData,
    zipCodeData,
    datevalueData,
    valueData2
  ) => {
    setCurrency(currencyData);
    setJobtype(jobtypeData);
    setZipCode(zipCodeData);
    setDatevalue(datevalueData);
    // setValue(valueData);
    setValue2(valueData2);
  };

  useEffect(() => {
    window.addEventListener("resize", isMobile);
  }, []);
  const isMobile = () => {
    let widdthh = window.innerWidth;
    setscreenWidth(widdthh);
  };
  const dispatch = useDispatch();

  const [screenWidth, setscreenWidth] = useState(window.innerWidth);

  const resetallfilter = () => {
    setSearching("");
    setCurrency("");
    setSelectService("");
    setJobtype("");
    setZipCode("");
    setSearching("");
    setDatevalue(null);
    setValue([0, user?.maxJobRate]);
    setValue2([0, user?.maxJobRate]);
    setData("");
    dispatch(setServiceQuery({ service: "" }));
  };
  useDebounce(
    () => {
      setValue(value2);
    },
    [value2],
    800
  );
  // console.log(currencies,"currencies")
  return (
    <div className="maindiv">
      <div className={screenWidth < 993 ? "nonne" : "jobfilter"}>
        <Container className="custom_container">
          <div className="mainFilterbar">
            <div className="">
              <div className="fluuu">
                <div className="bg-light border firsttabs">
                  <div className="search">
                    <Search>
                      <SearchIconWrapper>
                        <img src={SearchWhite} />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ "aria-label": "search" }}
                        value={searching}
                        onChange={(e) => {
                          setSearching(e.target.value);
                        }}
                      />
                    </Search>
                  </div>
                  {/* <div className="services">
                    <TextField
                      id="standard-select-currency"
                      select
                      label="Services"
                      value={currency ? currency : ""}
                      onChange={(e) => {
                        setCurrency(e.target.value);
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
                    <FreeSolo
                      livetest
                      livetest3
                      setData={setData}
                      data={data}
                      arr={currencies}
                      setSelectService={setSelectService}
                    />
                  </div>
                </div>
                <span className="span11"></span>
                <div className="bg-light border">
                  <div className="jobtype">
                    <TextField
                      id="standard-select-currency"
                      select
                      label="Job type"
                      value={jobtype ? jobtype : ""}
                      onChange={(e) => {
                        setJobtype(e.target.value);
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
                {/* <span className="span11"></span>
                <div className="bg-light border zipcodes">
                  <div className="pin">
                    <img src={Pin} />
                  </div>
                  <div className="zipcode">
                    <TextField
                      id="standard-multiline-flexible"
                      label="Location you can serve"
                      placeholder="Enter your zip code"
                      multiline
                      maxRows={1}
                      value={zipCode}
                      onChange={(e) => {
                        setZipCode(e.target.value);
                      }}
                      variant="standard"
                    />
                  </div>
                </div> */}
                <span className="span11"></span>
                <div className="bg-light border datteeee zipcodes">
                  <div className="pin">{/* <img src={Calender} /> */}</div>
                  <div className="zipcode">
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      className="datteeee"
                    >
                      <DatePicker
                        label="Date"
                        open={open}
                        className="datteeee"
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        inputFormat="dd-MM-yyyy"
                        value={datevalue != "" ? datevalue : <></>}
                        onChange={(newValue) => {
                          setDatevalue(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            placeholder="dd-mm-yyyy"
                            label="dd-mm-yyyy"
                            {...params}
                            onClick={(e) => setOpen(true)}
                          />
                        )}
                        InputAdornmentProps={{ position: "start" }}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <span className="span11"></span>
                <div className="bg-light border rangepicker">
                  <div className="rangeslider">
                    <Box sx={{ width: 200 }}>
                      <Typography gutterBottom>Hourly pay</Typography>
                      <div className="sliderflex">
                        ${value2[0]}
                        <Slider
                          getAriaLabel={() => "Temperature range"}
                          value={value2 ? value2 : ""}
                          onChange={(e) => {
                            setValue2(e.target.value);
                          }}
                          valueLabelDisplay="400"
                          getAriaValueText={valuetext}
                          max={user?.maxJobRate ? user?.maxJobRate : 50}
                        />
                        ${value2[1]}
                      </div>
                    </Box>
                  </div>
                  <div className="resetbtn">
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
        </Container>
      </div>
      {screenWidth < 993 ? (
        <div className="searchmobile">
          <Search>
            <SearchIconWrapper>
              <img src={SearchWhite} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searching}
              onChange={(e) => {
                setSearching(e.target.value);
              }}
            />
          </Search>
        </div>
      ) : (
        ""
      )}
      <JobCards
        search={searching}
        services={selectService}
        jobtype={jobtype}
        map={zipCode}
        date={datevalue}
        rangeSlider={value}
        rangeSlider2={value2}
        ReturnDrawersData={ReturnDrawersDatas}
      />
    </div>
  );
}

export default FindJobs;
