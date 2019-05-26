import React, { Component } from 'react';
import {
  Route,
  NavLink,
  BrowserRouter
} from 'react-router-dom'

import Home from "./pages/Home";
import Team from "./pages/Team";
import './App.css';
// browser router root dir Team:Potsdam

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="" className="App-logo" alt="logo" />
          <BrowserRouter basename="/Team:Potsdam">
            <div>
              <h1>Simple SPA</h1>
              <ul className="header">
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to="/Team">Team</NavLink></li>
              </ul>
              <div className="content">
                <Route exact path="/" component={Home}/>
                <Route path="/Team" component={Team}/>
              </div>
            </div>
          </BrowserRouter>
        </header>
      </div>
    );
  }
}

export default App;
