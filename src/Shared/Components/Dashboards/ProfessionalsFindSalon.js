import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import "./dashboards.css";
import {
  IndiviualPic,
  Logo,
  Searchicon,
  Salons,
  Message,
  Notifications,
  Pin,
} from "../../../Assets/index";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IndivualBanner from "../Dashboards/IndivualBanner";
import Saloon from "../JobSearch/salons";
import { useLocation } from "react-router";

function DashborasdFindSalons() {
  const [searchSaloon, setSearchSaloon] = useState("");
  const [saloon, setSaloon] = useState("");
  let location = useLocation();
  const reverse = location?.state;
  const handleSubmit = () => {
    setSearchSaloon(saloon);
  };
  
  return (
    <div className="DashborasdFindJobs">
      {reverse ? (
        <Saloon />
      ) : searchSaloon || !searchSaloon ? (
        <Saloon zip={searchSaloon} />
      ) : (
        <Container>
          <div className="content1">
            <h2>Discover Salon and Spas In Your Area </h2>
            <p>Find thousands of salons in your area with Salon Substitute!</p>
          </div>
          <div className="searchable">
            <div className="searchdiv">
              <div className="flexxsearch">
                <div className="item">
                  <Input
                    startAdornment={
                      <InputAdornment position="start">
                        <img src={Searchicon}></img>
                      </InputAdornment>
                    }
                    value={saloon}
                    onChange={(e) => setSaloon(e.target.value)}
                    placeholder="Salon name or zip code"
                  />
                </div>

                <div className="item mobi">
                  <Button onClick={handleSubmit}>Search</Button>
                </div>
              </div>
              <div className="infotext">
                <p className="srchText"></p>
              </div>
            </div>
          </div>
          <IndivualBanner linker="/salonfilter" />
        </Container>
      )}
    </div>
  );
}

export default DashborasdFindSalons;
