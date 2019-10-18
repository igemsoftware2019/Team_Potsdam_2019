import React, { Component } from 'react';
import {
  Route,
  BrowserRouter
} from 'react-router-dom'

import IgemNavbar from "components/IgemNavbar";
import './App.css'; 

import Home from "./pages/Home";

import Team from "./pages/team/Team";
import Collaborations from "./pages/team/Collaborations";

import Description from "./pages/project/Description";
import Design from "./pages/project/Design";
import Experiments from "./pages/project/Experiments";
import Notebook from "./pages/project/Notebook";
import Contribution from "./pages/project/Contribution";
import Results from "./pages/project/Results";
import Demonstrate from "./pages/project/Demonstrate";
import Improve from "./pages/project/Improve";
import Attributions from "./pages/project/Attributions";

import Safety from "./pages/Safety";

import HumanPractices from "./pages/human_practice/HumanPractices";

import Model from "./pages/awards/Model";

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/Team:Potsdam">
        <IgemNavbar></IgemNavbar>
        <div className="app-container">
          <Route exact path="/" component={Home}/>
          
          <Route path="/Team" component={Team}/>
          <Route path="/Collaborations" component={Collaborations}/>

          <Route path="/Description" component={Description}/>
          <Route path="/Design" component={Design}/>
          <Route path="/Experiments" component={Experiments}/>
          <Route path="/Notebook" component={Notebook}/>
          <Route path="/Contribution" component={Contribution}/>
          <Route path="/Results" component={Results}/>
          <Route path="/Demonstrate" component={Demonstrate}/>
          <Route path="/Improve" component={Improve}/>
          <Route path="/Attributions" component={Attributions}/>

          <Route path="/Safety" component={Safety}/>

          <Route path="/Human_Practices" component={HumanPractices}/>

          <Route path="/Model" component={Model}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
