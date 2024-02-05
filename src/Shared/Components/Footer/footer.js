import React, { useState } from "react";
import "./footer.css";
import { Logo } from "../../../Assets";
import { MDBFooter } from "mdb-react-ui-kit";
import { RiFacebookFill, RiTwitterFill } from "react-icons/ri";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { newsLetter } from "../../../Shared/Services";
import { toastMessage } from "../../../Shared";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const subscribe = () => {
    if (email) {
      setLoader(true);
      let obj = {
        subscribeEmail: email,
      };
      newsLetter(obj)
        .then(({ data }) => {
          setEmail("");
          toastMessage("success", data.msg);
        })
        .catch((err) => toastMessage("error", err?.response?.data?.message))
        .finally(() => setLoader(false));
    } else {
      toastMessage("error", "Email is required!!");
    }
  };
  return (
    <>
      {/* <Container>
        <Row>
          <Col className='colFoot'>
            <img className='logoFoot' src={Logo} />
            <p className='pFooter'>Sub-Salon is a web application that aims to connect Salon Owners with Service Providers. Its a platform that will not only reduce the effort of a Salon Owner for finding a good Service Provider for availing the services.</p>
          </Col>
          <Col className='colFoot'>
            <h1 className='hFoot'>About</h1>
            <p className='pFoot'>Salons</p>
            <p className='pFoot'>Pricing</p>
            <p className='pFoot'>Legal</p>
            <p className='pFoot'>Privacy Policy</p>
            <p className='pFoot'>Terms &amp; Conditions</p>
          </Col>
          <Col className='colFoot'>
            <h1 className='hFoot'>Resources</h1>
            <p className='pFoot'>FAQs</p>
            <p className='pFoot'>Business</p>
            <p className='pFoot'>Updates</p>
            <p className='pFoot'>Contact Us</p>
          </Col>
          <Col className='colFoot'>
            <h1 className='hFoot'>Get job notifications</h1>
            <p className='pFoot' style={{ lineHeight: "2" }}>The latest job news, articles, sent to your inbox weekly.</p>
            <input className='inputFoot'/>
            <button className='btn btnFoot'>Subscribe</button>

          </Col>
        </Row>
      </Container> */}

      <MDBFooter className="text-center text-lg-start text-muted colorFoot">
        <div>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </a>
        </div>

        <section>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>
                  <img src={Logo} />
                </h6>
                <p className="pFooter">
                  Salon substitute is a website that aims to connect salon
                  owners with service providers. It is a platform that will
                  reduce the effort of a salon owner to find a service provider
                  as well as a place where a provider can create a profile to
                  easily find jobs and communicate with owners to find part-time
                  or full time positions.{" "}
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className=" fw-bold mb-4 hFoot">About</h6>
                <p>
                  <a href="#!" className="pFoot">
                    Salons
                  </a>
                </p>
                <p>
                  <a href="#!" className="pFoot">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#!" className="pFoot">
                    Legal
                  </a>
                </p>
                <p>
                  <Link to="/privacypolicy" className="pFoot">
                    Privacy Policy
                  </Link>
                </p>
                <p>
                  <Link to="/privacypolicy" className="pFoot">
                    Terms &amp; Conditions
                  </Link>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className=" fw-bold mb-4 hFoot">Resources</h6>
                <p>
                  <a href="#!" className="pFoot">
                    FAQs
                  </a>
                </p>
                <p>
                  <a href="#!" className="pFoot">
                    Bussiness
                  </a>
                </p>
                <p>
                  <a href="#!" className="pFoot">
                    Updates
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:contact@salonsubstitute.com"
                    className="pFoot"
                  >
                    Contact Us
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:contact@salonsubstitute.com"
                    className="pFoot"
                  >
                    contact@salonsubstitute.com
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="fw-bold mb-4 hFoot">Get job notifications</h6>
                <p className="pFoot">
                  <i className="fas fa-home"></i> The latest job news, articles,
                  sent to your inbox weekly.
                </p>
                <p className="pFoot">
                  <input
                    className="iptFoot"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Adress"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  />
                </p>
                <button className="btn btnFoot" onClick={subscribe}>
                  {loader ? <CircularProgress size={20} /> : "Subscribe"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="container foot socialDiv">
          <div className="p-4 pFoot">
            2022 ©
            <a className="fw-bold pFoot" href="#.">
              &nbsp; Salonsub. All rights reserved.
            </a>
          </div>
          <div className="socialsDiv">
            <button
              className="btn socials"
              name="facebook"
              onClick={() =>
                openInNewTab(
                  "https://www.facebook.com/The-Salon-Substitute-111505378209907/"
                )
              }
            >
              <RiFacebookFill />
            </button>
            <button
              className="btn socials"
              name="instagram"
              onClick={() =>
                openInNewTab("https://www.instagram.com/thesalonsubstitute")
              }
            >
              <FaInstagram />
            </button>
            {/* <button className='btn socials' name="linkedin" onClick={() => openInNewTab('https://linkedin.com')}><FaLinkedinIn /></button>
            <button className='btn socials' name="twitter" onClick={() => openInNewTab('https://twitter.com')}><RiTwitterFill /></button> */}
          </div>
        </div>
      </MDBFooter>
    </>
  );
};

export default Footer;
