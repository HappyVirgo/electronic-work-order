//Basic Imports
import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import './App.css';

//Containers
import WorkOrdersContainer from './containers/workorderscontainer'

//Components
import { 
  IdleTimerComponent
} from './components'

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
  const [isLoading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState();
  const [userStatus, setUserStatus] = useState();

  useEffect(() => {
    axios.get(apiUsers)
    .then(res => {
      //const payloadData = res.data;
      //console.log(payloadData)
      //setUserRole(payloadData.user.role_id);
      //Next line it's to develop in local 
      setUserStatus("success");
      setUserRole("3");
      setLoading(false);  
      localStorage.setItem("session_wo", "success");    
      const test = localStorage.getItem("session_wo");
      console.log(test)
    })
  }, [userRole]);
  
  
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
      <IdleTimerComponent />
      <WorkOrdersContainer />
    </>
  )
  return (
    conditionalRender===true?Body:conditionalRedirect
  );
}

export default App;
