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

  const [isLoading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState();
  const [userStatus, setUserStatus] = useState();
  const [idleUpdate, setIdleUpdate] = useState(false);

  //First check
  useEffect(() => {
    axios.get(apiUsers)
    .then(res => {
      /*
      const payloadData = res.data;
      console.log(payloadData)
      setUserRole(payloadData.user.role_id);
      setUserStatus(payloadData.status);
      setLoading(false);
      */

      setUserRole("3");
      setUserStatus("success");
      setLoading(false); 
            
      
    })
  }, [idleUpdate]);

  const IdleTimerComponent = () => {
    const idleTimerRef = useRef(null)
    const handleOnActive = (event) => {
      //console.log('user is active', event)
      if(idleUpdate !== false){
        onIdle()
      }
    }     
    const onIdle = () => {
        console.log("User idle!")
        setIdleUpdate(true)
        axios.get(apiUsers)
        .then(res => {
          //const payloadData = res.data;
          //console.log(payloadData)
          //setUserRole(payloadData.user.role_id);
          //Next line it's to develop in local 
          //setUserStatus("success"); 
        })        
    }
    
    return (
        <div>
            <IdleTimer 
                ref={idleTimerRef}
                timeout={10000 * 1000}
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
