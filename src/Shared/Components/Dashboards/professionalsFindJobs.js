import React,{useState} from "react";
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
import IndivualBanner from "./IndivualBanner"
import { AppTtitle } from "../../util/TtitleName";
import SearchViaZip_Title from "../../Services/SearchViaZip_Title";
import FindJob from '../JobSearch/professionalsFindJobs'
function DashborasdFindJobs() {
  AppTtitle("DashBoard | Subsalon")
  const [searchJob,setSearchJob] = useState("");
  const [zip,setZip] = useState("");

  const handeSearch = (search,zip)=>{
    setSearchJob(search)
    setZip(zip)
  }
  
  // function notifyMe() {
  //   debugger
  //   // Let's check if the browser supports notifications
  //  if (Notification.permission === "granted") {
  //     // If it's okay let's create a notification
  //     // const notification = new Notification("Hi there!");
  //   }
  
  //   // Otherwise, we need to ask the user for permission
  //   else if (Notification.permission !== "denied") {
  //     Notification.requestPermission().then(function (permission) {
  //       // If the user accepts, let's create a notification
  //       if (permission === "granted") {
  //         // const notification = new Notification("Hi there!");
  //       }
  //     });
  //   }
  
  //   // At last, if the user has denied notifications, and you
  //   // want to be respectful there is no need to bother them any more.
  // }
  // notifyMe()
  
  return (
    <div className="DashborasdFindJobs">
      {
       searchJob || zip ?   <FindJob search ={searchJob} zip={zip} />:
       <Container>
       <SearchViaZip_Title handeSearch={handeSearch}/>
        <IndivualBanner linker = "/post" />
       
       
      </Container>
      }
      
      
    </div>
  );
}

export default DashborasdFindJobs;
