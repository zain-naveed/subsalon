import React, { useEffect, useState, useRef } from "react";
// import Avatar from '../assets/Avatar.png'
import SearchIcon from "@mui/icons-material/Search";
import Receiver from "./receiver";
import Sender from "./sender";
import InboxHeader from "./inboxHeader";

import { useSelector } from 'react-redux'
let CurrentID = ''
function Inbox({setRefreshSidebar ,selectUser, setSelectUser, socket, conversation, setCoversation, message, setMessage }) {
  CurrentID = String(selectUser?._id)
  // const [message, setMessage] = useState([]);
  const [respmessage, setrespMessage] = useState([]);
  // const messagesEndRef = useRef(null);
  const { user } = useSelector(state => state.root)




  // useEffect(() => {
  //   getMessage()
  // })
  // 
  
  // 
  useEffect(() => {

    let cloneConversation = [...conversation]
    // let cloneSlectUser = { ...selectUser }
    // let cloneMessage = [...message];
    // 
    

    socket.on("getMessage", async (socketDta) => {
      
      
      let copydata = await socketDta
      let go = true
      if (socketDta.conversationId === CurrentID) {
        if (go) {

          setMessage((pre) => [...pre, copydata])
          go = false
        }
      }
      let obj = {}
      obj['hasRead'] = socketDta.hasRead
      obj['lastMsg'] = socketDta.text
      obj['lastMsgDate'] = socketDta.createdAt
      let findConverInd = cloneConversation.findIndex(ii => ii._id == socketDta.conversationId)
      if (findConverInd > -1) {
        let resp = {
          ...obj,
          ...cloneConversation[findConverInd]
        }
        resp.hasRead = true
        resp.senderId = socketDta.senderId._id
        resp.lastMsg = socketDta.text
        resp.lastMsgDate = socketDta.createdAt
        // cloneConversation[findConverInd]
        cloneConversation[findConverInd].lastMsg = socketDta.text   
        cloneConversation[findConverInd].senderId = socketDta.senderId._id
        cloneConversation[findConverInd].hasRead = true
        cloneConversation[findConverInd].lastMsgDate = socketDta.createdAt
        // cloneConversation[findConverInd] = resp
        // 
        setRefreshSidebar(false)
        setCoversation(cloneConversation)
        // setSelectUser(resp)
      }
      // 
    })

  }, [])

  // useEffect(()=>{
  //   scrollToBottom()
  // },[message])
  // const scrollToBottom = () => {
  //   messagesEndRef?.current.scrollIntoView({ behavior: "smooth" });
  // };
  useEffect(() => {
    let scroll_to_bottom = document.getElementById('inbmain');
    scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight
  })
  // 
  return (
    <>
      <div id="inbmain" class="inbox-body">

        <InboxHeader conversation={conversation} setCoversation={setCoversation} setSelectUser={setSelectUser} selectUser={selectUser} />


        <div id="inbox_main" className="inbox_main">
          {message?.length > 0 ? message.map((ele) => {
            
            return <div id="msg">
              {

                ele.senderId?._id === user?.user?._id ? <Sender msgItem={ele} />
                  :
                  <Receiver msgItem={ele} />
              }
            </div>



          }) : ""}
        </div>



        {/* <!-- Message Row --> */}
      </div>
      {/* <div ref={messagesEndRef} /> */}

    </>
  );
}
const Typing = () => {
  return (
    <div class="chat-text">
      <div class="typing-wave">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>
  );
};

export default Inbox;
