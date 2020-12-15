//Basic Imports
import React, { useEffect, useState, useRef } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import IdleTimer from 'react-idle-timer'
import axios from 'axios';
import './App.css';

//Containers
import WorkOrdersContainer from './containers/workorderscontainer'

import {
  apiUsers
} from './api'

const App = () => {
  const redirect = () => {
    window.top.location.href='/admin/WorkOrders'
  }
  const forceLogin = () => {
    window.top.location.href='/admin/Users/index_new'
  }   
  //const [isLoading, setLoading] = useState(true);
  //Next line it's to develop in local   
  const [isLoading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState();
  const [userStatus, setUserStatus] = useState();
  const [idleUpdate, setIdleUpdate] = useState(false);

  //First check
  useEffect(() => {
    setUserStatus("success");
    setUserRole("3");
    setLoading(false); 
    /*axios.get(apiUsers)
    .then(res => {
      //const payloadData = res.data;
      //console.log(payloadData)
      //setUserRole(payloadData.user.role_id);
      //Next line it's to develop in local 
      setUserStatus("success");
      setUserRole("3");
      setLoading(false); 
      
      //localStorage.setItem("session_wo", "success");    
      //const test = localStorage.getItem("session_wo");
      //console.log(test)
      
    })*/
  }, [idleUpdate]);

  const IdleTimerComponent = () => {
    const idleTimerRef = useRef(null)
    //let wo_session
    const handleOnActive = (event) => {
      //console.log('user is active', event)
      //wo_session = localStorage.getItem("session_wo");
      //console.log("handleOnActive", wo_session)
      if(idleUpdate !== false){
        onIdle()
      }
    }     
    const onIdle = () => {
        console.log("User inactive for 1000 seconds!")
        setIdleUpdate(true)
        axios.get(apiUsers)
        .then(res => {
          //const payloadData = res.data;
          //console.log(payloadData)
          //setUserRole(payloadData.user.role_id);
          //Next line it's to develop in local 
          setUserStatus("success"); 
          //localStorage.setItem("session_wo", "success");    
          //wo_session = localStorage.getItem("session_wo");
          //console.log("onIdle", wo_session)
        })        
    }
    
    return (
        <div>
            <IdleTimer 
                ref={idleTimerRef}
                timeout={1000 * 1000}
                onIdle={onIdle}
                onAction={handleOnActive}
            />
        </div>
    );
  };

  let conditionalRender
  let conditionalRedirect
  if (isLoading) {
    return  <div className="loading-container">
              <CircularProgress />
            </div>;
  }
  //Role ID - not allowed to access to workorders landing page (new/react)
  if (userRole==="1" || userRole==="2") {
    conditionalRender = false
    conditionalRedirect = redirect()    
  }else if(userStatus==="error") {
    conditionalRender = false
    conditionalRedirect = forceLogin()
  } else {
    conditionalRender = true
  }

  const Body = (
    <>
      <IdleTimerComponent  />
      <WorkOrdersContainer />
    </>
  )
  return (
    conditionalRender===true?Body:conditionalRedirect
  );
}

export default App;
