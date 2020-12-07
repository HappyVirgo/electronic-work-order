//Basic Imports
import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  const [isLoading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState();

  
  useEffect(() => {
    axios.get(apiUsers)
    .then(res => {
      const payloadData = res.data;
      console.log(payloadData)
      //setUserRole(payloadData.user.role_id);
      setUserRole("3");
      setLoading(false);      
    })
  }, [userRole]);
  
  
  let conditionalRender
  if (isLoading) {
    return  <div className="loading-container">
              <CircularProgress />
            </div>;
  }
  //Role ID - not allowed to access to workorders landing page (new/react)
  if (userRole==="1" || userRole==="2") {
    conditionalRender = false
  }else {
    conditionalRender = true
  }
  //conditionalRender===true?<WorkOrdersContainer />:redirect()
  return (
    conditionalRender===true?<WorkOrdersContainer />:redirect()
  );
}

export default App;
