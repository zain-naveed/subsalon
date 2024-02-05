import React from "react";
import Avatar from "../assets/Avatar.png";
import {user as avataar } from "../../../Assets/index";
import { useSelector } from 'react-redux'
import moment from 'moment'
function Sender({ msgItem }) {
  const { user, chat } = useSelector(state => state.root);
  
  
  return (<>
    {msgItem?.text && msgItem?.pic?.length? 
    <div class="message-send flex">
      <div class="chat-text">
        <div className="d-flex flex-wrap justify-content-end wwith">
        {msgItem?.pic?.length ? msgItem?.pic?.map((imgUrl,inx)=>{
          return <span class="message-time implementImg" key={`message-time-${inx}`}><img style={{maxWidth: "100%",overflow:"hidden" }} src={imgUrl} /></span>
        }) : ""}
          </div>
        <div class="sender-message">
          <p>{msgItem?.text ? msgItem?.text : ""}</p>
        </div>
 
        <div className="inffodetail">
          <span class="message-time">{msgItem?.senderId ?.saloon && msgItem?.senderId?.saloon?.Saloon_name ? msgItem?.senderId?.saloon?.Saloon_name : msgItem?.senderId?.name ? msgItem?.senderId?.name : ""}</span>
          <span class="message-time">{msgItem.createdAt ? moment(msgItem.createdAt).format("DD/MM/YYYY") : ""}</span>
          <span class="message-time">{msgItem.createdAt ? moment(msgItem.createdAt).format("hh:mm a") : ""}</span>
        </div>
      </div>
      <div class="chat-dp online sender">
        <img src={user?.user?.saloon?.avatar ? user?.user?.saloon?.avatar : user?.user?.profilePic ? user?.user?.profilePic : avataar} alt="" />
      </div>
    </div>
    :
     msgItem?.text ? 
      <div class="message-send flex">
      <div class="chat-text">
        <div className="d-flex flex-wrap justify-content-end wwith">
        {msgItem?.pic?.length ? msgItem?.pic?.map((imgUrl,inx)=>{
          return <span class="message-time implementImg" key={`message-time-${inx}`}><img style={{maxWidth: "100px",overflow:"hidden" }} src={imgUrl} /></span>
        }) : ""}
          </div>
        <div class="sender-message">
          <p>{msgItem?.text ? msgItem?.text : ""}</p>
        </div>
 
        <div className="inffodetail">
          <span class="message-time">{msgItem?.senderId ?.saloon && msgItem?.senderId?.saloon?.Saloon_name ? msgItem?.senderId?.saloon?.Saloon_name : msgItem?.senderId?.name ? msgItem?.senderId?.name : ""}</span>
          <span class="message-time">{msgItem.createdAt ? moment(msgItem.createdAt).format("DD/MM/YYYY") : ""}</span>
          <span class="message-time">{msgItem.createdAt ? moment(msgItem.createdAt).format("hh:mm a") : ""}</span>
        </div>
      </div>
      <div class="chat-dp online sender">
        <img src={user?.user?.saloon?.avatar ? user?.user?.saloon?.avatar : user?.user?.profilePic ? user?.user?.profilePic : avataar} alt="" />
      </div>
    </div>
    :
    msgItem?.pic?.length? 
    <div class="message-send flex">
    <div class="chat-text">
      <div className="d-flex flex-wrap justify-content-end wwith">
      {msgItem?.pic?.length ? msgItem?.pic?.map((imgUrl,inx)=>{
        return <span class="message-time implementImg" key={`message-time-${inx}`}><img style={{maxWidth: "100%",overflow:"hidden" }} src={imgUrl} /></span>
      }) : ""}
        </div>
        <div className="inffodetail">
          <span class="message-time">{msgItem?.senderId ?.saloon && msgItem?.senderId?.saloon?.Saloon_name ? msgItem?.senderId?.saloon?.Saloon_name : msgItem?.senderId?.name ? msgItem?.senderId?.name : ""}</span>
          <span class="message-time">{msgItem.createdAt ? moment(msgItem.createdAt).format("DD/MM/YYYY") : ""}</span>
          <span class="message-time">{msgItem.createdAt ? moment(msgItem.createdAt).format("hh:mm a") : ""}</span>
        </div>
    </div>
    <div class="chat-dp online sender">
      <img src={user?.user?.saloon?.avatar ? user?.user?.saloon?.avatar : user?.user?.profilePic ? user?.user?.profilePic : avataar} alt="" />
    </div>
  </div>
  :
  ""
  
 }



    </>
  );
}

export default Sender;
