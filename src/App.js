//Basic Imports
import React, { Component } from 'react';
import './App.css';

//Containers
import WorkOrdersContainer from './containers/workorderscontainer'

class App extends Component {

  render() {
    return (
        <WorkOrdersContainer />
    );
  }
}

export default App;
