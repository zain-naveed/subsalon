import React, { useEffect, useState } from "react";
import { Submit } from "./theme";
import SendIcon from "@mui/icons-material/Send";
import File from "../assets/File.svg";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import "../assets/css/messages.css";
import { createConversation } from "../../../Shared/Services/conversate.service";
import { socket } from "../../../Shared/Services/socketService";
import { set } from "date-fns";
import Files from "./Files";
import { getImageServices } from "../../../Shared/Services/imageService";
import { GiConsoleController } from "react-icons/gi";

function Message({ selectUser, setSelectUser, conversation, setCoversation }) {
  const { user, chat } = useSelector((state) => state.root);
  const [message, setMessage] = useState("");
  const [filesArr, setFilesArr] = useState([]);
  const [bool, setBool] = useState(false);
  const [loood, setLood] = useState(false);

  const [removeArrImg, setRemoveArrImg] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesLocation, setImagesLocation] = useState([]);
  let changeUser = selectUser?.members?.find(
    (ii) => ii?._id != user?.user?._id
  );
  let sendUser = selectUser?.members?.find((ii) => ii?._id == user?.user?._id);
  
  
  
  useEffect(() => {}, [bool]);
  const setLoodiing = (boolss) => {
    
    setLood(boolss);
  };
  const crteConversation = () => {
    setBool(true);
    debugger
    if (message || filesArr) {
      let msg = {
        senderId: user?.user?._id,
        receiverId: chat?.receiver?._id,
      };
      if (!selectUser?._id) {
        createConversation(msg)
          .then(({ data: { data } }) => {
            
            let obj = {
              ...selectUser,
              _id: data?._id,
              lastMsgDate: data?.createdAt,
            };
            if (message.length) {
              obj["lastMsg"] = message;

              let clonConver = [...conversation];
              let matchIndex = clonConver.findIndex(
                (ii) => ii.idInx == selectUser?.idInx
              );
              let selectConver = clonConver[matchIndex];
              selectConver["_id"] = data?._id
              selectConver["lastMsg"] = message;
              selectConver["lastMsgDate"] = new Date();
              clonConver[matchIndex] = selectConver
              
              setCoversation(clonConver);
              let msgBody = {
                senderId: sendUser,
                receiverId: changeUser?._id,
                conversationId: data?._id,
              };
              if (message.length) {
                msgBody["text"] = message;
              }
              if (imagesLocation.length) {
                msgBody["pic"] = imagesLocation;
              }

              // let msgBody = {
              //   senderId: sendUser,
              //   receiverId: changeUser?._id,
              //   conversationId: data?._id
              // }
              if (message.length) {
                msgBody["text"] = message;

                socket.emit("sendMessage", msgBody);
                setMessage("");
              }
            }
          })
          .catch((err) => {
            
          });
      } else {
        let clonConver = [...conversation];
        let matchIndex = clonConver.findIndex(
          (ii) => ii.idInx == selectUser?.idInx
        );
        let selectConver = clonConver[matchIndex];
        let msgBody = {
          senderId: sendUser,
          receiverId: changeUser?._id,
          conversationId: selectUser?._id,
          createdAt: new Date(),
        };
        if (message.length) {
          msgBody["text"] = message;
        }
        if (imagesLocation.length) {
          msgBody["pic"] = imagesLocation;
        }
        if (matchIndex > -1) {
          selectConver.lastMsg = message;
          selectConver.lastMsgDate = new Date();
          clonConver[matchIndex] = selectConver;
          setCoversation(clonConver);
          selectConver.pic = imagesLocation;
        }
        socket.emit("sendMessage", msgBody);
        setImages([]);
        setFilesArr([]);
        setImagesLocation([]);
        setMessage("");
      }

      //
    }
  };
  
  return (
    <div class="inbox-footer flex center">
      <div class="chat-files">
        <input
          type="file"
          name="attachment"
          id="chat-file"
          multiple=""
          onchange="readURL(this);"
        />
        {/* <label for="chat-file"><img src="assets/images/attach.svg" alt="" /></label> */}
      </div>
      <div class="chat-files">
        <input
          type="file"
          id="chat-pic"
          multiple=""
          onchange="readURL(this);"
        />
        {/* <label for="chat-pic"><img src="assets/images/camera.svg" alt="" /></label> */}
      </div>
      <div class="type-message">
        <label
          className="fileAdd"
          htmlFor={`upload_image`}
          style={{ cursor: "pointer" }}
        >
          {/* <img src={File} /> */}
          <Files
            filesArr={filesArr}
            images={images}
            setImages={setImages}
            setFilesArr={setFilesArr}
            removeArrImg={removeArrImg}
            setRemoveArrImg={setRemoveArrImg}
            imagesLocation={imagesLocation}
            setImagesLocation={setImagesLocation}
            bool={bool}
            setLood={setLoodiing}
          />
        </label>
        <input
          type="file"
          name={`upload_image`}
          style={{ display: "none" }}
          accept="image/*"
        />

        <input
          className="input"
          value={message}
          id="msg"
          // contentEditable={true}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && crteConversation()}
          placeholder="Write Messages"
          autocomplete="off"

          //   placeholder="Type your message"
        />

        <Submit
          className={loood ? "looaad" : "nthng"}
          onClick={crteConversation}
          variant="contained"
          startIcon={<SendIcon />}
        >
          Send
        </Submit>
      </div>
      {/* <div id="upload-gallery"></div> */}
    </div>
  );
}

export default Message;
