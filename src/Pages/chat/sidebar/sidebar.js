import React, { useState, useEffect } from "react";
import SidebarItem from "./sidebarItem";
import { useSelector } from 'react-redux'
// import { socket } from '../../../Shared/Services/socketService'
function Sidebar({refreshSidebar,setRefreshSidebar, setSelectUser, socket, selectUser, converSationList, totalMessage, setMessage, searchMenu, setConservation, setUserObj, gettingReadMsg, getMessage }) {
  const { user, chat } = useSelector(state => state.root);
  
  const arr = [
    {
      "_id": "62a2d6bc8d577500167aac6d",
      "location": {
        "address": "Wilmington, NC, USA",
        "coordinates": [
          -77.8868117,
          34.2103894
        ]
      },
      "name": "Ahsan watto",
      "isProfileComplete": true,
      "isEmailVerified": true,
      "platform": "",
      "socialId": "",
      "hourRate": 45,
      "minMiles": 0,
      "maxMiles": 1,
      "profilePic": "https://subsalon-dev.s3.us-west-1.amazonaws.com/Profile/62a2d6bc8d577500167aac6d.jpg",
      "role": "professional",
      "isExperience": true,
      "isSaloon": false,
      "favSaloon": [],
      "favProvider": [],
      "favJob": [
        "62a06d95b852d70016138219"
      ],
      "reviews": [
        "62a7297f2100b324749a79fa",
        "62a732b5859b4029010e1ac9"
      ],
      "email": "ahsan0@yopmail.com",
      "password": "$2a$08$LHqzdUVcHlGWuKamqU2hguH3u63sgtPiZJ4lA7ekHdg8DAFkAf7gW",
      "createdAt": "2022-06-10T05:29:32.438Z",
      "updatedAt": "2022-06-13T12:51:02.377Z",
      "__v": 0,
      "jobType": "Part-time",
      "zipCode": 54000,
      "covidDetails": {
        "_id": "62a6ca9184970b00167e58d7",
        "dose1": {
          "isDone": true,
          "date1": "5/24/2022",
          "vaccine1": "Sinovac"
        },
        "dose2": {
          "isDone": true,
          "date2": "5/28/2022",
          "vaccine2": "Sinopharm"
        },
        "createdAt": "2022-06-13T05:26:41.564Z",
        "updatedAt": "2022-06-13T05:26:41.564Z",
        "__v": 0
      },
      "experience": {
        "_id": "62a34f9a4345360016e8675b",
        "services": [
          "services"
        ],
        "familiarProducts": [
          "products"
        ],
        "familiarChemicalProd": [
          "checmial"
        ],
        "certificationImgs": [
          "https://subsalon-dev.s3.us-west-1.amazonaws.com/expereience/1q42t6ql5u31sgg5hw2uft.jpeg"
        ],
        "license": [
          {
            "_id": "62a34f9a4345360016e8675c",
            "name": "CS",
            "number": "LH-010"
          }
        ],
        "expYear": [
          {
            "_id": "62a34f9a4345360016e8675d",
            "start": 2018,
            "end": 2022,
            "description": "I've 3 years of Experience in Tony n Guy."
          }
        ],
        "AdditionalInfo": "this is info",
        "createdAt": "2022-06-10T14:05:14.549Z",
        "updatedAt": "2022-06-13T12:14:48.422Z",
        "__v": 0
      }
    }
  ];

  const [array, setaRRay] = useState(arr);

  const RemoveNew = (i) => {
    let clone = [...arr];
    if (clone[i].isNew == true) {
      clone[i].isNew = false;
    }

    setaRRay(clone);
  };


  return (
    <ul>
      {converSationList?.length > 0 ? converSationList.map((item, i) => {
        return (
          <>
            <li
              onClick={() => {
                let cloneConverstion = [...converSationList];
                let findInx = cloneConverstion.findIndex(ii => ii._id == item._id)

                if (findInx > -1) {
                  cloneConverstion[findInx].hasRead = false
                  setConservation(cloneConverstion)
                  setMessage([])
                  // socket.emit("addUser", user?.user?._id)
                  // setUserObj({ userId: user?.user?._id, Convid: item._id })
                  setSelectUser(cloneConverstion[findInx]);
                  if (item._id) {
                    getMessage(item._id)
                    // socket.disconnect()
                    // user?.user?._id && socket.emit("addUser", user?.user?._id)
                    gettingReadMsg({ userId: user?.user?._id, Convid: item._id })
                  }
                  // RemoveNew(i);
                }

              }}
              className={`${selectUser?._id == item?._id ? "active-chat" : ""
                }`}
            >
              <SidebarItem item={item} refreshSidebar={refreshSidebar} setRefreshSidebar={setRefreshSidebar} />
            </li>
          </>
        );
      }) : "No User Found"}
    </ul>
  );
}

export default Sidebar;
