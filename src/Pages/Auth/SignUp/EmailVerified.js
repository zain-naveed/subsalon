import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import Foot from "../../../Shared/Components/Foot/Foot";
import { useLocation } from "react-router";
import NavbarAuth from "./NavbarAuth";
import { EmailIcon } from "../../../Assets/index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { emailVerified } from "../../../Shared";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Shared/Redux/reducers/userSlice";
import { toastMessage } from "../../../Shared/Components/Toast/Toast";
import { Spinner } from "react-bootstrap";
import { roleEnum } from "../../../Shared";

const EmailVerified = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  let params = useParams();
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state.root.user);
  
  const [email, setEmail] = useState(
    user?.user?.email ? user?.user?.email : ""
  );
  useEffect(() => {
    emailVerifieds();
  }, []);

  const emailVerifieds = () => {
    let query = `?token=${location?.search?.replace("?token=", "")}`;

    setLoader(true);

    emailVerified(query)
      .then(({ data }) => {
        if (data) {
          let obj = {
            tokens: data?.tokens,
            user: data.user,
          };

          dispatch(setUser(obj));

          toastMessage("success", "Email verified Succesfully!");
          setLoader(false);
          if (
            data.user.role == roleEnum.professional &&
            user?.user?.isProfileComplete == false
          ) {
            naviagte("/profile-setup");
          } else if (
            data.user.role == roleEnum.owner &&
            user?.user?.isSaloonProfile == false
          ) {
            naviagte("/create-salon");
          } else if (user?.user?.isSubscription == false) {
            naviagte("/plan");
          } else if (
            data.user.role == roleEnum.professional &&
            user?.user?.isProfileComplete &&
            user?.user?.isSubscription
          ) {
            naviagte("/professionals/findjob");
          } else if (
            data.user.role == roleEnum.owner &&
            user?.user?.isSaloonProfile &&
            user?.user?.isSubscription
          ) {
            naviagte("/owner/dashboard");
          } else {
            naviagte("/create-salon");
          }
          // naviagte("/email-authentication", { state: { email } })
        }
      })
      .catch((e) => {
        toastMessage("error", e.response.data.message);
      })
      .finally(() => setLoader(false));
  };

  return (
    <div className="divSigin">
      <NavbarAuth check />
      <div className="contSignIn padCard">
        <Card className="cardSign" style={{ width: "32rem", height: "auto" }}>
          <Card.Body className={loader ? "loaadeer" : ""}>
            {loader ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <Container className="container-authenticate">
                <img src={EmailIcon} style={{ marginBottom: "5%" }} />
                <h1 className="email-authenticate">
                  Congratulations! , your email has been verified
                </h1>
                <p className="email-authenticate-p">
                  Please click below to login
                </p>
                {user?.user?.role == roleEnum.professional &&
                user?.user?.isProfileComplete == false ? (
                  <button
                    onClick={() => naviagte("/profile-setup")}
                    className="btn continue"
                  >
                    {"Go to profile setup"}
                  </button>
                ) : user?.user?.isProfileComplete &&
                  user?.user?.isSubscription &&
                  user?.user?.role == roleEnum.professional ? (
                  <button
                    onClick={() => naviagte("/professionals/findjob")}
                    className="btn continue"
                  >
                    {"Go to landing"}
                  </button>
                ) : user?.user?.isSaloonProfile &&
                  user?.user?.isSubscription &&
                  user?.user?.role == roleEnum.owner ? (
                  <button
                    onClick={() => naviagte("/owner/dashboard")}
                    className="btn continue"
                  >
                    {"Go to landing"}
                  </button>
                ) : user?.user?.isSaloonProfile ? (
                  <button
                    onClick={() => naviagte("/plan")}
                    className="btn continue"
                  >
                    {"Go to plan"}
                  </button>
                ) : (
                  <button
                    onClick={() => naviagte("/create-salon")}
                    className="btn continue"
                  >
                    {"Go to Salon setup"}
                  </button>
                )}
              </Container>
            )}
          </Card.Body>
        </Card>
      </div>
      <Foot />
    </div>
  );
};

export default EmailVerified;
