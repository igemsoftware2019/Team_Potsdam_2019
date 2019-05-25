import React, { Component } from 'react';
import {
  Route,
  NavLink,
  BrowserRouter
} from 'react-router-dom'

import Home from "./Home";
import Stuff from "./Stuff";

import logo from './logo.svg';
import './App.css';
// browser router root dir Team:Potsdam

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <BrowserRouter>
            <div>
              <h1>Simple SPA</h1>
              <ul className="header">
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to="/Team">Stuff</NavLink></li>
              </ul>
              <div className="content">
                <Route exact path="/" component={Home}/>
                <Route path="/Team" component={Stuff}/>
              </div>
            </div>
          </BrowserRouter>
        </header>
      </div>
    );
  }
}

export default App;
