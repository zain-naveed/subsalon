import React from "react";
import {user as avataar } from "../../../Assets/index";
import moment from "moment";
function Receiver({ msgItem }) {
  
  return (
    <>
      {msgItem?.text && msgItem?.pic?.length ? (
        <div class="message-receive flex">
          <div class="chat-dp online">
            <img
              src={
                msgItem?.senderId?.saloon && msgItem?.senderId?.saloon?.avatar
                  ? msgItem?.senderId?.saloon?.avatar
                  : msgItem?.senderId?.profilePic
                  ? msgItem?.senderId?.profilePic
                  : avataar
              }
              alt=""
            />
          </div>
          <div class="chat-text msg-reciver">
            <div className="d-flex flex-wrap justify-content-start wwith">
              {msgItem?.pic?.length
                ? msgItem?.pic?.map((imgUrl, inx) => {
                    return (
                      <span
                        class="message-time implementImg"
                        key={`message-time-${inx}`}
                      >
                        <img
                          style={{ maxWidth: "100%", overflow: "hidden" }}
                          src={imgUrl}
                        />
                      </span>
                    );
                  })
                : ""}
            </div>
            <div class="message">
              <p>{msgItem?.text}</p>
            </div>
            <div className="inffodetail reciver">
              <span class="message-time">
                {msgItem?.senderId?.saloon &&
                msgItem?.senderId?.saloon?.Saloon_name
                  ? msgItem?.senderId?.saloon?.Saloon_name
                  : msgItem?.senderId?.name
                  ? msgItem?.senderId?.name
                  : ""}
              </span>
              <span class="message-time">
                {msgItem.createdAt
                  ? moment(msgItem.createdAt).format("DD/MM/YYYY")
                  : ""}
              </span>
              <span class="message-time">
                {msgItem.createdAt
                  ? moment(msgItem.createdAt).format("hh:mm a")
                  : ""}
              </span>
            </div>
          </div>
        </div>
      ) : msgItem?.text ? (
        <div class="message-receive flex">
          <div class="chat-dp online">
            <img
              src={
                msgItem?.senderId?.saloon && msgItem?.senderId?.saloon?.avatar
                  ? msgItem?.senderId?.saloon?.avatar
                  : msgItem?.senderId?.profilePic
                  ? msgItem?.senderId?.profilePic
                  : avataar
              }
              alt=""
            />
          </div>
          <div class="chat-text msg-reciver">
            <div className="d-flex flex-wrap justify-content-start wwith">
              {msgItem?.pic?.length
                ? msgItem?.pic?.map((imgUrl, inx) => {
                    return (
                      <span
                        class="message-time implementImg"
                        key={`message-time-${inx}`}
                      >
                        <img
                          style={{ maxWidth: "100%", overflow: "hidden" }}
                          src={imgUrl}
                        />
                      </span>
                    );
                  })
                : ""}
            </div>
            <div class="message">
              <p>{msgItem?.text}</p>
            </div>
            <div className="inffodetail reciver">
              <span class="message-time">
                {msgItem?.senderId?.saloon &&
                msgItem?.senderId?.saloon?.Saloon_name
                  ? msgItem?.senderId?.saloon?.Saloon_name
                  : msgItem?.senderId?.name
                  ? msgItem?.senderId?.name
                  : ""}
              </span>
              <span class="message-time">
                {msgItem.createdAt
                  ? moment(msgItem.createdAt).format("DD/MM/YYYY")
                  : ""}
              </span>
              <span class="message-time">
                {msgItem.createdAt
                  ? moment(msgItem.createdAt).format("hh:mm a")
                  : ""}
              </span>
            </div>
          </div>
        </div>
      ) : msgItem?.pic?.length ? (
        <div class="message-receive flex">
          <div class="chat-dp online">
            <img
              src={
                msgItem?.senderId?.saloon && msgItem?.senderId?.saloon?.avatar
                  ? msgItem?.senderId?.saloon?.avatar
                  : msgItem?.senderId?.profilePic
                  ? msgItem?.senderId?.profilePic
                  : avataar
              }
              alt=""
            />
          </div>
          <div class="chat-text msg-reciver">
            <div className="d-flex flex-wrap justify-content-start wwith">
              {msgItem?.pic?.length
                ? msgItem?.pic?.map((imgUrl, inx) => {
                    return (
                      <span
                        class="message-time implementImg"
                        key={`message-time-${inx}`}
                      >
                        <img
                          style={{ maxWidth: "100%", overflow: "hidden" }}
                          src={imgUrl}
                        />
                      </span>
                    );
                  })
                : ""}
            </div>
           
         <div className="inffodetail reciver">
             <span class="message-time">{msgItem?.senderId?.saloon && msgItem?.senderId?.saloon?.Saloon_name ? msgItem?.senderId?.saloon?.Saloon_name : msgItem?.senderId?.name ? msgItem?.senderId?.name : ""}</span>
             <span class="message-time">{msgItem.createdAt ? moment(msgItem.createdAt).format("DD/MM/YYYY") : ""}</span>
             <span class="message-time">{msgItem.createdAt ? moment(msgItem.createdAt).format("hh:mm a") : ""}</span>
         </div> 
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Receiver;
