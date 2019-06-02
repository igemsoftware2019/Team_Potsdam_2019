import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  Route,
  NavLink,
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
        <div className="App container-fluid">
          <Scrollbars>
            <div className="content">
              <Route exact path="/" component={Home}/>
              <Route path="/Team" component={Team}/>
            </div>
          </Scrollbars>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
