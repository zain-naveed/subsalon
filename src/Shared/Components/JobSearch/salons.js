import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import "./salonsearch.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import "../JobSearch/findjob.css";
import {
  Pin,
  SearchWhite,
  Calender,
  Resetffilter,
} from "../../../Assets/index";
import Button from "@mui/material/Button";
import JobCards from "../card/JobCards";
import SalonCards from "../card/SalonCards";
// import currencies from "../../../Pages/autocomplete/Services.json";
import { useLocation } from "react-router";
import FreeSolo from "../../../Pages/autocomplete/FreeSolo";
import { store } from "../../../Shared/Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setServiceQuery } from "../../Redux/reducers/serviceQuerySlice";

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

function Salons(props) {
  const dispatch = useDispatch();

  const { notfy } = store.getState().root;
  
  const location = useLocation();
  
  const currencies = notfy?.services;
  const [data, setData] = useState("");
  const [selectService, setSelectService] = useState("");
  const [searching, setSearching] = useState();
  const [currency, setCurrency] = useState(data);
  const [zipCode, setZipCode] = useState();

  const ReturnDrawersDatas = (
    currencyData,
    jobtypeData,
    zipCodeData,
    datevalueData,
    valueData
  ) => {
    setCurrency(currencyData);
    setZipCode(zipCodeData);
  };

  useEffect(() => {
    if (Number(props.zip)) {
      setZipCode(props.zip);
    } else {
      setSearching(props.zip);
    }
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
    setZipCode("");
    setData("");
    setSelectService("");
    dispatch(setServiceQuery({ service: "" }));
  };
  
  return (
    <div className="maindiv">
      <div className={screenWidth < 993 ? "nonne" : "jobfilter"}>
        <Container className="custom_container">
          <div className="mainFilterbar">
            <div className="">
              <div className="fluuu salons">
                <div className="bg-light border salons firsttabs">
                  <div className="search">
                    <Search>
                      <SearchIconWrapper>
                        <img src={SearchWhite} />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Salon name"
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
                      id="standard-select-currency-salon"
                      select
                      data-shrink="true"
                      label="Service Provider"
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
                      livetest1
                      setData={setData}
                      data={data}
                      arr={currencies}
                      setSelectService={setSelectService}
                    />
                  </div>
                </div>
                <span className="span11"></span>
                <div className="bg-light border salons rangepicker">
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
      <SalonCards
        search={searching}
        services={selectService}
        map={zipCode}
        ReturnDrawersData={ReturnDrawersDatas}
      />
    </div>
  );
}

export default Salons;
