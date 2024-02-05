import React,{useState} from "react";
import { Button, Container } from "react-bootstrap";
import "./dashboards.css";
import IndivualBanner from "./IndivualBanner"
import { AppTtitle } from "../../util/TtitleName";
import SearchViaZip_Title from "../../Services/SearchViaZip_Title";
import OwnerFindJob from "../JobSearch/OwnerFindJob";
import { useLocation } from "react-router";


function OwnerFindJobs() {

    AppTtitle("Owner | Subsalon")
    const [searchJob,setSearchJob] = useState("");
    const [zip,setZip] = useState("");
    let location  = useLocation()
    const reverse = location?.state
    const handeSearch = (val)=>{
      setSearchJob(val)
      setZip(zip)

    }

  return (
    <div className="DashborasdFindJobs">
     {reverse ? 

    <OwnerFindJob/>
      
      :
     searchJob ? 
     <OwnerFindJob search ={searchJob} zip={zip}/>
     :<Container>
     <SearchViaZip_Title owneer handeSearch={handeSearch} />
      <IndivualBanner linker = "/post" />
     
    </Container>
    }
    
    
  </div>
  )
}

export default OwnerFindJobs