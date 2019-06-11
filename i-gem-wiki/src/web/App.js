import React, { Component } from 'react';
import {
  Route,
  BrowserRouter
} from 'react-router-dom'

import Home from "./pages/Home";
import Team from "./pages/Team";
import IgemNavbar from "components/IgemNavbar";
import './App.css'; 
// browser router root dir Team:Potsdam

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/Team:Potsdam">
        <IgemNavbar></IgemNavbar>
        <div className="content">
          <Route exact path="/" component={Home}/>
          <Route path="/Team" component={Team}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
