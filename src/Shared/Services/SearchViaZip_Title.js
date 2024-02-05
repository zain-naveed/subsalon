import React,{useState} from 'react'
import { Button, Container } from "react-bootstrap";
import {
    IndiviualPic,
    Logo,
    Searchicon,
    Salons,
    Message,
    Notifications,
    Pin,
    
  } from "../../Assets/index";
  import Input from "@mui/material/Input";
  import InputAdornment from "@mui/material/InputAdornment";
  import { useLocation,useNavigate } from 'react-router';
  import { setUser } from "../../Shared/Redux/reducers/userSlice";
  import { useSelector,useDispatch } from "react-redux";

function SearchViaZip_Title({handeSearch,owneer}) {
  const [search,SetSearh] = useState("")
  const [zip,SetZip] = useState("")
  const location = useLocation();
  const user = useSelector((state) => state.root.user.user);
  const naviagte = useNavigate();



  const handleSubmit = ()=>{
    // handeSearch(search,zip)
    naviagte( user?.role === 'owner' ?"/professional":"/findjob" , { state: { searchJob: search,zip:zip } })
  }

  const handleKeypress = e => {
    //it triggers by pressing the enter key
  if (e.keyCode === 13) {
    handleSubmit();
  }
};
  return (
    <div> <div className="content1">
    <h2>
      Discover and book beauty &amp; <br></br> wellness professionals near you
    </h2>
    <p>
      Having trouble finding the right hair or beauty business in your
      area? Well, with our help, you can do so with just a few clicks.
    </p>
  </div>
  <div className="searchable">
    <div className="searchdiv">
    <form>

      <div className="flexxsearch">
        <div className="item">
          <Input
          value={search}
            startAdornment={
              <InputAdornment position="start">
                <img src={Searchicon}></img>
              </InputAdornment>
            }
            onChange={(e)=>SetSearh(e.target.value)}
            placeholder={user?.role === 'owner' ? "Find service providers": "Find with job title"}
            onKeyPress={handleKeypress}

          />
        </div>
        {/* <span className="span11"></span>
        <div className="item">
          <Input
            startAdornment={
              <InputAdornment position="start">
                <img className="pinn" src={Pin}></img>
              </InputAdornment>
            }
            onChange={(e)=>SetZip(e.target.value)}
            placeholder="Enter zip code"
          />
        </div> */}
        <div className="item mobi">
          <Button onClick={handleSubmit} type="submit">Search</Button>
        </div>
      </div>
      </form>

      <div className="infotext">
        <p className="srchText">
          Popular : Hair Stylist, Barber, Massage Therapist, Makeup Artist
        </p>
      </div>
    </div>
  </div>
  </div>
  )
}

export default SearchViaZip_Title