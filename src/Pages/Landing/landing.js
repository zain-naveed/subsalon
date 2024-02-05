import React, { useState,useEffect } from "react";
import Navigation from "../../Shared/Components/Navbar/navigation";
import "./landing.css";
import Cards from "../../Shared/Components/card/card";
import { Reception, HandsPic } from "../../Assets";
import Footer from "../../Shared/Components/Footer/footer";
import { ButtonGroup, Col, Container, Row } from "react-bootstrap";
import Pricing from "../../Shared/Components/Pricing/pricing";
import SearchViaZip_Title from "../../Shared/Services/SearchViaZip_Title";
import IndivualBanner from "../../Shared/Components/Dashboards/IndivualBanner";
import JobCardsData from "../../Shared/Components/card/JobCardsData";
import { Button } from "@mui/material";
import MultiSlisder from "../../Shared/Components/Slider/MultiSlisder";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import {getPublicJobs} from '../../Shared/Services'
import { setUser } from "../../Shared/Redux/reducers/userSlice";
import { useSelector,useDispatch } from "react-redux";
import OwnerJobDeatils from "../../Shared/Components/card/OwnerJobDetails";

const Landing = () => {
  const user = useSelector((state) => state.root.user.user);
  const [recent, setRecentt] = useState('feature');
  const [searchJob,setSearchJob] = useState("");
  const [zip,setZip] = useState("");
  const naviagte = useNavigate();
  const [publicJobs,setPublicJobs] = useState([])
  const location = useLocation();
let pathName = location.pathname
 const jobcardstabs =  (text) =>{
   setRecentt(text)

 }
 const handeSearch = (search,zip)=>{
  setSearchJob(search)
  setZip(zip)
}
 const getAllPublicJob = ()=>{
  getPublicJobs().then(({data:{data}})=>{
    
    setPublicJobs(data)
  }).catch((err)=>{
    
  })
 }
 useEffect(()=>{
  getAllPublicJob()
 },[])
 
  return (
    <div>
      <Navigation />
      <div className="heroBanner">
        <Container>
     
       <SearchViaZip_Title />
  
        </Container>

        <img className="handpicc" src={HandsPic}></img>
      </div>

      <div className="landingCategory">
        <div className="divLanding">
          <h1 className="paragraph btm">
            One Platform<br></br> Many <span className="span2">Categories</span>
          </h1>
        </div>
        <Container>
          <Row className="categirres">
            <Col>
              <Cards
                title="Receptionist"
                text="152 Available"
                img={Reception}
              />
            </Col>
            <Col>
              <Cards
                title="Makeup Artist "
                text="280 Available"
                img={Reception}
              />
            </Col>
            <Col>
              <Cards
                title="Massage Therapist"
                text="185 Available"
                img={Reception}
              />
            </Col>
            <Col>
              <Cards title="Esthetician" text="190 Available" img={Reception} />
            </Col>
            <Col>
              <Cards
                title="Receptionist"
                text="152 Available"
                img={Reception}
              />
            </Col>
            <Col>
              <Cards
                title="Makeup Artist "
                text="280 Available"
                img={Reception}
              />
            </Col>
            <Col>
              <Cards
                title="Massage Therapist"
                text="185 Available"
                img={Reception}
              />
            </Col>
            <Col>
              <Cards title="Esthetician" text="190 Available" img={Reception} />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="indiviuulBanner">
        <IndivualBanner linker="/jobfilter" />
      </div>
      <div className="mainjobcard">
        <Container>
          <div className="picInfos">
            <div className="title">
              <div className="title_fflex">
                <div className="inffoitem">
                  <h2>{user?.role === 'owner' ? "Professionals": "Jobs are waiting for you"}</h2>
                </div>
                <div className="inffoitem">
                  {/* <Button className="btn_feature" onClick={()=>{jobcardstabs("feature")}}>Featured Jobs</Button> */}
                  <Button className="btn_recent"onClick={()=>{jobcardstabs("recent")}}>Recent {user?.role === 'owner' ? "Professional":"Jobs"}</Button>
                </div>
              </div>
            </div>
               {user?.role === 'owner' ?  <OwnerJobDeatils landing /> :           
           <JobCardsData test={recent} publicJobs={publicJobs} landing />
      }
          
           
          </div>

        </Container>
      </div>
      <MultiSlisder/>
      <Pricing type="home" plan/>
      <Footer />
    </div>
  );
};

export default Landing;
