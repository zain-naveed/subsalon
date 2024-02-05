import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IoMdCopy } from "react-icons/io";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdRemoveCircle } from "react-icons/md";
import { inviteLetter } from "../../../Assets/index";
import { toastMessage } from "../../../Shared";
import { Identity } from "@mui/base";
import { useSelector } from "react-redux";
import { inviteSaloon } from "../../../Shared/Services/invite";
import { Spinner } from "react-bootstrap";

function Invite() {
  const { user } = useSelector((state) => state.root);
  const [loader, setLoader] = useState(false);

  let saloon_ID = user?.user?.saloon._id;
  

  const [text, setText] = useState(`https://thesalonsubstitute.com/`);
  const [inviteArr, setInviteArr] = useState([
    {
      email: "",
      name: "",
    },
  ]);

  const handleChange = (e, inx) => {
    let temp = [...inviteArr];

    if (e.target.name == "email") {
      temp[inx].email = e.target.value;
    } else {
      temp[inx].name = e.target.value;
    }

    setInviteArr(temp);
  };

  // 

  const handleAdd = () => {
    let temp = [...inviteArr];
    if (temp.length > 0) {
      let value = temp.filter((i) => i.email == "");
      if (value.length) {
        toastMessage("error", "Please Add Email");
      } else {
        temp.push({ email: "", name: "" });
        setInviteArr(temp);
      }
    }
  };

  const removeField = (i) => {
    
    debugger;
    let temp = [...inviteArr];
    temp.splice(i, 1);
    
    setInviteArr(temp);
  };

  const copyText = (e) => {
    if (text === "") {
      toastMessage("error", "Invite Link Empty");
    } else {
      toastMessage("success", "Copied to Clipboard");
      navigator.clipboard.writeText(
        `https://thesalonsubstitute.com/salonDetail/${saloon_ID}`
      );
    }
  };
  
  const handleSubmit = () => {
    setLoader(true)
    let obj = [...inviteArr];
    if (obj.length > 0) {
      let value = obj.filter((i) => i.email == "");
      if (value.length) {
        toastMessage("error", "Please Add Email");
      setLoader(false)

      } else {
        let inviteObj = {
          saloon: saloon_ID,
          invite: obj,
        };
        inviteSaloon(inviteObj)
          .then(({ data }) => {
            
            toastMessage("success", "Successfully invite");
            setLoader(false)

          })
          .catch((er) => {
            toastMessage("error", "Not send yet !");
            setLoader(false)

          });
      }
    }
  };

  return (
    <div>
      <div className="inviteImg">
        <img src={inviteLetter} />
      </div>
      <h1 className="inviteLetterH">Invite people to Salon</h1>

      <div className="divIpt">
        <h2 className="inviteH">Invite Share Link</h2>
        <div style={{ position: "relative" }}>
          <input
            className="inviteIpt"
            value={text}
            disabled
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn btnInvite" onClick={copyText}>
            <IoMdCopy className="svgInvite" />
            <span className="responsiveInvite">Copy Link</span>
          </button>
        </div>
      </div>
      <div className="lineDiv">
        <div className="lineInvite"></div>
        <div className="lineText">OR</div>
        <div className="lineInvite"></div>
      </div>
      <Container className="containerInvite">
        {inviteArr?.map((resp, i) => {
          return (
            <>
              <Row className="mt-4 rowInvite" key={i}>
                <Col className="colInvite">
                  <h1 className="inviteH">Email address</h1>
                  <input
                    className="invitationIpt"
                    name="email"
                    placeholder="eg. name@email.com"
                    onChange={(e) => handleChange(e, i)}
                  />
                </Col>
                <Col className="colInvite">
                  <h1 className="inviteH">
                    Full Name (optional)&nbsp;&nbsp;&nbsp;&nbsp;
                    {inviteArr.length > 1 ? (
                      <MdRemoveCircle
                        onClick={() => removeField(i)}
                        style={{ color: "#2892D7", cursor: "pointer" }}
                      />
                    ) : (
                      ""
                    )}
                  </h1>
                  <input
                    className="invitationIpt"
                    name="name"
                    placeholder="Optional"
                    onChange={(e) => handleChange(e, i)}
                  />
                </Col>
              </Row>
            </>
          );
        })}
        <div className="linkSend mt-4">
          <h1 onClick={handleAdd} className="addAnother">
            <BsPlusCircleFill
              style={{ color: "#2892D7", marginRight: "10px" }}
            />
            Add another
          </h1>
          <button className="btn btnSendLink" onClick={() => handleSubmit()}>
            
            {loader ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    "Invite"
                  )}
          </button>
        </div>
      </Container>
    </div>
  );
}

export default Invite;
