import React, { useEffect, useState } from "react";
import "./assets/css/all.css";
import { socket, initSocket } from "../../Shared/Services/socketService";
import { getReadMsgServices } from "../../Shared/Services/conversate.service"
import Sidebar from "./sidebar/sidebar";
import Inbox from "./inbox/inbox";
import Message from "./message/message";
import { ChatUser } from "../../Assets";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import {
  getAllConversation,
  checkConservationServ,
} from "../../Shared/Services/conversate.service";
import { getmessagefromConservation } from '../../Shared/Services'
import Loader from "../../Shared/Components/Loader/FullScreenLoader";

function Index() {
  const [selectUser, setSelectUser] = useState(null);
  const [message, setMessage] = useState([])
  const [totalMessage, settotalMessage] = useState();
  const [getConservation, setConservation] = useState([]);
  const [FullConver, setFullConver] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchMenu, setSearchMenu] = useState("");
  const [refreshSidebar,setRefreshSidebar] = useState(true);
  const [userObj, setUserObj] = useState({
    Convid: "",
    userId: "",
  });
  let { user, chat } = useSelector((state) => state.root);


  

  const mutateConversation = (data) => {
    let temp = [...data];
    for (let i = 0; i < data.length; i++) {
      // var index = Math.floor(Math.random()  Math.floor(Math.random()  Date.now()))
      let obj = {
        ...temp[i],
        idInx: i,
      };
      temp[i] = obj;
    }

    return temp;
  };

  const getConvseration = () => {

    setLoader(true);
    getAllConversation(user?.user?._id)
      .then(({ data: { data } }) => {
        if (data) {
          setLoader(false);
        }
        
        let respData = data;
        let obj = {
          senderId: user?.user?._id,
          receiverId: chat?.receiver?._id,
        };
        if (obj?.receiverId) {
          checkConservationServ(obj).then(({ data: { data } }) => {
            
            // debugger

            let mutateResp = {};
            if (data?.exist) {

              let receiver = {
                name: chat?.receiver?.name,
                profilePic: chat?.receiver?.profilePic,
                _id: chat?.receiver?._id,
              };
              let sender = user?.user;
              // let obj = {
              //   members: [sender, receiver],
              // };
              let resp = {
                _id: data.conversationId,
                members: [sender, receiver]
              }
              let checkInd = respData?.findIndex((ii) => ii._id == resp._id)

              if (checkInd < 0) {
                let cloneConver = [resp, ...respData]
                mutateResp = mutateConversation(cloneConver);
                
                setSelectUser(mutateResp[0])
                setConservation(mutateResp);
                setFullConver(mutateResp);

              } else {
                mutateResp = mutateConversation(respData);
                setSelectUser(mutateResp[0])
                setConservation(mutateResp);
                setFullConver(mutateResp);
              }

              // if(chat?.receiver?.name){
              //     let receiver = {
              //         name: chat?.receiver?.name,
              //         profilePic: chat?.receiver?.profilePic,
              //         _id: chat?.receiver?._id
              //     }
              //     let sender = user?.user
              //     let obj = {
              //         members: [sender, receiver]
              //     }
              //     let cloneConver = [...respData, obj]
              //      mutateResp = mutateConversation(cloneConver);
              //     setConservation(mutateResp)
              // }else{
              //      mutateResp = mutateConversation(respData);
              // }

            } else {
              let receiver = {
                name: chat?.receiver?.name,
                profilePic: chat?.receiver?.profilePic,
                _id: chat?.receiver?._id,
              };
              let sender = user?.user;
              let obj = {
                members: [sender, receiver],
              };
              let cloneConver = [obj, ...respData];
              let mutateResp = mutateConversation(cloneConver);
              setSelectUser(mutateResp[0])
              setConservation(mutateResp);
              setFullConver(mutateResp);
            }
          });
        } else {
          let mutateResp = mutateConversation(respData);
          // setSelectUser(mutateResp[0])
          setConservation(mutateResp);
          setFullConver(mutateResp);
        }
      })
      .catch((err) => {})
  };
  useEffect(() => {
    getConvseration();
  }, []);
  useEffect(() => {
    initSocket();
    user?.user?._id && socket.emit("addUser", user?.user?._id)
    //   return () => {
    //     
    //     socket.off();
    //     socket.disconnect();

    // };
    // return () => {
    //   socket.disconnect()
    // }
  });
  

  const searchFun = (searchs) => {
    if (searchs != "") {
      let gettt = FullConver?.filter((item) =>
        item.members?.find((iii) => iii?._id != user?.user?._id)?.saloon
          ? item.members
            ?.find((iii) => iii?._id != user?.user?._id)
            ?.saloon?.Saloon_name.toLocaleLowerCase()
            .includes(searchs.toLocaleLowerCase())
          : item.members
            ?.find((iii) => iii?._id != user?.user?._id)
            ?.name.toLocaleLowerCase()
            .includes(searchs.toLocaleLowerCase())
      );
      
      setConservation(gettt);
    } else {
      setConservation(FullConver);
    }
  };
  const getMessage = (convId) => {
    getmessagefromConservation(convId).then(({ data: { data } }) => {
      if (data && data?.length) {
        // setrespMessage(data);
        

        setMessage(data);
      }
    }).catch(err => {
      
    })
  }
  const gettingReadMsg = (obj) => {

    // let obj = userObj

    getReadMsgServices(obj)
      .then(({ data }) => {

      })
      .catch((e) => {
      });
  }

  //   
  // chat = ""

  
  return (
    <main className="chat-page">
      {loader ? (
        ""
      ) : (
        <section className="chat-section">
          <div className="page-header flex center sb"></div>
          <div className="chat-box">
            <div className="container">
              <div className="flex center">
                <h3>Messages</h3>
                <span class="total-sms">{totalMessage}</span>
              </div>

              <div className="chat-box-content flex">
                <div
                  className={`chat-sidebar ${selectUser ? "displayNone" : "wi-100"
                    }`}
                >
                  {/* {/ <!-- Search Chat --> /} */}
                  <div className="chat-search">
                    <SearchIcon />
                    {/* {/ <img src={ChatUser} height={"25px"} width={"25px"} alt="" /> /} */}
                    <input
                      value={searchMenu}
                      onChange={(e) => {
                        setSearchMenu(e.target.value);
                        searchFun(e.target.value);
                      }}
                      type="text"
                      placeholder="Search"
                    />
                  </div>
                  {/* {/ <!-- Chat List --> /} */}
                  <div className="chat-list">
                    <Sidebar
                      setUserObj={setUserObj}
                      selectUser={selectUser}
                      socket={socket}
                      setSelectUser={setSelectUser}
                      converSationList={getConservation}
                      message={message}
                      setMessage={setMessage}
                      searchMenu={searchMenu}
                      setConservation={setConservation}
                      gettingReadMsg={gettingReadMsg}
                      getMessage={getMessage}
                      refreshSidebar={refreshSidebar}
                      setRefreshSidebar={setRefreshSidebar}
                    />
                  </div>
                </div>
                {selectUser && (
                  <div
                    className={`chat-data ${!selectUser ? "displayNone" : "wi-100"
                      }`}
                  >
                    {
                      <Inbox
                        socket={socket}
                        selectUser={selectUser}
                        setSelectUser={setSelectUser}
                        conversation={getConservation}
                        setCoversation={setConservation}
                        message={message}
                        setMessage={setMessage}
                        setRefreshSidebar={setRefreshSidebar}
                      />
                    }

                    {/* {/ <div ref={messagesEndRef} /> /} */}
                    <Message
                      selectUser={selectUser}
                      setSelectUser={setSelectUser}
                      conversation={getConservation}
                      setCoversation={setConservation}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      {loader && <Loader />}
    </main>
  );
}

export default Index;
