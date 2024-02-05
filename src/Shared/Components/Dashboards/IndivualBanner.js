import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";



function Banner(props) {
  const userResp = useSelector(state => state.root.user);
  // 

  return (
    <div className="bannerdash">
      <div className="backImg">
        <div className="content2flex">
          <div className="conten2">
            <h2>We are Hand-in-Hand in finding the Right One</h2>
            <p>
              {userResp?.user?.role == "professional" ? "Having trouble finding the right job for you? Well, with our help, you can do so with just a few clicks." : "Having trouble finding the right professionals for hair or beauty for your salon? Well, with our help, you can do so with just a few clicks."}
            </p>
            <Link to={userResp?.user?.role == "professional" ? "/professionals/findjob" : userResp?.user?.isSaloon ? "/post" : "/create-salon"}>
              <Button>{userResp?.user?.role == "professional" ? "Find a job" : "Post a Job"}</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
