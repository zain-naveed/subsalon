import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { store } from '../src/Shared/Redux/store';
import "./App.css";
import { fetchToken, onMessageListener } from "./firebase-auth";
import AuthRoute from './routes/authRoute';
import { getAllNotification, servicesGet } from "./Shared";
import Toast from "./Shared/Components/Toast/Toast";
import { setNotification } from './Shared/Redux/reducers/notReducer';

function App() {
  const {queryService} = useSelector(state=> state.root)
  const dispatch = useDispatch();
  const [isTokenFound, setTokenFound] = useState(false);
  const { user,notfy } = store.getState().root

let currencies = []


useEffect(() => {
  if(user.tokens){
  getAllNotification().then(({data:{data}})=>{
      let hasreads = data
      .filter(
        (ii) =>
          ii.hasRead == false
      )
      
      if(hasreads.length){
    dispatch(setNotification({notify:true}))

      }
  }).catch((err)=>{
  })
}

},[]);
useEffect(()=>{

  let query = `${queryService.service ? `?search=${queryService.service}`:"" }`
  servicesGet(query)
  .then(({ data }) => {
    currencies = data?.data
    
    dispatch(setNotification({services:currencies}))


  })
  .catch((err) => {

  });
},[queryService.service,notfy.services?.length])
useEffect(()=>{
  if(user.tokens){

  fetchToken(setTokenFound);
  
  onMessageListener()
    ?.then((payload) => {
      
      if(payload){

        dispatch(setNotification({notify:true}))
      }
    })
    .catch((err) => 
    navigator.serviceWorker.addEventListener("message",(msg)=> {
      
      if(msg){

        dispatch(setNotification({notify:true}))
      }


    }))
  }
  
},[navigator.serviceWorker])

    
  return (
    <>
      <div className="App">

        <AuthRoute />


        <Toast />

      </div>
    </>
  );
}

export default  App
