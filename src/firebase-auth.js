import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage} from "firebase/messaging";
import { store } from './Shared/Redux/store'
import { setNotificationToken } from './Shared/Redux/reducers/notifcationToken'
import { setUser } from './Shared/Redux/reducers/userSlice'
import { notificationTokenApi } from "./Shared";
let firebaseConfig = {
  apiKey: "AIzaSyD0GLPIc6ZblgvZL1CXY1rebc085bqaxRk",
  authDomain: "salon-substitute.firebaseapp.com",
  projectId: "salon-substitute",
  storageBucket: "salon-substitute.appspot.com",
  messagingSenderId: "507623433397",
  appId: "1:507623433397:web:9cd9d43d8934fc0bab8afc",
  measurementId: "G-MQ7ZGB1S50",
};

let firebaseApp = initializeApp(firebaseConfig);


export const fetchToken = (setTokenFound) => {
  let messaging = getMessaging(firebaseApp);
  const {user,notifctnTokn} = store.getState().root
  return getToken(messaging, {
    vapidKey:
      "BAB1jum_VPvTEqnGWVoVRl9uMOHPSs1wTEkVBvfZ6MUnGersUg5Quoqeae3PQXvGX4rG_XngslGAaxSiE6WQSPI",
  })
    .then((currentToken) => {
      if (currentToken) {
        if(Object.keys(user?.user).length){
          
          if(!user?.user?.deviceToken)
          {
            notificationTokenApi(currentToken).then(({data:{data}})=>{
              
              let cloneUser = {
                user:data,
                tokens:user.tokens,
                sub:user.sub,
                status:user.status
              }              
              store.dispatch(setUser(cloneUser))
              // dispatch(setNotification({notify:false}))
            }).catch((err)=>{
            })
          }else{
            notificationTokenApi(currentToken).then(({data:{data}})=>{
              
              let cloneUser = {
                user:data,
                tokens:user.tokens,
                sub:user.sub,
                status:user.status
              }              
              store.dispatch(setUser(cloneUser))
              // dispatch(setNotification({notify:false}))
            }).catch((err)=>{
            })
          }
          store.dispatch(setNotificationToken({notToken:currentToken}))
        }else{
          store.dispatch(setNotificationToken({notToken:currentToken}))
        }
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      // catch error while creating client token
    });
};

export const onMessageListener = () =>{
  let messaging = getMessaging(firebaseApp);
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    })
  });
}
  

  
